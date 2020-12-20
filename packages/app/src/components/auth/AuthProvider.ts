import { gql } from "@apollo/client";
import { EventEmitter } from "events";
import client from "../../apollo/client";

export default class AuthProviderImpl extends EventEmitter implements AuthProvider {
  private static authProvider?: AuthProvider;

  private constructor() {
    super();
  }

  public static get(): AuthProvider {
    if (this.authProvider === undefined) {
      this.authProvider = new AuthProviderImpl();
    }
    return this.authProvider;
  }

  public async tryRegister({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> {
    const registerResult = await client.mutate({
      mutation: MUTATE_REGISTER,
      variables: {
        email,
        password,
      },
    });

    if (registerResult.data?.register.errors) {
      return false;
    } else {
      return true;
    }
  }

  public async tryLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> {
    const loginResult = await client.mutate({
      mutation: MUTATE_LOGIN,
      variables: {
        email,
        password,
      },
    });

    if ((loginResult as any).data.login.errors) {
      return this.emit("failLogin");
    }
    this.emit("successfulLogin", (loginResult as any)?.login?.user?.id);
    return !(loginResult as any).data.login.errors;
  }

  public async trySessionLogin() {
    const { data } = await client.query({ query: QUERY_ME });

    if (data?.me?.id) {
      this.emit("successfulLogin", data?.me?.id);
      return true;
    } else {
      this.emit("autoLoginFail");
    }
    return false;
  }
}

export interface AuthProvider {
  tryLogin(credentials: { email: string; password: string }): Promise<boolean>;
  tryRegister(credentials: { email: string; password: string }): Promise<boolean>;
  on(event: "successfulLogin", fn: (user: number) => void): this;
  on(event: "failLogin", fn: () => void): this;
  on(event: "autoLoginFail", fn: () => void): this;
  removeAllListeners(): void;
  trySessionLogin(): Promise<boolean>;
}

const MUTATE_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

const MUTATE_REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      id
      email
    }
  }
`;
