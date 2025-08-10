import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ListClasseComponent } from './components/list-classe/list-classe.component';
import { ListEtudiantComponent } from './components/list-etudiant/list-etudiant.component';
import { ListEtudiantClasseComponent } from './components/list-etudiant-classe/list-etudiant-classe.component';
import { ProfileEtudiantComponent } from './components/profile-etudiant/profile-etudiant.component';
import { ListProfComponent } from './components/list-prof/list-prof.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'classe', component: ListClasseComponent },
  { path: 'etudiant', component: ListEtudiantComponent },
  { path: 'classe/:id/etudiants', component: ListEtudiantClasseComponent},
  { path: 'etudiant/:id/profil', component: ProfileEtudiantComponent},
  { path: 'prof', component: ListProfComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
