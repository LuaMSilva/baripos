import 'react-native-gesture-handler'; // navegator para o drawer 
import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { db } from './src/firebaseConnection'
import PushNotification from 'react-native-push-notification';

import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';

export default function App(){ 
  return (
   <NavigationContainer>
    <AuthProvider>
      <StatusBar backgroundColor="#F0F4FF" barStyle='dark-content'/>
      <Routes/>
    </AuthProvider>
   </NavigationContainer>
  );
};

