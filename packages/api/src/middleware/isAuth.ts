import { AppContext } from "./../graphql-types/MyContext";
import { MiddlewareFn } from "type-graphql";
import { ApolloError } from "apollo-server-core";

export const isAuth: MiddlewareFn<AppContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new ApolloError("not authenticated");
  }

  return next();
};
