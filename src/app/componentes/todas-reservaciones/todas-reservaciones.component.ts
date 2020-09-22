import { Component, OnInit } from "@angular/core";
import { RegistroService } from "../../servicio/registro.service";
import { ReservacionModel } from "../../models/reservacion.model";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { RestauranteService } from "../../servicio/restaurante.service";
// Importar sweet alert

@Component({
  selector: "app-todas-reservaciones",
  templateUrl: "./todas-reservaciones.component.html",
  styleUrls: ["./todas-reservaciones.component.css"],
})
export class TodasReservacionesComponent implements OnInit {
  reservacion: ReservacionModel[] = [];
  cargando = false;
  restaurant: any;
  constructor(
    private registroService: RegistroService,
    private service: RestauranteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargando = true;
    this.registroService.getReservaciones().subscribe((resp) => {
      this.reservacion = resp;
      this.cargando = false;
    });
  }

  borrarReservacion(reservacion: ReservacionModel, i: number) {
    // esto es para borrar un elemento del arreglo y se borre del dom igual. Angular se encarga de renderizar el arreglo nuevamente.
    Swal.fire({
      text: `Está seguro que desea borrar la reservacion de ${reservacion.NobreCte}`,
      icon: "question",
      showConfirmButton: true,
      title: "¿Está seguro?",
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.reservacion.splice(i, 1);
        this.registroService.borrarReservacion(reservacion.id).subscribe();
      }
    });
  }
}
