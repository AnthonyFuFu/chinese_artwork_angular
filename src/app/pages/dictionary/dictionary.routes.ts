import { Routes } from '@angular/router';
import { Dictionary } from './dictionary';
import { ROUTE_URL } from '../../common/routes-url';

export const DICTIONARY_ROUTES: Routes = [
  { path: '', component: Dictionary }, // 根路徑顯示 Dictionary
  { path: ROUTE_URL.CHARACTER, component: Dictionary }, // 示例：子路徑 /dictionary/character
];