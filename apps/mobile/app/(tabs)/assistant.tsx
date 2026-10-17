import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { askAssistant } from '../../services/api';

export default function AssistantScreen() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string; sources?: any[] }>>([
    {
      role: 'assistant',
      content:
        'Hi! Ask about KRCE departments, library facilities, admissions, contacts or exam procedures. Answers are grounded in official records.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const q = input.trim();
    if (!q || loading) return;

    setMessages((prev) => [...prev, { role: 'user', content: q }]);
    setInput('');
    setLoading(true);

    try {
      const res = await askAssistant(q, messages.slice(-4));
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: res.answer,
          sources: res.sources,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'The campus assistant is temporarily unable to connect to the backend service. Please check your network or visit https://www.krce.ac.in/',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
            <Text style={styles.bubbleRole}>{item.role === 'user' ? 'You' : 'Campus Assistant'}</Text>
            <Text style={styles.bubbleText}>{item.content}</Text>
            {item.sources && item.sources.length > 0 && (
              <View style={styles.sourcesBox}>
                <Text style={styles.sourcesHeader}>Sources Used:</Text>
                {item.sources.map((s, si) => (
                  <Text key={si} style={styles.sourceItem}>&bull; {s.title}</Text>
                ))}
              </View>
            )}
          </View>
        )}
      />

      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color="#1d6079" />
          <Text style={styles.loadingText}>Retrieving official campus data...</Text>
        </View>
      )}

      <View style={styles.composer}>
        <TextInput
          style={styles.composerInput}
          placeholder="Ask anything about KRCE..."
          value={input}
          onChangeText={setInput}
          placeholderTextColor="#9baab1"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fa', padding: 14 },
  bubble: { padding: 12, borderRadius: 10, marginBottom: 12, maxWidth: '85%' },
  userBubble: { backgroundColor: '#eaf5f8', alignSelf: 'flex-end' },
  assistantBubble: { backgroundColor: '#ffffff', alignSelf: 'flex-start', borderColor: '#e5edef', borderWidth: 1 },
  bubbleRole: { fontSize: 9, fontWeight: '800', color: '#1d6079', marginBottom: 4, textTransform: 'uppercase' },
  bubbleText: { fontSize: 13, color: '#193744', lineHeight: 18 },
  sourcesBox: { marginTop: 8, paddingTop: 6, borderTopColor: '#edf2f4', borderTopWidth: 1 },
  sourcesHeader: { fontSize: 10, fontWeight: '700', color: '#1d6079' },
  sourceItem: { fontSize: 10, color: '#557280' },
  loadingBox: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 8 },
  loadingText: { fontSize: 11, color: '#748b94' },
  composer: { flexDirection: 'row', gap: 8, marginTop: 8 },
  composerInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderColor: '#e5edef',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 12,
  },
  sendBtn: { backgroundColor: '#1d6079', borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center' },
  sendBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 12 },
});
