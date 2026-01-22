import { RenderMode, ServerRoute } from '@angular/ssr';
import { ROUTE_URL } from './common/routes-url';

export const serverRoutes: ServerRoute[] = [
  { path: ROUTE_URL.INDEX, renderMode: RenderMode.Server },
  { path: ROUTE_URL.ARTIST, renderMode: RenderMode.Server },
  { path: ROUTE_URL.ARTWORK, renderMode: RenderMode.Server },
  { path: ROUTE_URL.DICTIONARY, renderMode: RenderMode.Server },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
