import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { searchCampus } from '../../services/api';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length > 1) {
      try {
        const data = await searchCampus(text);
        setResults(data.items || []);
      } catch {}
    } else {
      setResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search departments, library, syllabus, COE..."
        value={query}
        onChangeText={handleSearch}
        placeholderTextColor="#9baab1"
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultCard}>
            <Text style={styles.resultCategory}>{item.category}</Text>
            <Text style={styles.resultTitle}>{item.title || item.name || item.question}</Text>
            <Text style={styles.resultSnippet} numberOfLines={2}>
              {item.content || item.description || item.answer}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          query.length > 1 ? (
            <Text style={styles.emptyText}>No matching campus records found.</Text>
          ) : (
            <Text style={styles.emptyText}>Type above to search official KRCE information.</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fa', padding: 16 },
  searchInput: {
    backgroundColor: '#ffffff',
    borderColor: '#e5edef',
    borderWidth: 1,
    borderRadius: 9,
    padding: 12,
    fontSize: 13,
    color: '#193744',
    marginBottom: 14,
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderColor: '#e5edef',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  resultCategory: { fontSize: 9, fontWeight: '700', color: '#1d6079', textTransform: 'uppercase', marginBottom: 4 },
  resultTitle: { fontSize: 14, fontWeight: '700', color: '#193744', marginBottom: 4 },
  resultSnippet: { fontSize: 12, color: '#68828f', lineHeight: 16 },
  emptyText: { textAlign: 'center', color: '#9aa9b0', fontSize: 13, marginTop: 40 },
});
