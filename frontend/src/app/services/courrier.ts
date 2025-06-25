import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courrier } from '../models/courrier';

@Injectable({ providedIn: 'root' })
export class CourrierService {
  private readonly api = '/api/courriers';   // will be proxied ↓ or hit CORS-enabled backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<Courrier[]> {
    return this.http.get<Courrier[]>(this.api);
  }
}
