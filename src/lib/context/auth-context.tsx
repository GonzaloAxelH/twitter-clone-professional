import { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as signOutFirebase
} from 'firebase/auth';
import { userStatsCollection, usersCollection } from '@lib/firebase/collection';
import { getRandomInt } from '@lib/random';
import { auth } from '@lib/firebase/app';
import type { User as AuthUser } from 'firebase/auth';
import type { Stats } from '@lib/types/stats';
import type { WithFieldValue } from 'firebase/firestore';
import type { User } from '@lib/types/user';
import type { ReactNode } from 'react';
export type AuthContextProviderProps = {
  children: ReactNode;
};
type AuthContextProps = {
  user: User | null;
  error: Error | null;
  loading: boolean;
  isAdmin: boolean;
  randomSeed?: string;
  userBookmarks?: any[] | null;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthContextProvider({
  children
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const manageUser = async (authUser: AuthUser): Promise<void> => {
      const { uid, displayName, photoURL } = authUser;

      const userSnapshot = await getDoc(doc(usersCollection, uid));
      if (!userSnapshot.exists()) {
        //si no existe
        let available = false;
        let randomUsername = '';

        while (!available) {
          //if user is not available
          const normalizeNameNotSpaces = displayName
            ?.replace(/\s/g, '')
            .toLowerCase();
          const randomInt = getRandomInt(1, 10_000);
          randomUsername = `${normalizeNameNotSpaces as string}${randomInt}`;

          const randomUserSnapshot = await getDoc(
            doc(usersCollection, randomUsername)
          );

          if (!randomUserSnapshot.exists()) available = true;
        }

        const userData: WithFieldValue<User> = {
          id: uid,
          bio: null,
          name: displayName as string,
          theme: null,
          accent: null,
          website: null,
          location: null,
          photoURL: photoURL as string,
          username: randomUsername,
          verified: false,
          following: [],
          followers: [],
          createdAt: serverTimestamp(),
          updatedAt: null,
          totalTweets: 0,
          totalPhotos: 0,
          pinnedTweet: null,
          coverPhotoURL: null
        };

        const userStatsData: WithFieldValue<Stats> = {
          likes: [],
          tweets: [],
          updatedAt: null
        };

        try {
          await Promise.all([
            setDoc(doc(usersCollection, uid), userData),
            setDoc(doc(userStatsCollection(uid), 'stats'), userStatsData)
          ]);

          const newUser = (await getDoc(doc(usersCollection, uid))).data();
          setUser(newUser as User);
        } catch (error) {
          setError(error as Error);
        }
      } else {
        const userData = userSnapshot.data();
        setUser(userData);
      }
      setLoading(false);
    };

    const handleUserAuth = (authUser: AuthUser | null): void => {
      setLoading(true);

      if (authUser) void manageUser(authUser);
      else {
        setUser(null);
        setLoading(false);
      }
    };

    onAuthStateChanged(auth, handleUserAuth);
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error as Error);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await signOutFirebase(auth);
    } catch (error) {
      setError(error as Error);
    }
  };
  const isAdmin = user ? user.username === 'gonzaloadmin' : false;

  const value: AuthContextProps = {
    user,
    error,
    loading,
    isAdmin,
    signOut,
    signInWithGoogle
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuth must be used within an AuthContextProvider');

  return context;
}
