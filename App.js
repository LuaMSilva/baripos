import 'react-native-gesture-handler'; // navegator para o drawer 
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { db } from './src/firebaseConnection'

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

