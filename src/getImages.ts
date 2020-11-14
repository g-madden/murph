import firebase from 'firebase/app';
import 'firebase/storage';

export const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: 'murph-292201.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

export const getImages = async () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const storage = firebase.storage();
  const storageRef = storage.ref('murp-stash');
  return await storageRef.listAll()
  .then((res) => res.items.map((ref) => ref.getDownloadURL().then(url => url as string)))
  .then(aop => Promise.all(aop))
  .catch((error) => {
    console.error(error);
    return []
  });
};
