import { RenderMode, ServerRoute } from '@angular/ssr';
import { ROUTE_URL } from './common/routes-url';

export const serverRoutes: ServerRoute[] = [
    { path: '', renderMode: RenderMode.Prerender },
    { path: ROUTE_URL.INDEX, renderMode: RenderMode.Prerender },
    { path: ROUTE_URL.ARTIST, renderMode: RenderMode.Prerender },
    { path: `${ROUTE_URL.ARTIST}/${ROUTE_URL.DETAILS}`, renderMode: RenderMode.Prerender },
    { path: ROUTE_URL.ARTWORK, renderMode: RenderMode.Server },
    { path: `${ROUTE_URL.ARTWORK}/${ROUTE_URL.GALLERY}`, renderMode: RenderMode.Server },
    { path: ROUTE_URL.DICTIONARY, renderMode: RenderMode.Prerender },
    { path: `${ROUTE_URL.DICTIONARY}/${ROUTE_URL.CHARACTER}`, renderMode: RenderMode.Prerender },
    { path: '**', renderMode: RenderMode.Prerender }
];
