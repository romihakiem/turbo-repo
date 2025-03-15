import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA2riIRgBOX8d2nt0_XjjrazIrx_Iv6muE',
  authDomain: 'indexbase-1f3dd.firebaseapp.com',
  projectId: 'indexbase-1f3dd',
  storageBucket: 'indexbase-1f3dd.firebasestorage.app',
  messagingSenderId: '642517635313',
  appId: '1:642517635313:web:9f5bb8cb39451992415950',
  measurementId: 'G-X80QSFG92E'
};

const config = initializeApp(firebaseConfig);

export default config;