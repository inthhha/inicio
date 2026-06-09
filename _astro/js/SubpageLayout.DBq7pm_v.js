import { d as createAstro, c as createComponent, b as addAttribute, f as renderHead, r as renderComponent, e as renderSlot, a as renderTemplate } from './astro/server.B-AvounA.js';
import 'kleur/colors';
import 'html-escaper';
/* empty css                        */
import { b as $$Header, a as $$Footer, $ as $$EasterEgg } from './EasterEgg.BqHq421R.js';
/* empty css                                   */

const $$Astro = createAstro("https://inthhha.github.io");
const $$SubpageLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SubpageLayout;
  const base = "/inicio/";
  const pageTitle = Astro2.props.title ?? "Internado HHHA";
  const pageDescription = Astro2.props.description ?? "Plataforma creado por la carrera de Medicina UFRO para facilitar el acceso a plataformas clínicas.";
  const ogImage = Astro2.props.ogImage ?? "https://inthhha.github.io/inicio/images/hospital.webp";
  const ogUrl = Astro2.props.ogUrl ?? "https://inthhha.github.io/inicio/";
  return renderTemplate`<html lang="es" data-astro-cid-ttjzikh5> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${pageTitle}</title><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(pageDescription, "content")}><meta name="description"${addAttribute(pageDescription, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:url"${addAttribute(ogUrl, "content")}><meta property="og:type" content="website"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; font-src 'self' https://cdnjs.cloudflare.com; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com; img-src 'self' data: https:;"><link rel="icon" type="image/webp"${addAttribute(`${base}images/hospital.webp`, "href")}>${renderHead()}</head> <body data-astro-cid-ttjzikh5> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-ttjzikh5": true })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-ttjzikh5": true })} ${renderComponent($$result, "EasterEgg", $$EasterEgg, { "data-astro-cid-ttjzikh5": true })}  </body> </html>`;
}, "/home/cote/Descargas/inthhha-github-version/src/layouts/SubpageLayout.astro", void 0);

export { $$SubpageLayout as $ };
