import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminar2-dialog',
  templateUrl: './confirmar-eliminar2-dialog.component.html',
  styleUrl: './confirmar-eliminar2-dialog.component.scss'
})
export class ConfirmarEliminar2DialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmarEliminar2DialogComponent>) { }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
