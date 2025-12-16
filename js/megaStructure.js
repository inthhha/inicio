// js/megaStructure.js
const megaStructure = [
//* -- PILA 1 -- *//
    {
      text: 'Gestión Clínica', id: 'gestión-clínica', img: 'images/inthhha.png',
        sections: [
            { title: 'Accesos Araucanía Sur', img: 'images/ssas.webp',
                 items: [
                         { text: 'HIS HHHA', img: 'images/hhha.png', desc: 'Acceso plataforma registro médico HHHA', url: 'http://10.6.84.181/login' }, 
                         { text: 'SSASUR', img: 'images/ssasur.png', desc: 'Acceso plataforma registro médico Araucanía Sur', url: 'https://login.ssasur.cl/login', },
                         { text: 'Ficha Clínica', img: 'images/ficha.png', desc: 'Plataforma soporte y recursos HHHA', url: 'https://sites.google.com/view/fichadigital' },
                         { text: 'RedCap HHHA', img: 'images/redcap.png', desc: 'Creación y gestión de instrumentos/encuestas en línea', url: 'https://redcap.hhha.cl/redcap_v14.0.32/DataEntry/record_status_dashboard.php?pid=18' },
                         { text: 'Atrys', img: 'images/atrys.png', desc: 'Informes radiológicos en línea', url: 'https://ris.chile.telemedicina.com/' },
                         { text: 'Protocolo', img: 'images/protocolos.png', desc: 'Acceso a Protocolos HHHA', url: 'http://10.68.111.30/' }
                        ]
                    },
            { title: 'Accesos Araucanía Norte', img: 'images/sanorte.png',
                 items: [
                         { text: 'Portal SANORTE', img: 'images/sanorte.png', desc: 'Portal principal de servicios en línea Araucanía Norte', url: 'https://saludnorte.ssmn.cl/' },
                         { text: 'SIDRA', img: 'images/sanorte.png', desc: 'Acceso plataforma registro médico Araucanía Norte', url: 'https://www.ssanorte.cl/sidra/' },
                         { text: 'ESISSAN', img: 'images/esissan.png', desc: 'Acceso nueva plataforma registro médico Araucanía Norte', url: 'https://www.esissan.cl/inicio' }
                        ]
                     }
                   ]
                 },
//* -- PILA 2 -- *//
    {
      text: 'Laboratorio', id: 'Laboratorio', img: 'images/lab.png',
        sections: [
        { title: 'Laboratorio', img: 'images/lab.png',
                items: [
                         { text: 'Laboratorio Clínico', img: 'images/lab.png', desc: 'Plataforma sobre requisitos técnicos y valores de muestras de laboratorio', url: 'https://labsiel.araucaniasur.cl/' },
                        ]
                     },
        { title: 'Banco de Sangre', img: 'images/sangre.png',
                items: [
                         { text: 'Banco de Sangre', img: 'images/sangre.png', desc: 'Búsqueda de Grupo sanguíneo y factor Rh', url: 'http://10.6.84.191/proyectos/consultaBancoSangre/' }
                        ]
                     },
       { title: 'Anatomopatología', img: 'images/pathient.png',
                items: [
            { text: 'Pathient', img: 'images/pathient.png', desc: 'Resultados de biopsias y pieza quirúrgica', url: 'http://10.6.84.155/Pathient/',  }
                        ]
                     }
                   ]
                 },
//* -- PILA 3 -- *//
    {
      text: 'Imagenología',id: 'Imagenología', img: 'images/ray.png',
        sections: [
            { title: 'Synapse/Ovijam', img: 'images/ray.png',
                items: [
                        { text: 'Synapse HHHA', img: 'images/synapse.png', desc: 'Plataforma de imágenes principal de HHHA', url: 'https://synapsetmc.synapsetimed.cl/SynapseSignOn/sts/login?signin=14a58d1722d1162a247c17de113ea731' },
                         { text: 'Ovijam HHHA', img: 'images/ray.png', desc: 'Servidor HHHA', url: 'http://pacs.ssasur.cl:8080/oviyam2/' },
                         { text: 'Ovijam SSAS', img: 'images/ray.png', desc: 'Servidor Araucanía Sur', url: 'http://10.7.200.101:8080/oviyam2/' },
                         { text: 'Ovijam HINI', img: 'images/ray.png', desc: 'Servidor HINI', url: 'http://10.4.37.214:8080/ovijam2/' },
                         { text: 'Ovijam Pitrufquen', img: 'images/ray.png', desc: 'Servidor Pitrufquen', url: 'http://10.4.191.21:8080/oviyam2/' },
                         { text: 'Ovijam Villarrica', img: 'images/ray.png', desc: 'Servidor Villarrica', url: 'http://10.63.76.121:8080/oviyam2/' }
                        ]
                     },
             { title: 'Medicap', img: 'images/urgencia.png',
                items: [
                         { text: 'Medicap-HHHA', img: 'images/urgencia.png', desc: 'Estudios imagenológicos HHHA', url: 'http://10.6.84.204/medicap-hhha/login' },
                         { text: 'Medicap-SANORTE', img: 'images/urgencia.png', desc: 'Servidor de Imágenes Araucanía Norte', url: 'http://10.5.144.154/medicap-victoria/login' },
                         { text: 'Medicap-Angol', img: 'images/urgencia.png', desc: 'Servidor de Imágenes Hospital de Angol', url: 'http://10.68.159.47/login' }
                        ]
                     },
             { title: 'Otros recursos', img: 'images/ray.png',
                 items: [
                         { text: 'Dalca Pucón', img: 'images/ray.png', desc: 'Servidor Pucón', url: 'https://app.dalca.cl/login' },
                         { text: 'Soran Villarrica', img: 'images/ray.png', desc: 'Servidor Villarrica', url: 'https://soran.irad.cl/RISTR/Default.aspx' },
                         { text: 'Zero Footprint Pucón', img: 'images/ray.png', desc: 'Servidor Pucón', url: 'https://visualizador.hospitalsanfranciscodepucon.cl/zfp' },
                         { text: 'Ribik Pitrufquén', img: 'images/ray.png', desc: 'Servidor Pitrufquen', url: 'https://imalab.ribik.cl/login' }
                        ]
                     }
                   ]
                 },
//* -- PILA 4 -- *//
    {
      text: 'Urgencias', id: 'Urgencias', img: 'images/urgencia.png',
        sections: [
            { title: 'Urgencias', img: 'images/urgencia.png',
                items: [
                          { text: 'MDU HHHA', img: 'images/urgencia.png', desc: 'Páginas becados medicina de urgencia', url: 'https://sites.google.com/view/becaurgenciaufro' },
                          { text: 'Traumato HHHA', img: 'images/tmt.png', desc: 'Páginas becados traumatología', url: 'https://sites.google.com/view/becadosufro/p%C3%A1gina-principal' },
                          { text: 'Entrega SUA HHHA', img: 'images/urgencia.png', desc: 'Hoja de entrega de turno SUA', url: 'https://docs.google.com/spreadsheets/d/1l7C4mnwA4B957BMPo227QONF1bVWZbml/edit?pli=1&gid=2078745477#gid=2078745477' },
                          { text: 'Informe Radiografía de Urgencias', img: 'images/ray.png', desc: 'Informes radiológicos de urgencia HHHA', url: 'https://redcap.hhha.cl/surveys/?s=47PKX3FFWELPATAX' }
                        ]
                     },
            { title: 'Contactos', img: 'images/cellphone.png',
                items: [
                          { text: 'Anexos Telefónicos HHHA', img: 'images/urgencia.png', desc: 'Teléfonos de Anexos Urgencias HHHA', url: 'files/telefonos-sua-hhha.pdf' },
                          { text: 'Teléfonos Bases Araucanía Sur', img: 'images/ssasur.png', desc: 'Planilla Excel con anexos telefónicos de la IX Región', url: 'https://docs.google.com/spreadsheets/d/1CMCC9hVr_NS-mNYYBrZ_-FlyoLPdm-UW/edit?usp=sharing&ouid=111979837070725857764&rtpof=true&sd=true' },
                        ]
                     }
                   ]
                 },
//* -- PILA 5 -- *//    
    {
      text: 'Farmacología', id: 'Farmacología', img: 'images/farmaco.png',
        sections: [
            { title: 'Guías/Manuales', img: 'images/farmaco.png',
                items: [
                          { text: 'Arsenal Farmacológico Redes', img: 'images/farmaco.png', desc: 'Arsenal de fármacos disponibles en atención primaria, secundaria y terciaria', url: 'files/Arsenal-farmacologico-APS-HBC-SSANORTE-2021.pdf' },
                          { text: 'Manual de Fármacos HHHA', img: 'images/farmacos-ev.png', desc: 'Manual fármacos inyectables HHHA', url: 'https://www.hhha.cl/wp-content/uploads/2022/05/MANUAL_DE_FARMACOS_INYECTABLES_01_VERSION_WEB.pdf' },
                          { text: 'Fármacos en el Embarazo', img: 'images/embarazo.png', desc: 'Recomendaciones farmacológicas en el Embarazo SSASUR', url: 'https://www.araucaniasur.cl/wp-content/uploads/2023/01/GUIA-8-MEDICAMENTOS-EN-EMBARAZO-OK.pdf' },
                          { text: 'Manual Fármacos Enfermeria UFRO', img: 'images/farmaco.png', desc: 'Plataforma creada por Interna de Enfermeria UFRO', url: 'https://farmacosinyectable.wixsite.com/website' }
                        ]
                     },
            { title: 'Plataformas Web', img: 'images/web.png',
                items: [
                          { text: 'iDoctus', img: 'images/idoctus.png', desc: 'Plataforma de dosificación y RAMs de fármacos', url: 'https://idoctus.com/' },
                          { text: 'Drugs Bank', img: 'images/drugsbank.png', desc: 'Especificaciones bioquímicas de fármacos', url: 'https://go.drugbank.com/drugs' },
                          { text: 'ICQ', img: 'images/vademecum.png', desc: 'Catálogo de medicamentos Vademecum', url: 'https://www.iqb.es/cbasicas/farma/farma04/indicea.htm' },
                          { text: 'Interacciones Farmacológicas', img: 'images/fco-medscape.png', desc: 'Interacciones farmacológicas de Medscape', url: 'https://reference.medscape.com/drug-interactionchecker' }
                        ]
                     }
                   ]
                 },
//* -- PILA 6 -- *//
    {
      text: 'Antibióticos', id: 'Antibióticos', img: 'images/bacteria.png',
        sections: [
            { title: 'Antibióticos', img: 'images/bacteria.png',
                items: [
                          { text: 'Arsenal de Antibióticos', img: 'images/medicamento.webp', desc: 'Familias de ATB y espectros que cubren', url: 'files/ATB-EV.pdf' },
                          { text: 'Manual Antibióticos HHHA', img: 'images/hhha.png', desc: 'Guía específica del HHHA', url: 'files/GUIA_ATB_HHHA_DIC_2024_OCR.pdf' },
                          { text: 'Espectros Antibióticos', img: 'images/bacteria.png', desc: 'Susceptibilidad de ATB según bacteria específica', url: 'files/Espectros-ATB-2022.pdf' }
                        ]
                     },
            { title: 'Recursos Web', img: 'images/web.png',
                items: [
                          { text: 'Aware OMS', img: 'images/oms.png', desc: 'Manual uso racional de ATB OMS', url: 'https://iris.who.int/server/api/core/bitstreams/a1e1742d-0875-4d77-8595-4ac4ec3945c8/content' },
                          { text: 'PROA HV', img: 'images/ssasur.png', desc: 'Programa de Optimización del Uso de Antimicrobianos Hospital Villarrica', url: 'https://proa-hospital-villarrica.webnode.cl/' },
                          { text: 'PROA HBLT', img: 'images/ssasur.png', desc: 'Programa de Optimización del Uso de Antimicrobianos Hospital Barros Luco', url: 'https://www.hospitalbarrosluco.gob.cl/programa-de-optimizacion-de-antimicrobianos-proa/' }
                        ]
                     }
                   ]
                 },
//* -- PILA 7 -- *//
    {
      text: 'Herramientas', id: 'Herramientas', img: 'images/herramientas.png',
        sections: [
            { title: 'Recursos', img: 'images/herramientas.png',
                items: [
                           { text: 'Anexos HHHA', img: 'images/phone.png', desc: 'Líneas de Teléfonos HHHA', url: 'anexos.html' },
                           { text: 'Manejos/Indicaciones', img: 'images/tto.png', desc: 'Manejos e Indicaciones generales en urgencias/hospitalizados', url: '' },
                           { text: 'Acerca de', img: 'images/info.png', desc: 'Términos de Uso y Política de Privacidad', url: 'terminos-de-uso-y-politica-de-privacidad.html' }
                        ]
                     },
            { title: 'Software', img: 'images/software.png',
                items: [
                            { text: 'Extensión Accesos Clínicos', img: 'images/accesos-clinicos.png', desc: 'Extensión de navegadores para accesos a servicios clínicos Araucanía Sur', url: 'accesos-clinicos.html' },
                            { text: 'Extractor de Exámenes', img: 'images/test.png', desc: 'Extractor de resultados de exámenes generales', url: 'https://notionmedufro.github.io/ExtractorHIS/' },
                            { text: 'Psiphon', img: 'images/psiphon.png', desc: 'VPN gratuita', url: 'https://drive.google.com/drive/folders/1SeqFDJmYBIvV6SCfcLPskAdEeIkWrI-1?usp=sharing' },
                            { text: 'WPS Office', img: 'images/wps.png', desc: 'Ofimática China gratuita', url: 'https://es.wps.com/' }
                        ]
                     },
            { title: 'Páginas Web', img: 'images/page-web.png',
                 items: [
            { text: 'MDCalc', img: 'images/mdcalc.png', desc: 'Calculadora de scores clínicos', url: 'https://www.mdcalc.com/' },
            { text: 'WiKEM', img: 'images/wikem.png', desc: 'Plataforma de medicina de urgencias', url: 'https://wikem.org/wiki/Main_Page' },
            { text: 'Oncología Chile', img: 'images/cancer.png', desc: 'Resumen de patologías oncológicas según las últimas guías internacionales', url: 'https://chileoncologia.cl/' },
            { text: 'CIE-10', img: 'images/cie-10.png', desc: 'Listado de patologías CIE-10', url: 'https://mediately.co/es/icd' }
          ]
        }
      ]
    }
    
];

