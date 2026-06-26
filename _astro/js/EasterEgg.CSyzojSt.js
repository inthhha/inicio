import { c as createComponent, m as maybeRenderHead, a as renderTemplate, b as addAttribute } from './astro/server.B-AvounA.js';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                        */
/* empty css                        */

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="main-header-container"> <div class="header-top-area"> <div class="header-gradient-section"> <div class="ssasur-logo-hhha"> <div class="logo-blue-hhha"></div> <div class="logo-red-hhha"></div> </div> <div class="header-text-content"> <h1>INTERNADO HHHA</h1> <div style="display: flex; align-items: center; gap: 8px;"> <p style="margin: 0;">Servidor alternativo</p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));"> <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"></path> </svg> </div> </div> <button class="header-search-btn" id="site-search-trigger" aria-label="Buscar en IntHHHA (Ctrl+F)" title="Buscar en IntHHHA"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"> <circle cx="11" cy="11" r="8"></circle> <line x1="21" y1="21" x2="16.65" y2="16.65"></line> </svg> </button> </div> </div> <div class="toolbar-area"> <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Abrir menú"> <span>☰</span> Menú
</button> <div id="toolbar-menu-root" class="toolbar-menu-root"></div> </div> <div id="megamenu-panel-container"></div> </header>`;
}, "/home/cote/Descargas/inthhha/inthhha-github-version/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const base = "/inicio/";
  return renderTemplate`${maybeRenderHead()}<footer class="main-footer sidebar-footer-hhha adapted-footer"> <div class="credits-text-hhha mt-tiny"> <img loading="lazy"${addAttribute(`${base}images/medufro.webp`, "src")} alt="Logo Medicina UFRO" class="ufro-small-logo"> <strong>Hecho por Medicina UFRO</strong> - Una plataforma para facilitar el acceso a Servicios Clínicos.
</div> <div class="credits-text-hhha mt-small"> <img loading="lazy"${addAttribute(`${base}images/operator.webp`, "src")} alt="Logo Medicina UFRO" class="ufro-small-logo"> <strong>Contacto y Soporte Técnico:</strong> inthhha@gmail.com
</div> </footer>`;
}, "/home/cote/Descargas/inthhha/inthhha-github-version/src/components/Footer.astro", void 0);

const $$EasterEgg = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="easterEggOverlay" class="easter-egg-overlay"> <div class="easter-egg-panel"> <button class="easter-egg-close" id="easterEggClose" aria-label="Cerrar panel">×</button> <div class="easter-egg-header"> <h2 class="easter-egg-title">"El sostén del regreso frente a la fragilidad del viaje"...</h2> </div> <div class="easter-egg-footer">
"Querida amiga....espero que este sea tu mejor viaje, y espero que cuando sientas la soledad y tristeza en este mundo frío y cruel, escuches a tu corazón y recuerdes que eres amada y que siempre lo serás. Que la fragilidad nos vuelve gentilez, que la gentileza no quita lo valiente, que el amor y cariño sea lo que te devuelva a casa a pesar de todos tus aciertos y todos tus errores, porque la verdad, si lo piensas bien y le das una que otra vuelta, te das cuenta que esta es la vida que hemos decidido vivir, tal y como la tenemos. Porque nos sirve como fuente de inspiración para quienes queremos, estemos ahí o no para ellos&quot;. - <strong>Interno UFRO Anónimo</strong> </div> </div> </div>`;
}, "/home/cote/Descargas/inthhha/inthhha-github-version/src/components/EasterEgg.astro", void 0);

export { $$EasterEgg as $, $$Footer as a, $$Header as b };
