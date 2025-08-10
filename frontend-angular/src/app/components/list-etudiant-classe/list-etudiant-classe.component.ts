import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from 'src/app/models/etudiant';
import { Classe } from 'src/app/models/classe';
import { ClasseService } from 'src/app/services/classe.service';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
selector: 'app-list-etudiant-classe',
templateUrl: './list-etudiant-classe.component.html',
styleUrls: ['./list-etudiant-classe.component.css']
})
export class ListEtudiantClasseComponent implements OnInit {
etudiants: Etudiant[] = [];
classeId!: string;
classeNom!: string;

etudiantForm!: FormGroup;
etudiantSelectionne: Etudiant | null = null;
modeModification = false;

constructor(
private route: ActivatedRoute,
private classeClient: ClasseService,
private etudiantService: EtudiantService,
private router: Router,
private fb: FormBuilder,

) {}

ngOnInit(): void {
this.classeId = this.route.snapshot.paramMap.get('id')!;
this.listerEtudiants();
this.recupererClasse();
 this.initForm();
}

listerEtudiants(): void {
this.classeClient.listerEtudiantsClasse(this.classeId).subscribe((data) => {
this.etudiants = data;
});
}

recupererClasse(): void {
this.classeClient.details(this.classeId).subscribe((classe: Classe) => {
this.classeNom = classe.libelle;
});
}



ouvrirModal(edition: boolean = false, etudiant?: Etudiant): void {
const modal = document.getElementById('etudiantModal');
if (!modal) return;

this.modeModification = edition;

if (edition && etudiant) {
this.etudiantSelectionne = etudiant;
this.etudiantForm.patchValue(etudiant);
} else {
this.etudiantSelectionne = null;
this.etudiantForm.reset();
}

modal.classList.remove('hidden');
}

fermerModal(): void {
const modal = document.getElementById('etudiantModal');
if (modal) modal.classList.add('hidden');

this.etudiantForm.reset();
this.etudiantSelectionne = null;
this.modeModification = false;
}

/**
* Navigue vers le profil détaillé d'un étudiant
*/
voirProfil(etudiantId: string): void {
this.router.navigate(['/etudiant/'+etudiantId+'/profil']);
// ou selon votre structure de routes :
// this.router.navigate(['/profil-etudiant', etudiantId]);
}

/**
* Met à jour le formulaire pour inclure tous les champs du template
*/
initForm(): void {
this.etudiantForm = this.fb.group({
matricule: [''],
nom: ['', Validators.required],
prenom: ['', Validators.required],
telephone: [''],
email: ['', [Validators.email]], // Validation email
adresse: [''],
dateNaissance: [''],
statut: ['actif'], // Valeur par défaut
classeId: ['', Validators.required],
// Champs tuteur (optionnels)
nomTuteur: [''],
telephoneTuteur: ['']
});
}

/**
* Génère automatiquement un matricule si non fourni
*/
private genererMatricule(): string {
const annee = new Date().getFullYear();
const numero = (this.etudiants.length + 1).toString().padStart(3, '0');
return `ETU${annee}${numero}`;
}

/**
* Met à jour la méthode onSubmit pour gérer le matricule automatique
*/
onSubmit(): void {
if (this.etudiantForm.invalid) {
this.etudiantForm.markAllAsTouched();
return;
}

const formValue = this.etudiantForm.value;
// Générer un matricule si non fourni
if (!formValue.matricule && !this.modeModification) {
formValue.matricule = this.genererMatricule();
}

if (this.modeModification && this.etudiantSelectionne) {
// Modification
this.etudiantService
.modifierEtudiant(this.etudiantSelectionne.id!, formValue)
.subscribe({
next: () => {
this.etudiants = this.etudiants.map(e =>
e.id === this.etudiantSelectionne!.id ? { ...e, ...formValue } : e
);
console.log('Étudiant modifié avec succès');
this.fermerModal();
// Optionnel : afficher un message de succès
this.afficherMessage('Étudiant modifié avec succès', 'success');
},
error: (err) => {
console.error('Erreur modification:', err);
this.afficherMessage('Erreur lors de la modification', 'error');
}
});
} else {
// Ajout
this.etudiantService.ajouterEtudiant(formValue).subscribe({
next: (nouvelEtudiant) => {
console.log('Étudiant ajouté avec succès');
this.etudiants = [...this.etudiants, nouvelEtudiant]; // Mise à jour immédiate
this.fermerModal();
// this.chargerEtudiants();
// this.ngOnInit();
this.afficherMessage('Étudiant ajouté avec succès', 'success');

},
error: (err) => {
console.error('Erreur ajout:', err);
this.afficherMessage('Erreur lors de l\'ajout', 'error');
}
});
}
}
private afficherMessage(message: string, type: 'success' | 'error'): void {
// Vous pouvez utiliser une librairie comme ngx-toastr
// ou créer votre propre système de notification
console.log(`${type.toUpperCase()}: ${message}`);
// Exemple simple avec alert (à remplacer par une vraie notification)
if (type === 'success') {
// alert(message); // Remplacer par votre système de notification
} else {
// alert(message); // Remplacer par votre système de notification
}
}

/**
* Améliore la méthode de suppression avec une confirmation plus élégante
*/
supprimer(id: string): void {
// Vous pouvez remplacer le confirm() par une modal de confirmation plus élégante
if (confirm('⚠️ Attention!\n\nÊtes-vous sûr de vouloir supprimer cet étudiant?\nCette action est irréversible.')) {
this.etudiantService.supprimerEtudiant(id).subscribe({
next: () => {
console.log('Étudiant supprimé avec succès');
// this.chargerEtudiants();
// this.ngOnInit();
this.etudiants = this.etudiants.filter(e => e.id !== id);
this.afficherMessage('Étudiant supprimé avec succès', 'success');
},
error: (err) => {
console.error('Erreur suppression:', err);
this.afficherMessage('Erreur lors de la suppression', 'error');
}
});
}
}

/**
* Méthode pour filtrer les étudiants (optionnel pour la recherche)
*/
filtrerEtudiants(terme: string): void {
if (!terme.trim()) {
this.listerEtudiants();
return;
}

this.etudiantService.listerEtudiants().subscribe({
next: (data) => {
this.etudiants = data.filter(etudiant => 
etudiant.nom.toLowerCase().includes(terme.toLowerCase()) ||
etudiant.prenom.toLowerCase().includes(terme.toLowerCase()) ||
etudiant.matricule.toLowerCase().includes(terme.toLowerCase())
);
},
error: (err) => console.error('Erreur filtrage:', err)
});
}

/**
* Méthode pour gérer la fermeture du modal avec Escape
*/
@HostListener('document:keydown.escape', ['$event'])
onEscapeKey(event: KeyboardEvent): void {
this.fermerModal();
}

/**
* Méthode pour valider le formulaire en temps réel
*/
isFieldInvalid(fieldName: string): boolean {
const field = this.etudiantForm.get(fieldName);
return !!(field && field.invalid && (field.dirty || field.touched));
}

/**
* Méthode pour obtenir le message d'erreur d'un champ
*/
getFieldError(fieldName: string): string {
const field = this.etudiantForm.get(fieldName);
if (field?.errors) {
if (field.errors['required']) return `${fieldName} est requis`;
if (field.errors['email']) return 'Email invalide';
if (field.errors['minlength']) return `${fieldName} trop court`;
}
return '';
}


}

