import { Component, OnInit } from "@angular/core";
import { RestauranteService } from "../../servicio/restaurante.service";
@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  constructor(public servicio: RestauranteService) {}

  ngOnInit() {}
}
