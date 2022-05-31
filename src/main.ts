import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
//2-25
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Можем получать любого вида объекты,
      // отдаем только стандартного вида
      whitelist: true,
      // Не можем получать отличного от вида
      // от валидированного DTO
      forbidNonWhitelisted: true,
      // Если получается, приводит типы получаемых
      // данных, к указанными нами через TS
      transform: true,
    })
  );
  await app.listen(3000);
}

bootstrap();
