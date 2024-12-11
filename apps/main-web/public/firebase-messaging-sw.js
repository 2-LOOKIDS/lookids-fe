importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
);
// Firebase 설정
firebase.initializeApp({
  apiKey: 'AIzaSyAJq8nnctU9mKdsk8F8y8ug0t4MfmZU4lo',
  authDomain: 'lookids-df03a.firebaseapp.com',
  projectId: 'lookids-df03a',
  storageBucket: 'lookids-df03a.firebasestorage.app',
  messagingSenderId: '841496181567',
  appId: '1:841496181567:web:e8a5e07286e1dadf9d318a',
  measurementId: 'G-CB0BDWD6W7',
});

const messaging = firebase.messaging();
