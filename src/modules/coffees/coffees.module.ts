import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffees } from "./entities/coffees.entity";
import { Flavors } from "./entities/flavors.entity";
import { Event } from "../../common/events/entities/event.entity";
import { COFFEE_BRANDS } from "./coffes.constants";

@Module({
  imports: [TypeOrmModule.forFeature([Coffees, Flavors, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    { provide: COFFEE_BRANDS, useValue: ["buddy brew", "nescafe"] },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
