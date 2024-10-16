import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '@/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
interface AuthProps {
  handleSignIn: (email: string) => void;
  handleSignOut: () => void;
  user?: any;
  logged: boolean;
}

const AuthContext = createContext<AuthProps>({
  handleSignIn: () => null,
  handleSignOut: () => null,
  user: null,
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
  const [user, setUser] = useState<any>(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if(user){
        setLogged(true);
        setUser(user);
      } else {
        setLogged(false);
        setUser(null);
      }
    });

    return unsub;
  }, []);

  const handleSignIn = async (email: string) => {
    const password = 'default_pass';
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", response?.user?.uid), {
        email,
        userId: response?.user?.uid
      })
      return { success: true };
    } catch (error: any) {
      if(error.message){
        try{
          await signInWithEmailAndPassword(auth, email, password);
          return { success: true, msg: error.message};
        } catch(e){
          setUser(null);
          setLogged(false);
          return { success: false, msg: error.message. error };
        }
      }
      setUser(null);
      setLogged(false);
      return { success: false, msg: error.message. error };
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setLogged(false);
      return { success: true };
    } catch (error: any) {
      setLogged(true);
      return { success: false, msg: error.message. error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleSignOut,
        user,
        logged,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
