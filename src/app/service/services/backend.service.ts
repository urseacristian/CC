import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  loginUser(credentials: { email: string; password: string }): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/login_user`, credentials);
  }

  signUpUser(data: { email: string; password: string }): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/sign_up_user`, data);
  }

  generateCv(cvData: any): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/generate_cv`, cvData, { responseType: 'blob' });
  }

  viewResume(email: string): Observable<{ id: string; date: string }[]> {
    const params = new HttpParams().set('email', email);
    return this.http.get<{ id: string; date: string }[]>(`${this.baseUrl}/view_resume`, { params });
  }

  downloadCv(cvId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download_cv?id=${cvId}`, { responseType: 'blob' });
  }

  deleteCv(cvId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/delete_cv?id=${cvId}`);
  }
}
