import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "src/common/events/entities/event.entity";
import { Connection, Repository } from "typeorm";
import { COFFEE_BRANDS } from "./coffees.constants";
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
    private readonly flavorsRepository: Repository<Flavors>,
    private readonly connection: Connection,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[]
  ) {
    console.log(coffeeBrands);
  }

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

  async recommendCoffee(coffee: Coffees) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = "recommend_coffee";
      recommendEvent.type = "coffee";
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavors> {
    const existingFlavor = await this.flavorsRepository.findOne({ name });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorsRepository.create({ name });
  }
}
