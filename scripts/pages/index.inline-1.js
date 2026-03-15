(function(){
  const ok = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if(ok){ const l=document.createElement('link'); l.rel='manifest'; l.href='./assets/pwa/manifest.webmanifest'; document.head.appendChild(l); }
})();

