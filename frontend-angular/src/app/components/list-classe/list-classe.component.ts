

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasseService } from 'src/app/services/classe.service';
import { Classe } from 'src/app/models/classe'; // adapte selon ton modèle
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-classe',
  templateUrl: './list-classe.component.html',
  styleUrls: ['./list-classe.component.css'],
})
export class ListClasseComponent implements OnInit {
  classes: Classe[] = [];
  classeForm!: FormGroup;
  classeSelectionnee: Classe | null = null;
  modeModification: boolean = false;

  constructor(private fb: FormBuilder, private classeService: ClasseService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.chargerClasses();
  }

  initForm(): void {
    this.classeForm = this.fb.group({
      libelle: ['', Validators.required],
      niveau: ['', Validators.required],
      specialite: ['', Validators.required],
      departement: ['', Validators.required],
    });
  }

  chargerClasses(): void {
    this.classeService.listerClasses().subscribe({
      next: (data) => (this.classes = data),
      error: (err) => console.error('Erreur chargement classes:', err),
    });
  }

  ouvrirModal(edition: boolean = false, classe?: Classe): void {
    const modal = document.getElementById('ajouterClasseModal');
    if (!modal) return;

    this.modeModification = edition;

    if (edition && classe) {
      this.classeSelectionnee = classe;
      this.classeForm.patchValue(classe);
    } else {
      this.classeSelectionnee = null;
      this.classeForm.reset();
    }
    modal.classList.remove('hidden');
  }

  fermerModal(): void {
    const modal = document.getElementById('ajouterClasseModal');
    if (modal) modal.classList.add('hidden');

    this.classeForm.reset();
    this.classeSelectionnee = null;
    this.modeModification = false;
  }

  onSubmit(): void {
    if (this.classeForm.invalid) return;

    const formValue = this.classeForm.value;

    if (this.modeModification && this.classeSelectionnee) {
      // Modifier
      this.classeService.modifierClasse(this.classeSelectionnee.id!, formValue).subscribe({
        next: () => {
           this.classes = this.classes.map(e =>
            e.id === this.classeSelectionnee!.id ? { ...e, ...formValue } : e
          );
          console.log('Classe modifiée');
          this.fermerModal();
          this.chargerClasses();
        },
        error: (err) => console.error('Erreur modification:', err),
      });
    } else {
      // Ajouter
      this.classeService.ajouterClasse(formValue).subscribe({
        next: (nouvelClasse) => {
          console.log('Classe ajoutée');
          this.classes = [...this.classes, nouvelClasse]; // Mise à jour immédiate
          this.fermerModal();
          this.chargerClasses();
        },
        error: (err) => console.error('Erreur ajout:', err),
      });
    }
  }

  supprimer(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette classe ?')) {
      this.classeService.supprimerClasse(id).subscribe({
        next: () => {
          console.log('Classe supprimée');
          // this.chargerClasses();
          this.classes = this.classes.filter(e => e.id !== id);

        },
        error: (err) => console.error('Erreur suppression:', err),
      });
    }
  }

  details(id: string): void {
    this.router.navigate(['/classe', id, 'etudiants']);
  }
}

