import{i as s}from"./hoisted.Cq92yYTu.js";import{B as o}from"./siteSearch.hFGzrQvB.js";async function c(){const i=document.getElementById("additional-resources-grid"),n=document.getElementById("links-panel-container");if(!i&&!n)return;let e,r;try{const a=await fetch(`${o}data/additional-resources.json`);if(!a.ok)throw new Error(`HTTP ${a.status}`);const t=await a.json();e=t.additionalResourcesData,r=t.linksPanelData}catch(a){console.error("additional-resources fetch:",a);return}i&&(i.innerHTML=e.map(a=>{const t=a.img.startsWith("http")?a.img:`${o}${a.img.replace(/^\//,"")}`;return`
      <a data-url="${a.href}" data-tab="true" class="info-card">
        <div class="info-card-icon"><img loading="lazy" src="${t}" alt="${a.alt}"></div>
        <div>${a.label}</div>
      </a>`}).join("")),n&&(n.innerHTML=r.map(a=>`
      <div class="link-col">
        <h4>${a.title}</h4>
        <ul>
          ${a.links.map(t=>`<li><a data-url="${t.href}" data-tab="true">${t.label}</a></li>`).join("")}
        </ul>
      </div>`).join("")),s()}export{c as initAdditionalResources};
