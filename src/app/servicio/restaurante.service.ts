import { Injectable } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { map, filter } from "rxjs/operators";
import { Observable } from "rxjs";
import { Restaurant } from "../interfaces/restaurantes";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root",
})
export class RestauranteService {
  private url = "http://opentable.herokuapp.com/api/restaurants";
  private filtro = "?country=US&PAGE=400&per_page=100";
  private urlCities = "http://opentable.herokuapp.com/api/cities";
  private urlCountry = "http://opentable.herokuapp.com/api/countries";
  public usuario: any = {};
  constructor(private http: HttpClient, public afAuth: AngularFireAuth) {
    // nos subscribimos a el afauth para ver cualquier cambio en el estado de autenticacion
    // recibimo un user que no es el mismo que usuario de arriba
    this.afAuth.authState.subscribe((user) => {
      console.log("estado del usuario", user);
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  // autrenticacion con AngularFireAuth
  login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  obtenerDatos(id: string) {
    return this.http.get(`${this.url}/${id}`).pipe(map((resp) => resp));
  }

  obtenerRestaurante() {
    return this.http
      .get(`${this.url}${this.filtro}`)
      .pipe(map((resp) => resp["restaurants"]));
  }

  getCity() {
    return this.http
      .get(`${this.urlCities}`)
      .pipe(map((resp) => resp["cities"]));
  }

  getCountry() {
    return this.http
      .get(`${this.urlCountry}`)
      .pipe(map((resp) => resp["countries"]));
  }

  // `${this.url}/${id}`;
  //  en este caso no necesita el pipe map , porque la informacion viene como la necesito...
  // .pipe(  map((data) => data["artists"].items)
  // );
  // }
}
