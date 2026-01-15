import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../models/pacientes';
import { MatDialog } from '@angular/material/dialog'; // Importa solo MatDialog
import { ConfirmarEliminarDialogComponent } from '../confirmar-eliminar-dialog/confirmar-eliminar-dialog.component';
import { ActualizarDialogComponent } from '../actualizar-dialog/actualizar-dialog.component';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { MatSnackBar } from '@angular/material/snack-bar'; //notificaciones
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-paciente',
  templateUrl: './search-paciente.component.html',
  styleUrls: ['./search-paciente.component.scss'],
})
export class SearchPacienteComponent implements OnInit {
  pacientes: Paciente[] = [];
  searchTextPacientes: string = '';
  selectedPaciente: Paciente | null = null; // Variable para almacenar el paciente seleccionado
  originalPaciente: Paciente | null = null; // Variable para almacenar los valores originales del paciente seleccionado
  nombreCompletoCuidador: string = '';

  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  constructor(
    public pacientesService: PacientesService,
    private cuidadoresService: CuidadoresServiceService,
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

  buscarPacienteDB(): void {
    // buscar a todos los registros de pacientes en la base de datos, para poder seleccionarlo
    this.pacientesService
      .searchAllPacientes(this.searchTextPacientes)
      .subscribe((todosPacientes: Paciente[]) => {
        // auto completado en el input?
        this.pacientes = todosPacientes;
      });
  }

  seleccionarPaciente(paciente: Paciente) {
    // Asigna el nombre del paciente al campo de búsqueda
    this.searchTextPacientes = paciente.nombre_paciente;

    // Verifica si id_paciente tiene un valor antes de usarlo
    if (paciente.id_paciente !== undefined) {
      // Busca los detalles del paciente por su ID y asigna los detalles al paciente seleccionado
      this.pacientesService
        .getPacienteById(paciente.id_paciente)
        .subscribe((pacienteData: Paciente) => {
          this.selectedPaciente = pacienteData;
          this.originalPaciente = { ...pacienteData };

          // Verifica si id_cuidador_paciente tiene un valor antes de usarlo
          if (this.selectedPaciente.id_cuidador_paciente !== undefined) {
            this.cuidadoresService
              .getCuidadorById(this.selectedPaciente.id_cuidador_paciente)
              .subscribe(
                (cuidador) => {
                  this.nombreCompletoCuidador = `${cuidador.nombreCuidador} ${cuidador.apPatCuidador} ${cuidador.apMatCuidador}`;
                },
                (err) => {
                  console.error(err);
                }
              );
          } else {
            console.error(
              'El paciente seleccionado no tiene un cuidador asignado.'
            );
          }
        });
    } else {
      console.error('El paciente seleccionado no tiene un ID válido.');
    }
  }

  // ELIMINAR PACIENTE

  deletePacienteDialog() {
    const dialogRef = this.dialog.open(ConfirmarEliminarDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.selectedPaciente && this.selectedPaciente.id_paciente) {
          this.pacientesService
            .deletePaciente(this.selectedPaciente.id_paciente)
            .subscribe(() => {
              // Eliminación exitosa
              this.snackBar.open('Se ha eliminado al paciente exitosamente', 'Cerrar', {
                duration: 5000,
                panelClass: ['main-snackbar'],
              });
              this.selectedPaciente = null; // Reiniciar selectedPaciente a null para restablecer los campos en el HTML
              this.originalPaciente = null;
            });
        } else {
          console.error(
            'No se ha seleccionado un paciente válido para eliminar.'
          );
        }
      }
    });
  }

  // ACTULIZAR DATOS DEL PACIENTE
  updatePacienteDialog() {
    const dialogRef = this.dialog.open(ActualizarDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.selectedPaciente) {
        // Verificar que selectedPaciente no sea null
        this.pacientesService
          .updatePaciente(this.selectedPaciente) // Enviar todos los campos del paciente
          .subscribe(
            (response) => {
              this.snackBar.open('Datos del paciente actualizados exitosamente !!', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['main-snackbar'],
              });
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

  editPaciente() {
    const inputs = document.querySelectorAll('.container-data-paciente input');
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

  // OTRAS FUNCIONES

  undoChangesPaciente() {
    if (this.selectedPaciente && this.originalPaciente) {
      Object.assign(this.selectedPaciente, this.originalPaciente);
    }
  }
}
