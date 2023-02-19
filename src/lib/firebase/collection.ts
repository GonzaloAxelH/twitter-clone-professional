import { collection } from 'firebase/firestore';
import { userConverter } from '@lib/types/user';
import { statsConverter } from '@lib/types/stats';
import { tweetConverter } from '@lib/tweet';
import { bookmarkConverter } from '@lib/bookmark';
import { db } from './app';
import type { Bookmark } from '@lib/bookmark';
import type { Stats } from '@lib/types/stats';
import type { CollectionReference } from 'firebase/firestore';

//get users
export const usersCollection = collection(db, 'users').withConverter(
  userConverter
);

//get tweets
export const tweetsCollection = collection(db, 'tweets').withConverter(
  tweetConverter
);
export function userStatsCollection(id: string): CollectionReference<Stats> {
  return collection(db, `users/${id}/stats`).withConverter(statsConverter);
}

export function userBoomarksCollection(
  id: string
): CollectionReference<Bookmark> {
  return collection(db, `users/${id}/bookmarks`).withConverter(
    bookmarkConverter
  );
}
