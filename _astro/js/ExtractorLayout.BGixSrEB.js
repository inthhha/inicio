import { d as createAstro, c as createComponent, b as addAttribute, e as renderSlot, f as renderHead, a as renderTemplate } from './astro/server.B-AvounA.js';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro("https://inthhha.github.io");
const $$ExtractorLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ExtractorLayout;
  const base = "/inicio/";
  const { title, description = "", ogImage = `${base}images/lab.webp`, ogUrl = "" } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:url"${addAttribute(ogUrl, "content")}><meta property="og:type" content="website"><link rel="icon" type="image/webp"${addAttribute(`${base}images/lab.webp`, "href")}>${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/cote/Descargas/inthhha-github-version/src/layouts/ExtractorLayout.astro", void 0);

export { $$ExtractorLayout as $ };
