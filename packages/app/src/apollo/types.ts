export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type GetEntry = {
  getEntry: Entry;
};

export type Entry = {
  __typename?: "Entry";
  content: Scalars["String"];
  date: Scalars["Int"];
  author: User;
};

export type FieldError = {
  __typename?: "FieldError";
  path: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  saveEntry: Scalars["Boolean"];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
};

export type MutationSaveEntryArgs = {
  content?: Maybe<Scalars["String"]>;
  day: Scalars["Float"];
};

export type MutationRegisterArgs = {
  input: AuthInput;
};

export type MutationLoginArgs = {
  input: AuthInput;
};

export type Query = {
  __typename?: "Query";
  getEntry?: Maybe<Entry>;
  me?: Maybe<User>;
  book: Scalars["String"];
};

export type QueryGetEntryArgs = {
  day: Scalars["Float"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  entries: Array<Entry>;
};

export type UserResponse = {
  __typename?: "UserResponse";
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};
