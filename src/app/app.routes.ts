import { Routes } from '@angular/router';
import { ROUTE_URL } from './common/routes-url';

export const routes: Routes = [
    {
        path: ROUTE_URL.INDEX,
        loadComponent: () => import('./pages/index/index').then(c => c.Index)
    },
    {
        path: ROUTE_URL.ARTIST,
        loadChildren: () => import('./pages/artist/artist.routes').then(m => m.ARTIST_ROUTES), // 懶加載 Artist 模塊
    },
    {
        path: ROUTE_URL.ARTWORK,
        loadChildren: () => import('./pages/artwork/artwork.routes').then(m => m.ARTWORK_ROUTES), // 懶加載 Artwork 模塊
    },
    {
        path: ROUTE_URL.DICTIONARY,
        loadChildren: () => import('./pages/dictionary/dictionary.routes').then(m => m.DICTIONARY_ROUTES), // 懶加載 Dictionary 模塊
    },
    {
        path: '', redirectTo: ROUTE_URL.INDEX, pathMatch: 'full' // 默認跳轉到 /artwork
    },
    {
        path: '**', redirectTo: ROUTE_URL.INDEX // 若無匹配，跳轉到 /
    }
];