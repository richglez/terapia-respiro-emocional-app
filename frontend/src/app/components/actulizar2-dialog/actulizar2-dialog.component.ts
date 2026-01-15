import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-actulizar2-dialog',
  templateUrl: './actulizar2-dialog.component.html',
  styleUrl: './actulizar2-dialog.component.scss'
})
export class Actulizar2DialogComponent {
  constructor(public dialogRef: MatDialogRef<Actulizar2DialogComponent>) { }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close(true);
    
  }
}
