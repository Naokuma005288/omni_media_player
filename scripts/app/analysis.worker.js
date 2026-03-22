const clampValue = (n, min, max) => Math.max(min, Math.min(max, n));

function foldBpm(bpm){
  let v=+bpm||0;
  if(!Number.isFinite(v) || v<=0) return 0;
  while(v<72) v*=2;
  while(v>180) v/=2;
  return Math.round(v*10)/10;
}

function summarizeWeightedVotes(votes, fallbackValue=0){
  let total=0, bestValue=fallbackValue, bestScore=0, secondScore=0;
  votes.forEach((score, value)=>{
    total += score;
    if(score>bestScore){
      secondScore=bestScore;
      bestScore=score;
      bestValue=+value;
    }else if(score>secondScore){
      secondScore=score;
    }
  });
  const dominance=bestScore>0 ? (bestScore-secondScore)/bestScore : 0;
  const share=total>0 ? bestScore/total : 0;
  return {
    value:bestValue||fallbackValue||0,
    confidence:clampValue(share*0.7 + dominance*0.3, 0, 0.99)
  };
}

function estimateBpmFromMonoDetailed(mono, sampleRate){
  if(!mono?.length || !sampleRate) return { bpm:0, confidence:0 };
  const hop=512;
  const win=1024;
  const env=[];
  let prevFrameEnergy=0;
  for(let i=0;i+win<mono.length;i+=hop){
    let sum=0;
    let flux=0;
    for(let j=0;j<win;j++){
      const s=mono[i+j];
      sum += Math.abs(s);
      if(j){
        const diff=Math.abs(s)-Math.abs(mono[i+j-1]);
        if(diff>0) flux += diff;
      }
    }
    const energy=sum/win;
    const onset=Math.max(0, energy-prevFrameEnergy)*0.45 + (flux/win)*0.55;
    env.push(onset);
    prevFrameEnergy=energy;
  }
  if(env.length<48) return { bpm:0, confidence:0 };
  const smooth=new Float32Array(env.length);
  for(let i=0;i<env.length;i++){
    let local=0,count=0;
    for(let k=Math.max(0,i-8);k<=Math.min(env.length-1,i+8);k++){
      local += env[k];
      count++;
    }
    smooth[i]=Math.max(0, env[i] - (local/Math.max(1,count))*0.92);
  }
  const peakIdx=[];
  for(let i=1;i<smooth.length-1;i++){
    const v=smooth[i];
    if(v<=smooth[i-1] || v<smooth[i+1]) continue;
    let local=0,count=0,sq=0;
    for(let k=Math.max(0,i-12);k<=Math.min(smooth.length-1,i+12);k++){
      local+=smooth[k];
      sq+=smooth[k]*smooth[k];
      count++;
    }
    const mean=local/Math.max(1,count);
    const variance=Math.max(0, sq/Math.max(1,count)-mean*mean);
    const threshold=mean + Math.sqrt(variance)*0.45;
    if(v>Math.max(0.008, threshold)) peakIdx.push(i);
  }
  const framesPerSec=sampleRate/hop;
  const scores=new Map();
  for(let i=0;i<peakIdx.length;i++){
    for(let j=i+1;j<Math.min(peakIdx.length, i+6);j++){
      const dt=(peakIdx[j]-peakIdx[i])/framesPerSec;
      if(dt<0.22 || dt>2.4) continue;
      const bpm=foldBpm(60/dt);
      if(!bpm) continue;
      const rounded=Math.round(bpm);
      const weight=(6-(j-i)) * smooth[peakIdx[i]];
      scores.set(rounded, (scores.get(rounded)||0) + weight);
    }
  }
  const corrScores=new Map();
  const minLag=Math.floor(framesPerSec*60/180);
  const maxLag=Math.ceil(framesPerSec*60/72);
  let bestLag=0;
  let corrBest=0;
  for(let lag=minLag;lag<=maxLag;lag++){
    let score=0;
    for(let i=0;i<smooth.length-lag;i++) score += smooth[i]*smooth[i+lag];
    if(score>0){
      const bpm=Math.round(foldBpm((60*framesPerSec)/lag));
      corrScores.set(bpm, (corrScores.get(bpm)||0) + score);
    }
    if(score>corrBest){
      corrBest=score;
      bestLag=lag;
    }
  }
  corrScores.forEach((score,bpm)=>{
    scores.set(bpm, (scores.get(bpm)||0) + score*0.35);
  });
  const summary=summarizeWeightedVotes(scores, bestLag ? Math.round(foldBpm((60*framesPerSec)/bestLag)) : 0);
  return {
    bpm:summary.value||0,
    confidence:summary.value ? clampValue(summary.confidence + (peakIdx.length>10 ? 0.08 : 0), 0, 0.98) : 0
  };
}

function estimateBpmFromPreparedMono(mono, sampleRate){
  const segmentSec=30;
  const segmentLen=Math.floor(sampleRate*segmentSec);
  const votes=new Map();
  const starts=[0];
  if(mono.length > segmentLen*1.5){
    starts.push(Math.max(0, Math.floor((mono.length-segmentLen)/2)));
  }
  if(mono.length > segmentLen*2){
    starts.push(Math.max(0, mono.length-segmentLen));
  }
  starts.push(Math.max(0, Math.floor(mono.length*0.18)));
  starts.push(Math.max(0, Math.floor(mono.length*0.58)));
  const uniqueStarts=[...new Set(starts)].filter(start=>start+Math.floor(sampleRate*16) < mono.length);
  uniqueStarts.forEach(start=>{
    const slice=mono.subarray(start, Math.min(mono.length, start+segmentLen));
    const { bpm, confidence }=estimateBpmFromMonoDetailed(slice, sampleRate);
    if(!bpm) return;
    const weight=Math.max(0.2, confidence || 0.2);
    votes.set(bpm, (votes.get(bpm)||0) + weight);
    for(const alt of [bpm-1,bpm+1]){
      if(alt>70 && alt<181) votes.set(alt, (votes.get(alt)||0) + weight*0.18);
    }
  });
  if(!votes.size) return estimateBpmFromMonoDetailed(mono, sampleRate);
  const fallback=estimateBpmFromMonoDetailed(mono, sampleRate);
  const summary=summarizeWeightedVotes(votes, fallback.bpm);
  return {
    bpm:summary.value || fallback.bpm || 0,
    confidence:clampValue(Math.max(fallback.confidence*0.72, summary.confidence), 0, 0.99)
  };
}

function goertzelEnergy(frame, freq, sampleRate){
  const N=frame.length;
  if(!N || !freq || freq>=sampleRate*0.5) return 0;
  const k=Math.round((N*freq)/sampleRate);
  const w=(2*Math.PI*k)/N;
  const cosine=Math.cos(w);
  const coeff=2*cosine;
  let q0=0,q1=0,q2=0;
  for(let i=0;i<N;i++){
    q0=coeff*q1-q2+frame[i];
    q2=q1;
    q1=q0;
  }
  return q1*q1 + q2*q2 - coeff*q1*q2;
}

function formatTrackKey(pc, mode='major'){
  const names=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
  const safe=((pc%12)+12)%12;
  return `${names[safe]}${mode==='minor' ? 'm' : ''}`;
}

function estimateKeyFromMonoDetailed(mono, sampleRate){
  if(!mono?.length || !sampleRate) return { key:'', confidence:0 };
  const frameSize=4096;
  const hop=4096;
  const chroma=new Float64Array(12);
  const notes=[];
  for(let midi=36;midi<=95;midi++){
    notes.push({ pc:midi%12, freq:440*Math.pow(2,(midi-69)/12) });
  }
  const window=new Float32Array(frameSize);
  for(let start=0; start+frameSize<mono.length; start+=hop){
    let rms=0;
    for(let i=0;i<frameSize;i++){
      const w=0.5*(1-Math.cos((2*Math.PI*i)/(frameSize-1)));
      const s=mono[start+i]*w;
      window[i]=s;
      rms += s*s;
    }
    rms=Math.sqrt(rms/frameSize);
    if(rms<0.01) continue;
    for(const note of notes){
      const fundamental=goertzelEnergy(window, note.freq, sampleRate);
      const harmonic2=goertzelEnergy(window, note.freq*2, sampleRate)*0.54;
      const harmonic3=goertzelEnergy(window, note.freq*3, sampleRate)*0.28;
      chroma[note.pc] += fundamental + harmonic2 + harmonic3;
    }
  }
  const major=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88];
  const minor=[6.33,2.68,3.52,5.38,2.6,3.53,2.54,4.75,3.98,2.69,3.34,3.17];
  let bestScore=-Infinity, secondScore=-Infinity, bestName='';
  const total=Array.from(chroma).reduce((a,b)=>a+b,0);
  if(total<=0) return { key:'', confidence:0 };
  const normalized=Array.from(chroma).map(v=>v/total);
  const majorNorm=Math.sqrt(major.reduce((a,b)=>a+b*b,0));
  const minorNorm=Math.sqrt(minor.reduce((a,b)=>a+b*b,0));
  const sliceNorm=(arr, root)=>Math.sqrt(arr.reduce((acc,_,i)=>{
    const idx=(i+root)%12;
    return acc + arr[idx]*arr[idx];
  },0));
  for(let root=0;root<12;root++){
    let majorScore=0, minorScore=0;
    for(let i=0;i<12;i++){
      const idx=(i+root)%12;
      majorScore += normalized[idx]*major[i];
      minorScore += normalized[idx]*minor[i];
    }
    majorScore /= Math.max(1e-6, sliceNorm(normalized, root) * majorNorm);
    minorScore /= Math.max(1e-6, sliceNorm(normalized, root) * minorNorm);
    if(majorScore>bestScore){
      secondScore=bestScore;
      bestScore=majorScore;
      bestName=formatTrackKey(root, 'major');
    }else if(majorScore>secondScore){
      secondScore=majorScore;
    }
    if(minorScore>bestScore){
      secondScore=bestScore;
      bestScore=minorScore;
      bestName=formatTrackKey(root, 'minor');
    }else if(minorScore>secondScore){
      secondScore=minorScore;
    }
  }
  const separation=Math.max(0, bestScore-secondScore);
  const confidence=clampValue(((bestScore-0.58)*1.3) + (separation*1.6), 0, 0.99);
  return { key:bestName, confidence };
}

function estimateKeyFromPreparedMono(mono, sampleRate){
  const segmentSec=24;
  const segmentLen=Math.floor(sampleRate*segmentSec);
  const starts=[
    0,
    Math.max(0, Math.floor(mono.length*0.16)),
    Math.max(0, Math.floor((mono.length-segmentLen)/2)),
    Math.max(0, Math.floor(mono.length*0.62)),
    Math.max(0, mono.length-segmentLen)
  ];
  const votes=new Map();
  for(const start of [...new Set(starts)]){
    const slice=mono.subarray(start, Math.min(mono.length, start+segmentLen));
    if(slice.length < sampleRate*8) continue;
    const { key, confidence }=estimateKeyFromMonoDetailed(slice, sampleRate);
    if(key) votes.set(key, (votes.get(key)||0) + Math.max(0.2, confidence || 0.2));
  }
  const fallback=estimateKeyFromMonoDetailed(mono, sampleRate);
  if(!votes.size) return fallback;
  let best=fallback.key, score=0, total=0, second=0;
  votes.forEach((s,key)=>{
    total += s;
    if(s>score){
      second=score;
      score=s;
      best=key;
    }else if(s>second){
      second=s;
    }
  });
  const share=total>0 ? score/total : 0;
  const dominance=score>0 ? (score-second)/score : 0;
  return {
    key:best || fallback.key || '',
    confidence:clampValue(Math.max(fallback.confidence*0.72, share*0.68 + dominance*0.32), 0, 0.99)
  };
}

self.onmessage = (event)=>{
  const { id, monoBuffer, sampleRate } = event.data || {};
  try{
    const mono = new Float32Array(monoBuffer);
    const bpmResult=estimateBpmFromPreparedMono(mono, sampleRate);
    const keyResult=estimateKeyFromPreparedMono(mono, sampleRate);
    self.postMessage({ id, ok:true, bpmResult, keyResult });
  }catch(err){
    self.postMessage({ id, ok:false, error:err?.message || String(err) });
  }
};
