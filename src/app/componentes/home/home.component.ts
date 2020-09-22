import { Component, OnInit } from "@angular/core";
import { RestauranteService } from "../../servicio/restaurante.service";
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Restaurant } from "../../interfaces/restaurantes";
import { PageEvent } from "@angular/material/paginator";
import { PaginatePipe } from "../../pipes/paginate.pipe";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  restaurantes: any = ([] = []);
  page_size: number = 21;
  page_number: number = 1;
  pageSizeOptions = [10, 20, 50, 100];
  cargando = false;

  // paginacion
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
  private img = "assets/img/Restaurant.jpg";

  city: any;
  country: any;
  constructor(
    private service: RestauranteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargando = true;

    this.service.obtenerRestaurante().subscribe(
      (data) => {
        this.restaurantes = data;
        this.cargando = false;

        //console.log(this.restaurantes);
      },
      (error) => console.log(error),
      () => console.log("Complete")
    );
    this.service.getCity().subscribe((resp: any) => {
      this.city = resp;
    });
    this.service.getCountry().subscribe((resp: any) => {
      this.country = resp;
      console.log(this.country);
    });
  }

  /* detail(id: number) {
    this.router.navigate(["/reservacion", id]);
  }*/
}
