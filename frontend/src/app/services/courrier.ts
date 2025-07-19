import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courrier, CourrierAnalysis } from '../models/courrier';

@Injectable({ providedIn: 'root' })
export class CourrierService {
  private readonly api = 'http://localhost:9090/api/courriers';
  private readonly aiApi = 'http://localhost:8000';

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

  analyzeCourrier(imageFile: File): Observable<CourrierAnalysis> {
    const formData = new FormData();
    formData.append('file', imageFile);
    return this.http.post<CourrierAnalysis>(`${this.aiApi}/analyze-courrier`, formData);
  }
}
