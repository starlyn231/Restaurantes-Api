import { Component, OnInit } from "@angular/core";
import { RestauranteService } from "../../servicio/restaurante.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private service: RestauranteService) {}

  ngOnInit() {}

  ingresar(proveedor: string) {
    console.log(proveedor);

    this.service.login(proveedor);
  }
}
