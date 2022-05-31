import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { CoffeesEntity } from "./entities/coffees.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CoffeesEntity])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [CoffeesService],
})
export class CoffeesModule {}
