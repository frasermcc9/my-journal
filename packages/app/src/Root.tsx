import { ApolloProvider } from "@apollo/client";
import React, { useEffect, useState } from "react";
import client from "./apollo/client";
import "./App.css";
import AuthProviderImpl from "./components/auth/AuthProvider";
import { JournalRouter } from "./components/JournalRouter";
import "./styles/tailwind.output.css";

function Root() {
  const [auth, setAuth] = useState<number | null>(null);

  useEffect(() => {
    const loginListener = AuthProviderImpl.get()
      .on("successfulLogin", (user) => {
        setAuth(user);
      })
      .on("autoLoginFail", () => {
        setAuth(0);
      });
    return () => {
      loginListener.removeAllListeners();
    };
  }, []);

  return (
    <div className="bg-gray-100 h-full">
      <ApolloProvider client={client}>
        <JournalRouter currentUser={auth} />
      </ApolloProvider>
    </div>
  );
}

export default Root;
