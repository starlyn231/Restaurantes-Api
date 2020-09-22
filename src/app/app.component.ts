import { Component } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { RestauranteService } from "./servicio/restaurante.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public reservacion: Observable<any[]>;
  constructor(db: AngularFirestore, public servicio: RestauranteService) {
    this.reservacion = db.collection("reservacion").valueChanges();
    console.log(this.reservacion);
  }
  title = "proyectoFinalUNAPEC";
}
