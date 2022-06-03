import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ApiKeyGuard } from "./common/guards/api-key.guard";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor";
import { WrapResponseInterceptor } from "./common/interceptors/wrap-response.interceptor";
//2-60
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
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor()
  );
  await app.listen(3000);
}

bootstrap();
