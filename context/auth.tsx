import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { getChatId } from "@/utils";
interface AuthProps {
  handleSignIn: (email: string, password: string, username: string) => void;
  handleSignOut: () => void;
  user?: any;
  logged: boolean;
  createChat: (contact: any) => void;
  sendMessage: (userId: string, message: string) => void;
  setLikeMessage: (messageId: string, likedBy: string[]) => void;
  sendImage: (userId: string, base64: string) => void;
}

const AuthContext = createContext<AuthProps>({
  handleSignIn: () => null,
  handleSignOut: () => null,
  user: undefined,
  logged: false,
  createChat: () => null,
  sendMessage: () => null,
  setLikeMessage: () => null,
  sendImage: () => null,
});

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
    const userFromDb = await getDoc(doc(db, "users", userId));
    if (userFromDb.exists()) {
      const userDataFromDb = userFromDb.data();
      setUser({ ...user, ...userDataFromDb });
      setLogged(true);
    }
  };

  const setLikeMessage = async (messageId: string, likedBy: string[]) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      let likedByUpdated = likedBy?.length ? [...likedBy] : [];

      if (user?.uid) {
        if (!likedByUpdated.includes(user?.uid)) {
          likedByUpdated.push(user?.uid);
        } else {
          const index = likedByUpdated.indexOf(user?.uid);
          if (index > -1) {
            likedByUpdated.splice(index, 1);
          }
        }

        await updateDoc(doc(db, "messages", messageId), {
          liked: !!likedByUpdated?.length,
          likedBy: likedByUpdated,
        });
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  };

  const createChat = async (contact: any) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const chatId = getChatId(user?.uid, contact?.userId);

      const chatIdDoc = await getDoc(doc(db, "chats", chatId));

      if (!chatIdDoc.exists()) {
        await setDoc(doc(db, "chats", chatId), {
          chatId,
          userFromEmail: user?.email,
          userFromId: user?.uid,
          userToEmail: contact?.email,
          userToId: contact?.userId,
          lastMessage: null,
          lastMessageTime: null,
          isLastMessageImage: false,
          isLastMessageText: false,
          lastMessageUserId: null,
          createdAt: Timestamp.fromDate(new Date()),
        });
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  };

  const sendImage = async (userId: string, base64: string) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const chatId = getChatId(user?.uid, userId);
      const messageId = [chatId, Date.now()].join("-");

      const date = Timestamp.fromDate(new Date());

      await updateDoc(doc(db, "chats", chatId), {
        lastMessageTime: date?.seconds,
        lastMessage: base64,
        lastMessageUserId: user?.uid,
        isLastMessageImage: true,
        isLastMessageText: false,
      });

      await setDoc(doc(db, "messages", messageId), {
        messageId,
        chatId,
        fromId: user?.uid,
        toId: userId,
        message: null,
        liked: false,
        likedBy: [],
        image: base64,
        createdAt: date,
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  };

  const sendMessage = async (userId: string, message: string) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const chatId = getChatId(user?.uid, userId);
      const messageId = [chatId, Date.now()].join("-");

      const date = Timestamp.fromDate(new Date());

      await updateDoc(doc(db, "chats", chatId), {
        lastMessageTime: date?.seconds,
        lastMessage: message,
        lastMessageUserId: user?.uid,
        isLastMessageImage: false,
        isLastMessageText: true,
      });

      await setDoc(doc(db, "messages", messageId), {
        messageId,
        chatId,
        fromId: user?.uid,
        toId: userId,
        message: message?.trim(),
        liked: false,
        likedBy: [],
        image: null,
        createdAt: date,
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  };

  const handleSignIn = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response?.user?.uid), {
        email,
        userId: response?.user?.uid,
        username,
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
        createChat,
        sendMessage,
        setLikeMessage,
        sendImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
