import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coffees } from "./coffees.entity";

@Entity()
export class Flavors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Coffees, (coffee) => coffee.flavors)
  coffees: Coffees[];
}
