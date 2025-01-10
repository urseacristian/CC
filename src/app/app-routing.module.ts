import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./features/sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  {
    path: 'generate-resume',
    loadChildren: () =>
      import('./features/generate-resume/generate-resume.module').then(
        (m) => m.GenerateResumeModule
      ),
  },
  {
    path: 'view-cvs',
    loadChildren: () =>
      import('./features/view-cvs/view-cvs.module').then((m) => m.ViewCvsModule),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
