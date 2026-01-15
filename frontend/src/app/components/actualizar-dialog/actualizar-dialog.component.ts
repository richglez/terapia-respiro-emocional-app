import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-actualizar-dialog',
  templateUrl: './actualizar-dialog.component.html',
  styleUrl: './actualizar-dialog.component.scss'
})
export class ActualizarDialogComponent {
  constructor(public dialogRef: MatDialogRef<ActualizarDialogComponent>) { }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close(true);
    
  }
}
