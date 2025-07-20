import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { CourrierService } from '../../services/courrier';

interface CourrierRow {
  expediteur:   string;
  destinataire: string;
  date:         string;
  status:       'Entrants' | 'Sortnats';
}

@Component({
  selector: 'app-entrants',
  imports: [CommonModule, FormsModule],
  templateUrl: './entrants.html',
  styleUrl: './entrants.css'
})

export class Entrants implements OnInit {

  /** colour helper stays the same */
  statusClass(st: CourrierRow['status']) {
    return st === 'Entrants' ? 'status-entrants' : 'status-sortants';
  }

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private courrierService: CourrierService) {}

  courrierList: any = [];
  filteredCourrierList: any = [];
  loading = true;
  error = '';
  
  // Popup properties
  showPopup = false;
  selectedCourrier: any = null;
  annotation = '';
  diffusionType = 'interne';
  
  // Search and filter properties
  searchTerm = '';
  statusFilter = '';

  // User role properties
  currentUser: any = null;
  isAgent = false;

  ngOnInit() {
    this.getCurrentUser();
    this.getCourriers();
  }

  getCurrentUser() {
    const userStr = sessionStorage.getItem('authUser');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
      this.isAgent = this.currentUser.role === 'AGENT';
    }
  }

  getCourriers() {
    this.courrierService.getAll().subscribe({
        next: courriers => {
          this.courrierList = courriers;
          this.filteredCourrierList = courriers;
          this.loading = false;
          console.log('courriers loaded:', this.courrierList);
          console.log("courriers length:", this.courrierList.length);
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'Failed to load courriers';
          this.loading = false;
        }
      });
  }

  // Search and filter methods
  onSearchChange() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.courrierList;

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter((courrier: any) => 
        courrier.internalRef?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        courrier.numeroCourrier?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        courrier.destinateur?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (this.statusFilter !== '') {
      filtered = filtered.filter((courrier: any) => courrier.type === this.statusFilter);
    }

    this.filteredCourrierList = filtered;
  }

  // Popup methods
  openValidationPopup(courrier: any) {
    this.selectedCourrier = courrier;
    this.annotation = '';
    this.diffusionType = 'interne';
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.selectedCourrier = null;
    this.annotation = '';
  }

  validateCourrier() {
    if (!this.annotation.trim()) {
      alert('Please enter an annotation');
      return;
    }

    // Preserve all existing data and only update specific fields
    const updatedData = {
      ...this.selectedCourrier, // Keep all existing data
      annotation: this.annotation,
      modifiedAt: new Date().toISOString(),
      type: 'Valider',
      diffusionInterne: this.diffusionType === 'interne'
    };

    this.courrierService.updateCourrier(this.selectedCourrier.id, updatedData).subscribe({
      next: () => {
        alert('Courrier validated successfully');
        this.closePopup();
        this.getCourriers(); // Refresh the list
      },
      error: () => {
        alert('Failed to validate courrier');
      }
    });
  }

  // Helper method to check if courrier is validated
  isCourrierValidated(courrier: any): boolean {
    return courrier.type && courrier.type == 'Valider';
  }

  // Helper method to check if user can validate (only RESPO can validate)
  canValidate(): boolean {
    return !this.isAgent; // Only show validate button if user is not AGENT
  }

  deleteCourrier(courrier: any) {
    if (confirm('Are you sure you want to delete this courrier?')) {
      this.courrierService.deleteCourrier(courrier.id).subscribe({
        next: () => {
          alert('Courrier deleted successfully');
          this.getCourriers(); // Refresh the list
        },
        error: () => {
          alert('Failed to delete courrier');
        }
      });
    }
  }
}