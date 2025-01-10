import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockBackendService implements HttpInterceptor {
  private mockData: { [email: string]: { id: string; date: string }[] } = {
    'test@test.com': [
      { id: '1', date: '2023-01-01' },
      { id: '2', date: '2023-02-01' },
    ],
    'user@user.com': [
      { id: '3', date: '2023-03-01' },
      { id: '4', date: '2023-04-01' },
    ],
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/login_user') && req.method === 'POST') {
      const { email, password } = req.body;
      if (
        (email === 'test@test.com' && password === '123456') ||
        (email === 'user@user.com' && password === 'password')
      ) {
        return of(
          new HttpResponse({
            status: 200,
            body: true, // Autentificare cu succes
          })
        );
      } else {
        return of(new HttpResponse({ status: 200, body: false })); // Autentificare eșuată
      }
    }

    if (req.url.endsWith('/view_resume') && req.method === 'GET') {
      const email = req.params.get('email');
      const cvs = email ? this.mockData[email] || [] : [];
      return of(
        new HttpResponse({
          status: 200,
          body: cvs,
        })
      );
    }

    if (req.url.includes('/download_cv') && req.method === 'GET') {
      const mockBlob = new Blob(['Mock PDF content'], { type: 'application/pdf' });
      return of(
        new HttpResponse({
          status: 200,
          body: mockBlob,
        })
      );
    }

    if (req.url.includes('/delete_cv') && req.method === 'DELETE') {
      const email = req.params.get('email');
      const cvId = req.params.get('id');
      if (email && this.mockData[email]) {
        this.mockData[email] = this.mockData[email].filter((cv) => cv.id !== cvId);
      }
      return of(new HttpResponse({ status: 200, body: true }));
    }

    return next.handle(req);
  }
}
