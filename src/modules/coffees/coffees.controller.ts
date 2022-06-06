import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { ApiForbiddenResponse, ApiTags } from "@nestjs/swagger";
import { Protocol } from "src/common/decorators/protocol.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { PaginationQueryDto } from "./dto/pagination-query.dto";

@ApiTags("Coffees")
@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @ApiForbiddenResponse({ description: "Forbidden" })
  @Public()
  @Get("flavors")
  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    // default protocol value
    @Protocol("https") protocol: string
  ) {
    //findAll(@Res() response) {
    //response.status(200).send("Find all coffees");
    // Откладываем исполнение контроллера
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(protocol);
    return this.coffeesService.findAll(paginationQueryDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  //@HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return this.coffeesService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.coffeesService.remove(id);
  }
}
