import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ApiKeyGuard } from "src/common/guards/api-key.guard";
import { LoggingMiddleware } from "src/common/middleware/logging.middleware";

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // .exclude(<путь>) для исключения отработки middleware
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
