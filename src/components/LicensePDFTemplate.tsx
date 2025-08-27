import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
    backgroundColor: '#f8f9fa',
    color: '#222',
    position: 'relative',
  },
  header: {
    borderBottom: '2px solid #1677ff',
    paddingBottom: 12,
    marginBottom: 24,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 40,
    right: 40,
    borderTop: '1px solid #eee',
    paddingTop: 8,
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    color: '#1677ff',
    marginRight: 4,
  },
  activitiesList: {
    marginTop: 4,
    marginLeft: 12,
  },
  licenseNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1677ff',
    marginBottom: 8,
    textAlign: 'right',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
    textAlign:'center'
  },
});

const LicensePDFTemplate = ({
  licenseNumber,
  companyName,
  activities,
  managerName,
  issueDate,
  expiryDate,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1677ff' }}>Business License Certificate</Text>
        <Text style={{ fontSize: 12, marginTop: 4 }}>PCFC Dubai Free Zone Authority</Text>
      </View>
      <Text style={styles.licenseNumber}>License No: #{licenseNumber}</Text>
      <Text style={styles.companyName}>{companyName}</Text>
      <View style={styles.section}>
        <Text><Text style={styles.label}>Manager:</Text> {managerName}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Licensed Activities:</Text>
        <View style={styles.activitiesList}>
          {activities && activities.length > 0 ? activities.map((act, idx) => (
            <Text key={idx}>- {act}</Text>
          )) : <Text>-</Text>}
        </View>
      </View>
      <View style={styles.section}>
        <Text><Text style={styles.label}>Issue Date:</Text> {issueDate}</Text>
        <Text><Text style={styles.label}>Expiry Date:</Text> {expiryDate}</Text>
      </View>
      <View style={styles.footer} fixed>
        <Text>Dubai Free Zone Authority | This is a system-generated license certificate.</Text>
      </View>
    </Page>
  </Document>
);

export default LicensePDFTemplate; 