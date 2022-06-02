import { Injectable } from "@nestjs/common";
import { CoffeesService } from "../coffees/coffees.service";

@Injectable()
export class CoffeeRatingsService {
  constructor(private readonly coffeesService: CoffeesService) {}
}
