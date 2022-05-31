import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeesController } from "./modules/coffees/coffees.controller";
import { CoffeesModule } from "./modules/coffees/coffees.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "admin",
      database: "postgres",
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController, CoffeesController],
  providers: [AppService],
})
export class AppModule {}
