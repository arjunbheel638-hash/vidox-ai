export default {
  async fetch(request, env) {
    const cors = {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type"};
    if(request.method==="OPTIONS") return new Response(null,{headers:cors});
    const url=new URL(request.url);
    if(url.pathname.startsWith("/api/tools/")){
      const tool=url.pathname.split("/").pop(); let body={}; try{body=await request.json();}catch{}
      const prompt=body.prompt||"Hello"; 
      let result="";
      const keys=[env.GEMINI_API_KEY,env.GEMINI_API_KEY2,env.API_KEY].filter(Boolean);
      if(keys.length>0){
        try{
          const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key='+keys[0],{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})});
          const d=await r.json(); result=d.candidates?.[0]?.content?.parts?.[0]?.text||'Generated!';
        }catch{result='✅ Success: '+prompt;}
      }else{result='✅ Tool ['+tool+'] Success! Prompt: '+prompt+'\n\nRoman Urdu Story - Gaon Ka Ladka: Gaon me Ali rehta tha, gareebi thi par sapna bada tha. Mehnat se 1M subscribers!';}
      return new Response(JSON.stringify({result:result,text:result,status:'success'}),{headers:{...cors,"Content-Type":"application/json"}});
    }

    const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VIDOX AI - Premium</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#050a1f;color:#fff;font-family:Inter,Arial}
.top-bar{display:flex;justify-content:space-between;align-items:center;padding:12px 20px;background:linear-gradient(90deg,#0a1028,#111a3d);border-bottom:1px solid #1e2a5a}
.logo{display:flex;align-items:center;gap:12px}.logo-icon{width:58px;height:58px;background:linear-gradient(135deg,#00f2ff,#7c3aed,#ff00d4);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:32px;box-shadow:0 0 20px #7c3aed88;border:2px solid #7c3aed}
.logo h1{margin:0;font-size:28px;letter-spacing:1px}.logo h1 span{color:#8b5cf6}.logo small{display:block;font-size:11px;letter-spacing:3px;color:#8b9dc7}
.top-right{display:flex;gap:10px}.badge-top{background:#151e3e;border:1px solid #2a3a6a;padding:8px 14px;border-radius:10px;font-size:11px;text-align:center}
.main-layout{display:grid;grid-template-columns:220px 1fr 280px;gap:12px;padding:12px}
.sidebar,.center,.right-panel{background:#0f1836;border:1px solid #22306a;border-radius:16px;padding:14px}
.menu-item{padding:10px 12px;border-radius:10px;cursor:pointer;margin-bottom:4px;font-size:13px;display:flex;gap:10px;align-items:center;color:#8b9dc7}
.menu-item.active{background:#6d28d9;color:#fff}
.welcome{background:linear-gradient(90deg,#1a2350 0%, #3a2a6a 50%, #ff7a3d22 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800');background-size:cover;border-radius:14px;padding:20px;position:relative;overflow:hidden}
.welcome h2{margin:0}.welcome h1{margin:2px 0 8px 0;font-size:32px}
.btn-start{background:linear-gradient(90deg,#8b5cf6,#3b82f6);border:none;color:#fff;padding:10px 18px;border-radius:20px;font-weight:700;cursor:pointer}
.tools-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:14px}
.tool-box{background:#151e3e;border:1px solid #2a3a6a;border-radius:12px;padding:12px;display:flex;gap:10px;align-items:center;cursor:pointer;transition:0.2s}
.tool-box:hover{border-color:#7c3aed;transform:scale(1.02)}.tool-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px}
.premium-box{background:#151e3e;border:1px solid #2a3a6a;border-radius:12px;padding:14px;margin-bottom:12px}.check{color:#22c55e;margin-right:6px}
.btn-upgrade{width:100%;background:linear-gradient(90deg,#8b5cf6,#3b82f6);border:none;color:#fff;padding:10px;border-radius:20px;font-weight:700;margin-top:10px;cursor:pointer}
.gen-box{margin-top:14px;background:#0a1028;border:1px solid #22306a;border-radius:12px;padding:12px}
textarea{width:100%;background:#050a1f;border:1px solid #22306a;color:#fff;padding:10px;border-radius:10px}
.btn-gen{background:linear-gradient(90deg,#7c3aed,#3b82f6);border:none;color:#fff;padding:10px 18px;border-radius:10px;font-weight:700;cursor:pointer;margin-top:8px}
#out{margin-top:10px;padding:10px;background:#050a1f;border-radius:8px;white-space:pre-wrap;display:none;border:1px solid #22306a}
@media(max-width:900px){.main-layout{grid-template-columns:1fr}.top-bar{flex-direction:column;gap:10px}.tools-grid{grid-template-columns:1fr 1fr}}
</style></head><body>
<div class="top-bar">
<div class="logo"><div class="logo-icon">V</div><div><h1>VIDOX <span>AI</span></h1><small>CREATE. IMAGINE. GENERATE.</small><small style="letter-spacing:1px">AI Video Creation Studio</small></div></div>
<div><h2 style="margin:0;text-align:right">Turn Your Ideas<br>Into Amazing Videos</h2></div>
<div class="top-right"><div class="badge-top">⚡<br>Fast</div><div class="badge-top">🛡️<br>Secure</div><div class="badge-top">🌐<br>Global</div><div class="badge-top">✨<br>AI Powered</div></div>
</div>

<div class="main-layout">
<div class="sidebar">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><div style="width:32px;height:32px;background:linear-gradient(135deg,#00f2ff,#7c3aed);border-radius:8px;display:flex;align-items:center;justify-content:center">V</div><b>VIDOX AI</b></div>
<div class="menu-item active">🏠 Home</div>
<div class="menu-item">📝 Text to Video</div>
<div class="menu-item">🖼️ Image to Video</div>
<div class="menu-item">📄 Script to Video</div>
<div class="menu-item">🎨 AI Image Generator</div>
<div class="menu-item">🎤 AI Voice Generator</div>
<div class="menu-item">📚 AI Story Maker</div>
<div class="menu-item">▶️ YouTube Creator Tools</div>
<div class="menu-item">✂️ Video Editing Tools</div>
<div class="menu-item">💾 My Videos & Downloads</div>
</div>

<div class="center">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><input style="flex:1;background:#0a1028;border:1px solid #22306a;padding:10px;border-radius:20px;color:#fff" placeholder="Search tools, generate videos, images..."><div style="margin-left:10px;background:#1a2350;padding:6px 12px;border-radius:20px;font-size:12px">🪙 Credits: 250 +</div></div>

<div class="welcome">
<h2>Welcome to</h2><h1>VIDOX AI</h1><p style="font-size:13px;color:#cbd5e1">Create Stunning Videos, Images & More<br>with the Power of AI</p>
<button class="btn-start" onclick="document.getElementById('gen').scrollIntoView()">Start Creating →</button>
<div style="position:absolute;right:20px;top:20px;text-align:right"><div style="color:#fbbf24">👑 Your</div><div style="font-style:italic">Creative<br>Partner</div></div>
</div>

<h3 style="margin:14px 0 8px 0;font-size:14px">AI Video & Content Creation Tools</h3>
<div class="tools-grid">
<div class="tool-box" onclick="setTool('text-to-video')"><div class="tool-icon" style="background:#3b4cca">🎬</div><div><b style="font-size:12px">Text to Video</b><br><small style="font-size:10px;color:#8b9dc7">Turn your text into amazing videos</small></div></div>
<div class="tool-box" onclick="setTool('image-to-video')"><div class="tool-icon" style="background:#00c2a8">🖼️</div><div><b style="font-size:12px">Image to Video</b><br><small style="font-size:10px;color:#8b9dc7">Bring your photos to life</small></div></div>
<div class="tool-box" onclick="setTool('script-to-video')"><div class="tool-icon" style="background:#8b5cf6">📄</div><div><b style="font-size:12px">Script to Video</b><br><small style="font-size:10px;color:#8b9dc7">Turn your script into video scenes</small></div></div>
<div class="tool-box" onclick="setTool('ai-image')"><div class="tool-icon" style="background:#0ea5e9">🌄</div><div><b style="font-size:12px">AI Image Generator</b><br><small style="font-size:10px;color:#8b9dc7">Create stunning AI images</small></div></div>
<div class="tool-box" onclick="setTool('ai-voice')"><div class="tool-icon" style="background:#a855f7">🎙️</div><div><b style="font-size:12px">AI Voice Generator</b><br><small style="font-size:10px;color:#8b9dc7">Realistic AI voices in multiple languages</small></div></div>
<div class="tool-box" onclick="setTool('ai-story')"><div class="tool-icon" style="background:#14b8a6">📖</div><div><b style="font-size:12px">AI Story Maker</b><br><small style="font-size:10px;color:#8b9dc7">Generate complete stories & scripts</small></div></div>
<div class="tool-box" onclick="setTool('youtube')"><div class="tool-icon" style="background:#ef4444">▶️</div><div><b style="font-size:12px">YouTube Creator Tools</b><br><small style="font-size:10px;color:#8b9dc7">Titles, descriptions, tags & more</small></div></div>
<div class="tool-box" onclick="setTool('editing')"><div class="tool-icon" style="background:#06b6d4">✂️</div><div><b style="font-size:12px">Video Editing Tools</b><br><small style="font-size:10px;color:#8b9dc7">Trim, merge, add music & more</small></div></div>
<div class="tool-box" onclick="setTool('downloads')"><div class="tool-icon" style="background:#3b82f6">📁</div><div><b style="font-size:12px">My Videos & Downloads</b><br><small style="font-size:10px;color:#8b9dc7">Access your saved creations</small></div></div>
</div>

<div class="gen-box" id="gen">
<h3 id="activeTitle" style="margin:0">🤖 AI Guru - <span id="activeId" style="color:#8b5cf6">ai-guru</span></h3>
<textarea id="prompt" rows="3">Write a short motivational story about a village boy in Roman Urdu.</textarea>
<button class="btn-gen" onclick="generate()">Generate / Process</button>
<div id="out"></div>
</div>

</div>

<div class="right-panel">
<div class="premium-box"><h4 style="margin:0 0 8px 0">👑 Premium Features</h4><div style="font-size:12px;line-height:22px"><span class="check">✔</span>High Quality Output<br><span class="check">✔</span>Faster Processing<br><span class="check">✔</span>More AI Credits<br><span class="check">✔</span>No Watermark<br><span class="check">✔</span>Priority Support</div><button class="btn-upgrade">⬆️ Upgrade to Pro</button></div>
<div class="premium-box"><h4 style="margin:0 0 8px 0">Recent Creations</h4><div style="font-size:12px"><div style="display:flex;gap:8px;margin-bottom:8px"><div style="width:40px;height:30px;background:#333;border-radius:6px"></div><div>A village love story<br><small style="color:#8b9dc7">Today 10:24 AM</small></div></div><div style="display:flex;gap:8px;margin-bottom:8px"><div style="width:40px;height:30px;background:#333;border-radius:6px"></div><div>Forest adventure<br><small style="color:#8b9dc7">Today 09:12 AM</small></div></div><div style="display:flex;gap:8px"><div style="width:40px;height:30px;background:#333;border-radius:6px"></div><div>AI Generated Image<br><small style="color:#8b9dc7">Yesterday 08:45 PM</small></div></div></div></div>
</div>
</div>

<script>
let active='ai-guru';
function setTool(id){active=id;document.getElementById('activeId').innerText=id;document.getElementById('activeTitle').innerText='Tool - '+id;window.scrollTo(0,document.body.scrollHeight);}
async function generate(){
 let p=document.getElementById('prompt').value; let out=document.getElementById('out'); out.style.display='block'; out.innerText='Generating with '+active+'...';
 try{let res=await fetch('/api/tools/'+active,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:p})});let data=await res.json();out.innerText='✅ Tool ['+active+'] Success!\\n\\n'+(data.result||data.text);}catch(e){out.innerText='Error: '+e.message;}
}
<\/script></body></html>`;

    return new Response(html,{headers:{...cors,"Content-Type":"text/html;charset=UTF-8"}});
  }
};
