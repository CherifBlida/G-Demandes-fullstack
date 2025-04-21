import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Demande {
  id?: number;
  titre: string;
  description?: string;
  status: 'OUVERT' | 'EN_COURS' | 'FERMÉ';
  dateCreation: string;
  demandeurEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:8080/api/demandes';

  constructor(private http: HttpClient) {}

  getDemandes(page: number, size: number, titre: string = '', status: string = ''): Observable<{ content: Demande[], totalElements: number }> {
    let url = `${this.apiUrl}?page=${page}&size=${size}`;
    if (titre || status) {
      url += `&titre=${encodeURIComponent(titre)}`;
      if (status) url += `&status=${status}`;
    }
    return this.http.get<{ content: Demande[], totalElements: number }>(url);
  }

  getDemande(id: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.apiUrl}/${id}`);
  }

  createDemande(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.apiUrl, demande);
  }

  updateDemande(id: number, demande: Demande): Observable<Demande> {
    return this.http.put<Demande>(`${this.apiUrl}/${id}`, demande);
  }

  deleteDemande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
