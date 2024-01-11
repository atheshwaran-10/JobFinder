import React from "react";
import { useStorageState } from "./useStorageState";
import { useRouter } from "expo-router";
import axios from "axios";

type AuthContextType = {
  signIn: ({
    username,
    Password,
  }: {
    username: string;
    Password: string;
  }) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
};

const AuthContext = React.createContext<AuthContextType>({
  signIn: async ({ username, Password }) => {},
  signOut: () => {},
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

type SessionProviderProps = React.PropsWithChildren<{}>;

export function SessionProvider(props: SessionProviderProps) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const router = useRouter();

  const signIn = async ({
    username,
    Password,
  }: {
    username: string;
    Password: string;
  }) => {
    const url = process.env.EXPO_PUBLIC_SERVER_URL + "/login";
    
    console.log(url)

    const res = await axios.post(url, {
      username: username,
      password: Password,
    });
    setSession(res.data);
    if (res.status === 201) {
      // const storeRefreshToken = async (token) =>setItemAsync("username", username);
      console.log("Home")
      router.push("/home");
    }
  };

  const signOut = () => {
    console.log("Session");
    setSession(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
