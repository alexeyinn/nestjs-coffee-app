import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
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
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new HttpException(
        `Coffee #${id} is not exist`,
        HttpStatus.NOT_FOUND
      );
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    return this.coffees.push(createCoffeeDto);
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
