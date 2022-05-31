import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeesController } from "./modules/coffees/coffees.controller";
import { CoffeesService } from "./modules/coffees/coffees.service";
import { CoffeesModule } from "./modules/coffees/coffees.module";

@Module({
  imports: [CoffeesModule],
  controllers: [AppController, CoffeesController],
  providers: [AppService],
})
export class AppModule {}
