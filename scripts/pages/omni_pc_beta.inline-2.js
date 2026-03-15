document.addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  const r = document.createElement('span'); r.className='ripple';
  const rect = b.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.style.width = r.style.height = size + 'px';
  r.style.left = (e.clientX - rect.left - size/2) + 'px';
  r.style.top  = (e.clientY - rect.top  - size/2) + 'px';
  b.appendChild(r);
  setTimeout(()=> r.remove(), 650);
}, {passive:true});
