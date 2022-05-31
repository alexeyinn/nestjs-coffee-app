import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffees } from "./entities/coffees.entity";
import { Flavors } from "./entities/flavors.entity";
import { Event } from "../../common/events/entities/event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Coffees, Flavors, Event])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [CoffeesService],
})
export class CoffeesModule {}
