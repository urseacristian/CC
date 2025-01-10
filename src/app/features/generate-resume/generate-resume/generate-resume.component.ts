import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BackendService } from '../../../service/services/backend.service'; 

@Component({
  selector: 'app-generate-resume',
  standalone: false,
  templateUrl: './generate-resume.component.html',
  styleUrls: ['./generate-resume.component.scss']
})
export class GenerateResumeComponent implements OnInit {
  resumeForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private backendService: BackendService) {}

  ngOnInit(): void {
    this.resumeForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      summary: [''],
      skills: this.fb.array([this.createSkillGroup()]),
      experiences: this.fb.array([this.createExperienceGroup()]),
      educations: this.fb.array([this.createEducationGroup()]),
      courses: this.fb.array([this.createCourseGroup()])
    });
  }

  createSkillGroup(): FormGroup {
    return this.fb.group({ skill: [''] });
  }

  createExperienceGroup(): FormGroup {
    return this.fb.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      responsibilities: ['']
    });
  }

  createEducationGroup(): FormGroup {
    return this.fb.group({
      institution: ['', Validators.required],
      degree: ['', Validators.required],
      fieldOfStudy: [''],
      startDate: ['', Validators.required],
      endDate: ['']
    });
  }

  createCourseGroup(): FormGroup {
    return this.fb.group({
      courseName: ['', Validators.required],
      institution: ['', Validators.required],
      completionDate: ['']
    });
  }

  get skills(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }

  get experiences(): FormArray {
    return this.resumeForm.get('experiences') as FormArray;
  }

  get educations(): FormArray {
    return this.resumeForm.get('educations') as FormArray;
  }

  get courses(): FormArray {
    return this.resumeForm.get('courses') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.createSkillGroup());
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  addExperience(): void {
    this.experiences.push(this.createExperienceGroup());
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  addEducation(): void {
    this.educations.push(this.createEducationGroup());
  }

  removeEducation(index: number): void {
    this.educations.removeAt(index);
  }

  addCourse(): void {
    this.courses.push(this.createCourseGroup());
  }

  removeCourse(index: number): void {
    this.courses.removeAt(index);
  }

  onSubmit(): void {
    if (this.resumeForm.valid) {
      this.isLoading = true;
      this.backendService.generateCv(this.resumeForm.value).subscribe({
        next: (response) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'resume.pdf';
          a.click();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          alert('Failed to generate CV. Please try again.');
          this.isLoading = false;
        }
      });
    }
  }

  goBack(): void {
    this.isLoading = false;
    window.history.back();
  }
}
