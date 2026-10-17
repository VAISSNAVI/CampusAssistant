import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { fetchCampusContent } from '../../services/api';
import { Category } from '@campus-assistant/shared-types';

export default function CampusScreen() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCampusContent()
      .then((data) => setCategories(data.categories))
      .catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fa', padding: 16 },
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#e5edef',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  name: { fontSize: 15, fontWeight: '700', color: '#193744', marginBottom: 4 },
  desc: { fontSize: 12, color: '#748c96', lineHeight: 16 },
});
