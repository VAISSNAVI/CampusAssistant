import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchCampusContent } from '../../services/api';
import { ContentBundle } from '@campus-assistant/shared-types';

export default function HomeScreen() {
  const router = useRouter();
  const [content, setContent] = useState<ContentBundle | null>(null);

  useEffect(() => {
    fetchCampusContent()
      .then(setContent)
      .catch(() => {
        // Fallback or offline state handled gracefully
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.heroKicker}>YOUR CAMPUS COMPANION</Text>
        <Text style={styles.heroTitle}>Everything campus. One simple place.</Text>
        <Text style={styles.heroDesc}>
          Official information, administrative procedures, and intelligent grounded assistant for KRCE.
        </Text>
        <TouchableOpacity style={styles.heroBtn} onPress={() => router.push('/assistant')}>
          <Text style={styles.heroBtnText}>Ask the Assistant</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
      </View>

      <View style={styles.quickGrid}>
        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/campus')}>
          <Text style={styles.quickCardTitle}>Academics</Text>
          <Text style={styles.quickCardDesc}>Curriculum & branches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/campus')}>
          <Text style={styles.quickCardTitle}>Examinations</Text>
          <Text style={styles.quickCardDesc}>COE cell & results</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/campus')}>
          <Text style={styles.quickCardTitle}>Central Library</Text>
          <Text style={styles.quickCardDesc}>45k+ books & digital journals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/campus')}>
          <Text style={styles.quickCardTitle}>Procedures</Text>
          <Text style={styles.quickCardDesc}>Checklists & steps</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Latest Campus Notices</Text>
      </View>

      {content?.notices.map((notice) => (
        <View key={notice.id} style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>{notice.title}</Text>
          <Text style={styles.noticeContent}>{notice.content}</Text>
          <Text style={styles.noticeDate}>{notice.publishedAt}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fa', padding: 16 },
  heroCard: {
    backgroundColor: '#1d536b',
    borderRadius: 14,
    padding: 22,
    marginBottom: 20,
  },
  heroKicker: { fontSize: 10, fontWeight: '800', color: '#a6d7e2', marginBottom: 6 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#ffffff', marginBottom: 8 },
  heroDesc: { fontSize: 13, color: '#d0e0e6', lineHeight: 18, marginBottom: 14 },
  heroBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  heroBtnText: { color: '#1d536b', fontWeight: '800', fontSize: 12 },
  sectionHeader: { marginVertical: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#193744' },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  quickCard: {
    backgroundColor: '#ffffff',
    borderColor: '#e5edef',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    width: '48%',
  },
  quickCardTitle: { fontSize: 13, fontWeight: '700', color: '#193744', marginBottom: 4 },
  quickCardDesc: { fontSize: 11, color: '#87959c' },
  noticeCard: {
    backgroundColor: '#ffffff',
    borderColor: '#e5edef',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  noticeTitle: { fontSize: 13, fontWeight: '700', color: '#193744', marginBottom: 4 },
  noticeContent: { fontSize: 12, color: '#526c77', lineHeight: 17, marginBottom: 6 },
  noticeDate: { fontSize: 10, color: '#8fa0a8' },
});
