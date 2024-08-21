import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure to install @expo/vector-icons if not already

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            // Add custom styling here if needed
          }
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../../assets/images/home.png')} 
                  style={styles.iconImage}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="funds"
          options={{
            title: 'Funds',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../../assets/images/funds1.png')} 
                  style={styles.iconImage}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="withdraw"
          options={{
            title: 'Withdraw',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../../assets/images/withdraw.png')} 
                  style={styles.iconImage}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../../assets/images/history.png')} 
                  style={styles.iconImage}
                />
              </View>
            ),
          }}
        />
      </Tabs>
      <TouchableOpacity style={styles.floatingButton}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', 
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 12,
    color: '#000',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30, 
    left: '50%',
    transform: [{ translateX: -30 }], 
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
