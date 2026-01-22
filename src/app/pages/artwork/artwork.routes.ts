import { Routes } from '@angular/router';
import { Artwork } from './artwork';
import { ROUTE_URL } from '../../common/routes-url';

export const ARTWORK_ROUTES: Routes = [
  { path: '', component: Artwork }, // 根路徑 Artwork
  { path: ROUTE_URL.GALLERY, component: Artwork }, // 子路徑 /artwork/gallery
];