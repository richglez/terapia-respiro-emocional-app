import { Routes } from "@angular/router";
import { NewPacienteComponent } from "./components/new-paciente/new-paciente.component";
import { SearchPacienteComponent } from "./components/search-paciente/search-paciente.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CalendarioServiciosComponent } from "./components/calendario-servicios/calendario-servicios.component";
import { ExpedienteElectronicoComponent } from "./components/expediente-electronico/expediente-electronico.component";
import { BaseDatosComponent } from "./components/base-datos/base-datos.component";
import { NewCuidadorComponent } from "./components/new-cuidador/new-cuidador.component"
import { SearchCuidadorComponent } from "./components/search-cuidador/search-cuidador.component"
import { ExitComponent } from "./components/exit/exit.component";

export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: DashboardComponent},
    {path: 'new-paciente', component: NewPacienteComponent},
    {path: 'search-paciente', component: SearchPacienteComponent},
    {path: 'calendario-servicios', component: CalendarioServiciosComponent},
    {path: 'expediente-electronico', component: ExpedienteElectronicoComponent},
    {path: 'base-datos', component: BaseDatosComponent},
    {path: 'new-cuidador', component: NewCuidadorComponent},
    {path: 'search-cuidador', component: SearchCuidadorComponent},
    {path: 'exit', component: ExitComponent}
];