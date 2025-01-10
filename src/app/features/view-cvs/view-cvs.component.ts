import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../service/services/backend.service';

@Component({
  selector: 'app-view-cvs',
  standalone: false,
  templateUrl: './view-cvs.component.html',
  styleUrls: ['./view-cvs.component.scss'],
})
export class ViewCvsComponent implements OnInit {
  cvs: { id: string; date: string }[] = [];
  displayedColumns: string[] = ['id', 'date', 'actions'];

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.fetchCVs();
  }

  fetchCVs(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.backendService.viewResume(email).subscribe({
        next: (data) => {
          this.cvs = data;
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      console.error('No email found in localStorage');
    }
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
