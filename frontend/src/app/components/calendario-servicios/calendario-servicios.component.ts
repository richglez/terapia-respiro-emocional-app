import { Component, OnInit } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PacientesService } from '../../services/pacientes.service';
import { SuplenciasServiceService } from '../../services/suplencias-service.service';
import { MatDialog } from '@angular/material/dialog';
import { NuevaSuplenciaDialogComponent } from '../nueva-suplencia-dialog/nueva-suplencia-dialog.component';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { Cuidador } from '../../models/cuidadores';
import { Paciente } from '../../models/pacientes';
import { Suplencia } from '../../models/suplencias';
import { DatePipe } from '@angular/common';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { MatSnackBar } from '@angular/material/snack-bar'; //notificaciones
import {
  CalendarOptions,
  EventClickArg,
  EventDropArg,
} from '@fullcalendar/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario-servicios',
  templateUrl: './calendario-servicios.component.html',
  styleUrls: ['./calendario-servicios.component.scss'],
})
export class CalendarioServiciosComponent implements OnInit {
  public events: any[] = [];
  public options: any;
  public selectedCuidador: Cuidador | null = null;
  public selectedPaciente: Paciente | null = null;
  public selectedSuplencia: Suplencia | null = null;
  public selectAbierto: boolean = false;
  public selectAbierto2: boolean = false;
  public suplencias: Suplencia[] = [];
  public searchTextCuidadores: string = '';
  public searchTextPacientes: string = '';
  public searchTextTotalSuplencias: string = '';
  public cuidadores: Cuidador[] = [];
  public pacientes: Paciente[] = [];
  public filteredPacientes: Paciente[] = [];
  fechaFormateada: string = '';

  constructor(
    public pacientesService: PacientesService,
    public dialog: MatDialog,
    public cuidadoresService: CuidadoresServiceService,
    public suplenciasService: SuplenciasServiceService,
    private snackBar: MatSnackBar
  ) {
    this.events = [];
    this.options = {
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        multiMonthPlugin,
      ],
      initialView: 'dayGridMonth',
      editable: true,
      eventResizableFromStart: true,
      eventDrop: this.handleEventDrop.bind(this),
      eventClick: this.handleEventClick.bind(this),
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      eventContent: this.renderEventContent.bind(this),
    };
  }

  ngOnInit() {
    this.cuidadoresService.getCuidadores().subscribe(
      (cuidadores) => {
        this.cuidadores = cuidadores;
      },
      (err) => {
        console.error(err);
      }
    );

    this.pacientesService.getPacientes().subscribe(
      (pacientes) => {
        this.pacientes = pacientes;
        this.filteredPacientes = this.pacientes;
      },
      (err) => {
        console.error(err);
      }
    );

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('delete-btn')) {
        const eventId = target.getAttribute('data-id');
        if (eventId) {
          this.deleteEvent(parseInt(eventId, 10));
        }
      }
    });
  }

  // funcionalidad básica para manejar la actualización de eventos mediante el arrastre (drag and drop) y la eliminación de eventos.
   async handleEventDrop(eventDropInfo: EventDropArg) { //para actualizar las fechas de las suplencias
    const event = eventDropInfo.event;
    if (!event.start) return;

    const suplencia = this.selectedSuplencia;

    if (!suplencia) {
      console.error('No se ha seleccionado ninguna suplencia para actualizar.');
      this.snackBar.open('No se ha seleccionado ninguna suplencia para actualizar.', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      return;
    }

    // Actualizar lógica para la suplencia con nueva fecha y hora
    suplencia.dia_suplencia = event.start.toISOString().split('T')[0];
    suplencia.hora_inicial = event.start.toISOString().split('T')[1].substr(0, 5);
    suplencia.hora_final = event.end ? event.end.toISOString().split('T')[1].substr(0, 5) : event.start.toISOString().split('T')[1].substr(0, 5);

    try {
      const response = await this.suplenciasService.updateSuplencia(suplencia).toPromise();
      console.log('Suplencia actualizada exitosamente', response);
      this.snackBar.open('¡Suplencia actualizada exitosamente!', 'Cerrar', {
        duration: 5000,
        panelClass: ['main-snackbar'],
      });
    } catch (error) {
      console.error('Error al actualizar suplencia', error);
      this.snackBar.open('Error al actualizar la suplencia. Por favor, intenta de nuevo.', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
    }
  }
  

  // Método para manejar el clic en eventos (eliminar suplencia)
  handleEventClick(info: EventClickArg) { //para borrar las suplencias de la base de datos
    const event = info.event;
    if (!event || typeof event.id !== 'string') return;

    const eventId = typeof event.id === 'number' ? event.id : parseInt(event.id, 10);
    const foundSuplencia = this.suplencias.find((s) => s.id_suplencia === eventId);

    if (!foundSuplencia) {
      console.error('No se encontró ninguna suplencia con el eventId:', eventId);
      return;
    }

    this.selectedSuplencia = foundSuplencia;
    console.log('Suplencia seleccionada:', this.selectedSuplencia);
    this.snackBar.open('Suplencia seleccionada', 'Cerrar', {
      duration: 5000,
      panelClass: ['important-snackbar'],
    });
  }

  renderEventContent(eventInfo: any) {
    return {
      html: `
        <style>

          .event-content strong {
            color: #333;
          }
          .event-content span {
            display: block;
            margin-top: 2px;
            margin-bottom: 5px;
            font-size: 14px;
          }
          .delete-btn {
            background-color: red;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .delete-btn:hover {
            background-color: darkred;
          }
          .delete-btn:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.3);
          }
        </style>
        <div class="event-content">
          <strong>${eventInfo.timeText}</strong>
          <br>
          <span>${eventInfo.event.title}</span>
          <br>
          <button data-id="${eventInfo.event.id}" class="delete-btn">🗑️</button>
        </div>
      `,
    };
  }
  

  deleteEvent(eventId: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta suplencia?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.suplenciasService.deleteSuplencia(eventId).subscribe(
          () => {
            this.events = this.events.filter((event) => event.id !== eventId);
            Swal.fire('¡Eliminado!', 'El evento ha sido eliminado.', 'success');
            console.log('Suplencia eliminada exitosamente');
          },
          (error) => {
            console.error('Error al eliminar suplencia', error);
            Swal.fire('Error', 'Hubo un problema al eliminar la suplencia.', 'error');
          }
        );
      }
    });
  }
  

  seleccionarCuidador(cuidador: Cuidador) {
    this.selectedCuidador = cuidador;
    this.searchTextCuidadores = `${cuidador.nombreCuidador} ${cuidador.apPatCuidador} ${cuidador.apMatCuidador}`;
    this.searchTextTotalSuplencias = cuidador.num_suplencias.toString();
    this.filteredPacientes = this.pacientes.filter(
      (paciente) =>
        paciente.id_cuidador_paciente === cuidador.id_cuidador_paciente
    );
    console.log(
      `Seleccionaste al cuidador: ${this.selectedCuidador.id_cuidador_paciente}`
    );
  }

  seleccionarPaciente(paciente: Paciente) {
    this.selectedPaciente = paciente;
    this.searchTextPacientes = `${paciente.nombre_paciente} ${paciente.apellido_paterno} ${paciente.apellido_materno}`;
    console.log(
      `Seleccionaste al paciente: ${this.selectedPaciente.id_paciente}`
    );
  }

  agregarSuplencia(): void {
    const dialogRef = this.dialog.open(NuevaSuplenciaDialogComponent, {
      width: '850px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.agregarEvento(result);
      }
    });
  }

  toggleSelect() {
    this.selectAbierto = !this.selectAbierto;
  }

  toggleSelect2() {
    this.selectAbierto2 = !this.selectAbierto2;
  }

  buscarSuplencia() {
    // esta funcion busca las suplenicas de un cuidador en especifico
    const idCuidador = this.selectedCuidador?.id_cuidador_paciente;
    const idPaciente = this.selectedPaciente?.id_paciente;
  
    if (idCuidador && idPaciente) {
      this.suplenciasService
        .buscarSuplenciasPorCuidadorYPaciente(idCuidador, idPaciente)
        .subscribe(
          (suplencias) => {
            this.suplencias = suplencias;
            this.mostrarSuplenciasEnCalendario(suplencias);
  
            // Validar si no se encontraron suplencias
            if (suplencias.length === 0) {
              this.snackBar.open('No se ha encontrado una suplencia con estas características', 'Cerrar', {
                duration: 5000,
                panelClass: ['error-snackbar'],
              });
            }
          },
          (err) => {
            console.error('Error al buscar suplencias:', err);
          }
        );
    } else {
      console.error('Debes seleccionar un cuidador y un paciente.');
  
      // Mostrar alerta si no se seleccionó cuidador y paciente
      this.snackBar.open('Debes seleccionar un cuidador y un paciente', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
    }
  
    console.log(
      `Buscar la suplencia del cuidador: ${idCuidador}, con el paciente: ${idPaciente}`
    );
  }
  

  mostrarSuplenciasEnCalendario(suplencias: Suplencia[]): void {
    if (!this.selectedCuidador) {
      this.snackBar.open('No se ha seleccionado un cuidador', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      console.error('No se ha seleccionado un cuidador');
      return;
    }

    this.events = suplencias.map((suplencia) => {
      const fecha = suplencia.dia_suplencia.split('-');
      const horaInicial = suplencia.hora_inicial.split(':');
      const horaFinal = suplencia.hora_final.split(':');

      const start = new Date(
        parseInt(fecha[0]), // Año
        parseInt(fecha[1]) - 1, // Mes (restamos 1 porque los meses van de 0 a 11 en JavaScript)
        parseInt(fecha[2]), // Día
        parseInt(horaInicial[0]), // Hora
        parseInt(horaInicial[1]) // Minutos
      );

      const end = new Date(
        parseInt(fecha[0]), // Año
        parseInt(fecha[1]) - 1, // Mes
        parseInt(fecha[2]), // Día
        parseInt(horaFinal[0]), // Hora
        parseInt(horaFinal[1]) // Minutos
      );

      return {
        id: suplencia.id_suplencia, // Asegúrate de asignar el ID de la suplencia aquí
        title: `Suplencia`,
        start,
        end,
        description: `Cuidador: ${this.selectedCuidador?.id_cuidador_paciente}`,
        allDay: false,
        // Aquí puedes agregar lógica adicional para manejar eventos recurrentes si es necesario
      };
    });

    console.log('Eventos actualizados:', this.events);


  }
}
