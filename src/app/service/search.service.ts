import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = '/api/artworks';

  constructor(private http: HttpClient) { }

  // 呼叫 API，篩選作品
  getArtworks(catId?: number, styleId?: number): Observable<any[]> {
    // 設定查詢參數
    let params = new HttpParams();
    if (catId) {
      params = params.set('catId', catId.toString());
    }
    if (styleId) {
      params = params.set('styleId', styleId.toString());
    }

    return this.http.get<any[]>(this.baseUrl, { params });
  }
}