import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { PaginationQueryDto } from "./dto/pagination-query.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { Coffees } from "./entities/coffees.entity";
import { Flavors } from "./entities/flavors.entity";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffees)
    private readonly coffeesRepository: Repository<Coffees>,
    @InjectRepository(Flavors)
    private readonly flavorsRepository: Repository<Flavors>
  ) {}

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    return this.coffeesRepository.find({
      relations: ["flavors"],
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    return await this.coffeesRepository.findOne(id, {
      relations: ["flavors"],
    });
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name))
    );

    const coffee = await this.coffeesRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return await this.coffeesRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name))
      ));

    const coffee = await this.coffeesRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
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

  private async preloadFlavorByName(name: string): Promise<Flavors> {
    const existingFlavor = await this.flavorsRepository.findOne({ name });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorsRepository.create({ name });
  }
}
