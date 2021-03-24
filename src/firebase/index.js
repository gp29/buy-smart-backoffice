/**
 * Firebase Login
 * Reactify comes with built in firebase login feature
 * You Need To Add Your Firsebase App Account Details Here
 */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
   apiKey: "AIzaSyCql1zAlFz07DhBXjj-LRu332xeaHRydoE",
   authDomain: "buysmartly-28aeb-default-rtdb.firebaseapp.com",
   databaseURL: "https://buysmartly-28aeb-default-rtdb.firebaseio.com/",
   projectId: "buysmartly-28aeb",
};

firebase.initializeApp(config);

const versionDatabase = firebase.database().ref('version_selectors');

export {
   versionDatabase
};
