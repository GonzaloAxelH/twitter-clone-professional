import type { User } from './types/user';
import type { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export type Tweet = {
  id: string;
  text: string | null;
  images: null;
  parent: {
    id: string;
    username: string;
  } | null;
  userLikes: string[];
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  userReplies: number;
  userRetweets: string[];
};

export type TweetWithUser = Tweet & { user: User };

export const tweetConverter: FirestoreDataConverter<Tweet> = {
  toFirestore(tweet) {
    return { ...tweet };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);
    return { id, ...data } as Tweet;
  }
};
