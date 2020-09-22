import { Injectable, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ReservacionModel } from "../models/reservacion.model";
// delay puede relentisar algun elemento
import { map, delay } from "rxjs/operators";
import { Restaurant } from "../interfaces/restaurantes";

@Injectable({
  providedIn: "root",
})
export class RegistroService {
  private url = "https://restaurante-35e26.firebaseio.com";
  constructor(private http: HttpClient) {}
  @Input("restaurante") Restaurantes;

  crearReservacion(reservacion: ReservacionModel) {
    return (
      this.http
        .post(`${this.url}/reservaciones.json`, reservacion)
        // map sirve para transforma lo que un observable puede regresar. en este caso el map resive la respuesta
        .pipe(
          map((resp: any) => {
            reservacion.id = resp.name;
            return reservacion;
          })
        )
    );
  }

  actualizarReservacion(reservacion: ReservacionModel) {
    // quita id del objeto para que no se actualice en FIREBASE, mandando la referencia a firebase
    // con el operador expreess se encarga de tomar todas las propiedades de empleado y crearse una con el mismo nombre
    const reservacionTemp = {
      ...reservacion,
    };
    // como no tiene la ref de js puedo borrar la propiedad id, en lugar del empleado por referencia, mandare el empleadoTemporal
    delete reservacionTemp.id;

    return this.http.put(
      `${this.url}/reservaciones/${reservacion.id}.json`,
      reservacionTemp
    );
  }

  getReservaciones() {
    // Para mostrar el objeto desde firebase no se puede pintar directo sino que tenemos que
    // pasarlo por map para proesar informacion y luego crear un arreglo para interar en el *ngFor
    return this.http
      .get(`${this.url}/reservaciones.json`)
      .pipe(map((resp) => this.crearArreglo(resp))); // map lo que toma la informacion de resp y tranforma y regresa otra cosa
  }

  private crearArreglo(reservacionObj: Object) {
    const reservaciones: ReservacionModel[] = [];
    // console.log(empleadoObj);
    // este condional es por si no tiene ninguna informacion en base de datos regresa un arreglo vacio..
    if (reservacionObj === null) {
      return [];
    }
    Object.keys(reservacionObj).forEach((key) => {
      const reservacion: ReservacionModel = reservacionObj[key]; // se esta extrayendo el objeto y creando una referencia de tipo empleado
      reservacion.id = key;

      reservaciones.push(reservacion);
    });
    return reservaciones;
  }
  borrarReservacion(id: string) {
    return this.http.delete(`${this.url}/reservacion/${id}.json`);
  }
}
