// One list of routes for the whole site. The app reads it for page titles and
// scripts/generate-static-routes.mjs reads the same JSON at build time to write
// one index.html per route, 404.html and sitemap.xml. Add a new page here first.
import data from './routes.json';

export interface RouteMeta {
  title: string;
  description: string;
}

export interface PageRoute extends RouteMeta {
  path: string;
}

export const SITE_URL: string = data.siteUrl;
export const pageRoutes: PageRoute[] = data.pages;
export const notFoundMeta: RouteMeta = data.notFound;

export const getRouteMeta = (path: string): RouteMeta => {
  const route = pageRoutes.find((r) => r.path === path);
  if (!route) throw new Error(`No route meta for ${path}. Add it to src/routes.json`);
  return { title: route.title, description: route.description };
};

export const caseStudyTitle = (title: string): string => `${title}${data.caseStudyTitleSuffix}`;
