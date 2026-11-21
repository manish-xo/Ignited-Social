/**
 * Is `href` the page the visitor is on? Used to colour the active navbar link.
 * Home is also active on /service (the same content), and every other link
 * stays active on its sub-pages, e.g. /case-studies/anything.
 */
export function isActiveLink(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/" || pathname === "/service";
  return pathname === href || pathname.startsWith(`${href}/`);
}
