import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./componentes/home/home.component";
import { ReservacionComponent } from "./componentes/reservacion/reservacion.component";
import { TodasReservacionesComponent } from "./componentes/todas-reservaciones/todas-reservaciones.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "reservacion/:id", component: ReservacionComponent },
  { path: "reservaciones", component: TodasReservacionesComponent },
  { path: "**", pathMatch: "full", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
