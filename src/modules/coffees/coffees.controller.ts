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
import { CoffeesService } from "./coffees.service";

@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get("flavors")
  findAll(@Query() queryParams) {
    //const { limit, offset } = queryParams;
    //findAll(@Res() response) {
    //response.status(200).send("Find all coffees");
    return this.coffeesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  //@HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return this.coffeesService.create(body);
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
