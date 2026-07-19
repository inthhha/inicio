import{B as d}from"./siteSearch.hFGzrQvB.js";import"./hoisted.BtpV81CR.js";const r={baseTemplateHtml:"",currentEstablecimiento:"",previousEstablecimiento:"",informativos:[],establecimientos:[]},$=`${d}data/template.json`;function L(){const e=new Date,t=String(e.getDate()).padStart(2,"0"),n=String(e.getMonth()+1).padStart(2,"0");return`${t}/${n}/${e.getFullYear()}`}async function B(){return(await(await fetch($)).json()).html.replace(/src="\/images\//g,`src="${d}images/`)}function S(e,t=""){let n=e.replace("FECHA",L());return t&&(n=N(n,t)),n}function N(e,t){return e.split("<strong>ESTABLECIMIENTO</strong>").join(`<strong>${t.toUpperCase()}</strong>`)}function x(e,t=""){const n=L(),i=t||"Establecimiento",o=e.sintomasAlarma.map(c=>`<li style="margin-bottom:6pt;"><strong>${c}</strong></li>`).join(`
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
  ${i}<br/>
  Servicio de Salud Araucanía Sur<br/>
  ${new Date().getFullYear()}
</p>
`.trim()}const R=`${d}hugerte/hugerte.min.js`,z=`${d}hugerte/lang/es.js`;function D(){const e=window.hugerte?.activeEditor;if(!e)return;const t=e.getBody().querySelector('[data-cert-date="today"]');t&&(t.textContent=L())}function U(e,t=""){const i=window.matchMedia("(prefers-color-scheme: dark)").matches?"inthhha-dark":"inthhha";window.tinymce=window.hugerte,window.hugerte.init({selector:"#certEditor",language:"es",language_url:z,height:640,menubar:!1,toolbar_sticky:!0,plugins:["lists","table","image","nonbreaking","pagebreak"],toolbar:"undo redo | styles fontfamily fontsize | bold italic underline | forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | table image | removeformat",font_family_formats:"Verdana=Verdana,Geneva,sans-serif;Arial=Arial,Helvetica,sans-serif;Times New Roman=Times New Roman,Times,serif;Courier New=Courier New,Courier,monospace;",font_size_formats:"8pt 9pt 10pt 10.5pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt",content_css:!1,content_style:'body { font-family: Verdana, Geneva, sans-serif; font-size: 9.5pt; color: #000; background: #fff; margin: 0; padding: 48px 46px 0; line-height: 1.55; box-sizing: border-box; width: 100%; min-height: 1056px; }*, *::before, *::after { box-sizing: inherit; }p { margin: 0; }img { max-width: 100%; display: block; }span[style*="inline-block"] { vertical-align: top; }',skin:i,setup:o=>{o.on("init",()=>{o.setContent(S(e,t))})},branding:!1,promotion:!1,resize:!1,statusbar:!1}),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{location.reload()})}function O(e){if(window.hugerte){e();return}const t=document.createElement("script");t.src=R,t.referrerPolicy="origin",t.onload=e,document.head.appendChild(t)}const P=`@page {
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
`;function j(){D();const e=window.hugerte?.activeEditor?.getContent()??"",t=document.createElement("iframe");t.style.cssText="position:fixed;top:-9999px;left:-9999px;width:8.5in;height:11in;border:none;",document.body.appendChild(t);const n=t.contentDocument??t.contentWindow.document;n.open(),n.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${P}</style></head><body>`),n.write(e),n.write("</body></html>"),n.close();let i=!1,o=null;function c(){i||(i=!0,o&&clearTimeout(o),t.contentWindow?.focus(),t.contentWindow?.print(),setTimeout(()=>{document.body.contains(t)&&document.body.removeChild(t)},2e3))}const a=n.images;if(!a||a.length===0)c();else{let m=function(){g++,g>=f&&c()},g=0;const f=a.length;for(let s=0;s<f;s++)a[s].complete?m():(a[s].addEventListener("load",m),a[s].addEventListener("error",m));o=setTimeout(c,1500)}}let C=null;function p(e,t=!1){const n=document.getElementById("notification");n&&(C&&clearTimeout(C),n.textContent=e,n.classList.toggle("error",t),n.classList.add("show"),C=setTimeout(()=>n.classList.remove("show"),2800))}function A(e,t,n,i,o,c,a,m=-1){const g=document.getElementById(e),f=document.getElementById(t),s=document.getElementById(n),b=document.getElementById(i),_=document.getElementById(o);function w(l=""){_.innerHTML="";const I=l.toLowerCase();c.forEach((y,E)=>{if(I&&!y.toLowerCase().includes(I))return;const u=document.createElement("li");u.className="cert-dropdown-item"+(E===m?" active":""),u.setAttribute("role","option"),u.setAttribute("data-index",String(E)),u.textContent=y,u.addEventListener("click",()=>{m=E,h(),a(y,E)}),_.appendChild(u)})}function k(){f.classList.add("open"),s.setAttribute("aria-expanded","true"),s.classList.add("open"),b.value="",w(),b.focus()}function h(){f.classList.remove("open"),s.setAttribute("aria-expanded","false"),s.classList.remove("open")}s.addEventListener("click",l=>{l.stopPropagation(),f.classList.contains("open")?h():k()}),b.addEventListener("input",()=>w(b.value)),document.addEventListener("click",l=>{g.contains(l.target)||h()}),g.addEventListener("keydown",l=>{l.key==="Escape"&&h()}),w()}const M=`${d}data/informativos.json`,T="cert_establecimiento";function v(){return window.hugerte?.activeEditor}async function H(){const e=new URLSearchParams(location.search).get("informativo");if(!e)return;const t=r.informativos.find(i=>i.id===e);if(!t)return;const n=document.getElementById("informativoLabel");n&&(n.textContent=t.nombre);try{const o=await(await fetch(t.archivo)).json();v()?.setContent(x(o,r.currentEstablecimiento)),p(`Informativo cargado: ${o.diagnostico}`)}catch(i){console.error("[Certificados] preload URL informativo:",i)}}function F(e,t,n){const i=n?`<strong>${n.toUpperCase()}</strong>`:"<strong>ESTABLECIMIENTO</strong>",o=`<strong>${t.toUpperCase()}</strong>`;return e.includes(i)?e.split(i).join(o):e.split("<strong>ESTABLECIMIENTO</strong>").join(o)}function G(){const e=document.getElementById("informativoLabel");A("informativoWrapper","informativoPanel","btnInformativo","informativoSearch","informativoList",r.informativos.map(t=>t.nombre),async(t,n)=>{const i=r.informativos[n];e.textContent=i.nombre;try{const o=i.archivo.startsWith("http")?i.archivo:`${d}${i.archivo.replace(/^\//,"")}`,a=await(await fetch(o)).json();v()?.setContent(x(a,r.currentEstablecimiento)),p(`Informativo cargado: ${a.diagnostico}`)}catch(o){console.error("[Certificados] informativo load:",o),p("Error al cargar el informativo",!0)}})}function V(){const e=document.getElementById("establecimientoLabel"),t=localStorage.getItem(T);t&&(r.currentEstablecimiento=t,r.previousEstablecimiento=t,e.textContent=t.length>30?t.substring(0,28)+"…":t),A("establecimientoWrapper","establecimientoPanel","btnEstablecimiento","establecimientoSearch","establecimientoList",r.establecimientos,n=>{const i=r.currentEstablecimiento;r.currentEstablecimiento=n,localStorage.setItem(T,n),e.textContent=n.length>30?n.substring(0,28)+"…":n;const o=v();o&&o.setContent(F(o.getContent(),n,i)),r.previousEstablecimiento=n,p(`Establecimiento: ${n}`)},t?r.establecimientos.indexOf(t):-1)}function W(){document.getElementById("btnReset")?.addEventListener("click",()=>{confirm("¿Restablecer el contenido predeterminado? Se perderán los cambios actuales.")&&(v()?.setContent(S(r.baseTemplateHtml,r.currentEstablecimiento)),r.previousEstablecimiento=r.currentEstablecimiento,document.getElementById("informativoLabel").textContent="Seleccionar Informativo",p("Contenido restablecido"))})}function Y(){document.getElementById("btnPrint")?.addEventListener("click",()=>{j()})}async function q(){try{const e=await fetch(M).then(t=>t.json());r.informativos=e.informativos??[],r.establecimientos=e.establecimientos??[],r.baseTemplateHtml=await B(),O(()=>{U(r.baseTemplateHtml,r.currentEstablecimiento),setTimeout(H,500)}),G(),V(),W(),Y()}catch(e){console.error("[Certificados] boot error:",e),p("Error al inicializar la página",!0)}}q();
