import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from "@nestjs/common";

@Controller("coffees")
export class CoffeesController {
  @Get("flavors")
  findAll(@Res() response) {
    //response.status(200).send("Find all coffees");
    return "Find all coffees";
  }

  @Get(":id")
  findId(@Param("id") id: string) {
    return `Try find coffee #${id}`;
  }

  @Post()
  //@HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return body;
  }
}
