import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../common/models/item';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class MemberService extends ApiService {

  constructor(private http: HttpClient) { 
    super();
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.getBaseUrl('restAPI/member/list'));
  }
  
}