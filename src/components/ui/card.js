import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ style, children }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const CardHeader = ({ style, children }) => (
  <View style={[styles.cardHeader, style]}>{children}</View>
);

const CardTitle = ({ style, children }) => (
  <Text style={[styles.cardTitle, style]}>{children}</Text>
);

const CardDescription = ({ style, children }) => (
  <Text style={[styles.cardDescription, style]}>{children}</Text>
);

const CardContent = ({ style, children }) => (
  <View style={[styles.cardContent, style]}>{children}</View>
);

const CardFooter = ({ style, children }) => (
  <View style={[styles.cardFooter, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'column',
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 0,
  },
});

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
