import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courrier } from '../models/courrier';

@Injectable({ providedIn: 'root' })
export class CourrierService {
  private readonly api = 'http://localhost:9090/api/courriers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Courrier[]> {
    return this.http.get<Courrier[]>(this.api);
  }

  updateCourrier(id: number, data: any): Observable<Courrier> {
    return this.http.put<Courrier>(`${this.api}/${id}`, data);
  }

  deleteCourrier(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
