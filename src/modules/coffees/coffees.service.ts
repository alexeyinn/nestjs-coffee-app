import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { CoffeesEntity } from "./entities/coffees.entity";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(CoffeesEntity)
    private readonly coffeesRepository: Repository<CoffeesEntity>
  ) {}

  findAll() {
    return this.coffeesRepository.find();
  }

  async findOne(id: string) {
    return await this.coffeesRepository.findOne(id);
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = await this.coffeesRepository.create(createCoffeeDto);
    return await this.coffeesRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeesRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeesRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeesRepository.remove(coffee);
  }
}
