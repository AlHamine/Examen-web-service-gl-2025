import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Validateur personnalisé email universitaire
function universityEmailValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const email = control.value;
    if (!email) return null;
    const valid = email.endsWith('@univ-zig.sn') || email.endsWith('@zig.univ.sn');
    return valid ? null : { universityEmail: true };
  };
}

// Interface pour le professeur
interface Professeur {
  matricule: string;
  grade: string;
  nom: string;
  prenom: string;
  email: string;
  role: 'ADMIN' | 'LAMBDA';
  status: 'Actif' | 'Inactif';
}

interface Stats {
  total: number;
  actifs: number;
  inactifs: number;
  admins: number;
}

interface Notification {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

@Component({
  selector: 'app-list-prof',
  templateUrl: './list-prof.component.html',
  standalone: true,
  imports: [CommonModule /*, autres modules dont tu as besoin */],
  styleUrls: ['./list-prof.component.css'],
})
export class ListProfComponent implements OnInit {
  // Données des professeurs
  professeurs: Professeur[] = [
    {
        matricule: "181185/D",
        grade: "Professeur Assimilé",
        nom: "DIOP",
        prenom: "Ibrahima",
        email: "ibrahima.diop2010@gmail.com",
        role: "LAMBDA",
        status: "Actif"
    },
    {
        matricule: "179131/D",
        grade: "Maître de conférence titulaire",
        nom: "DIAGNE",
        prenom: "Serigne",
        email: "sdiagne@univ-zig.sn",
        role: "ADMIN",
        status: "Actif"
    },
    {
        matricule: "180001/D",
        grade: "Professeur Assimilé",
        nom: "NDIAYE",
        prenom: "Marie",
        email: "marie.ndiaye@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "180002/D",
        grade: "Maître de conférence titulaire",
        nom: "CISSE",
        prenom: "Papa Alioune",
        email: "pa.c1@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "180003/D",
        grade: "Maître de conférence titulaire",
        nom: "GUEYE",
        prenom: "Abdou Karim",
        email: "akgueye@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "180004/D",
        grade: "Professeur Assimilé",
        nom: "DRAME",
        prenom: "Khadim",
        email: "khadim.drame@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "ROOT",
        grade: "ROOT",
        nom: "NDIAYE",
        prenom: "Seydina",
        email: "smah@gmail.com",
        role: "ADMIN",
        status: "Actif"
    },
    {
        matricule: "180005/D",
        grade: "Professeur Assimilé",
        nom: "NIANG DIATTA",
        prenom: "Daouda",
        email: "dndiatta@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "180006/D",
        grade: "Maître de conférence titulaire",
        nom: "DIALLO",
        prenom: "Thierno Ahmadou",
        email: "t.diallo@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "180007/D",
        grade: "Maître de conférence associé",
        nom: "MBAYE",
        prenom: "Ousseynou",
        email: "ombaye@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "180008/D",
        grade: "Professeur Assimilé",
        nom: "DIALLO",
        prenom: "Ousmane",
        email: "odiallo@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "180009/D",
        grade: "Professeur Assimilé",
        nom: "FAYE",
        prenom: "Youssou",
        email: "yfaye@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "180010/D",
        grade: "Professeur Assimilé",
        nom: "DIENG",
        prenom: "Youssou",
        email: "ydieng@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "180011/D",
        grade: "Maître de conférence associé",
        nom: "NDIAYE",
        prenom: "Idrissa Dit Papis",
        email: "i.ndiaye@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "180012/D",
        grade: "Maître de conférence titulaire",
        nom: "GAYE",
        prenom: "Mouhamadou",
        email: "m.gaye@univ-zig.sn",
        role: "LAMBDA",
        status: "Actif"
    },
    {
        matricule: "180013/D",
        grade: "Maître de conférence",
        nom: "DASYLVA",
        prenom: "Marius",
        email: "mdasylva@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "180014/D",
        grade: "Maître de conférence titulaire",
        nom: "NDOYE",
        prenom: "Malick",
        email: "elm.ndoye@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    },
    {
        matricule: "180015/D",
        grade: "Professeur Assimilé",
        nom: "GAYE",
        prenom: "Khalifa",
        email: "kgaye@univ-zig.sn",
        role: "LAMBDA",
        status: "Inactif"
    }
  ];

  // Propriétés pour la gestion de l'interface
  filteredProfesseurs: Professeur[] = [];
  stats: Stats = { total: 0, actifs: 0, inactifs: 0, admins: 0 };
  
  // Filtres et recherche
  searchTerm: string = '';
  gradeFilter: string = '';
  statusFilter: string = '';
  roleFilter: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  
  // États
  isLoading: boolean = false;
  notification: Notification | null = null;

  // Formulaire et mode édition
  professeurForm!: FormGroup;
  professeurSelectionne: Professeur | null = null;
  modeModification = false;
  showModal = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.calculateStats();
    this.applyFilters();
  }

  // Initialiser le formulaire
  initializeForm(): void {
    this.professeurForm = this.fb.group({
      matricule: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, universityEmailValidator()]],
      role: ['LAMBDA', [Validators.required]],
      status: ['Actif', [Validators.required]]
    });
  }

  // Méthode manquante : obtenir les grades uniques
  getUniqueGrades(): string[] {
    const grades = [...new Set(this.professeurs.map(p => p.grade))];
    return grades.sort();
  }

  // Gestion des notifications
  showNotification(type: 'success' | 'error' | 'info' | 'warning', message: string): void {
    this.notification = { type, message };
    
    setTimeout(() => {
      this.closeNotification();
    }, 5000);
  }

  closeNotification(): void {
    this.notification = null;
  }

  // Gestion des événements clavier
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeNotification();
      if (this.showModal) {
        this.resetForm();
      }
    }
  }

  // Méthodes utilitaires pour le template
  getPaginatedProfesseurs(): Professeur[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProfesseurs.slice(startIndex, endIndex);
  }

  // Calculer les statistiques
  calculateStats(): void {
    this.stats.total = this.professeurs.length;
    this.stats.actifs = this.professeurs.filter(p => p.status === 'Actif').length;
    this.stats.inactifs = this.professeurs.filter(p => p.status === 'Inactif').length;
    this.stats.admins = this.professeurs.filter(p => p.role === 'ADMIN').length;
  }

  // Obtenir les initiales pour l'avatar
  getInitiales(prenom: string, nom: string): string {
    return (prenom.charAt(0) + nom.charAt(0)).toUpperCase();
  }

  // Obtenir les initiales du matricule
  getMatriculeInitials(matricule: string): string {
    if (matricule === 'ROOT') {
      return 'RT';
    }
    if (matricule.includes('/')) {
      return matricule.substring(0, 3).toUpperCase();
    }
    return matricule.substring(0, 2).toUpperCase();
  }

  // Classes CSS pour les badges de statut
  getStatusBadgeClass(status: string): string {
    return status === 'Actif' 
      ? 'bg-green-100 text-green-800 border border-green-200' 
      : 'bg-red-100 text-red-800 border border-red-200';
  }

  // Classes CSS pour les badges de rôle
  getRoleBadgeClass(role: string): string {
    return role === 'ADMIN' 
      ? 'bg-blue-100 text-blue-800 border border-blue-200' 
      : 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  // Fonction de recherche
  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  // Appliquer les filtres
  applyFilters(): void {
    this.isLoading = true;
    
    setTimeout(() => {
      let filtered = [...this.professeurs];

      // Filtre de recherche
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        filtered = filtered.filter(p => 
          p.nom.toLowerCase().includes(term) ||
          p.prenom.toLowerCase().includes(term) ||
          p.matricule.toLowerCase().includes(term) ||
          p.email.toLowerCase().includes(term)
        );
      }

      // Filtre par grade
      if (this.gradeFilter) {
        filtered = filtered.filter(p => p.grade === this.gradeFilter);
      }

      // Filtre par statut
      if (this.statusFilter) {
        filtered = filtered.filter(p => p.status === this.statusFilter);
      }

      // Filtre par rôle
      if (this.roleFilter) {
        filtered = filtered.filter(p => p.role === this.roleFilter);
      }

      this.filteredProfesseurs = filtered;
      this.updatePagination();
      this.isLoading = false;
    }, 300);
  }

  // Mise à jour de la pagination
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProfesseurs.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = 1;
    }
  }

  // Navigation pagination
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Actions sur les professeurs
  openAddModal(): void {
    this.modeModification = false;
    this.professeurSelectionne = null;
    this.showModal = true;
    this.professeurForm.reset({
      role: 'LAMBDA',
      status: 'Actif'
    });
    this.showNotification('info', 'Mode ajout activé');
  }

  editProfesseur(professeur: Professeur): void {
    this.modeModification = true;
    this.professeurSelectionne = professeur;
    this.showModal = true;
    this.professeurForm.patchValue(professeur);
    this.showNotification('info', `Modification de ${professeur.nom} ${professeur.prenom}`);
  }

  viewDetails(professeur: Professeur): void {
    console.log('Voir détails:', professeur);
    const details = `
      Matricule: ${professeur.matricule}
      Nom: ${professeur.nom} ${professeur.prenom}
      Grade: ${professeur.grade}
      Email: ${professeur.email}
      Rôle: ${professeur.role}
      Statut: ${professeur.status}
    `;
    alert(details);
    this.showNotification('info', `Détails de ${professeur.nom} ${professeur.prenom}`);
  }

  toggleStatus(professeur: Professeur): void {
    const newStatus = professeur.status === 'Actif' ? 'Inactif' : 'Actif';
    const action = newStatus === 'Actif' ? 'activé' : 'désactivé';
    
    this.isLoading = true;
    
    setTimeout(() => {
      professeur.status = newStatus;
      this.calculateStats();
      this.isLoading = false;
      
      this.showNotification(
        'success', 
        `${professeur.nom} ${professeur.prenom} a été ${action} avec succès`
      );
    }, 500);
  }

  deleteProfesseur(professeur: Professeur): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer définitivement ${professeur.nom} ${professeur.prenom} ?`)) {
      this.isLoading = true;
      
      setTimeout(() => {
        const index = this.professeurs.findIndex(p => p.matricule === professeur.matricule);
        if (index > -1) {
          this.professeurs.splice(index, 1);
          this.calculateStats();
          this.applyFilters();
        }
        
        this.isLoading = false;
        this.showNotification(
          'success', 
          `${professeur.nom} ${professeur.prenom} a été supprimé définitivement`
        );
      }, 500);
    }
  }

  // Sauvegarder un professeur (ajout ou modification)
  saveProfesseur(): void {
    if (this.professeurForm.valid) {
      this.isLoading = true;
      const professeurData = this.professeurForm.value;

      setTimeout(() => {
        if (this.modeModification && this.professeurSelectionne && this.professeurSelectionne.matricule) {
          // Modification
          const index = this.professeurs.findIndex(p => p.matricule === this.professeurSelectionne!.matricule);
          if (index > -1) {
            this.professeurs[index] = { ...professeurData };
            this.showNotification('success', 'Professeur modifié avec succès');
          }
        } else {
          // Vérification de l'unicité du matricule pour les nouveaux professeurs
          const matriculeExists = this.professeurs.some(p => p.matricule === professeurData.matricule);
          if (matriculeExists) {
            this.isLoading = false;
            this.showNotification('error', 'Ce matricule existe déjà');
            return;
          }
          
          // Ajout
          this.professeurs.push(professeurData);
          this.showNotification('success', 'Professeur ajouté avec succès');
        }

        this.calculateStats();
        this.applyFilters();
        this.isLoading = false;
        this.resetForm();
      }, 800);
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.professeurForm.controls).forEach(key => {
        this.professeurForm.get(key)?.markAsTouched();
      });
      this.showNotification('error', 'Veuillez corriger les erreurs dans le formulaire');
    }
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.professeurForm.reset();
    this.modeModification = false;
    this.professeurSelectionne = null;
    this.showModal = false;
  }

  // Méthode pour réinitialiser tous les filtres
  resetFilters(): void {
    this.searchTerm = '';
    this.gradeFilter = '';
    this.statusFilter = '';
    this.roleFilter = '';
    this.currentPage = 1;
    this.applyFilters();
    this.showNotification('info', 'Filtres réinitialisés');
  }

  // Méthodes utilitaires supplémentaires
  trackByMatricule(index: number, professeur: Professeur): string {
    return professeur.matricule;
  }

  getFullName(professeur: Professeur): string {
    return `${professeur.nom} ${professeur.prenom}`;
  }

  // Méthode pour exporter les données
  exportToCsv(): void {
    const headers = ['Matricule', 'Grade', 'Nom', 'Prénom', 'Email', 'Rôle', 'Statut'];
    const csvContent = [
      headers.join(','),
      ...this.professeurs.map(p => [
        `"${p.matricule}"`,
        `"${p.grade}"`,
        `"${p.nom}"`,
        `"${p.prenom}"`,
        `"${p.email}"`,
        `"${p.role}"`,
        `"${p.status}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'professeurs.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    this.showNotification('success', 'Export CSV terminé avec succès');
  }

  // Méthodes pour les statistiques avancées
  getGradeStats(): { [key: string]: number } {
    const stats: { [key: string]: number } = {};
    this.professeurs.forEach(p => {
      stats[p.grade] = (stats[p.grade] || 0) + 1;
    });
    return stats;
  }

  getMostCommonGrade(): string {
    const gradeStats = this.getGradeStats();
    return Object.keys(gradeStats).reduce((a, b) => 
      gradeStats[a] > gradeStats[b] ? a : b, '');
  }

  // Méthode pour obtenir un résumé des filtres actifs
  getActiveFiltersCount(): number {
    let count = 0;
    if (this.searchTerm) count++;
    if (this.gradeFilter) count++;
    if (this.statusFilter) count++;
    if (this.roleFilter) count++;
    return count;
  }

  // Méthode pour générer un matricule automatique
  generateMatricule(): string {
    const year = new Date().getFullYear();
    const lastMatricule = this.professeurs
      .map(p => p.matricule)
      .filter(m => m.includes('/'))
      .sort()
      .pop();
    
    let nextNumber = 1;
    if (lastMatricule) {
      const match = lastMatricule.match(/(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }
    
    return `${nextNumber.toString().padStart(6, '0')}/D`;
  }
}