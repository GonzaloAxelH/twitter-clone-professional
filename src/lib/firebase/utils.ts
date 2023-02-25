import {
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { tweetsCollection, usersCollection } from './collection';
import { storage } from './app';
import type { FilesWithId, ImagesPreview } from '@lib/types/file';
import type { Accent, Theme } from '@lib/context/teme-context';
import type { EditableUserData } from '@lib/types/user';
import type { Query } from 'firebase/firestore';

//para contar collecciones de qualquier tipo <T>, devuelve una promesa
export async function getCollectionCount<T>(
  collection: Query<T>
): Promise<number> {
  const snapshot = await getCountFromServer(collection);
  return snapshot.data().count;
}

//verificar si el nombre esta disponible
export async function checkUsernameAvailability(
  username: string
): Promise<boolean> {
  const { empty } = await getDocs(
    query(usersCollection, where('username', '==', username), limit(1))
  );
  return empty;
}

//actualizar el usuario
export async function updateUserData(
  userId: string,
  userData: EditableUserData
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    ...userData,
    updatedAt: serverTimestamp()
  });
}

//actualizar el tema del usuario
export async function updateUserTheme(
  userId: string,
  themeData: { theme?: Theme; accent?: Accent }
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, { ...themeData });
}

//fijar tweet

export async function managePinnedTweet(
  type: 'pin' | 'unpin',
  userId: string,
  tweetId: string
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    updatedAt: serverTimestamp(),
    pinnedTweet: type === 'pin' ? tweetId : null
  });
}

export async function removeTweet(tweetId: string): Promise<void> {
  const userRef = doc(tweetsCollection, tweetId);
  await deleteDoc(userRef);
}

export async function uploadImages(
  userId: string,
  files: FilesWithId
): Promise<ImagesPreview | null> {
  if (!files.length) return null;

  const imagesPreview = await Promise.all(
    files.map(async (file) => {
      let src: string;
      const { id, name: alt } = file;
      const storageRef = ref(storage, `images/${userId}/${alt}`);
      try {
        src = await getDownloadURL(storageRef);
      } catch {
        await uploadBytesResumable(storageRef, file);
        src = await getDownloadURL(storageRef);
      }
      return { id, src, alt };
    })
  );
  return imagesPreview;
}
