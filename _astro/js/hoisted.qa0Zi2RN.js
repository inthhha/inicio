import{B as d}from"./base.CSLSMGXO.js";const i={baseTemplateHtml:"",currentEstablecimiento:"",previousEstablecimiento:"",informativos:[],establecimientos:[]},k=`${d}data/template.json`;function C(){const e=new Date,t=String(e.getDate()).padStart(2,"0"),n=String(e.getMonth()+1).padStart(2,"0");return`${t}/${n}/${e.getFullYear()}`}async function $(){return(await(await fetch(k)).json()).html.replace(/src="\/images\//g,`src="${d}images/`)}function S(e,t=""){let n=e.replace("FECHA",C());return t&&(n=B(n,t)),n}function B(e,t){return e.split("<strong>ESTABLECIMIENTO</strong>").join(`<strong>${t.toUpperCase()}</strong>`)}function N(e,t=""){const n=C(),r=t||"Establecimiento",o=e.sintomasAlarma.map(c=>`<li style="margin-bottom:6pt;"><strong>${c}</strong></li>`).join(`
`);return`
<p style="margin:0 0 20pt 0;">
  <img src="${d}images/logo-ssasur.webp" alt="Logo SSASUR" style="width:113px;height:auto;display:block;" />
</p>

<p style="text-align:center;font-size:16px;font-weight:bold;margin:0 0 40pt 0;line-height:1.4;">
  INFORMATIVO DE SÍNTOMAS Y SIGNOS DE ALARMA PARA RECONSULTA PRECOZ AL SERVICIO DE URGENCIA
</p>

<p style="margin:0 0 30pt 0;font-size:13px;">
  Usted o su familiar han sido diagnosticados con
  <strong>"${e.diagnostico}"</strong>.
  Sin embargo, es su deber reconsultar al servicio de urgencia más cercano en caso
  de presentar alguno de los siguientes síntomas o signos de alarma:
</p>

<ul style="margin:0 0 40pt 0;padding-left:22pt;font-size:13px;">
${o}
</ul>

<p style="margin:0 0 20pt 0;font-size:13px;">
  Médico que entrega información: _____________________________
</p>

<p style="margin:0 0 40pt 0;font-size:13px;">
  Fecha: ${n}
</p>

<p style="text-align:center;font-size:13px;color:#555;margin:0;">
  Servicio de Urgencia<br/>
  ${r}<br/>
  Servicio de Salud Araucanía Sur<br/>
  ${new Date().getFullYear()}
</p>
`.trim()}const z=`${d}hugerte/hugerte.min.js`,D=`${d}hugerte/lang/es.js`;function R(){const e=window.hugerte?.activeEditor;if(!e)return;const t=e.getBody().querySelector('[data-cert-date="today"]');t&&(t.textContent=C())}function O(e,t=""){const r=window.matchMedia("(prefers-color-scheme: dark)").matches?"inthhha-dark":"inthhha";window.tinymce=window.hugerte,window.hugerte.init({selector:"#certEditor",language:"es",language_url:D,height:640,menubar:!1,toolbar_sticky:!0,plugins:["lists","table","image","nonbreaking","pagebreak"],toolbar:"undo redo | styles fontfamily fontsize | bold italic underline | forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | table image | removeformat",font_family_formats:"Verdana=Verdana,Geneva,sans-serif;Arial=Arial,Helvetica,sans-serif;Times New Roman=Times New Roman,Times,serif;Courier New=Courier New,Courier,monospace;",font_size_formats:"8pt 9pt 10pt 10.5pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt",content_css:!1,content_style:'body { font-family: Verdana, Geneva, sans-serif; font-size: 9.5pt; color: #000; background: #fff; margin: 0; padding: 48px 46px 0; line-height: 1.55; box-sizing: border-box; width: 100%; min-height: 1056px; }*, *::before, *::after { box-sizing: inherit; }p { margin: 0; }img { max-width: 100%; display: block; }span[style*="inline-block"] { vertical-align: top; }',skin:r,setup:o=>{o.on("init",()=>{o.setContent(S(e,t))})},branding:!1,promotion:!1,resize:!1,statusbar:!1}),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{location.reload()})}function M(e){if(window.hugerte){e();return}const t=document.createElement("script");t.src=z,t.referrerPolicy="origin",t.onload=e,document.head.appendChild(t)}const P=`@page {
    size: Letter;
    margin: 0;
}

html,
body {
    margin: 0;
    padding: 0;
    background: white;
}

body {
    font-family: Verdana, Geneva, sans-serif;
    font-size: 9.5pt;
    color: #000;
    line-height: 1.55;
    box-sizing: border-box;
    width: 8.5in;
    min-height: 11in;
    padding: 48px 46px 0;
}

*,
*::before,
*::after {
    box-sizing: inherit;
}

p {
    margin: 0;
}

img {
    display: block;
    max-width: 100%;
}

span {
    vertical-align: top;
}
`;function j(){R();const e=window.hugerte?.activeEditor?.getContent()??"",t=document.createElement("iframe");t.style.cssText="position:fixed;top:-9999px;left:-9999px;width:8.5in;height:11in;border:none;",document.body.appendChild(t);const n=t.contentDocument??t.contentWindow.document;n.open(),n.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${P}</style></head><body>`),n.write(e),n.write("</body></html>"),n.close();let r=!1,o=null;function c(){r||(r=!0,o&&clearTimeout(o),t.contentWindow?.focus(),t.contentWindow?.print(),setTimeout(()=>{document.body.contains(t)&&document.body.removeChild(t)},2e3))}const a=n.images;if(!a||a.length===0)c();else{let m=function(){f++,f>=p&&c()},f=0;const p=a.length;for(let s=0;s<p;s++)a[s].complete?m():(a[s].addEventListener("load",m),a[s].addEventListener("error",m));o=setTimeout(c,1500)}}let y=null;function g(e,t=!1){const n=document.getElementById("notification");n&&(y&&clearTimeout(y),n.textContent=e,n.classList.toggle("error",t),n.classList.add("show"),y=setTimeout(()=>n.classList.remove("show"),2800))}function x(e,t,n,r,o,c,a,m=-1){const f=document.getElementById(e),p=document.getElementById(t),s=document.getElementById(n),b=document.getElementById(r),L=document.getElementById(o);function v(l=""){L.innerHTML="";const T=l.toLowerCase();c.forEach((w,E)=>{if(T&&!w.toLowerCase().includes(T))return;const u=document.createElement("li");u.className="cert-dropdown-item"+(E===m?" active":""),u.setAttribute("role","option"),u.setAttribute("data-index",String(E)),u.textContent=w,u.addEventListener("click",()=>{m=E,h(),a(w,E)}),L.appendChild(u)})}function A(){p.classList.add("open"),s.setAttribute("aria-expanded","true"),s.classList.add("open"),b.value="",v(),b.focus()}function h(){p.classList.remove("open"),s.setAttribute("aria-expanded","false"),s.classList.remove("open")}s.addEventListener("click",l=>{l.stopPropagation(),p.classList.contains("open")?h():A()}),b.addEventListener("input",()=>v(b.value)),document.addEventListener("click",l=>{f.contains(l.target)||h()}),f.addEventListener("keydown",l=>{l.key==="Escape"&&h()}),v()}const U=`${d}data/informativos.json`,I="cert_establecimiento";function _(){return window.hugerte?.activeEditor}function H(e,t,n){const r=n?`<strong>${n.toUpperCase()}</strong>`:"<strong>ESTABLECIMIENTO</strong>",o=`<strong>${t.toUpperCase()}</strong>`;return e.includes(r)?e.split(r).join(o):e.split("<strong>ESTABLECIMIENTO</strong>").join(o)}function F(){const e=document.getElementById("informativoLabel");x("informativoWrapper","informativoPanel","btnInformativo","informativoSearch","informativoList",i.informativos.map(t=>t.nombre),async(t,n)=>{const r=i.informativos[n];e.textContent=r.nombre;try{const o=r.archivo.startsWith("http")?r.archivo:`${d}${r.archivo.replace(/^\//,"")}`,a=await(await fetch(o)).json();_()?.setContent(N(a,i.currentEstablecimiento)),g(`Informativo cargado: ${a.diagnostico}`)}catch(o){console.error("[Certificados] informativo load:",o),g("Error al cargar el informativo",!0)}})}function G(){const e=document.getElementById("establecimientoLabel"),t=localStorage.getItem(I);t&&(i.currentEstablecimiento=t,i.previousEstablecimiento=t,e.textContent=t.length>30?t.substring(0,28)+"…":t),x("establecimientoWrapper","establecimientoPanel","btnEstablecimiento","establecimientoSearch","establecimientoList",i.establecimientos,n=>{const r=i.currentEstablecimiento;i.currentEstablecimiento=n,localStorage.setItem(I,n),e.textContent=n.length>30?n.substring(0,28)+"…":n;const o=_();o&&o.setContent(H(o.getContent(),n,r)),i.previousEstablecimiento=n,g(`Establecimiento: ${n}`)},t?i.establecimientos.indexOf(t):-1)}function V(){document.getElementById("btnReset")?.addEventListener("click",()=>{confirm("¿Restablecer el contenido predeterminado? Se perderán los cambios actuales.")&&(_()?.setContent(S(i.baseTemplateHtml,i.currentEstablecimiento)),i.previousEstablecimiento=i.currentEstablecimiento,document.getElementById("informativoLabel").textContent="Seleccionar Informativo",g("Contenido restablecido"))})}function W(){document.getElementById("btnPrint")?.addEventListener("click",()=>{j()})}async function Y(){try{const e=await fetch(U).then(t=>t.json());i.informativos=e.informativos??[],i.establecimientos=e.establecimientos??[],i.baseTemplateHtml=await $(),M(()=>{O(i.baseTemplateHtml,i.currentEstablecimiento)}),F(),G(),V(),W()}catch(e){console.error("[Certificados] boot error:",e),g("Error al inicializar la página",!0)}}Y();
