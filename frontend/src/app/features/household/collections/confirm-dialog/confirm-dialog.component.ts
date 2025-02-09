import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface DialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  isDestructive?: boolean;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="p-6">
      <h2 mat-dialog-title class="text-xl font-bold mb-4">{{ data.title }}</h2>

      <mat-dialog-content>
        <p class="text-gray-600">{{ data.message }}</p>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="mt-6">
        <button
          mat-button
          (click)="onCancel()"
          class="mr-2"
        >
          {{ data.cancelText }}
        </button>
        <button
          mat-raised-button
          [color]="data.isDestructive ? 'warn' : 'primary'"
          (click)="onConfirm()"
          class="min-w-[100px]"
        >
          {{ data.confirmText }}
        </button>
      </mat-dialog-actions>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
