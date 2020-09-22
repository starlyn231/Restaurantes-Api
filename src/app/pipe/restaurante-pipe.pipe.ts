import { Pipe, PipeTransform } from "@angular/core";
import { Restaurant } from "../interfaces/restaurantes";

@Pipe({
  name: "restaurantePipe",
})
export class RestaurantePipePipe implements PipeTransform {
  transform(restaurant: any, ...args: any[]): any {
    let url =
      "https://static5.depositphotos.com/1010176/434/i/950/depositphotos_4340548-stock-photo-empty-restaurant.jpg";
    if (restaurant.image_url) {
      return restaurant.image_url;
    } else {
      if (restaurant.image_url) {
        return restaurant.image_url;
      } else return "assets/img/restaurante.jpg";
    }
  }
}
