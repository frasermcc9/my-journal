import { Int } from "type-graphql";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
@Index(["author", "date"], { unique: true })
export class Entry extends BaseEntity {
  // @Field(() => ID)
  // @PrimaryGeneratedColumn("uuid")
  // id: number;

  @Field()
  @Column({ type: "text" })
  content: string;

  @Field(() => Int)
  @PrimaryColumn({ type: "integer" })
  date: number;

  @Field(() => User)
  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.entries)
  author: number;
}
