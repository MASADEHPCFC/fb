import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { BusinessPlanData } from '../interfaces/businessPlan.interface';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    color: '#1677ff',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333333',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  list: {
    marginLeft: 20,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
  },
});

// Create Document Component
const BusinessPlanDocument = ({ data }: { data: BusinessPlanData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Executive Summary */}
      <View style={styles.section}>
        <Text style={styles.title}>{data.companyName} - Business Plan</Text>
        <Text style={styles.heading}>Executive Summary</Text>
        <Text style={styles.text}>{data.executiveSummary}</Text>
      </View>

      {/* Mission & Vision */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Mission Statement</Text>
        <Text style={styles.text}>{data.missionStatement}</Text>
        <Text style={styles.subheading}>Vision</Text>
        <Text style={styles.text}>{data.vision}</Text>
      </View>

      {/* Business Description */}
      <View style={styles.section}>
        <Text style={styles.heading}>Business Description</Text>
        <Text style={styles.text}>Industry: {data.businessDescription.industry}</Text>
        <Text style={styles.text}>Business Model: {data.businessDescription.businessModel}</Text>
        <Text style={styles.text}>Legal Structure: {data.businessDescription.legalStructure}</Text>
        <Text style={styles.text}>Location: {data.businessDescription.location}</Text>
      </View>

      {/* Market Analysis */}
      <View style={styles.section}>
        <Text style={styles.heading}>Market Analysis</Text>
        <Text style={styles.text}>Target Market: {data.marketAnalysis.targetMarket}</Text>
        <Text style={styles.text}>Market Size: {data.marketAnalysis.marketSize}</Text>
        <Text style={styles.subheading}>Competitors</Text>
        {data.marketAnalysis.competitors.map((competitor, index) => (
          <View key={index} style={styles.list}>
            <Text style={styles.listItem}>• {competitor.name}</Text>
            <Text style={styles.listItem}>  Strengths: {competitor.strengths}</Text>
            <Text style={styles.listItem}>  Weaknesses: {competitor.weaknesses}</Text>
          </View>
        ))}
      </View>

      {/* Product/Service */}
      <View style={styles.section}>
        <Text style={styles.heading}>Product/Service Line</Text>
        <Text style={styles.text}>{data.productService.description}</Text>
        <Text style={styles.subheading}>Key Features</Text>
        {data.productService.features.map((feature, index) => (
          <Text key={index} style={styles.listItem}>• {feature}</Text>
        ))}
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      {/* Marketing Strategy */}
      <View style={styles.section}>
        <Text style={styles.heading}>Marketing Strategy</Text>
        <Text style={styles.text}>Promotional Strategy: {data.marketingStrategy.promotionalStrategy}</Text>
        <Text style={styles.text}>Sales Process: {data.marketingStrategy.salesProcess}</Text>
        <Text style={styles.text}>Pricing Strategy: {data.marketingStrategy.pricingStrategy}</Text>
      </View>

      {/* Financial Projections */}
      <View style={styles.section}>
        <Text style={styles.heading}>Financial Projections</Text>
        <Text style={styles.text}>Startup Costs: ${data.financialProjections.startupCosts}</Text>
        <Text style={styles.text}>Monthly Expenses: ${data.financialProjections.monthlyExpenses}</Text>
        <Text style={styles.text}>Projected Revenue: ${data.financialProjections.projectedRevenue}</Text>
        <Text style={styles.text}>Break-even Point: ${data.financialProjections.breakEvenPoint}</Text>
        <Text style={styles.text}>Projected Profit Margin: {data.financialProjections.projectedProfitMargin}%</Text>
      </View>

      {/* Timeline */}
      <View style={styles.section}>
        <Text style={styles.heading}>Implementation Timeline</Text>
        {data.timeline.map((item, index) => (
          <View key={index} style={styles.list}>
            <Text style={styles.listItem}>• {item.milestone}</Text>
            <Text style={styles.listItem}>  Date: {item.date}</Text>
            <Text style={styles.listItem}>  {item.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

interface GenerateBusinessPlanPDFProps {
  data: BusinessPlanData;
}

const GenerateBusinessPlanPDF: React.FC<GenerateBusinessPlanPDFProps> = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<BusinessPlanDocument data={data} />}
      fileName={`${data.companyName.replace(/\s+/g, '-').toLowerCase()}-business-plan.pdf`}
    >
      {({ loading }) => (
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size="middle"
          style={{ minWidth: 140, fontSize: 14, marginLeft: 8 }}
          loading={loading}
        >
          Download Business Plan
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default GenerateBusinessPlanPDF;
