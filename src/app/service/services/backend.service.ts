import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of} from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private authUrl = 'http://auth-generator:9091/auth';
  private cvGeneratorUrl = 'http://cv-generator:9092/cv';
  // private authUrl = 'http://localhost:9091/auth';
  // private cvGeneratorUrl = 'http://localhost:9092/cv';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  loginUser(credentials: { email: string; password: string }): Observable<boolean> {
    return this.http.post<boolean>(`${this.authUrl}/login_user`, credentials);
    // return of(true);
  }
  

  signUpUser(data: { email: string; password: string }): Observable<boolean> {
    return this.http.post<boolean>(`${this.authUrl}/sign_up_user`, data);
  }

  generateCv(cvData: any): Observable<Blob> {
    return this.http.post(`${this.cvGeneratorUrl}/generate_cv`, cvData, { responseType: 'blob' });
  }

  viewResume(email: string): Observable<{ id: string; date: string }[]> {
    return this.http.post<{ id: string; date: string }[]>(`${this.cvGeneratorUrl}/view_resume`, { email });
  }

  downloadCv(cvId: string): Observable<Blob> {
    return this.http.post(`${this.cvGeneratorUrl}/download_cv`, { id: cvId }, { responseType: 'blob' });
  }

  deleteCv(cvId: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.cvGeneratorUrl}/delete_cv`, { id: cvId });
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }

  get isLoggedIn$() {
    return this.isLoggedInSubject.asObservable();
  }
}
