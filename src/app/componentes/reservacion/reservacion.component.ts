import { Component, OnInit } from "@angular/core";
import { RestauranteService } from "../../servicio/restaurante.service";
import { RegistroService } from "../../servicio/registro.service";
import { ActivatedRoute } from "@angular/router";
import { Restaurant } from "../../interfaces/restaurantes";
import { NgForm } from "@angular/forms";
import { ReservacionModel } from "../../models/reservacion.model";
import { google } from "google-maps";
import { Observable } from "rxjs";

// Importar sweet alert
import Swal from "sweetalert2";
@Component({
  selector: "app-reservacion",
  templateUrl: "./reservacion.component.html",
  styleUrls: ["./reservacion.component.css"],
})
export class ReservacionComponent implements OnInit {
  reservacion: ReservacionModel = new ReservacionModel();
  lng: any;
  lat: any;
  restaurante: any;

  cualquiera: any;
  private img = "assets/img/Restaurant.jpg";
  constructor(
    private service: RestauranteService,
    private activatedRoute: ActivatedRoute,
    private registroService: RegistroService
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      console.log(parametros);
      this.service.obtenerDatos(parametros["id"]).subscribe((respuesta) => {
        console.log(respuesta);
        this.restaurante = respuesta;
        console.log((this.restaurante.id = parametros));
        // console.log(this.restaurante["name"]);

        // this.restaurante = this.service.obtenerDatos(parametros["id"]);
      });
      // paametros['id']
    });
  }
  guardar(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    Swal.fire({
      position: "top-end",
      icon: "info",
      title: "Your work has been saved",
      showConfirmButton: false,
    });
    /*
    this.registroService
      .crearReservacion(this.reservacion)
      .subscribe((resp) => {
        console.log(resp);
        this.reservacion.nameRestaurant = this.restaurante["name"];
        this.reservacion.zona = this.restaurante["area"];
        console.log(this.reservacion.nameRestaurant);
      });
*/
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.reservacion.id) {
      // aqui estamos usando el servicio y la funcion creara empleado

      peticion = this.registroService.actualizarReservacion(this.reservacion);
    } else {
      // aqui estamos usando el servicio y la funcion creara empleado
      peticion = this.registroService.crearReservacion(this.reservacion);
      this.reservacion.nameRestaurant = this.restaurante["name"];
      this.reservacion.zona = this.restaurante["area"];
      this.reservacion.id = this.restaurante["id"];
    }

    peticion.subscribe((resp) => {
      Swal.fire({
        title: this.reservacion.NobreCte,
        text: "Se actualizo correctamente la reservacion",
        icon: "success",
        position: "top",
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    });
  }

  ngOnInit() {}
}
