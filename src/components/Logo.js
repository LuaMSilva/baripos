import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Logo = ({ style }) => {

  return (
    <View style={[stylesLogo.container, style]}>
      <View style={stylesLogo.relativeContainer}>
        <Text style={[stylesLogo.logoText]}>
          <Text style={stylesLogo.textPrimary}>Bari</Text>
          <Text style={stylesLogo.textSecondary}>pós</Text>
        </Text>
        <View style={stylesLogo.underline} />
      </View>
    </View>
  );
};

const stylesLogo = StyleSheet.create({
  containerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  relativeContainer: {
    position: 'relative',
  },
  logoText: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSm: {
    fontSize: 20,
  },
  textMd: {
    fontSize: 30,
  },
  textLg: {
    fontSize: 40,
  },
  textPrimary: {
    color: '#3b82f6', // Substitua por "baripos-500"
  },
  textSecondary: {
    color: '#1e40af', // Substitua por "baripos-700"
  },
  underline: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    width: '100%',
    height: 2,
    backgroundColor: '#2563eb', // Substitua pelo gradiente "from-baripos-400 to-baripos-600"
    borderRadius: 9999,
    opacity: 0.8, // Simulando "animate-pulse-soft"
  },
});

export default Logo;
