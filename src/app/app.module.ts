import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./componentes/home/home.component";
import { ReservacionComponent } from "./componentes/reservacion/reservacion.component";
import { NavComponent } from "./componentes/nav/nav.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PaginatePipe } from "./pipes/paginate.pipe";
import { RestaurantePipePipe } from "./pipe/restaurante-pipe.pipe";
import { MaterialModule } from "./material.module";
import { AgmCoreModule } from "@agm/core";
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireAuthModule } from "angularfire2/auth";
import { LoginComponent } from './componentes/login/login.component';
import { TodasReservacionesComponent } from './componentes/todas-reservaciones/todas-reservaciones.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReservacionComponent,
    NavComponent,
    PaginatePipe,
    RestaurantePipePipe,
    LoginComponent,
    TodasReservacionesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyADoOtheQRLLLlwJXisubhw1U57S2YrcOc",
    }),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
