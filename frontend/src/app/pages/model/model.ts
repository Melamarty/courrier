import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourrierService } from '../../services/courrier';
import { CourrierAnalysis } from '../../models/courrier';

@Component({
  selector: 'app-model',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './model.html',
  styleUrl: './model.css'
})
export class Model {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isAnalyzing = false;
  analysisResult: CourrierAnalysis | null = null;
  errorMessage: string | null = null;
  isDragOver = false;

  constructor(private courrierService: CourrierService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.processFile(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  private processFile(file: File): void {
    if (file && this.isValidImageFile(file)) {
      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);
      this.errorMessage = null;
      this.analysisResult = null;
    } else {
      this.errorMessage = 'Please select a valid image file (JPG, PNG, GIF)';
      this.selectedFile = null;
      this.previewUrl = null;
    }
  }

  private isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      this.errorMessage = 'Invalid file type. Please select a JPG, PNG, or GIF image.';
      return false;
    }
    
    if (file.size > maxSize) {
      this.errorMessage = 'File size too large. Please select an image smaller than 10MB.';
      return false;
    }
    
    return true;
  }

  analyzeCourrier(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image file first';
      return;
    }

    this.isAnalyzing = true;
    this.errorMessage = null;
    this.analysisResult = null;
    
    const startTime = Date.now();

    this.courrierService.analyzeCourrier(this.selectedFile).subscribe({
      next: (result) => {
        const endTime = Date.now();
        const processingTime = ((endTime - startTime) / 1000).toFixed(1);
        console.log("processingTime", processingTime);
        result.processing_time = processingTime;
        this.analysisResult = result;
        console.log("analysisResult", this.analysisResult);
        this.isAnalyzing = false;
      },
      error: (error) => {
        this.errorMessage = 'Error analyzing courrier. Please try again.';
        this.isAnalyzing = false;
        console.error('Analysis error:', error);
      }
    });
  }

  getCourrierTypeClass(type: string): string {
    switch (type) {
      case 'urgence':
        return 'type-urgence';
      case 'médical':
        return 'type-medical';
      case 'administratif':
        return 'type-administrative';
      case 'normal':
        return 'type-default';
      default:
        return 'type-default';
    }
  }

  getCourrierTypeLabel(type: string): string {
    switch (type) {
      case 'urgence':
        return 'Urgence';
      case 'médical':
        return 'Médical';
      case 'administratif':
        return 'Administratif';
      case 'normal':
        return 'Normal';
      default:
        return type;
    }
  }

  getHighestConfidence(): number {
    if (!this.analysisResult || !this.analysisResult.confidence_scores) return 0;
    const scores = Object.values(this.analysisResult.confidence_scores);
    const validScores = scores.filter(score => score !== undefined && score !== null);
    return validScores.length > 0 ? Math.max(...validScores) : 0;
  }

  resetAnalysis(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.analysisResult = null;
    this.errorMessage = null;
    this.isAnalyzing = false;
    this.isDragOver = false;
  }
}
