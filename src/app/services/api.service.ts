import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  protected baseUrl = environment.baseUrl;
  
  constructor() { }
  
  protected getBaseUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }
}