
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface Demande {
    id?: number;
    titre: string;
    description?: string;
    status: 'OUVERT' | 'EN_COURS' | 'FERME';
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
        return this.http.get<{ content: Demande[], totalElements: number }>(url).pipe(
            catchError(error => {
                console.error('Erreur:', error.error);
                return throwError(() => new Error(error.error.message || 'Erreur serveur'));
            })
        );
    }

    getDemande(id: number): Observable<Demande> {
        return this.http.get<Demande>(`${this.apiUrl}/${id}`).pipe(
catchError(error => {
  console.error('Erreur:', error.error);
  return throwError(() => new Error(error.error.message || 'Demande non trouvée'));
})
);
}

createDemande(demande: Demande): Observable<Demande> {
  return this.http.post<Demande>(this.apiUrl, demande).pipe(
    catchError(error => {
      console.error('Erreur:', error.error);
      return throwError(() => new Error(error.error.message || 'Erreur serveur'));
    })
  );
}

updateDemande(id: number, demande: Demande): Observable<Demande> {
  return this.http.put<Demande>(`${this.apiUrl}/${id}`, demande).pipe(
    catchError(error => {
      console.error('Erreur:', error.error);
      return throwError(() => new Error(error.error.message || 'Erreur serveur'));
    })
  );
}

deleteDemande(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
    catchError(error => {
      console.error('Erreur:', error.error);
      return throwError(() => new Error(error.error.message || 'Erreur serveur'));
    })
  );
}
}
