import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Etudiant } from 'src/app/models/etudiant';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-etudiant',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-etudiant.component.html',
  styleUrls: ['./profile-etudiant.component.css']
})
export class ProfileEtudiantComponent implements OnInit {
  etudiant: Etudiant | null = null;
  etudiantId!: string;
  loading = true;
  error = false;
  
  // Mode édition
  modeEdition = false;
  etudiantForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private etudiantService: EtudiantService,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.etudiantId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.chargerProfilEtudiant();
  }

  /**
   * Charge les informations de l'étudiant
   */
  chargerProfilEtudiant(): void {
    this.loading = true;
    this.error = false;

    this.etudiantService.rechercherEtudiant(this.etudiantId).subscribe({
      next: (etudiant: Etudiant) => {
        this.etudiant = etudiant;
        this.etudiantForm.patchValue(etudiant);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  /**
   * Initialise le formulaire d'édition
   */
  initForm(): void {
    this.etudiantForm = this.fb.group({
      matricule: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: [''],
      adresse: ['']
    });
  }

  /**
   * Active/désactive le mode édition
   */
  toggleModeEdition(): void {
    this.modeEdition = !this.modeEdition;
    
    if (!this.modeEdition) {
      // Réinitialiser le formulaire si on annule
      this.etudiantForm.patchValue(this.etudiant || {});
    }
  }

  /**
   * Sauvegarde les modifications
   */
  sauvegarderModifications(): void {
    if (this.etudiantForm.invalid) {
      this.etudiantForm.markAllAsTouched();
      return;
    }

    const formValue = this.etudiantForm.value;
    
    this.etudiantService.modifierEtudiant(this.etudiantId, formValue).subscribe({
      next: (etudiantModifie) => {
        this.etudiant = etudiantModifie;
        this.modeEdition = false;
        this.afficherMessage('Profil modifié avec succès', 'success');
      },
      error: (err) => {
        console.error('Erreur lors de la modification:', err);
        this.afficherMessage('Erreur lors de la modification', 'error');
      }
    });
  }

  /**
   * Retour à la liste des étudiants
   */
  retourListe(): void {
  this.location.back();
}

  /**
   * Affiche un message (à remplacer par votre système de notification)
   */
  private afficherMessage(message: string, type: 'success' | 'error'): void {
    console.log(`${type.toUpperCase()}: ${message}`);
  }

  /**
   * Vérifie si un champ est invalide
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.etudiantForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Supprime l'étudiant
   */
  supprimerEtudiant(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.etudiantService.supprimerEtudiant(this.etudiantId).subscribe({
        next: () => {
          this.afficherMessage('Étudiant supprimé avec succès', 'success');
          this.retourListe();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          this.afficherMessage('Erreur lors de la suppression', 'error');
        }
      });
    }
  }
}