// =========================================
// 1. Configuración y Datos (Origen: content.js)
// =========================================

// Cache de iconos locales (Rutas actualizadas para web relativa a la raíz)
const localIcons = {};
[
  'hhha', 'ssasur', 'lab', 'test', 'synapse', 'ray', 'pathient', 'onco', 
  'sangre', 'inthhha', 'otros', 'firma', 'bacteria', 'urgencia', 'tmt', 
  'farmaco', 'embarazo', 'phone'
].forEach(icon => {
  // NOTA: En web, las rutas son relativas a la carpeta de imágenes
  localIcons[icon] = `images/${icon}.png`;
});

// Estructura de menús (Datos originales)
const menuStructure = [
  { icon: '🏥', iconKey: 'hhha', text: 'HIS HHHA', url: 'http://10.6.84.181/login' },
  { icon: '🔐', iconKey: 'ssasur', text: 'SSASUR', url: 'https://login.ssasur.cl/' },
  { icon: '🧪', iconKey: 'lab', text: 'Laboratorio Clínico', url: 'https://labsiel.araucaniasur.cl/' },
  { icon: '📄', iconKey: 'test', text: 'Extractor de Exámenes', url: 'https://notionmedufro.github.io/ExtractorHIS/' },
  { icon: '💻', iconKey: 'synapse', text: 'Synapse', url: 'https://synapsetmc.synapsetimed.cl/SynapseSignOn/sts/login?signin=14a58d1722d1162a247c17de113ea731' },
  { icon: '📷', iconKey: 'ray', text: 'Ovijam', url: 'http://10.7.200.101:8080/oviyam2/' },
  { icon: '🔬', iconKey: 'pathient', text: 'Pathient', url: 'http://10.6.84.155/Pathient/' },
  { icon: '🎗️', iconKey: 'onco', text: 'Cómite Oncológico', url: 'https://sistemas.hhha.cl/#/login' },
  { icon: '🩸', iconKey: 'sangre', text: 'Banco de Sangre', url: 'http://10.6.84.191/proyectos/consultaBancoSangre/' },
];

// =========================================
// 2. Funciones Auxiliares (Origen: content.js)
// =========================================

const createIcon = (icon, iconKey, isSubmenu = false) => {
  const container = document.createElement('div');
  container.className = isSubmenu ? 'submenu-item-icon-hhha' : 'sidebar-item-icon-hhha';
  
  // Verifica si existe el icono en el mapa localIcons
  if (iconKey && localIcons[iconKey]) {
    const img = new Image();
    img.src = localIcons[iconKey]; // Usa la ruta relativa definida arriba
    img.alt = icon; // Usa el emoji como alt text por accesibilidad
    
    // Manejo de errores y carga
    img.onerror = () => {
      container.textContent = icon; // Fallback al emoji si falla la imagen
      container.classList.remove('icon-loading');
    };
    img.onload = () => container.classList.remove('icon-loading');
    
    container.classList.add('icon-loading');
    container.appendChild(img);
  } else {
    container.textContent = icon;
  }
  
  return container;
};

// =========================================
// 3. Lógica Principal de Renderizado (Adaptada para Web)
// =========================================

function renderMenu() {
  const menuContainer = document.getElementById('menu-container');
  if (!menuContainer) return;

  // Limpiar contenedor por si acaso
  menuContainer.innerHTML = '';
  
  // Generar menús iterando sobre la estructura
  menuStructure.forEach(item => {
    if (item.separator) {
      // Renderizar separador
      const separator = document.createElement('div');
      separator.className = 'separator-hhha with-text';
      separator.innerHTML = `<div class="separator-text-hhha">${item.separator}</div>`;
      menuContainer.appendChild(separator);

    } else if (item.submenu) {
      // Renderizar ítem con submenú
      const mainItem = document.createElement('div');
      mainItem.className = 'sidebar-item-hhha has-submenu';
      
      // Crear texto
      const textDiv = document.createElement('div');
      textDiv.className = 'sidebar-item-text-hhha';
      textDiv.textContent = item.text;

      mainItem.append(createIcon(item.icon, item.iconKey), textDiv);
      
      // Contenedor del submenú
      const submenu = document.createElement('div');
      submenu.className = 'submenu-hhha';
      
      // Generar ítems del submenú
      item.submenu.forEach(subItem => {
        // Usamos <a> para los subitems para mejor semántica web
        const submenuItem = document.createElement('a');
        submenuItem.className = 'submenu-item-hhha';
        // Si tiene URL, se asigna a href, si no, '#'
        submenuItem.href = subItem.url ? subItem.url : '#';
        // Abrir en nueva pestaña si es un enlace externo
        if (subItem.url) submenuItem.target = '_blank';

        const subTextDiv = document.createElement('div');
        subTextDiv.className = 'submenu-item-text-hhha';
        subTextDiv.textContent = subItem.text;

        submenuItem.append(
          createIcon(subItem.icon, subItem.iconKey, true),
          subTextDiv
        );
        
        submenu.appendChild(submenuItem);
      });
      
      // Event listener para abrir/cerrar el submenú (acordeón)
      mainItem.addEventListener('click', (e) => {
        e.preventDefault();
        // Cierra otros menús abiertos (opcional, comportamiento de acordeón exclusivo)
        document.querySelectorAll('.submenu-hhha.open, .sidebar-item-hhha.open').forEach(el => {
          if (el !== submenu && el !== mainItem) {
            el.classList.remove('open');
          }
        });
        submenu.classList.toggle('open');
        mainItem.classList.toggle('open');
      });
      
      menuContainer.append(mainItem, submenu);

    } else {
      // Renderizar ítem simple (enlace directo)
      // Usamos <a> para ítems simples también
      const mainItem = document.createElement('a');
      mainItem.className = 'sidebar-item-hhha';
      mainItem.href = item.url ? item.url : '#';
      if (item.url) mainItem.target = '_blank';

      const textDiv = document.createElement('div');
      textDiv.className = 'sidebar-item-text-hhha';
      textDiv.textContent = item.text;

      mainItem.append(
        createIcon(item.icon, item.iconKey),
        textDiv
      );
      
      menuContainer.appendChild(mainItem);
    }
  });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', renderMenu);

/* =========================================
   4. Lógica del Mega Menú (Integración Toolbar)
   ========================================= */

const megaStructure = [
    {
      id: 'gestión-clínica',
      icon: '🏥',
      img: 'images/inthhha.png',
      text: 'Gestión Clínica',
      sections: [
        {
          title: 'Accesos Araucanía Sur',
          icon: '🏥',
          img: 'images/ssas.webp',
          items: [
            { icon: '🏥', img: 'images/hhha.png', text: 'HIS HHHA', url: 'http://10.6.84.181/login', desc: 'Acceso plataforma registro médico HHHA' },
            { icon: '🏥', img: 'images/ssasur.png', text: 'SSASUR', url: 'https://login.ssasur.cl/login', desc: 'Acceso plataforma registro médico Araucanía Sur' },
            { icon: '🏥', img: 'images/ficha.png', text: 'Ficha Clínica', url: 'https://sites.google.com/view/fichadigital', desc: 'Plataforma soporte y recursos HHHA' },
            { icon: '🏥', img: 'images/redcap.png', text: 'RedCap HHHA', url: 'https://redcap.hhha.cl/redcap_v14.0.32/DataEntry/record_status_dashboard.php?pid=18', desc: 'Creación y gestión de instrumentos/encuestas en línea' },
            { icon: '🏥', img: 'images/atrys.png', text: 'Atrys', url: 'https://ris.chile.telemedicina.com/', desc: 'Informes radiológicos en línea' },
            { icon: '🏥', img: 'images/protocolos.png',text: 'Protocolo', url: 'http://10.68.111.30/', desc: 'Acceso a Protocolos HHHA' }
          ]
        },
        {
          title: 'Accesos Araucanía Norte',
          icon: '🛠️',
          img: 'images/sanorte.png',
          items: [
            { icon: '🏥', img: 'images/sanorte.png', text: 'Portal SANORTE', url: 'https://saludnorte.ssmn.cl/', desc: 'Portal principal de servicios en línea Araucanía Norte' },
            { icon: '🏥', img: 'images/sanorte.png', text: 'SIDRA', url: 'https://www.ssanorte.cl/sidra/', desc: 'Acceso plataforma registro médico Araucanía Norte' },
            { icon: '🏥', img: 'images/esissan.png', text: 'ESISSAN', url: 'https://www.esissan.cl/inicio', desc: 'Acceso nueva plataforma registro médico Araucanía Norte' }
          ]
        }
      ]
    },

    {
      id: 'Laboratorio',
      icon: '🏥',
      img: 'images/lab.png',
      text: 'Laboratorio',
      sections: [
        {
          title: 'Laboratorio',
          icon: '🏥',
          img: 'images/lab.png',
          items: [
            { icon: '🏥', img: 'images/lab.png', text: 'Laboratorio Clínico', url: 'https://labsiel.araucaniasur.cl/', desc: 'Plataforma sobre requisitos técnicos y valores de muestras de laboratorio' },
          ]
        },
        {
          title: 'Banco de Sangre',
          icon: '🛠️',
           img: 'images/sangre.png',
          items: [
            { icon: '🏥', img: 'images/sangre.png', text: 'Banco de Sangre', url: 'http://10.6.84.191/proyectos/consultaBancoSangre/', desc: 'Búsqueda de Grupo sanguíneo y factor Rh' }
          ]
        },
       {
          title: 'Anatomopatología',
          icon: '🛠️',
          img: 'images/pathient.png',
          items: [
            { icon: '🏥', img: 'images/pathient.png', text: 'Pathient', url: 'http://10.6.84.155/Pathient/', desc: 'Resultados de biopsias y pieza quirúrgica' }
          ]
        } 
      ]
    },

    {
      id: 'Imagenología',
      icon: '🏥',
      img: 'images/ray.png',
      text: 'Imagenología',
      sections: [
        {
          title: 'Synapse/Ovijam',
          icon: '🏥',
          img: 'images/ray.png',
          items: [
            { icon: '🏥', img: 'images/synapse.png', text: 'Synapse HHHA', url: 'https://synapsetmc.synapsetimed.cl/SynapseSignOn/sts/login?signin=14a58d1722d1162a247c17de113ea731', desc: 'Plataforma de imágenes principal de HHHA' },
            { icon: '🏥', img: 'images/ray.png', text: 'Ovijam HHHA', url: 'http://pacs.ssasur.cl:8080/oviyam2/', desc: 'Servidor HHHA' },
            { icon: '🏥', img: 'images/ray.png', text: 'Ovijam SSAS', url: 'http://10.7.200.101:8080/oviyam2/', desc: 'Servidor Araucanía Sur' },
            { icon: '🏥', img: 'images/ray.png', text: 'Ovijam HINI', url: 'http://10.4.37.214:8080/ovijam2/', desc: 'Servidor HINI' },
            { icon: '🏥', img: 'images/ray.png', text: 'Ovijam Pitrufquen', url: 'http://10.4.191.21:8080/oviyam2/', desc: 'Servidor Pitrufquen' },
            { icon: '🏥', img: 'images/ray.png', text: 'Ovijam Villarrica', url: 'http://10.63.76.121:8080/oviyam2/', desc: 'Servidor Villarrica' }
          ]
        },
        {
          title: 'Medicap',
          icon: '🏥',
          img: 'images/urgencia.png',
          items: [
            { icon: '🏥', img: 'images/urgencia.png', text: 'Medicap-HHHA', url: 'http://10.6.84.204/medicap-hhha/login', desc: 'Estudios imagenológicos HHHA' },
            { icon: '🏥', img: 'images/urgencia.png', text: 'Medicap-SANORTE', url: 'http://10.5.144.154/medicap-victoria/login', desc: 'Servidor de Imágenes Araucanía Norte' },
            { icon: '🏥', img: 'images/urgencia.png', text: 'Medicap-Angol', url: 'http://10.68.159.47/login', desc: 'Servidor de Imágenes Hospital de Angol' }
          ]
        },
        {
          title: 'Otros recursos',
          icon: '🏥',
          img: 'images/ray.png',
          items: [
            { icon: '🏥', img: 'images/ray.png', text: 'Dalca Pucón', url: 'https://app.dalca.cl/login', desc: 'Servidor Pucón' },
            { icon: '🏥', img: 'images/ray.png', text: 'Soran Villarrica', url: 'https://soran.irad.cl/RISTR/Default.aspx', desc: 'Servidor Villarrica' },
            { icon: '🏥', img: 'images/ray.png', text: 'Zero Footprint Pucón', url: 'https://visualizador.hospitalsanfranciscodepucon.cl/zfp', desc: 'Servidor Pucón' },
            { icon: '🏥', img: 'images/ray.png', text: 'Ribik Pitrufquén', url: 'https://imalab.ribik.cl/login', desc: 'Servidor Pitrufquen' }
          ]
        }
      ]
    },
    {
      id: 'Urgencias',
      icon: '🏥',
      img: 'images/urgencia.png',
      text: 'Urgencias',
      sections: [
        {
          title: 'Urgencias',
          icon: '🏥',
          img: 'images/urgencia.png',
          items: [
            { icon: '🏥', img: 'images/urgencia.png', text: 'MDU HHHA', url: 'https://sites.google.com/view/becaurgenciaufro', desc: 'Páginas becados medicina de urgencia' },
            { icon: '🏥', img: 'images/tmt.png', text: 'Traumato HHHA', url: 'https://sites.google.com/view/becadosufro/p%C3%A1gina-principal', desc: 'Páginas becados traumatología' },
            { icon: '🏥', img: 'images/urgencia.png', text: 'Entrega SUA HHHA', url: 'https://docs.google.com/spreadsheets/d/1l7C4mnwA4B957BMPo227QONF1bVWZbml/edit?pli=1&gid=2078745477#gid=2078745477', desc: 'Hoja de entrega de turno SUA' },
            { icon: '🏥', img: 'images/ray.png', text: 'Informe Radiografía de Urgencias', url: 'https://redcap.hhha.cl/surveys/?s=47PKX3FFWELPATAX', desc: 'Informes radiológicos de urgencia HHHA' }
          ]
        },
        {
          title: 'Contactos',
          icon: '🛠️',
          img: 'images/cellphone.png',
          items: [
            { icon: '🏥', img: 'images/urgencia.png', text: 'Anexos Telefónicos HHHA', url: 'files/telefonos-sua-hhha.pdf', desc: 'Teléfonos de Anexos Urgencias HHHA' },
            { icon: '🏥', img: 'images/ssasur.png', text: 'Teléfonos Bases Araucanía Sur', url: 'https://docs.google.com/spreadsheets/d/1CMCC9hVr_NS-mNYYBrZ_-FlyoLPdm-UW/edit?usp=sharing&ouid=111979837070725857764&rtpof=true&sd=true', desc: 'Planilla Excel con anexos telefónicos de la IX Región' },
          ]
        }
      ]
    },
    
    {
      id: 'Farmacología',
      icon: '🏥',
      img: 'images/farmaco.png',
      text: 'Farmacología',
      sections: [
        {
          title: 'Guías/Manuales',
          icon: '🏥',
          img: 'images/farmaco.png',
          items: [
            { icon: '🏥', img: 'images/farmaco.png', text: 'Arsenal Farmacológico Redes', url: 'files/Arsenal-farmacologico-APS-HBC-SSANORTE-2021.pdf', desc: 'Arsenal de fármacos disponibles en atención primaria, secundaria y terciaria' },
            { icon: '🏥', img: 'images/farmacos-ev.png', text: 'Manual de Fármacos HHHA', url: 'https://www.hhha.cl/wp-content/uploads/2022/05/MANUAL_DE_FARMACOS_INYECTABLES_01_VERSION_WEB.pdf', desc: 'Manual fármacos inyectables HHHA' },
            { icon: '🏥', img: 'images/embarazo.png', text: 'Fármacos en el Embarazo', url: 'https://www.araucaniasur.cl/wp-content/uploads/2023/01/GUIA-8-MEDICAMENTOS-EN-EMBARAZO-OK.pdf', desc: 'Recomendaciones farmacológicas en el Embarazo SSASUR' },
            { icon: '🏥', img: 'images/farmaco.png', text: 'Manual Fármacos Enfermeria UFRO', url: 'https://farmacosinyectable.wixsite.com/website', desc: 'Plataforma creada por Interna de Enfermeria UFRO' }
          ]
        },
        {
          title: 'Plataformas Web',
          icon: '🛠️',
          img: 'images/web.png',
          items: [
            { icon: '🏥', img: 'images/idoctus.png', text: 'iDoctus', url: 'https://idoctus.com/', desc: 'Plataforma de dosificación y RAMs de fármacos' },
            { icon: '🏥', img: 'images/drugsbank.png', text: 'Drugs Bank', url: 'https://go.drugbank.com/drugs', desc: 'Especificaciones bioquímicas de fármacos' },
            { icon: '🏥', img: 'images/vademecum.png', text: 'ICQ', url: 'https://www.iqb.es/cbasicas/farma/farma04/indicea.htm', desc: 'Catálogo de medicamentos Vademecum' },
            { icon: '🏥', img: 'images/fco-medscape.png', text: 'Interacciones Farmacológicas', url: 'https://reference.medscape.com/drug-interactionchecker', desc: 'Interacciones farmacológicas de Medscape' }
          ]
        }
      ]
    },


    {
      id: 'Antibióticos',
      icon: '🏥',
      img: 'images/bacteria.png',
      text: 'Antibióticos',
      sections: [
        {
          title: 'Antibióticos',
          icon: '🏥',
          img: 'images/bacteria.png',
          items: [
            { icon: '🏥', img: 'images/medicamento.webp', text: 'Arsenal de Antibióticos', url: 'files/ATB-EV.pdf', desc: 'Familias de ATB y espectros que cubren' },
            { icon: '🏥', img: 'images/hhha.png', text: 'Manual Antibióticos HHHA', url: 'files/GUIA_ATB_HHHA_DIC_2024_OCR.pdf', desc: 'Guía específica del HHHA' },
            { icon: '🏥', img: 'images/bacteria.png', text: 'Espectros Antibióticos', url: 'files/Espectros-ATB-2022.pdf', desc: 'Susceptibilidad de ATB según bacteria específica' }
          ]
        },
        {
          title: 'Recursos Web',
          icon: '🛠️',
          img: 'images/web.png',
          items: [
            { icon: '🏥', img: 'images/oms.png', text: 'Aware OMS', url: 'https://iris.who.int/server/api/core/bitstreams/a1e1742d-0875-4d77-8595-4ac4ec3945c8/content', desc: 'Manual uso racional de ATB OMS' },
            { icon: '🏥', img: 'images/ssasur.png', text: 'PROA HV', url: 'https://proa-hospital-villarrica.webnode.cl/', desc: 'Programa de Optimización del Uso de Antimicrobianos Hospital Villarrica' },
            { icon: '🏥', img: 'images/ssasur.png', text: 'PROA HBLT', url: 'https://www.hospitalbarrosluco.gob.cl/programa-de-optimizacion-de-antimicrobianos-proa/', desc: 'Programa de Optimización del Uso de Antimicrobianos Hospital Barros Luco' }
          ]
        }
      ]
    },

    {
      id: 'Herramientas',
      icon: '🏥',
      img: 'images/herramientas.png',
      text: 'Herramientas',
      sections: [
        {
          title: 'Recursos',
          icon: '🏥',
          img: 'images/herramientas.png',
          items: [
            { icon: '🏥', img: 'images/phone.png', text: 'Anexos HHHA', url: '', desc: 'Líneas de Teléfonos HHHA' },
            { icon: '🏥', img: 'images/cirugia.webp', text: 'IA Cirugía', url: 'https://notebooklm.google.com/notebook/9b90ed17-9d13-44c1-b92a-675f0d5ecce2', desc: 'NotebookLM elaborado con Material de la Carrera sobre Cirugía' },
            { icon: '🏥', img: 'images/gyo.webp', text: 'IA Gineco-obstetricia', url: 'https://notebooklm.google.com/notebook/21bee4f0-83d3-4c04-b514-bf40bb7aef06', desc: 'NotebookLM elaborado con Material de la Carrera sobre Gineco-obstetricia' },
            { icon: '🏥', img: 'images/medint.webp', text: 'IA Medicina Interna', url: 'https://notebooklm.google.com/notebook/3ffd6eff-8b19-4742-ac97-c0468a80d6e7', desc: 'NotebookLM elaborado con Material de la Carrera sobre Medicina Interna' },
            { icon: '🏥', img: 'images/ped.webp', text: 'IA Pediatría', url: 'https://notebooklm.google.com/notebook/35f1d53b-8ce4-418b-949d-fffdf65b3a5e', desc: 'NotebookLM elaborado con Material de la Carrera sobre Pediatría' },
            { icon: '🏥', img: 'images/bacteria.png', text: 'IA Infectología', url: 'https://notebooklm.google.com/notebook/3e304c9b-0530-445c-82cb-151b49fb87db', desc: 'NotebookLM elaborado con Material de la Carrera sobre Infectología' }
          ]
        },
        {
          title: 'Software',
          icon: '🏥',
          img: 'images/software.png',
          items: [
            { icon: '🏥', img: 'images/accesos-clinicos.png', text: 'Extensión Accesos Clínicos', url: 'accesos-clinicos.html', desc: 'Extensión de navegadores para accesos a servicios clínicos Araucanía Sur' },
            { icon: '🏥', img: 'images/test.png', text: 'Extractor de Exámenes', url: 'https://notionmedufro.github.io/ExtractorHIS/', desc: 'Extractor de resultados de exámenes generales' },
            { icon: '🏥', img: 'images/psiphon.png', text: 'Psiphon', url: 'https://drive.google.com/drive/folders/1SeqFDJmYBIvV6SCfcLPskAdEeIkWrI-1?usp=sharing', desc: 'VPN gratuita' },
            { icon: '🏥', img: 'images/wps.png', text: 'WPS Office', url: 'https://es.wps.com/', desc: 'Ofimática China gratuita' }
          ]
        },
        {
          title: 'Páginas Web',
          icon: '🛠️',
          img: 'images/page-web.png',
          items: [
            { icon: '🏥', img: 'images/mdcalc.png', text: 'MDCalc', url: 'https://www.mdcalc.com/', desc: 'Calculadora de scores clínicos' },
            { icon: '🏥', img: 'images/wikem.png', text: 'WiKEM', url: 'https://wikem.org/wiki/Main_Page', desc: 'Plataforma de medicina de urgencias' },
            { icon: '🏥', img: 'images/cancer.png', text: 'Oncología Chile', url: 'https://chileoncologia.cl/', desc: 'Resumen de patologías oncológicas según las últimas guías internacionales' },
            { icon: '🏥', img: 'images/cie-10.png', text: 'CIE-10', url: 'https://mediately.co/es/icd', desc: 'Listado de patologías CIE-10' }
          ]
        }
      ]
    }
    
];

function initToolbarMenu() {
    const toolbarRoot = document.getElementById('toolbar-menu-root');
    const headerContainer = document.querySelector('.main-header-container'); 
    
    if (!toolbarRoot || !headerContainer) return;

    // Limpieza
    toolbarRoot.innerHTML = '';
    const existingPanel = document.querySelector('.megamenu-panel');
    if(existingPanel) existingPanel.remove();
    const existingOverlay = document.querySelector('.megamenu-overlay');
    if(existingOverlay) existingOverlay.remove();

    // Crear elementos base
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'toolbar-tabs-container';

    const panel = document.createElement('div');
    panel.className = 'megamenu-panel';
    panel.innerHTML = '<div class="megamenu-content"></div>';
    headerContainer.appendChild(panel);

    const overlay = document.createElement('div');
    overlay.className = 'megamenu-overlay';
    document.body.appendChild(overlay);

    let activeTabId = null;

    // --- NUEVA FUNCIÓN HELPER PARA ICONOS ---
    const renderIcon = (obj) => {
        // Si tiene propiedad 'img', renderiza la imagen, si no, el emoji
        if (obj.img) {
            return `<img src="${obj.img}" alt="icon" class="mega-custom-icon">`;
        }
        return obj.icon || ''; 
    };
    // ----------------------------------------

    const closePanel = () => {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelectorAll('.megamenu-tab').forEach(t => t.classList.remove('active'));
        activeTabId = null;
    };

    const openPanel = (tabData) => {
        const contentContainer = panel.querySelector('.megamenu-content');
        contentContainer.innerHTML = ''; 

        tabData.sections.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'megamenu-section';
            
            // Header con Icono (Usando renderIcon)
            const header = document.createElement('div');
            header.className = 'megamenu-section-header';
            header.innerHTML = `<span>${renderIcon(section)}</span> ${section.title}`;
            
            const itemsDiv = document.createElement('div');
            itemsDiv.className = 'megamenu-items';
            
            section.items.forEach(item => {
                const link = document.createElement('a');
                link.className = 'megamenu-item';
                link.href = item.url && item.url !== '#' ? item.url : 'javascript:void(0)';
                
                if (item.url && item.url !== '#' && !item.url.startsWith('javascript')) {
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                }
                
                // AQUÍ SE APLICA EL CAMBIO PRINCIPAL PARA LOS ITEMS
                link.innerHTML = `
                    <div class="megamenu-item-icon">${renderIcon(item)}</div>
                    <div class="megamenu-item-content">
                        <span class="megamenu-item-title">${item.text}</span>
                        <span class="megamenu-item-desc">${item.desc}</span>
                    </div>
                `;

                link.addEventListener('click', () => {
                   setTimeout(closePanel, 150);
                });

                itemsDiv.appendChild(link);
            });

            sectionDiv.appendChild(header);
            sectionDiv.appendChild(itemsDiv);
            contentContainer.appendChild(sectionDiv);
        });

        requestAnimationFrame(() => {
            panel.classList.add('active');
            overlay.classList.add('active');
        });
    };

    // Generar Pestañas
    megaStructure.forEach(tab => {
        const tabBtn = document.createElement('div');
        tabBtn.className = 'megamenu-tab';
        // Usamos renderIcon también en las pestañas
        tabBtn.innerHTML = `<span>${renderIcon(tab)}</span> ${tab.text}`;
        
        tabBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeTabId === tab.id) {
                closePanel();
                return;
            }
            document.querySelectorAll('.megamenu-tab').forEach(t => t.classList.remove('active'));
            tabBtn.classList.add('active');
            activeTabId = tab.id;
            openPanel(tab);
        });

        tabsContainer.appendChild(tabBtn);
    });

    toolbarRoot.appendChild(tabsContainer);

    overlay.addEventListener('click', closePanel);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePanel();
    });
}

// Inicializar cuando el DOM esté listo (puedes agregarlo a tu listener existente)
document.addEventListener('DOMContentLoaded', () => {
    // ... tu código existente ...
    initToolbarMenu();
});

/* =========================================
   5. Lógica del Repositorio/Banner (Filtros)
   ========================================= */

// BASE DE DATOS SIMULADA (Aquí cargarías tus JSON reales)
const resourcesDB = [
    // --- CIRUGÍA ---
    { id: 1, category: 'cirugia', title: 'Resumenes Cirugía', type: 'apunte', year: '2023', url: 'https://drive.google.com/file/d/1lzDN-092h3zXMzd4iTSJWoNPoFJwu2wP/view?usp=drive_link', format: 'pdf' },
    { id: 2, category: 'cirugia', title: 'Resumenes Cirugia Kika', type: 'apunte', year: '2020', url: 'https://drive.google.com/file/d/1c6U_L20f35Q7Sox5r57e1fmZjcfbpfZN/view?usp=drive_link', format: 'pdf' },
    { id: 3, category: 'cirugia', title: 'Resumen Salvador Cirugía ROA', type: 'apunte', year: '2018', url: 'https://drive.google.com/file/d/1PxzJZ2jZ3XKJhdM60f3fa1WOCnDKt0ap/view?usp=drive_link', format: 'pdf' },
    { id: 4, category: 'cirugia', title: 'Resumen Cirugia PUC+Chile', type: 'apunte', year: '2021', url: 'https://drive.google.com/file/d/1Q2nQ5k-ecQnC1VV8KhzYGbUykxQCX6wu/view?usp=sharing', format: 'pdf' },
    { id: 5, category: 'cirugia', title: 'Manual Cirugía UChile', type: 'manual', year: '2021', url: 'https://drive.google.com/file/d/1_FVIY-VqBmsd5sUpF16d0msX7ugBofjS/view?usp=sharing', format: 'pdf' },
    { id: 6, category: 'cirugia', title: 'Manual Cirugía PUC', type: 'manual', year: '2014', url: 'https://drive.google.com/file/d/1pNik7aOPIRaSeSUxst1QGvShYQAYbPWX/view?usp=drive_link', format: 'pdf' },
    { id: 7, category: 'cirugia', title: 'Manual Cirugía UAndes', type: 'manual', year: '2016', url: 'https://drive.google.com/file/d/10xUmDBwFKsebdX0GRNLlsc1FyTZFhdvF/view?usp=drive_link', format: 'pdf' },
    { id: 8, category: 'cirugia', title: 'Tratado Sabiston 21° Edición', type: 'libro', year: '2022', url: 'https://drive.google.com/file/d/1dDY6segmQeI5_FydEt3d3B4k5260gqT_/view?usp=drive_link', format: 'pdf' },
    { id: 9, category: 'cirugia', title: 'Cirugía Cabeza y Cuello - Becados', type: 'becados', year: 'antiguo', url: 'https://drive.google.com/file/d/1VG-Nu2h1tnTZlWLGRMfAuCOblcIjY_EK/view?usp=drive_link', format: 'pdf' },
    { id: 10, category: 'cirugia', title: 'Cirugía Coloproctologia - Becados', type: 'becados', year: 'antiguo', url: 'https://drive.google.com/file/d/1dY_fVtNCuRtA1_s3oLoQgTHPZ4EeXTTA/view?usp=drive_link', format: 'pdf' },
    { id: 11, category: 'cirugia', title: 'Cirugía Digestivo - Becados', type: 'becados', year: 'antiguo', url: 'https://drive.google.com/file/d/1Hi6bzkuyPiR75JgE4mdTrUn113YcSXPK/view?usp=drive_link', format: 'pdf' },
    { id: 12, category: 'cirugia', title: 'Cirugía Hepatobiliopancreas - Becados', type: 'becados', year: 'antiguo', url: 'https://drive.google.com/file/d/1G5lDQAiXvpKui2vX64KOeRkfGRn35Elb/view?usp=drive_link', format: 'pdf' },
    { id: 13, category: 'cirugia', title: 'Cirugía Plástica - Becados', type: 'becados', year: 'antiguo', url: 'https://drive.google.com/file/d/1vR9m3SaqBV8yqBqXIB5joXXxbb5N6B9y/view?usp=drive_link', format: 'pdf' },
    { id: 14, category: 'cirugia', title: 'Cirugía Tórax - Becados', type: 'becados', year: 'antiguo', url: 'https://drive.google.com/file/d/173O1G2XXK3o1yHnxibHa1dPDNUYdmXJa/view?usp=drive_link', format: 'pdf' },
    { id: 15, category: 'cirugia', title: 'Cirugía Vascular - Becados', type: 'becados', year: 'antiguo', url: 'https://drive.google.com/file/d/1-fHLCed-gYU3pBAQNxgmxN_wkkSwgmmC/view?usp=drive_link', format: 'pdf' },
    { id: 16, category: 'cirugia', title: 'Manual Rotación Cabeza y Cuello', type: 'protocolo', year: '2020', url: 'https://drive.google.com/file/d/1_EcTpr63e-Oz7gm2EwDo0ORYbWGtSkw9/view?usp=drive_link', format: 'pdf' },
    { id: 17, category: 'cirugia', title: 'Manual Rotación Coloproctologia', type: 'protocolo', year: '2020', url: 'https://drive.google.com/file/d/1vkB1c2YvNEeJgdnFmWMCIC3cuDeyr-Bw/view?usp=drive_link', format: 'pdf' },
    { id: 18, category: 'cirugia', title: 'Manual Rotación Digestivo', type: 'protocolo', year: '2020', url: 'https://drive.google.com/file/d/1xAS3QRCG4jInWVd2qTg3UEjZrGZzhcEw/view?usp=drive_link', format: 'pdf' },
    { id: 19, category: 'cirugia', title: 'Manual Rotación Hepatobiliopancreas', type: 'protocolo', year: '2020', url: 'https://drive.google.com/file/d/1sH0MMBnoEtjCuk4Sb_tU6XCQVzu0zTF6/view?usp=drive_link', format: 'pdf' },
    { id: 20, category: 'cirugia', title: 'Manual Rotación Plástica', type: 'protocolo', year: '2020', url: 'https://drive.google.com/file/d/1xAS3QRCG4jInWVd2qTg3UEjZrGZzhcEw/view?usp=drive_link', format: 'pdf' },
    { id: 21, category: 'cirugia', title: 'Manual Rotación Tórax', type: 'protocolo', year: '2020', url: 'https://drive.google.com/file/d/10O02993DI8eSaef9ZwJEmjayvUwJTpCh/view?usp=drive_link', format: 'pdf' },
    { id: 22, category: 'cirugia', title: 'Manual Rotación Vascular', type: 'protocolo', year: '2020', url: 'https://drive.google.com/file/d/1HrH1mMzE-70dY8BQA-U7eVQDW1ffWvug/view?usp=drive_link', format: 'pdf' },
    { id: 23, category: 'cirugia', title: 'Apuntes RCP', type: 'RCP', year: 'antiguo', url: 'https://drive.google.com/file/d/1ZRgQci4iFIeTqMnWIhw_eJtmbyFsASSG/view?usp=drive_link', format: 'pdf' },
    { id: 24, category: 'cirugia', title: 'Algoritmos AHA 2020', type: 'RCP', year: '2020', url: 'https://drive.google.com/file/d/176q9h_R3P8D6_z_-_9kM2WHPoTMZCyZS/view?usp=drive_link', format: 'pdf' },
    { id: 25, category: 'cirugia', title: 'ATLS 2025', type: 'libro', year: '2025', url: 'https://drive.google.com/file/d/1cSRoEoDMeui_3m5oSsDBhwXwLcc3UQ_W/view?usp=sharing', format: 'pdf' },
    { id: 26, category: 'cirugia', title: 'Algoritmos RCP', type: 'RCP', year: '2025', url: 'https://drive.google.com/file/d/1PBqa38fHFySlIIgSoEgIV0k1wDKG7Zyl/view?usp=drive_link', format: 'pdf' },
    { id: 27, category: 'cirugia', title: 'Cirugía Docente', type: 'link', year: '2025', url: 'https://www.cirugiadocente.com/', format: 'link' },

    // --- MEDICINA INTERNA ---
    { id: 28, category: 'medicina', title: 'Resumenes Cirugia Kika', type: 'apunte', year: '2020', url: 'https://drive.google.com/file/d/1-8ipuFGxJ5k4en6UdbmiqMQDMoxUn9Xo/view?usp=sharing', format: 'pdf' },
    { id: 29, category: 'medicina', title: 'Resumen Cardiología', type: 'Repartos', year: '2020', url: 'https://drive.google.com/file/d/131wrWNzKb9KKAvLvKtlCt3xJE5ahf77w/view?usp=drive_link', format: 'pdf' },
    { id: 30, category: 'medicina', title: 'Resumen Endocrinología', type: 'Repartos', year: '2020', url: 'https://drive.google.com/file/d/1W-HeSk4hZ01jEX5-8WTBGiuCNPoFnaOh/view?usp=drive_link', format: 'pdf' },
    { id: 31, category: 'medicina', title: 'Resumen Gastroenterología', type: 'Repartos', year: '2020', url: 'https://drive.google.com/file/d/1tXep6DPvOttg8WQr3BPoTsDnqwuIUtXd/view?usp=drive_link', format: 'pdf' },
    { id: 32, category: 'medicina', title: 'Resumen Hematología', type: 'Repartos', year: '2020', url: 'https://drive.google.com/file/d/1-BAeTN0dINqPdujUtW5hd1o_MAE3uxec/view?usp=drive_link', format: 'pdf' },   
    { id: 33, category: 'medicina', title: 'Resumen Infectología', type: 'Repartos', year: '2020', url: 'https://drive.google.com/file/d/196dF98pcY_8nyaIRpdXDexXc8Jn7Kwaf/view?usp=drive_link', format: 'pdf' },
    { id: 34, category: 'medicina', title: 'Resumen Nefrología', type: 'Repartos', year: '2020', url: 'https://drive.google.com/file/d/136kSJRW23d4LxsoAR0BMCcRph8Exyu-E/view?usp=drive_link', format: 'pdf' },
    { id: 35, category: 'medicina', title: 'Resumen Respiratorio', type: 'Repartos', year: '2020', url: 'https://drive.google.com/file/d/1JRNDF6NwC6ab1l5XlWTtq73IM-Hvigo1/view?usp=drive_link', format: 'pdf' },
    { id: 36, category: 'medicina', title: 'Resumen Reumatología', type: 'Repartos', year: '2020', url: 'https://drive.google.com/file/d/11t2p-0O2-AF0jwvAN9s_LZuU1OQ18ZpE/view?usp=drive_link', format: 'pdf' }, 
    { id: 37, category: 'medicina', title: 'Harrison - Principios de Medicina Interna 21° Edición', type: 'libro', year: '2022', url: 'https://drive.google.com/file/d/1jdFli4BIsU8q2xGHR6MSyd3BP5_BoTR8/view?usp=drive_link', format: 'pdf' },  
    { id: 38, category: 'medicina', title: 'Farreras - Medicina Interna 20° Edición', type: 'libro', year: '2024', url: 'https://drive.google.com/file/d/18aS0E4rmvYx1o2w7fYzUPOZ3417JMu64/view?usp=drive_link', format: 'pdf' }, 
    { id: 39, category: 'medicina', title: 'Manual Empendium', type: 'link', year: '2025', url: 'https://empendium.com/manualmibe/', format: 'link' },
    { id: 40, category: 'medicina', title: 'Tutorías Medicina Interna', type: 'link', year: '2025', url: 'https://www.youtube.com/c/Tutor%C3%ADasMedicinaInterna', format: 'link' }, 
    { id: 41, category: 'medicina', title: 'Manejos Útiles Medicina Interna', type: 'protocolo', year: '2025', url: 'https://drive.google.com/file/d/1Et_4IDq-Xmp4fjQ267gEkbJ9YDA55QNZ/view?usp=drive_link', format: 'pdf' }, 
    { id: 42, category: 'medicina', title: 'Protocolo Insulina NPH-IC', type: 'protocolo', year: '2025', url: 'https://drive.google.com/file/d/19ePicDyJN2_4mCp30JqztedErGy7YML5/view?usp=drive_link', format: 'pdf' }, 
    { id: 43, category: 'medicina', title: 'Protocolo BIC de Insulina', type: 'protocolo', year: '2025', url: 'https://drive.google.com/file/d/1KPsnp5vmvUsz6Amsz7cifj-876VEDiUi/view?usp=drive_link', format: 'pdf' }, 
    { id: 44, category: 'medicina', title: 'Presentación de Pacientes', type: 'Salas/Turnos', year: '2025', url: 'https://drive.google.com/drive/folders/1ZEzwTZ-fLdJGCvQGxESPTyHeNpLI9wYE?usp=sharing', format: 'guia' }, 
    { id: 45, category: 'medicina', title: 'Planilla de Ingreso', type: 'Salas/Turnos', year: '2025', url: 'https://docs.google.com/document/d/1OjOV7EL0brh3He2ls_4boTDMDG5J2ZQt/edit?usp=drive_link&ouid=113007826095177545501&rtpof=true&sd=true', format: 'doc' }, 
    { id: 46, category: 'medicina', title: 'Score DRAS', type: 'Salas/Turnos', year: '2025', url: 'https://drive.google.com/file/d/1fmjvUIp2-I-fey38EJL9mIqHRwFfHj7y/view?usp=drive_link', format: 'pdf' }, 
    { id: 47, category: 'medicina', title: 'Entrega de Turno', type: 'Salas/Turnos', year: '2025', url: 'https://drive.google.com/file/d/1qZ3zPYXgIMDBAgKZBulioyDF4DH3KXuO/view?usp=drive_link', format: 'pdf' }, 
    { id: 48, category: 'medicina', title: 'Recetario', type: 'Salas/Turnos', year: '2025', url: 'https://drive.google.com/file/d/1ob8MB10QQC8iPiCYyRQODMvyrxLyrOfh/view?usp=drive_link', format: 'pdf' }, 
    { id: 49, category: 'medicina', title: 'Resúmenes Examen Teórico', type: 'Otros recursos', year: '2025', url: 'https://drive.google.com/file/d/1yNV3Q9hx_6DMS-yjrblkpsNq28hpyDtI/view?usp=drive_link', format: 'guia' }, 
    { id: 50, category: 'medicina', title: 'Otros Resumenes', type: 'Otros recursos', year: '2025', url: 'https://drive.google.com/drive/folders/1UMILTu1-knzG1cIY9ELFaFaPR9eXx48X?usp=sharing', format: 'guia' }, 
    
    // --- GINECOLOGÍA ---
    { id: 51, category: 'ginecologia', title: 'Resumenes Cirugia Ginecología/Obstetricia', type: 'apunte', year: '2020', url: 'https://drive.google.com/file/d/14d6XVnIaiMC8nO06q1C5pd2U-WOlcfuv/view?usp=drive_link', format: 'pdf' },
    { id: 52, category: 'ginecologia', title: 'Flujogramas Ginecología PUC', type: 'Diagramas de Flujos', year: 'antiguo', url: 'https://medicina.uc.cl/wp-content/uploads/2018/09/Flujogramas-Ginecologia-2018.pdf', format: 'pdf' },
    { id: 53, category: 'ginecologia', title: 'Flujogramas Obstetricia PUC', type: 'Diagramas de Flujos', year: 'antiguo', url: 'https://medicina.uc.cl/wp-content/uploads/2018/09/Flujogramas-Obstetricia-2018.pdf', format: 'pdf' },
    { id: 54, category: 'ginecologia', title: 'Manual de Obstetricia y Ginecología PUC 2025', type: 'libro', year: '2025', url: 'https://medicina.uc.cl/wp-content/uploads/2025/03/Manual-Obstetricia-y-Ginecologi%CC%81a-2025-comprimido.pdf', format: 'pdf' },
    { id: 55, category: 'ginecologia', title: 'Libro Williams Ginecología', type: 'libro', year: '2022', url: 'https://drive.google.com/drive/folders/1UPU7twF40-OoD2IxXRQEr1pvhORfnDUm?usp=sharing', format: 'pdf' },
    { id: 56, category: 'ginecologia', title: 'Libro Williams Obstetricia', type: 'libro', year: '2022', url: 'https://drive.google.com/file/d/1nEfscubqEkLyB_iZl2C5LztaIF5Rsaxv/view?usp=drive_link', format: 'pdf' },
    { id: 57, category: 'ginecologia', title: 'Fetal Medicine Barcelona', type: 'Poli-DAN', year: '2025', url: 'https://fetalmedicinebarcelona.org/calc/', format: 'link' },
    { id: 58, category: 'ginecologia', title: 'Risk for preeclampsia Fetal Medicine', type: 'Poli-DAN', year: '2025', url: 'https://fetalmedicine.org/research/assess/preeclampsia/first-trimester', format: 'link' },
    { id: 59, category: 'ginecologia', title: 'Fetal Growth Calculator', type: 'Poli-DAN', year: '2025', url: 'https://srhr.org/fetalgrowthcalculator/#/', format: 'link' },
    { id: 60, category: 'ginecologia', title: 'Guía Prenatal 2015', type: 'Guias', year: 'antiguo', url: 'http://www.repositoriodigital.minsal.cl/bitstream/handle/2015/436/GUIAPERINATAL_2015-PARA-PUBLICAR.pdf?sequence=1&isAllowed=y', format: 'pdf' },
    { id: 61, category: 'ginecologia', title: 'Medicamentos Embarazo 8° Ed', type: 'Guias', year: '2022', url: 'https://www.araucaniasur.cl/wp-content/uploads/2023/01/GUIA-8-MEDICAMENTOS-EN-EMBARAZO-OK.pdf', format: 'pdf' },
    { id: 62, category: 'ginecologia', title: 'Manual de Fármacos ARO HHHA', type: 'Guias', year: '2024', url: 'https://drive.google.com/file/d/1WbOVTfWL_9kneTeE18W61FojMGftf0km/view', format: 'pdf' },
    { id: 63, category: 'ginecologia', title: 'Resúmenes Examen Teórico', type: 'Otros recursos', year: '2025', url: 'https://drive.google.com/file/d/1dLD7y3iV52myP1rGwxQfarC0IaIkZRdf/view?usp=drive_link', format: 'link' },
    { id: 64, category: 'ginecologia', title: 'Otros Resumenes', type: 'Otros recursos', year: '2025', url: 'https://drive.google.com/drive/folders/1EzQIAqWLM5VQrWVF_FnXGgmxnfe0EVDl?usp=drive_link', format: 'link' },
    { id: 65, category: 'ginecologia', title: 'PPT - Presentaciones', type: 'Otros recursos', year: '2025', url: 'https://drive.google.com/drive/folders/1UOZgeew5aXIWd0hGwGRH78QhJkxaMy8M?usp=drive_link', format: 'link' },
    { id: 66, category: 'ginecologia', title: 'Entrega MMF (Jueves)', type: 'MMF', year: '2025', url: 'https://docs.google.com/spreadsheets/d/1G8zlAm0PwOIPKJhUG5d6455r28ggkF1nPpewNuxlqF0/edit?gid=0#gid=0', format: 'link' },
    { id: 67, category: 'ginecologia', title: 'Para Hospitalizar', type: 'MMF', year: '2025', url: 'https://docs.google.com/spreadsheets/d/17-qKZDAFIPpWSsaTpWg7aZaNRxuuJtXR/edit?gid=1673295739#gid=1673295739', format: 'link' },
    { id: 68, category: 'ginecologia', title: 'Estadísticas ARO', type: 'MMF', year: '2025', url: 'https://docs.google.com/spreadsheets/d/1Sk29cUusIAn7hVk5m_UAaVxSkJJJ_Zr-/edit?gid=1592456355#gid=1592456355', format: 'link' },
    { id: 69, category: 'ginecologia', title: 'Calcula la edad gestacional', type: 'link', year: '2025', url: 'https://www.clinicauandes.cl/maternidad/calculadora-fur', format: 'link' },
  
    { id: 70, category: 'ginecologia', title: 'ANEXO 2a: DECLARACION DE ENTREGA Y RECEPCION DE INFORMACION SOBRE LA LEY 21.030 QUE DESPENALIZA LA INTERRUPCIÓN VOLUNTARIA DEL EMBARAZO EN TRES CAUSALES', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/1VxqrfLwrftj4VYmdr_IKxr46EqzYtv-P/view?usp=drive_link', format: 'pdf' },
    { id: 71, category: 'ginecologia', title: 'INSTRUCTIVO DETECCIÓN NEONATAL DE CARDIOPATÍAS CONGÉNITAS MEDIANTE SATUROMETRÍA DE PULSO', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/1LT2NmJY1FMyihYa33ppiaQM_PALsQt49/view?usp=drive_link', format: 'pdf' },
    { id: 72, category: 'ginecologia', title: 'INSTRUCTIVO PARA LA REALIZACIÓN DE MONITORIZACIÓN FETAL ELECTRÓNICA EN LA UNIDAD DE ALTO RIESGO OBSTÉTRICO', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/1Zz9AFudtakvahkzaGWcLwDFq_t1aROKa/view?usp=sharing', format: 'pdf' },
    { id: 73, category: 'ginecologia', title: 'PROCEDIMIENTO PARA ASEGURAR ADMINISTRACIÓN DE VACUNA DTPA EN PACIENTES PUERPERAS Y EMBARAZADAS DEL SERVICIO MEDICINA MATERNO FETAL', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/1QW1w9RC_I4z4T5b8035LbomHq46Ou6s0/view?usp=drive_link', format: 'pdf' },
    { id: 74, category: 'ginecologia', title: 'PROCESO ADMINISTRATIVO PARA DIAGNÓSTICO PRENATAL INVASIVO', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/156VHCesrG2XX2Sc8oIivJ3AYMkSFcRaY/view?usp=drive_link', format: 'pdf' },
    { id: 75, category: 'ginecologia', title: 'PROTOCOLO ADMINISTRATIVO PARA DIAGNÓSTIVO PRENATAL INVASIVO', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/1WjhDYRprXKcl4A_oXUXdmNnlze4RjoU8/view?usp=drive_link', format: 'pdf' },
    { id: 76, category: 'ginecologia', title: 'PROTOCOLO ALGORITMO DETECCION CARDIOPATIAS CONGENITAS', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/1f8v6nsQjDc8X0LNquhKpQKnrEyzGCN61/view?usp=drive_link', format: 'pdf' },
    { id: 77, category: 'ginecologia', title: 'PROTOCOLO ASISTENCIA AL DUELO PERINATAL CCRR DE LA MUJER', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/1idCG1lnXx3LqSKN5Y8nEm39uBZ8LLnWA/view?usp=drive_link', format: 'pdf' },
    { id: 78, category: 'ginecologia', title: 'PROTOCOLO DE MANEJO DE CRISIS HIPERTENSIVAS EN GESTANTE Y PUÉRPERAS', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/1L7t4Sfs4-SfDZHdWbAhkT3bEYM6WhJjS/view?usp=drive_link', format: 'pdf' },
    { id: 79, category: 'ginecologia', title: 'PROTOCOLO DE MANEJO DE SULFATO DE MAGNESIO PARA PACIENTES OBSTÉTRICAS', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/1OEWr93HVJcKQiWw0V2oWDdBAcuuhk0JX/view?usp=sharing', format: 'pdf' },
    { id: 80, category: 'ginecologia', title: 'PROTOCOLO INTERRUPCION VOLUNTARIO DEL EMBARAZO LEY 21.030', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/17nPbuA2nrp95SJUl7_T07oEYmJPHyc4L/view?usp=sharing', format: 'pdf' },
    { id: 81, category: 'ginecologia', title: 'PROTOCOLO MANEJO DE GESTANTE CON EMBARAZO DE TERMINO TARDÍO', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/18KDbqtUHdIuylscV0VzdDAISQ0iPTsIp/view?usp=sharing', format: 'pdf' },
    { id: 82, category: 'ginecologia', title: 'PROTOCOLO PROCEDIMIENTO DE PRIORIZACIÓN DE PACIENTES GESTANTES DE ALTO RIESGO OBSTÉTRICO PARA SOLICITUD DE EVALUACIÓN MÉDICA DURANTE FINES DE SEMANA Y FESTIVOS', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/1smVdlLK8yueykO3yE7hJIVfeAZ0IUtOD/view?usp=sharing', format: 'pdf' },
    { id: 83, category: 'ginecologia', title: 'PROTOCOLO PROCEDIMIENTO PARA EL MANEJO DE PACIENTES CON VDRL REACTIVO', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/16fj8YbtSKS3aRafqU8Mw5Hh_469Id-rW/view?usp=sharing', format: 'pdf' },
    { id: 84, category: 'ginecologia', title: 'PROTOCOLO PROCESO ADMINISTRATIVO PARA DIAGNOSTICO PRENATAL INVASIVO', type: 'Protocolos-ARO', year: '2024', url: 'https://drive.google.com/file/d/1xIUvI1t0Op1yUtWcyOsxUqs7_3ihaQ_7/view?usp=sharing', format: 'pdf' },

    { id: 85, category: 'ginecologia', title: 'MEDICIÓN DE RESIDUO POST MICCIONAL EN PACIENTES GINECOLÓGICAS', type: 'Protocolos-Ginecología', year: '2024', url: 'https://drive.google.com/file/d/1YjQIqATrOZeQYgodfclT1gvnh3FHzADS/view?usp=drive_link', format: 'pdf' },
    { id: 86, category: 'ginecologia', title: 'PREPARACIÓN PREOPERATORIA EN PACIENTES GINECOLÓGICAS', type: 'Protocolos-Ginecología', year: '2024', url: 'https://drive.google.com/file/d/1HJo9KM184a-Jf-WY5bo_AYr1jOcGe68G/view?usp=drive_link', format: 'pdf' },
    { id: 87, category: 'ginecologia', title: 'PROTOCOLO ADMINISTRACIÓN DE MISOPROSTOL VÍA VAGINAL EN PACIENTES GINECOLÓGICAS HOSPITALIZADAS EN EL CCRR DE LA MUJER', type: 'Protocolos-Ginecología', year: '2024', url: 'https://drive.google.com/file/d/1Cc1ZhdtJiU61ZSYbnZ8nGQTTQeA5pjpx/view?usp=drive_link', format: 'pdf' },
    { id: 88, category: 'ginecologia', title: 'PROTOCOLO DE INGRESO DE PACIENTES GINECO-OBSTÉTRICAS EN CR DE LA MUJER', type: 'Protocolos-Ginecología', year: '2024', url: 'https://drive.google.com/file/d/1tiTJ_EywhhE6V-GDkUOdsPmJPY7Cmtk9/view?usp=drive_link', format: 'pdf' },
    { id: 89, category: 'ginecologia', title: 'PROTOCOLO DE MEDICIÓN DE RESIDUO POST MICCIONAL EN PACIENTES GINECOLÓGICAS SIN FIRMA', type: 'Protocolos-Ginecología', year: '2024', url: 'https://drive.google.com/file/d/1As35ukgV_syjk6enNueh9Aub-nh9AX3e/view?usp=drive_link', format: 'pdf' },
    { id: 90, category: 'ginecologia', title: 'PROTOCOLO FLUJOGRAMA DE ATENCIÓN DURANTE EL PROCESO QUIRÚRGICO EN PACIENTES GINECOLÓGICAS DEL CCRR DE LA MUJER', type: 'Protocolos-Ginecología', year: '2024', url: 'https://drive.google.com/file/d/1DuYQN7DaYLYQeohBCYM58PVikNWvxiph/view?usp=drive_link', format: 'pdf' },
    { id: 91, category: 'ginecologia', title: 'PROTOCOLO PREPARACIÓN INTESTINAL PARA CIRUGÍAS EN PACIENTES GINECOLÓGICAS  ', type: 'Protocolos-Ginecología', year: '2024', url: 'https://drive.google.com/file/d/1ZI3jO0I9JBLn8Gh474cJHR7B3Tnx9qZ8/view?usp=drive_link', format: 'pdf' },

    { id: 92, category: 'ginecologia', title: 'PROCEDIMIENTO INDICACION E INSTALACIÓN DE IMPLANTE ANTICONCEPTIVO IMPLANON', type: 'Protocolos-Puerperio', year: '2024', url: 'https://drive.google.com/file/d/1F4kAgWNgzWA9ymm-tBCCirGI7rQtko5e/view?usp=drive_link', format: 'pdf' },
    { id: 93, category: 'ginecologia', title: 'PROTOCOLO DE ATENCIÓN MATRONA ENCARGADA DE LACTANCIA MATERNA BINOMIO MADRE-HIJO', type: 'Protocolos-Puerperio', year: '2024', url: 'https://drive.google.com/file/d/1Rxd-w1okGPFjLW9DN_q9iUnpSLzgdfGt/view?usp=drive_link', format: 'pdf' },
    { id: 94, category: 'ginecologia', title: 'PROTOCOLO DE EXTRACCIÓN LÁCTEA EN PACIENTES PUERPERAS CON RN EN NEONATOLOGÍA', type: 'Protocolos-Puerperio', year: '2024', url: 'https://drive.google.com/file/d/15n9xux2fIIIstoTowwz5c26yIpbrHk4g/view?usp=drive_link', format: 'pdf' },
    { id: 95, category: 'ginecologia', title: 'PROTOCOLO HEMORRAGIA POSTPARTO EN LA UNIDAD DE PUERPERIO- SIN FIRMA', type: 'Protocolos-Puerperio', year: '2024', url: 'https://drive.google.com/file/d/1x49iVevaoqH_661FpVfqJnFyh7cst3Op/view?usp=drive_link', format: 'pdf' },

    { id: 96, category: 'ginecologia', title: 'INSTRUCTIVO VACUNACIÓN BCG- HEPATITIS B MANEJO DE CADENA DE FRIO', type: 'Protocolos-Recien Nacido', year: '2024', url: 'https://drive.google.com/file/d/1aWqGTDJ3gtdiVwwbIfn7PcVvIgs6h8tK/view?usp=drive_link', format: 'pdf' },
    { id: 97, category: 'ginecologia', title: 'MANUAL DE INDUCCIÓN UNIDAD DE RECIÉN NACIDO, SERVICIOS DE URGENCIA Y PABELLONES GINECO-OBSTÉTRICOS', type: 'Protocolos-Recien Nacido', year: '2024', url: 'https://drive.google.com/file/d/1lUneAEL1GWw8Zey3t7pQVK1bv8bHKfuC/view?usp=drive_link', format: 'pdf' },
    { id: 98, category: 'ginecologia', title: 'MANUAL DE PROTOCOLOS DE RECIÉN NACIDOS UNIDAD DE PUERPERIO CONJUNTO HHHA', type: 'Protocolos-Recien Nacido', year: '2024', url: 'https://drive.google.com/file/d/1rj8sb7blDi5DDnU_Kxwl3hlwp281PesQ/view?usp=drive_link', format: 'pdf' },
    { id: 99, category: 'ginecologia', title: 'PROTOCOLO BUSQUEDA MASIVA HIPOTIROIDISMO CONGENITO Y FENILCETONURIA PKU-HC', type: 'Protocolos-Recien Nacido', year: '2024', url: 'https://drive.google.com/file/d/17Y45z7W7hVD-T22ybeiRuUWQtjGN3HRt/view?usp=drive_link', format: 'pdf' },
    { id: 100, category: 'ginecologia', title: 'PROTOCOLO DE MANEJO DE RECIEN NACIDOS CON RIESGO DE HIPOGLICEMIA EN SALAS DE RECUPERACIÓN Y PUERPERIO', type: 'Protocolos-Recien Nacido', year: '2024', url: 'https://drive.google.com/file/d/11R9imudWiWu4yR1wvz6W0x7ule916xyI/view?usp=drive_link', format: 'pdf' },
    { id: 101, category: 'ginecologia', title: 'PROTOCOLO DE PROCEDIMIENTOS PARA REALIZACIÓN DE ESTUDIOS CARDIOLÓGICOS EN RN CON SOSPECHA DE CARDIOPATÍA CONGÉNITA', type: 'Protocolos-Recien Nacido', year: '2024', url: 'https://drive.google.com/file/d/1DFSFNjt93eQUP2cqvUmtIS169kt1FlZ_/view?usp=drive_link', format: 'pdf' },
    
    { id: 102, category: 'ginecologia', title: 'MANUAL ORGANIZACION Y FUNCIONES PERSONAL NO MEDICO SERVICIO MEDICINA MATERNO FETAL Y GINECOLOGIA', type: 'Protocolos-MMF', year: '2024', url: 'https://drive.google.com/file/d/1WMm13SD8HtbDk8AGTAbitHinxC89SPEd/view?usp=drive_link', format: 'pdf' },
    { id: 103, category: 'ginecologia', title: 'PROTOCOLO BECARIOS HOSPITAL DR. HERNAN HENRIQUEZ ARAVENA', type: 'Protocolos-MMF', year: '2024', url: 'https://drive.google.com/file/d/1WMm13SD8HtbDk8AGTAbitHinxC89SPEd/view?usp=drive_link', format: 'pdf' },
    { id: 104, category: 'ginecologia', title: 'PROTOCOLO DE MEDIDAS DE CONTROL IAAS PARA EL MANEJO DE PACIENTES SOSPECHOSOS-CONFIMADOS COVID19', type: 'Protocolos-MMF', year: '2024', url: 'https://drive.google.com/file/d/1qAPjPPtU76gRTshAdeqBFMg8cgcQnF0s/view?usp=drive_link', format: 'pdf' },
    { id: 105, category: 'ginecologia', title: 'PROTOCOLO MANEJO PACIENTES OBSTETRICAS INDICACION SULFATO MAGNESIO CR. DE LA MUJER', type: 'Protocolos-MMF', year: '2024', url: 'https://drive.google.com/file/d/1mHAmosdWNjIGOlw3eBvcf9uhHoNqqv0y/view?usp=drive_link', format: 'pdf' },
    { id: 106, category: 'ginecologia', title: 'PROTOCOLO PARA COMPAÑIA DE PACIENTES HOSPITALIZADOS EN EL CONTEXTO DE PANDEMIA POR SARS COV2', type: 'Protocolos-MMF', year: '2024', url: 'https://drive.google.com/file/d/1atRZFD8KUovG7MxifAGkSniqN53QZgBr/view?usp=drive_link', format: 'pdf' },
    { id: 107, category: 'ginecologia', title: 'PROTOCOLO PROCEDIMIENTO DE PRESCRIPCIÓN DE MEDICAMENTOS', type: 'Protocolos-MMF', year: '2024', url: 'https://drive.google.com/file/d/1T5R7secCOLNRZY8IPKgu24Kjex75mz6D/view?usp=drive_link', format: 'pdf' },
    { id: 108, category: 'ginecologia', title: 'PROTOCOLO PROCEDIMIENTO PARA EL MAJENO DE ACCIDENTES LABORALES', type: 'Protocolos-MMF', year: '2024', url: 'https://drive.google.com/file/d/1EUq7ny80XXhKIkhdyhkZJd-KwoHRh08P/view?usp=drive_link', format: 'pdf' },
    
    { id: 109, category: 'ginecologia', title: 'PROTOCOLO ADMINISTRACION TRANSFUSION', type: 'Protocolos-Otros', year: '2024', url: 'https://drive.google.com/file/d/1_NiNt0ZX1ht4mAMmEWkTExB7oTP71A1k/view?usp=drive_link', format: 'pdf' },
    { id: 110, category: 'ginecologia', title: 'PROTOCOLO ENTREGA DE PLACENTA NODO CENTRO', type: 'Protocolos-Otros', year: '2024', url: 'https://drive.google.com/file/d/1PEq364DjtFmF9CVfZojYB5AEuwyiM4o-/view?usp=drive_link', format: 'pdf' }, 
    { id: 111, category: 'ginecologia', title: 'PROTOCOLO MANEJO SOSPECHA O DG DE SIFILIS HHHA', type: 'Protocolos-Otros', year: '2024', url: 'https://drive.google.com/file/d/14W7E7REyJ8NDZvv2JhpnP9Y6SJ2zsO-B/view?usp=drive_link', format: 'pdf' }, 
    { id: 112, category: 'ginecologia', title: 'PROTOCOLO TRASLADO ENTRE SERVICIOS', type: 'Protocolos-Otros', year: '2024', url: 'https://drive.google.com/file/d/1ILIcdvRDj3B3_xHTWZ0Kg_b168eYlPbG/view?usp=drive_link', format: 'pdf' }, 
    { id: 113, category: 'ginecologia', title: 'RESUMEN MANEJO USUARIAS CON SOSPECHA O DIAGNOSTICO DE SIFILIS', type: 'Protocolos-Otros', year: '2024', url: 'https://drive.google.com/file/d/1WN0CgSiLwBZasAX6ikF8ckjkzB-ae9Lw/view?usp=drive_link', format: 'pdf' }, 

    { id: 114, category: 'ginecologia', title: 'ANALISIS EVENTO ADVERSO CAIDA', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1_fUkLE2sotgQ0S1pDPby63DuBJwQf_So/view?usp=drive_link', format: 'pdf' },
    { id: 115, category: 'ginecologia', title: 'ANALISIS EVENTO ADVERSO ULCERA POR PRESION', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/18fbKW9h9_Ml3K1v1fuOmB1zCtO8Euz5v/view?usp=drive_link', format: 'pdf' },
    { id: 116, category: 'ginecologia', title: 'FORMULARIO LEY DEL ORDEN APELLIDOS RN', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1LXLD4iR7hen54XWpzySb7rmZ32VhGuQB/view?usp=drive_link', format: 'pdf' },
    { id: 117, category: 'ginecologia', title: 'FORMULARIO SOLICITUD DE AUTOPSIA ', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/11jh2uvtY8EqTXF2i7ODdWeoip0L41EFl/view?usp=drive_link', format: 'pdf' },
    { id: 118, category: 'ginecologia', title: 'FORMULARIO SOLICITUD DE BIOPSIA', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/14INbQCkq6to3hAC2qQbNFFmCqILasjJq/view?usp=drive_link', format: 'pdf' },
    { id: 119, category: 'ginecologia', title: 'FORMULARIO SOLICITUD DE CUPOS PARA UNIDAD HEMODIALISIS', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1r7Hpm4x1J38M7N-Igx3Xn5_onN_JBSrD/view?usp=drive_link', format: 'pdf' },
    { id: 120, category: 'ginecologia', title: 'FORMULARIO DERIVACION USUARIAS CON RIESGO BIOSICOSOCIAL A LA RED ASISTENCIAL', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1LsTvBLyKQbC24Tyaz3Z9y_sO-5JUyOrB/view?usp=drive_link', format: 'pdf' },
    { id: 121, category: 'ginecologia', title: 'BITACORA EVENTOS ATENCION  EMERGENCIA NO VITAL', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1vVR5SVHu7OUFF9VtxXlaVDMswrIlwmtS/view?usp=drive_link', format: 'pdf' },
    { id: 122, category: 'ginecologia', title: 'FORMULARIO ATENCION EQUIPOS LOCALES EN SITUACION DE EMERGENCIA MEDICA NO VITAL', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1w2rwO9jspDWbydyebEbiNXFX07oUJQEN/view?usp=drive_link', format: 'pdf' },
    { id: 123, category: 'ginecologia', title: 'FORMULARIO SOLICITUD ENTREGA DE PLACENTA', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1Yy9eDms_rvaRLmUs6Elf0SO81hpwZ14Y/view?usp=drive_link', format: 'pdf' },
    { id: 124, category: 'ginecologia', title: 'FORMULARIO JUSTIFICACION USO DE FORMULA AL ALTA', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1t4BqCwBnY525RkTcDud9TastlLo6OO1L/view?usp=drive_link', format: 'pdf' },
    { id: 125, category: 'ginecologia', title: 'DECLARACION INFORMADA PARA ACOMPAÑAMIENTO EN ATENCION CERRADA - LEY MILA', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1RXxneqD1xYjleKFPzPj8roOQqg5ApwaT/view?usp=drive_link', format: 'pdf' },
    { id: 126, category: 'ginecologia', title: 'ASENTAMIENTO INFORMADO PARA NIÑO - LEY MILA', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1KWDs1_OjPsrbDuwiy1cqC3m2UHu4D_B1/view?usp=drive_link', format: 'pdf' },
    { id: 127, category: 'ginecologia', title: 'RE 5093 PROTOCOLO PARA ACOMPAÑAMIENTO DE PACIENTES EN CR DE LA MUJER REV VR 23 06 - LEY MILA', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1FTiwUgk1CNZOf9LuoEhvsEswbkPAQW1c/view?usp=drive_link', format: 'pdf' },
    { id: 128, category: 'ginecologia', title: 'ENCUESTA DIARIA DE SINTOMAS COVID', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/12oV00F0KA5DJbYnWGjF3GUSGH6Ex0f7P/view?usp=drive_link', format: 'pdf' },
    { id: 129, category: 'ginecologia', title: 'FORMULARIO NOTIFICACION INMEDIATA Y ENVIO DE MUESTRA A CONFIRMACION IRA GRAVE Y 2019', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1Alo2QRUr7Fbpu6oogLc3bleBmjwfzrzj/view?usp=drive_link', format: 'pdf' },
    { id: 130, category: 'ginecologia', title: 'ACTA DE PRESTAMO EQUIPOS MEDICOS', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/17UO7676UWeNwxmJ4vBuLrb72_Q_QYL32/view?usp=drive_link', format: 'pdf' },
    { id: 131, category: 'ginecologia', title: 'FORMULARIO SOLICITUD PRESTAMO DE BIENES FUERA DEL HOSPITAL', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/13MAOIgMcL-K1Rx3qBwDd613Fvp-_Dflx/view?usp=drive_link', format: 'pdf' },
    { id: 132, category: 'ginecologia', title: 'FORMULARIO SOLICITUD EXTRAORDINARIA DE INFORMES RADIOLOGICOS', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1n_8yZr9DSx0KawKVKgljzMrPYROOHv1X/view?usp=drive_link', format: 'pdf' },
    { id: 133, category: 'ginecologia', title: 'FORMULARIO GES 18 - VIH', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1TBViwIEjxivYO6cv0trazhmMW-VNVna7/view?usp=drive_link', format: 'pdf' },
    { id: 134, category: 'ginecologia', title: 'VIH PEDIATRICO', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1sInk-OcTebxh9Z2XD07psk3tLZJ-v2Ss/view?usp=drive_link', format: 'pdf' },
    { id: 135, category: 'ginecologia', title: 'CHEQUEO PREVIO AL ALTA TARV', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/14SeJBt7eIpHl0tbJvwXRIIZEjPHJVlsz/view?usp=drive_link', format: 'pdf' },
    { id: 136, category: 'ginecologia', title: 'REGISTRO CAUSAL 3 - LEY IVE', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/14mkyX5AZpiQLrfJxhqV_39hNXdHnaH_-/view?usp=drive_link', format: 'pdf' },
    { id: 137, category: 'ginecologia', title: 'REGISTRO CAUSAL 2 - LEY IVE', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/14I0Dr67216GyhKdXof4axt8TeDMEo8Md/view?usp=drive_link', format: 'pdf' },
    { id: 138, category: 'ginecologia', title: 'REGISTRO CAUSAL 1 - LEY IVE', type: 'Formularios', year: '2024', url: 'https://drive.google.com/file/d/1n36_YArVJXGwDElIQVEUiQmzrixUi6Ls/view?usp=drive_link', format: 'pdf' },
    
    { id: 139, category: 'ginecologia', title: 'PAUTA COTEJO PARA EXAMEN AMNIOCENTESIS', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1JY0mlT8mGHAX1j1AqvPVkAoXLnPEf5_5/view?usp=drive_link', format: 'pdf' },
    { id: 140, category: 'ginecologia', title: 'BALANCE HIDRICO', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1yEhyt9JrMyoZmIqq1plDTQ4XsXDg6IzF/view?usp=drive_link', format: 'pdf' },
    { id: 141, category: 'ginecologia', title: 'HOJA DE REGISTRO DE BALANCE HIDRICO', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1FYJJuS75Zn_mtXqTSUbP2BtUXaHR7OGM/view?usp=drive_link', format: 'pdf' },
    { id: 142, category: 'ginecologia', title: 'CHEQUEO PREVIO AL ALTA RN EN TTO ANTIRETROVIRAL', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1zbv8bDVIcHsulr0KBxPJq1J346FOeLZl/view?usp=drive_link', format: 'pdf' },
    { id: 143, category: 'ginecologia', title: 'DERIVACIÓN A CLINICA DE LACTANCIA', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1RE3m7swZqMuCScRCu1tQVrh1CDMmylq3/view?usp=drive_link', format: 'pdf' },
    { id: 144, category: 'ginecologia', title: 'INSTRUCTIVO DE INSULINOTERAPIA', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1aAAWEzeGPuIzxziBMbOb16RDV75_zIoT/view?usp=drive_link', format: 'pdf' },
    { id: 145, category: 'ginecologia', title: 'PROTOCOLO INSULINIZACION PACIENTE DM1 PARTO', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1PUAe-W0DDUeYDlHFgMe4ynvve9LbfQYG/view?usp=drive_link', format: 'pdf' },
    { id: 146, category: 'ginecologia', title: 'PAUTA CHEQUEO DE INDUCCION', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1ZNWqfLbc0ndjLYnOPgzkVYeZhiBrV_Jx/view?usp=drive_link', format: 'pdf' },
    { id: 147, category: 'ginecologia', title: 'RESUMEN MANEJO USUARIOS CON SOSPECHA O DIAGNÓSTICO DE SÍFILIS', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1kRyHxk7X3qlMCb7wusq4dIEV24cRnNIp/view?usp=drive_link', format: 'pdf' },
    { id: 148, category: 'ginecologia', title: 'PAUTA CHEQUEO PLACENTA ACRETA', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1ZxB2df4OI9RL9P2o95Ix1sso-o6RWJ4v/view?usp=drive_link', format: 'pdf' },
    { id: 149, category: 'ginecologia', title: 'HOJA RESUMEN MICROBIOLÓGICO DE PRUEBAS PARA RPM Y APP', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1L6yhAY2ubyPnwU2R5d3JymJrPJ6y336s/view?usp=drive_link', format: 'pdf' },
    { id: 150, category: 'ginecologia', title: 'CARTA DE RESGUARDO', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1VmUA3dbf9lC0TnsxlQt6xSncv9IfsND9/view?usp=drive_link', format: 'pdf' },
    { id: 151, category: 'ginecologia', title: 'FLUJOGRAMA DERIVACION PACIENTES UNIDAD GESTION CAMAS', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1SY3eT3u-KC4QA5eroqkzxNjF1_dS_hk9/view?usp=drive_link', format: 'pdf' },
    { id: 152, category: 'ginecologia', title: 'SOLICITUD DE TRASLADO DE PACIENTE', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1AwoOjhDvuh0U_IZV8dUVjcC5m2SRkBVs/view?usp=drive_link', format: 'pdf' },
    { id: 153, category: 'ginecologia', title: 'DERIVACIÓN ECOGRAFÍA DE CADERA', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1tHGFE3LMXhmUch5lqxeiXHY2V3CIe4yN/view?usp=drive_link', format: 'pdf' },
    { id: 154, category: 'ginecologia', title: 'REQUERIMIENTO PARA AMNIOCENTESIS INFECCIOSA', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1gkD9eMZcmxJ7uxZOtsDnfYW0AxGJklH6/view?usp=drive_link', format: 'pdf' },
    { id: 155, category: 'ginecologia', title: 'NORMOGRAMA PARA LA DESIGNACIÓN DE RIESGO DE HIPERBILIRRUBINEMIA', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1o4Of-s5LiWFZaphbdFuAh6WipvLj4rfz/view?usp=drive_link', format: 'pdf' },
    { id: 155, category: 'ginecologia', title: 'PLAN DE PARTO', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1nE56bJSR3UDRchYH64iuqxWJ7QQZfsYK/view?usp=sharing', format: 'pdf' },
    { id: 155, category: 'ginecologia', title: 'ROBSON', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/18g0UgzWcJ29BZQROxSvAIEdFX0nYywLP/view?usp=sharing', format: 'pdf' },
    { id: 155, category: 'ginecologia', title: 'SOLICITUD DE ALTA VOLUNTARIA', type: 'Pautas', year: '2024', url: 'https://drive.google.com/file/d/1ewDDOd1AfU1YKBKFAl98sHtWqydyzcgJ/view?usp=sharing', format: 'pdf' },

    // --- PEDIATRÍA ---
    { id: 156, category: 'pediatria', title: 'Resumenes Pediatría Kika', type: 'apunte', year: '2021', url: 'https://drive.google.com/file/d/17JsCXeKyLS0k6J10-eUAKlGmuYAdWYoP/view?usp=drive_link', format: 'pdf' },
    { id: 157, category: 'pediatria', title: 'Manual PUC 2° Edición', type: 'libro', year: '2020', url: 'https://medicina.uc.cl/wp-content/uploads/2021/04/Manual-de-pediatria-2020-v2021.pdf', format: 'pdf' },
    { id: 158, category: 'pediatria', title: 'Manual UDP 2020', type: 'libro', year: '2020', url: 'https://drive.google.com/file/d/1lFcNE0TlJy9PqkvucNzx69kH1qYgjDog/view', format: 'pdf' },
    { id: 159, category: 'pediatria', title: 'Menenghello - Pediatría Tomo I', type: 'libro', year: '2024', url: 'https://drive.google.com/file/d/1l_LOEAz06Iwlvv-WTjUjm1wGbWaYr5FT/view?usp=sharing', format: 'pdf' },
    { id: 160, category: 'pediatria', title: 'Menenghello - Pediatría Tomo II', type: 'libro', year: '2024', url: 'https://drive.google.com/file/d/1Ai6eErVBkzhJa3RKzFDgGKK98zjEtJ1h/view?usp=sharing', format: 'pdf' },
    { id: 161, category: 'pediatria', title: 'N. Supervisión 0 a 9 años en APS', type: 'Guias', year: '2020', url: 'https://www.crececontigo.gob.cl/wp-content/uploads/2015/11/Norma-Tecnica-para-la-supervision-de-ninos-y-ninas-de-0-a-9-en-APS.compressed.pdf', format: 'pdf' },
    { id: 162, category: 'pediatria', title: 'Patrones de Crecimiento Minsal', type: 'Guias', year: '2020', url: 'https://diprece.minsal.cl/wp-content/uploads/2018/07/Patrones-de-Crecimiento-para-la-Evaluaci%C3%B3n-Nutrici%C3%B3n-de-ni%C3%B1os-ni%C3%B1as-y-adolescentes-desde-el-nacimiento-a-19-a%C3%B1os.pdf', format: 'pdf' },
    { id: 163, category: 'pediatria', title: 'Fármacos/Dosis en Pediatría', type: 'Guias', year: '2020', url: 'https://drive.google.com/file/d/17J25ILfemORQLcsxvRsjgEpHEhmZsoQP/view?usp=drive_link', format: 'pdf' },
    { id: 164, category: 'pediatria', title: 'Planilla de Ingreso', type: 'Ingresos', year: '2024', url: 'https://docs.google.com/document/d/1HDy0yukFfQnH_XW0Lald3emc45eB59j9PjvDZeiy6ss/edit?usp=sharing', format: 'doc' },
    { id: 165, category: 'pediatria', title: 'Antropometría', type: 'Ingresos', year: '2024', url: 'https://www.seghnp.org/nutricional/', format: 'link' },
    { id: 166, category: 'pediatria', title: 'Manual de Urgencias', type: 'Turnos', year: '2020', url: 'https://drive.google.com/file/d/1EGeJWRuPkVcxq2pV6wlLM8XbE1nsXnsC/view?usp=drive_link', format: 'pdf' },
    { id: 167, category: 'pediatria', title: 'Antibióticos Comunes', type: 'Turnos', year: '2021', url: 'https://drive.google.com/file/d/15zN1p9jRa5iV6LOwehsIGXsJYbScmaGO/view?usp=drive_link', format: 'pdf' },
    { id: 168, category: 'pediatria', title: 'Entrega de Turno Lactantes', type: 'Turnos', year: '2025', url: 'https://docs.google.com/spreadsheets/d/1FOHAlRWDCAo0YZ_18aPODZWIB_gvhw9b12BY8YT8tkk/edit?usp=sharing', format: 'link' },
    { id: 169, category: 'pediatria', title: 'Entrega de Turno Segunda Infancia', type: 'Turnos', year: '2025', url: 'https://docs.google.com/spreadsheets/d/1mtJKr6PKZ3ITHcHP5PilxNrtghMcTTUwr0NmdRH-hUE/edit?usp=sharing', format: 'link' },
    { id: 170, category: 'pediatria', title: 'Resúmenes Examen', type: 'Otros recursos', year: '2024', url: 'https://drive.google.com/file/d/1AMtoSdi_U-Rk3K1s-nDFxlcGxm4V4T_6/view?usp=sharing', format: 'link' },
    { id: 171, category: 'pediatria', title: 'Pediamécum', type: 'link', year: '2025', url: 'https://www.aeped.es/comite-medicamentos/pediamecum', format: 'link' },
    { id: 171, category: 'pediatria', title: 'Ped-Z', type: 'link', year: '2025', url: 'https://www.pedz.de/de/pedz/main.html', format: 'link' },
];

// Tipos específicos por categoría
const categoryTypes = {
    'cirugia': [
        'apunte',
        'manual',
        'libro',
        'protocolo',
        'becados',
        'RCP',
        'link'
    ],
    'medicina': [
        'apunte',
        'Repartos',
        'libro',
        'protocolo',
        'Salas/Turnos',
        'Otros recursos',
        'link'
    ],
    'ginecologia': [
        'apunte',
        'Diagramas de Flujos',
        'Guias',
        'libro',
        'Poli-DAN',
        'MMF',
        'Protocolos-ARO',
        'Protocolos-Ginecología',
        'Protocolos-Puerperio',
        'Protocolos-Recien Nacido',
        'Protocolos-MMF',
        'Protocolos-Otros',
        'Formularios',
        'Pautas',
        'Otros recursos',
        'link'
    ],
    'pediatria': [
        'apunte',
        'Guias',
        'libro',
        'Ingresos',
        'Turnos',
        'Otros recursos',
        'link'
    ]
};

// Etiquetas amigables para los tipos
const typeLabels = {
    'apunte': 'Resumenes',
    'manual': 'Manual',
    'libro': 'Libro',
    'protocolo': 'Protocolo',
    'guia': 'Guía',
    'becados': 'Becados',
    'RCP': 'RCP/Urgencias',
    'link': 'Enlace Web'
};


function initRepoSystem() {
    const tabs = document.querySelectorAll('.repo-tab');
    const resultsContainer = document.getElementById('repo-results');
    const searchInput = document.getElementById('repo-search');
    const typeFilter = document.getElementById('filter-type');
    const yearFilter = document.getElementById('filter-year');
    const orderFilter = document.getElementById('filter-order');

    let currentCategory = 'cirugia';
    let currentPage = 1;
    const itemsPerPage = 8;

    // Función para actualizar los tipos según categoría
    const updateTypeFilter = () => {
        // Guardar el valor seleccionado actual
        const currentValue = typeFilter.value;
        
        // Limpiar opciones
        typeFilter.innerHTML = '<option value="">Todos los tipos</option>';
        
        // Añadir opciones específicas de la categoría
        const types = categoryTypes[currentCategory] || [];
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = typeLabels[type] || type;
            typeFilter.appendChild(option);
        });
        
        // Restaurar valor seleccionado si existe en la nueva lista
        if (types.includes(currentValue)) {
            typeFilter.value = currentValue;
        } else {
            typeFilter.value = '';
        }
    };

    // Función para calcular total de páginas
    const getTotalPages = (filteredItems) => {
        return Math.ceil(filteredItems.length / itemsPerPage);
    };

    // Función para obtener items de la página actual
    const getPageItems = (filteredItems, page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredItems.slice(start, end);
    };

    // Función para renderizar la paginación
    const renderPagination = (filteredItems) => {
        const totalPages = getTotalPages(filteredItems);
        const paginationContainer = document.getElementById('repo-pagination');
        
        if (!paginationContainer) return;
        
        paginationContainer.innerHTML = '';
        
        if (totalPages <= 1) return;
        
        // Botón Anterior
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn';
        prevBtn.innerHTML = '&laquo; Anterior';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderResources();
            }
        });
        paginationContainer.appendChild(prevBtn);
        
        // Números de página
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderResources();
            });
            paginationContainer.appendChild(pageBtn);
        }
        
        // Botón Siguiente
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn';
        nextBtn.innerHTML = 'Siguiente &raquo;';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderResources();
            }
        });
        paginationContainer.appendChild(nextBtn);
        
        // Información de página
        const pageInfo = document.createElement('span');
        pageInfo.className = 'pagination-info';
        pageInfo.textContent = `Página ${currentPage} de ${totalPages} (${filteredItems.length} resultados)`;
        paginationContainer.appendChild(pageInfo);
    };

    // Función principal de renderizado
    const renderResources = () => {
        // 1. Filtrar datos
        const searchText = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;
        const selectedYear = yearFilter.value;
        const selectedOrder = orderFilter.value;

        let filtered = resourcesDB.filter(item => {
            const matchCategory = item.category === currentCategory;
            const matchSearch = item.title.toLowerCase().includes(searchText);
            const matchType = selectedType ? item.type === selectedType : true;
            const matchYear = selectedYear ? item.year === selectedYear : true;

            return matchCategory && matchSearch && matchType && matchYear;
        });

        // 2. Ordenar resultados
        if (selectedOrder === 'az') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            // Más recientes primero (por año)
            filtered.sort((a, b) => {
                if (a.year === 'antiguo' && b.year !== 'antiguo') return 1;
                if (b.year === 'antiguo' && a.year !== 'antiguo') return -1;
                if (a.year === 'antiguo' && b.year === 'antiguo') return 0;
                return parseInt(b.year) - parseInt(a.year);
            });
        }

        // 3. Obtener items de la página actual
        const totalPages = getTotalPages(filtered);
        if (currentPage > totalPages) currentPage = 1;
        
        const pageItems = getPageItems(filtered, currentPage);

        // 4. Limpiar contenedor
        resultsContainer.innerHTML = '';

        // 5. Mostrar resultados
        if (pageItems.length === 0) {
            resultsContainer.innerHTML = `
                <div class="repo-empty-state">
                    No se encontraron documentos con estos filtros en <strong>${currentCategory.toUpperCase()}</strong>.
                </div>`;
        } else {
            pageItems.forEach(item => {
                const div = document.createElement('div');
                div.className = 'repo-item';
                div.innerHTML = `
                    <div class="repo-icon ${item.format}">${item.format.toUpperCase()}</div>
                    <div class="repo-info">
                        <span class="repo-title">${item.title}</span>
                        <span class="repo-meta">Año: ${item.year} | Tipo: ${typeLabels[item.type] || item.type}</span>
                    </div>
                    <a href="${item.url}" class="repo-btn" target="_blank">Ver / Descargar</a>
                `;
                resultsContainer.appendChild(div);
            });
        }

        // 6. Renderizar paginación
        renderPagination(filtered);
    };

    // Event Listeners para Tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Cambiar clase activa
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Actualizar categoría y resetear página
            currentCategory = tab.dataset.cat;
            currentPage = 1;
            
            // Actualizar filtro de tipos
            updateTypeFilter();
            
            // Renderizar
            renderResources();
        });
    });

    // Event Listeners para Filtros
    searchInput.addEventListener('input', () => {
        currentPage = 1;
        renderResources();
    });
    typeFilter.addEventListener('change', () => {
        currentPage = 1;
        renderResources();
    });
    yearFilter.addEventListener('change', () => {
        currentPage = 1;
        renderResources();
    });
    orderFilter.addEventListener('change', () => {
        currentPage = 1;
        renderResources();
    });

    // Botón de búsqueda
    const searchBtn = document.querySelector('.repo-search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            currentPage = 1;
            renderResources();
        });
    }

    // También buscar al presionar Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentPage = 1;
            renderResources();
        }
    });

    // Inicializar filtro de tipos y render inicial
    updateTypeFilter();
    renderResources();
}

// Inicializar al cargar (agregarlo al DOMContentLoaded existente)
document.addEventListener('DOMContentLoaded', () => {
    // ... tus otras inicializaciones ...
    initRepoSystem();
});
