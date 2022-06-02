import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeesController } from "./modules/coffees/coffees.controller";
import { CoffeesModule } from "./modules/coffees/coffees.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeeRatingsModule } from "./modules/coffee-ratings/coffee-ratings.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoffeeRatingsModule,
  ],
  controllers: [AppController, CoffeesController],
  providers: [AppService],
})
export class AppModule {}
