/* "Take this to your AI" — loads the briefing pack into a panel with Copy and Download. */
(function(){
if(!document.querySelector('[data-ai-pack]'))return; // website pages only — never inside the apps
var url='admin-for-tradies-ai-briefing.txt',txt='',loading=false;
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
var ov=el('div','aiov');ov.innerHTML='<div class="aip" role="dialog" aria-label="Take this to your AI"><div class="aih"><div><div class="kick" style="color:#0f8bb5">Take this to your AI</div><h3>One file. Your AI does the asking.</h3></div><button class="aix" aria-label="Close">×</button></div><p class="aiw">Copy this and paste it into ChatGPT, Claude, Copilot or Gemini. It tells your AI exactly what <b>Admin for Tradies</b> does, what it costs and who it is for — then it will ask you a few questions, tell you honestly whether I fit, and draft the enquiry email so I can quote. No chat bot, no back-and-forth with a website. A roadmap you take with you.</p><div class="aib"><button class="btn bx aic">Copy to clipboard</button><button class="btn bs aidl">Download .txt</button><span class="aid"></span></div><pre class="ait">Loading…</pre></div>';
document.body.appendChild(ov);
var pre=ov.querySelector('.ait'),done=ov.querySelector('.aid');
function load(cb){
  if(txt){cb();return}
  if(loading){setTimeout(function(){load(cb)},150);return}
  loading=true;
  fetch(url).then(function(r){if(!r.ok)throw new Error('http '+r.status);return r.text()}).then(function(t){txt=t;pre.textContent=t;loading=false;cb()}).catch(function(err){
    loading=false;pre.textContent='Could not load the file automatically. Try again, or email monique@admin4tradies.co.nz for the briefing pack.';
    done.textContent='Could not load the file (' + err.message + ').';
  });
}
function open(){ov.classList.add('on');document.body.style.overflow='hidden';load(function(){})}
function close(){ov.classList.remove('on');document.body.style.overflow=''}
ov.addEventListener('click',function(e){if(e.target===ov||e.target.closest('.aix'))close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
function flash(msg){done.textContent=msg;setTimeout(function(){done.textContent=''},4000)}
function fallbackCopy(t){
  try{
    var ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.left='-9999px';ta.style.top='0';
    document.body.appendChild(ta);ta.focus();ta.select();
    var okCopy=document.execCommand('copy');
    document.body.removeChild(ta);
    if(okCopy){flash('Copied — now paste it into your AI.')}
    else{flash('Could not copy automatically — select the text below and copy it manually.')}
  }catch(e){flash('Could not copy automatically — select the text below and copy it manually.')}
}
ov.querySelector('.aic').addEventListener('click',function(){
  load(function(){
    if(!txt)return;
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(txt).then(function(){flash('Copied — now paste it into your AI.')}).catch(function(){fallbackCopy(txt)});
    }else{fallbackCopy(txt)}
  });
});
ov.querySelector('.aidl').addEventListener('click',function(){
  load(function(){
    if(!txt)return;
    try{
      var blob=new Blob([txt],{type:'text/plain;charset=utf-8'});
      var blobUrl=URL.createObjectURL(blob);
      var a=document.createElement('a');
      a.href=blobUrl;a.download='Admin for Tradies - AI briefing pack.txt';
      document.body.appendChild(a);a.click();document.body.removeChild(a);
      setTimeout(function(){URL.revokeObjectURL(blobUrl)},2000);
      flash('Downloading…');
    }catch(e){flash('Download failed — try Copy instead, or email monique@admin4tradies.co.nz.')}
  });
});
document.querySelectorAll('[data-ai-pack]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();open()})});
})();
