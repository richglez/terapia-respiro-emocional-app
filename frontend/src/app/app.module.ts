import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule

// Importa los componentes
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SearchPacienteComponent } from './components/search-paciente/search-paciente.component';
import { NewPacienteComponent } from './components/new-paciente/new-paciente.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarioServiciosComponent } from './components/calendario-servicios/calendario-servicios.component';
import { ExpedienteElectronicoComponent } from './components/expediente-electronico/expediente-electronico.component';
import { BaseDatosComponent } from './components/base-datos/base-datos.component';
import { ExitComponent } from './components/exit/exit.component';
import { BodyComponent } from './components/body/body.component';
import { ConfirmarEliminarDialogComponent } from './components/confirmar-eliminar-dialog/confirmar-eliminar-dialog.component';
import { ActualizarDialogComponent } from './components/actualizar-dialog/actualizar-dialog.component';
import { NuevaSuplenciaDialogComponent } from './components/nueva-suplencia-dialog/nueva-suplencia-dialog.component';
import { NewCuidadorComponent } from './components/new-cuidador/new-cuidador.component';
import { SearchCuidadorComponent } from './components/search-cuidador/search-cuidador.component';
import { Actulizar2DialogComponent } from './components/actulizar2-dialog/actulizar2-dialog.component';
import { ConfirmarEliminar2DialogComponent } from './components/confirmar-eliminar2-dialog/confirmar-eliminar2-dialog.component';
import { CuidadoresServiceService } from './services/cuidadores-service.service'
import { PacientesService } from './services/pacientes.service'
import { SuplenciasServiceService } from './services/suplencias-service.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    SearchPacienteComponent,
    NewPacienteComponent,
    DashboardComponent,
    CalendarioServiciosComponent,
    ExpedienteElectronicoComponent,
    BaseDatosComponent,
    ExitComponent,
    BodyComponent,
    ConfirmarEliminarDialogComponent,
    ActualizarDialogComponent,
    NuevaSuplenciaDialogComponent,
    NewCuidadorComponent,
    SearchCuidadorComponent,
    Actulizar2DialogComponent,
    ConfirmarEliminar2DialogComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule // Agrega BrowserAnimationsModule a la lista de imports
  ],
  providers: [
    PacientesService,
    CuidadoresServiceService,
    SuplenciasServiceService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }