try {
  importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js');
  importScripts(
    'https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging.js'
  );

  console.log('Firebase scripts imported successfully.');

  const firebaseConfig = {
    apiKey: 'AIzaSyAJq8nnctU9mKdsk8F8y8ug0t4MfmZU4lo',
    authDomain: 'lookids-df03a.firebaseapp.com',
    projectId: 'lookids-df03a',
    storageBucket: 'lookids-df03a.firebasestorage.app',
    messagingSenderId: '841496181567',
    appId: '1:841496181567:web:e8a5e07286e1dadf9d318a',
  };

  firebase.initializeApp(firebaseConfig);
  console.log('Firebase initialized.');

  const messaging = firebase.messaging();
  messaging.onBackgroundMessage((payload) => {
    console.log('Received background message: ', payload);
  });
} catch (error) {
  console.error('Error in firebase-messaging-sw.js:', error);
}
