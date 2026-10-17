import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1d6079',
        tabBarInactiveTintColor: '#87959c',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5edef',
        },
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#193744',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Overview',
          headerTitle: 'KRCE CampusMate',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerTitle: 'Search Campus',
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: 'Assistant',
          headerTitle: 'AI Campus Assistant',
        }}
      />
      <Tabs.Screen
        name="campus"
        options={{
          title: 'Campus',
          headerTitle: 'Campus Directory',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'Student Profile',
        }}
      />
    </Tabs>
  );
}
