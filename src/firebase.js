import firebase from 'firebase';
import { LOGO_ETABIBO_PNG } from './assets/images';

const initFirebase = async (firebaseAPICallback) => {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyAs_cZYcYzX8Lma0otlWOhY8vucCkPMpcQ',
        authDomain: 'appointment-booking-plat-6cc8b.firebaseapp.com',
        projectId: 'appointment-booking-plat-6cc8b',
        storageBucket: 'appointment-booking-plat-6cc8b.appspot.com',
        messagingSenderId: '814551087619',
        appId: '1:814551087619:web:1c99190824623275526c36',
        measurementId: 'G-V3FRVJ71LJ'
      });
    } else {
      firebase.app();
    }

    const messaging = firebase.messaging();

    if (firebase.messaging.isSupported()) {
      messaging.onMessage((payload) => {
        const { title, body: message } = payload.notification;
        const { clickAction } = payload.data;
        new Notification(title, {
          message: message.replace('<b>', '').replace('</b>', ''),
          icon: LOGO_ETABIBO_PNG
        }).onclick = (event) => {
          event.preventDefault();
          if (clickAction) {
            window.location = clickAction;
          }
        };
      });

      await Notification.requestPermission();
      // Add the public key generated from the console here.
      const token = await messaging.getToken({
        vapidKey:
          'BFY0HOJNg1WBeTUacB2ptCeBZBTLA7qmBYd0G8CE1MmSvtZMg-YKJmSJ8PBgxcy5Hn8jkvIvdcC_4Yhv82JxzTw'
      });
      if (localStorage.getItem('gtoken') !== token) {
        try {
          firebaseAPICallback(token);
        } catch (error) {
          // console.log("initFirebase -> error", error)
        }
      }
      localStorage.setItem('gtoken', token);
    } else {
      localStorage.setItem('gtoken', false);
    }
  } catch (error) {
    console.log('Firebase notifications disabled', error);
  }
};

export default initFirebase;
