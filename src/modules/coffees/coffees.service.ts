import { Injectable } from "@nestjs/common";
import { CreateCoffeeDto } from "./dto/createCoffee.dto";
import { CoffeesEntity } from "./entities/coffees.entity";

@Injectable()
export class CoffeesService {
  private coffees: CoffeesEntity[] = [
    {
      id: 1,
      name: "Roast",
      brand: "Brew",
      flavors: ["chocolate", "vanilla"],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find((item) => item.id === +id);
  }

  create(dto: CreateCoffeeDto) {
    return this.coffees.push(dto);
  }

  update(id: string, body) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      console.log("Trying update coffee on " + body);
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
