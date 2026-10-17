import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>Student Profile</Text>
        <Text style={styles.email}>student@krce.ac.in</Text>
        <Text style={styles.detail}>K. Ramakrishnan College of Engineering</Text>
        <Text style={styles.detail}>Autonomous • Anna University Affiliated</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Manage Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fa', padding: 16 },
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#e5edef',
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },
  name: { fontSize: 18, fontWeight: '800', color: '#193744', marginBottom: 4 },
  email: { fontSize: 13, color: '#1d6079', marginBottom: 12 },
  detail: { fontSize: 12, color: '#748c96', marginBottom: 4 },
  btn: {
    backgroundColor: '#1d6079',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  btnText: { color: '#ffffff', fontWeight: '700', fontSize: 12 },
});
