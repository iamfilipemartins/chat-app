import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react';

interface AuthProps {
  handleSignIn: () => void;
  handleSignOut: () => void;
  username?: string | null;
  logged: boolean;
}

const AuthContext = createContext<AuthProps>({
  handleSignIn: () => null,
  handleSignOut: () => null,
  username: null,
  logged: false,
});

// This hook can be used to access the user info.
export const useAuthContext = (): AuthProps => {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState<string | null>(null);
  const [logged, setLogged] = useState(false);

  const handleSignIn = async () => {
    try {
      setUsername('Teste');
      setLogged(true);
    } catch (error) {
      setUsername(null);
      setLogged(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setUsername(null);
      setLogged(false);
    } catch (error) {
      setUsername(null);
      setLogged(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleSignOut,
        username,
        logged,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
