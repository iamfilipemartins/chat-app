import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
interface AuthProps {
  handleSignIn: (email: string, password: string) => void;
  handleSignOut: () => void;
  user?: any;
  logged: boolean;
}

const AuthContext = createContext<AuthProps>({
  handleSignIn: () => null,
  handleSignOut: () => null,
  user: undefined,
  logged: false,
});

// This hook can be used to access the user info.
export const useAuthContext = (): AuthProps => {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<any>(undefined);
  const [logged, setLogged] = useState(false);

  const updateUser = async (userId: string) => {
    const userFromDb = await getDoc(doc(db, 'users', userId));
    if(userFromDb.exists()){
      const userDataFromDb = userFromDb.data();
      setUser({...user, ...userDataFromDb});
      setLogged(true);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      await setDoc(doc(db, "users", response?.user?.uid), {
        email,
        userId: response?.user?.uid,
      });

      return { success: true };
    } catch (error: any) {
      if (error.message.includes("auth/email-already-in-use")) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          return { success: true, msg: error.message };
        } catch (e: any) {
          setUser(null);
          return { success: false, msg: e.message };
        }
      }
      setUser(null);
      return { success: false, msg: error.message };
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setLogged(false);
      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message.error };
    }
  };

  useEffect(() => {
    const changeState = onAuthStateChanged(auth, (userChanged) => {
      if (userChanged) {
        setUser(userChanged);
        updateUser(userChanged.uid);
      } else {
        setUser(null);
      }
    });

    return changeState;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleSignOut,
        user,
        logged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
