import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../service/services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cvs',
  standalone: false,
  templateUrl: './view-cvs.component.html',
  styleUrls: ['./view-cvs.component.scss'],
})
export class ViewCvsComponent implements OnInit {
  cvs: { id: string; date: string }[] = [];
  displayedColumns: string[] = ['id', 'date', 'actions'];
  email: string | null = null;

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { email: string };
    this.email = state?.email || null;

    if (this.email) {
      this.fetchCVs(this.email);
    } else {
      console.error('Email is not provided. Redirecting to login.');
      this.router.navigate(['/login']);
    }
  }

  fetchCVs(email: string): void {
    this.backendService.viewResume(email).subscribe({
      next: (data) => {
        this.cvs = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  downloadCV(cvId: string): void {
    this.backendService.downloadCv(cvId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume-${cvId}.pdf`;
        a.click();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to download CV.');
      },
    });
  }

  deleteCV(cvId: string): void {
    this.backendService.deleteCv(cvId).subscribe({
      next: (response) => {
        if (response) {
          this.cvs = this.cvs.filter((cv) => cv.id !== cvId);
          alert('CV deleted successfully.');
        } else {
          alert('Failed to delete CV.');
        }
      },
      error: (err) => {
        console.error(err);
        alert('An error occurred while deleting the CV.');
      },
    });
  }
}
