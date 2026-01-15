import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminar-dialog',
  templateUrl: './confirmar-eliminar-dialog.component.html',
  styleUrl: './confirmar-eliminar-dialog.component.scss'
})
export class ConfirmarEliminarDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmarEliminarDialogComponent>) { }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
