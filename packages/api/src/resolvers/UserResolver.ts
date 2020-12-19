import { Entry } from "./../entity/Entry";
import { AppContext } from "./../graphql-types/MyContext";

import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class UserResolver {
  @Query(() => Entry, { nullable: true })
  @UseMiddleware(isAuth)
  async getEntry(
    @Arg("day") day: number,
    @Ctx() ctx: AppContext
  ): Promise<Entry | undefined> {
    const entry = await Entry.findOne({
      where: { author: ctx.req.session.userId, date: day },
    });
    return entry;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async saveEntry(
    @Arg("day") day: number,
    @Arg("content", { nullable: true }) content: string,
    @Ctx() ctx: AppContext
  ): Promise<Boolean> {
    const entry = new Entry();
    entry.date = day;
    entry.content = content;
    entry.author = parseInt(ctx.req.session.userId + "");

    const old = await Entry.findOne({
      where: { date: day, author: ctx.req.session.userId },
    });

    if (old == undefined) {
      await Entry.create({
        date: day,
        author: parseInt(ctx.req.session.userId + ""),
        content,
      }).save();
    } else {
      await old.remove();
      old.content = content;
      old.author = parseInt(ctx.req.session.userId + "");
      old.date = day;
      await Entry.save(old);
    }

    return true;
  }
}
