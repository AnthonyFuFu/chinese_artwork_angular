import { Routes } from '@angular/router';
import { Artist } from './artist';
import { ROUTE_URL } from '../../common/routes-url';

export const ARTIST_ROUTES: Routes = [
  { path: '', component: Artist }, // 根路徑 Artist
  { path: ROUTE_URL.DETAILS, component: Artist }, // 子路徑 /artist/details
];