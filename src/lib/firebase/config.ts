const config = {
  apiKey: 'AIzaSyALZAyCTvGxTNXakwTzI7TYA-9t3EWbL9Y',
  authDomain: 'twittercloneultimate.firebaseapp.com',
  projectId: 'twittercloneultimate',
  storageBucket: 'twittercloneultimate.appspot.com',
  messagingSenderId: '647495910729',
  appId: '1:647495910729:web:4b4fc7ff21f22f7cf10698'
} as const;
type Config = typeof config;
export function getFirebaseConfig(): Config {
  if (Object.values(config).some((value) => !value))
    throw new Error('Firebase config is not set or incomplete');

  return config;
}
