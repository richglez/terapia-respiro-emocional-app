import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { SuplenciasServiceService } from '../../services/suplencias-service.service';
import { Subject, of } from 'rxjs';
import * as XLSX from 'xlsx';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'; //notificaciones
import Swal from 'sweetalert2';

@Component({
  selector: 'app-base-datos',
  templateUrl: './base-datos.component.html',
  styleUrls: ['./base-datos.component.scss'],
})
export class BaseDatosComponent implements OnInit {
  searchText: string = '';
  searchTextChanged: Subject<string> = new Subject<string>();
  selectedCategory: string = 'pacientes';
  selectedSexo: string = ''; // Añadido para filtrar por sexo, POR DEFAILT TODOS LOS TIPOS DE SEXO
  pacientes: any[] = [];
  cuidadores: any[] = [];
  suplencias: any[] = [];
  filteredPacientes: any[] = [];
  filteredCuidadores: any[] = [];
  filteredSuplencias: any[] = [];
  editField: { [key: number]: { [key: string]: boolean } } = {};
  selectedEdad: string = ''; // Añadido para filtrar por edad

  constructor(
    private pacientesService: PacientesService,
    private cuidadoresService: CuidadoresServiceService,
    private suplenciasService: SuplenciasServiceService,
    private snackBar: MatSnackBar // Añadido para usar MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategoryData();
    this.searchTextChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchText) => this.filterData(searchText))
      )
      .subscribe((filteredData) => {
        this.applyFilteredData(filteredData);
      });
  }

  //Pacientes
  toggleEditPaciente(index: number, field: string): void {
    if (!this.editField[index]) {
      this.editField[index] = {};
    }
    this.editField[index][field] = !this.editField[index][field];
  }

  saveChangesPaciente(paciente: any, index: number): void {
    this.pacientesService.updatePaciente(paciente).subscribe(
      (response) => {
        this.editField[index] = {};
        this.snackBar.open('Datos actualizados correctamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['main-snackbar'],
        });
      },
      (error) => {
        console.error('Error al actualizar paciente:', error);
        this.snackBar.open('Error al actualizar los datos', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      }
    );
  }

  deletePaciente(pacienteId: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar este paciente?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacientesService.deletePaciente(pacienteId).subscribe(
          () => {
            this.filteredPacientes = this.filteredPacientes.filter(
              (paciente) => paciente.id_paciente !== pacienteId
            );
            Swal.fire(
              '¡Eliminado!',
              'El paciente ha sido eliminado exitosamente.',
              'success'
            );
            console.log('Paciente eliminado exitosamente');
          },
          (error) => {
            console.error('Error al eliminar al paciente', error);
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el paciente.',
              'error'
            );
          }
        );
      }
    });
  }

  //Cuidadores
  deleteCuidador(cuidadorId: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar este cuidador?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuidadoresService.deleteCuidador(cuidadorId).subscribe(
          () => {
            this.filteredCuidadores = this.filteredCuidadores.filter(
              (cuidador) => cuidador.id_cuidador_paciente !== cuidadorId
            );
            Swal.fire(
              '¡Eliminado!',
              'El cuidador ha sido eliminado exitosamente.',
              'success'
            );
            console.log('Cuidador eliminado exitosamente');
          },
          (error) => {
            console.error('Error al eliminar al cuidador', error);
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el cuidador.',
              'error'
            );
          }
        );
      }
    });
  }

  saveChangesCuidador(cuidador: any, index: number): void {
    this.cuidadoresService.updateCuidador(cuidador).subscribe(
      (response) => {
        this.editField[index] = {};
        this.snackBar.open('Datos actualizados correctamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['main-snackbar'],
        });
      },
      (error) => {
        console.error('Error al actualizar cuidador:', error);
        this.snackBar.open('Error al actualizar los datos', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      }
    );
  }

  // suplencias
  saveChangesSuplencia(suplencia: any, index: number): void {
    this.suplenciasService.updateSuplencia(suplencia).subscribe(
      (response) => {
        this.editField[index] = {};
        this.snackBar.open('Datos actualizados correctamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['main-snackbar'],
        });
      },
      (error) => {
        console.error('Error al actualizar suplencia:', error);
        this.snackBar.open('Error al actualizar los datos', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
  deleteSuplencia(suplenciaId: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta suplencia?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.suplenciasService.deleteSuplencia(suplenciaId).subscribe(
          () => {
            this.filteredSuplencias = this.filteredSuplencias.filter(
              (suplencia) => suplencia.id_suplencia !== suplenciaId
            );
            Swal.fire(
              '¡Eliminada!',
              'La suplencia ha sido eliminado exitosamente.',
              'success'
            );
            console.log('Suplencia eliminada exitosamente');
          },
          (error) => {
            console.error('Error al eliminar la suplencia', error);
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar la suplencia.',
              'error'
            );
          }
        );
      }
    });
  }

  // Excel
  /* Default name for excel file when download */
  fileName1 = 'BaseDatosPacientes.xlsx';
  fileName2 = 'BaseDatosCuidadores.xlsx';
  fileName3 = 'BaseDatosSuplencias.xlsx';
  exportExcel() {
    let data;
    let fileName;
    switch (this.selectedCategory) {
      case 'pacientes':
        data = document.getElementById('BaseDatosPacientes');
        fileName = this.fileName1;
        break;
      case 'cuidadores':
        data = document.getElementById('BaseDatosCuidadores');
        fileName = this.fileName2;
        break;
      case 'suplencias':
        data = document.getElementById('BaseDatosSuplencias');
        fileName = this.fileName3;
        break;
      default:
        return;
    }

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }

  // Funcionalidades extras

  onSearchChange(): void {
    //para recargar los datos cuando cambie la selección DE BUSQUEDA.
    this.searchTextChanged.next(this.searchText);
  }

  onSexoChange(): void {
    //para recargar los datos cuando cambie la selección de sexo.
    this.loadCategoryData();
  }

  onEdadChange(): void {
    // Refiltra los datos de pacientes y cuidadores cuando cambie la selección de edad.
    this.filterByEdad();
  }
  

  filterByEdad(): void {
    if (this.selectedEdad === 'nino') {
      this.filteredPacientes = this.pacientes.filter(
        (paciente) => paciente.edad_paciente < 18
      );
      this.filteredCuidadores = this.cuidadores.filter(
        (cuidador) => cuidador.edad_cuidador < 18
      );
    } else if (this.selectedEdad === 'adulto') {
      this.filteredPacientes = this.pacientes.filter(
        (paciente) => paciente.edad_paciente >= 18
      );
      this.filteredCuidadores = this.cuidadores.filter(
        (cuidador) => cuidador.edad_cuidador >= 18
      );
    } else {
      this.filteredPacientes = this.pacientes;
      this.filteredCuidadores = this.cuidadores;
    }
  }

  search(): void {
    this.loadCategoryData();
  }

  loadCategoryData(): void {
    if (this.selectedCategory === 'pacientes') {
      this.pacientesService.getNombreCuidadorDelPaciente().subscribe(
        (data) => {
          console.log('Datos de pacientes:', data);
          this.pacientes = data;
          this.filteredPacientes = this.filterBySexo(data); // Aplica el filtrado por sexo
        },
        (error) => {
          console.error('Error al cargar pacientes:', error);
        }
      );
    } else if (this.selectedCategory === 'cuidadores') {
      this.cuidadoresService.getCuidadores().subscribe(
        (data) => {
          console.log('Datos de cuidadores:', data);
          this.cuidadores = data;
          this.filteredCuidadores = this.filterBySexo(data); // Aplica el filtrado por sexo
        },
        (error) => {
          console.error('Error al cargar cuidadores:', error);
        }
      );
    } else   if (this.selectedCategory === 'suplencias') {
      this.suplenciasService.getNombreCuidadoryPaciente().subscribe(
        (data) => {
          console.log('Datos de suplencias:', data);
          this.suplencias = data;
          this.filteredSuplencias = data;
        },
        (error) => {
          console.error('Error al cargar suplencias:', error);
        }
      );
    }
  }

  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filterBySexo(data: any[]): any[] {
    if (!this.selectedSexo) {
      // Si no se selecciona ningún filtro de sexo, retorna todos los datos.
      return data;
    }
    return data.filter((item) => {
      if (this.selectedCategory === 'pacientes') {
        return item.sexo_paciente === this.selectedSexo;
      } else if (this.selectedCategory === 'cuidadores') {
        return item.sexoCuidador === this.selectedSexo;
      }
      return true;
    });
  }

  filterData(searchText: string) {
    const lowerSearchText = searchText.toLowerCase();
    let filteredData: any[] = [];

    if (this.selectedCategory === 'pacientes') {
      const normalizedSearchText = this.removeAccents(lowerSearchText);

      filteredData = this.pacientes.filter(
        (paciente) =>
          this.removeAccents(
            (paciente.nombre_paciente || '').toLowerCase()
          ).includes(normalizedSearchText) ||
          this.removeAccents(
            (paciente.apellido_paterno || '').toLowerCase()
          ).includes(normalizedSearchText) ||
          this.removeAccents(
            (paciente.apellido_materno || '').toLowerCase()
          ).includes(normalizedSearchText) ||
          this.removeAccents(
            (paciente.alcaldia_municipio || '').toLowerCase()
          ).includes(normalizedSearchText) ||
          this.removeAccents(
            (paciente.entidadFederativa || '').toLowerCase()
          ).includes(normalizedSearchText) ||
          this.removeAccents(
            (paciente.sexo_paciente || '').toLowerCase()
          ).includes(normalizedSearchText) ||
          this.removeAccents(
            (paciente.tipoPrograma || '').toLowerCase()
          ).includes(normalizedSearchText) ||
          this.removeAccents(
            (paciente.expediente_paciente || '').toLowerCase()
          ).includes(normalizedSearchText)
      );

      // Aplica el filtro por sexo
      filteredData = this.filterBySexo(filteredData);
    } else if (this.selectedCategory === 'cuidadores') {
      filteredData = this.cuidadores.filter(
        (cuidador) =>
          this.removeAccents(
            (cuidador.nombreCuidador || '').toLowerCase()
          ).includes(lowerSearchText) ||
          this.removeAccents(
            (cuidador.apPatCuidador || '').toLowerCase()
          ).includes(lowerSearchText) ||
          this.removeAccents(
            (cuidador.apMatCuidador || '').toLowerCase()
          ).includes(lowerSearchText) ||
          this.removeAccents(
            (cuidador.telefonoCuidador || '').toLowerCase()
          ).includes(lowerSearchText)
      );

      // Aplica el filtro por sexo
      filteredData = this.filterBySexo(filteredData);
    } else if (this.selectedCategory === 'suplencias') {
      filteredData = this.suplencias.filter(
        (suplencia) =>
          this.removeAccents(
            (suplencia.dia_suplencia || '').toLowerCase()
          ).includes(lowerSearchText) ||
          this.removeAccents(
            (suplencia.hora_inicial || '').toLowerCase()
          ).includes(lowerSearchText) ||
          this.removeAccents(
            (suplencia.hora_final || '').toLowerCase()
          ).includes(lowerSearchText) ||
          this.removeAccents(
            (suplencia.particular || '').toLowerCase()
          ).includes(lowerSearchText) ||
          this.removeAccents(
            (suplencia.concurrencia_anual || '').toLowerCase()
          ).includes(lowerSearchText) ||
          this.removeAccents(
            (suplencia.nombreCuidador || '').toLowerCase()
          ).includes(lowerSearchText) ||
          this.removeAccents(
            (suplencia.apPatCuidador || '').toLowerCase()
          ).includes(lowerSearchText) ||
          this.removeAccents(
            (suplencia.apMatCuidador || '').toLowerCase()
          ).includes(lowerSearchText)
      );
    }

    return of(filteredData);
  }

  applyFilteredData(filteredData: any): void {
    if (this.selectedCategory === 'pacientes') {
      this.filteredPacientes = filteredData;
    } else if (this.selectedCategory === 'cuidadores') {
      this.filteredCuidadores = filteredData;
    } else if (this.selectedCategory === 'suplencias') {
      this.filteredSuplencias = filteredData;
    }
  }
}
