import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { MatDialog } from '@angular/material/dialog'; // Importa solo MatDialog
import { Cuidador } from '../../models/cuidadores';
import { ConfirmarEliminar2DialogComponent } from '../confirmar-eliminar2-dialog/confirmar-eliminar2-dialog.component';
import { Actulizar2DialogComponent } from '../actulizar2-dialog/actulizar2-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar'; //notificaciones
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-cuidador',
  templateUrl: './search-cuidador.component.html',
  styleUrls: ['./search-cuidador.component.scss'],
})
export class SearchCuidadorComponent implements OnInit {
  cuidadores: Cuidador[] = [];
  searchTextCuidador: string = '';
  selectedCuidador: Cuidador | null = null; // Variable para almacenar el paciente seleccionado
  originalCuidador: Cuidador | null = null; // Variable para almacenar los valores originales del paciente seleccionado

  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  constructor(
    public cuidadoresService: CuidadoresServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // Añadido para usar MatSnackBar
  ) {
    //instancia, poder tener todos los metodos
  }

  ngOnInit() {
    this.focusFirstInput();
  }

  focusFirstInput() {
    setTimeout(() => {
      if (this.inputFields && this.inputFields.first) {
        this.inputFields.first.nativeElement.focus();
      }
    }, 0);
  }

  buscarCuidadorDB(): void {
    // buscar a todos los registros de pacientes en la base de datos, para poder seleccionarlo
    this.cuidadoresService
      .searchAllCuidadores(this.searchTextCuidador)
      .subscribe((todosCuidadores: Cuidador[]) => {
        // auto completado en el input?
        this.cuidadores = todosCuidadores;
      });
  }

  seleccionarCuidador(cuidador: Cuidador) {
    this.searchTextCuidador = cuidador.nombreCuidador;

    if (cuidador.id_cuidador_paciente !== undefined) {
      this.cuidadoresService
        .getCuidadorById(cuidador.id_cuidador_paciente)
        .subscribe((cuidadorData: Cuidador) => {
          this.selectedCuidador = cuidadorData;
          this.originalCuidador = { ...cuidadorData };
        });
    } else {
      console.error('El paciente seleccionado no tiene un ID válido.');
    }
  }
  // ACTULIZAR DATOS DEL PACIENTE
  updateCuidadorDialog() {
    const dialogRef = this.dialog.open(Actulizar2DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.selectedCuidador) {
        // Verificar que selectedPaciente no sea null
        this.cuidadoresService
          .updateCuidador(this.selectedCuidador) // Enviar todos los campos del paciente
          .subscribe(
            (response) => {
              console.log(response); // Manejar la respuesta del backend
              // Aquí puedes añadir lógica adicional después de la actualización
            },
            (error) => {
              console.error(error); // Manejar cualquier error que ocurra durante la actualización
            }
          );
      }
    });
  }

  deleteCuidadorDialog() {
    const dialogRef = this.dialog.open(ConfirmarEliminar2DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (
          this.selectedCuidador &&
          this.selectedCuidador.id_cuidador_paciente
        ) {
          this.cuidadoresService
            .deleteCuidador(this.selectedCuidador.id_cuidador_paciente)
            .subscribe(() => {
              // Eliminación exitosa
              this.snackBar.open(
                'Se ha eliminado al paciente exitosamente',
                'Cerrar',
                {
                  duration: 5000,
                  panelClass: ['main-snackbar'],
                }
              );
              this.selectedCuidador = null;
              this.originalCuidador = null;
            });
        } else {
          console.error(
            'No se ha seleccionado un cuidador válido para eliminar.'
          );
        }
      }
    });
  }

  editCuidador() {
    const inputs = document.querySelectorAll('.container-data-cuidador input');
    inputs.forEach((input: Element) => {
      if (input instanceof HTMLInputElement) {
        this.snackBar.open('El contenido ahora es editable', 'Cerrar', {
          duration: 5000,
          panelClass: ['important-snackbar'],
        });
        input.readOnly = false;
      }
    });
  }

  undoChangesCuidador() {
    if (this.selectedCuidador && this.originalCuidador) {
      Object.assign(this.selectedCuidador, this.originalCuidador);
    }
  }
}
