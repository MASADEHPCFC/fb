import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import LicensePDFTemplate from './LicensePDFTemplate';
import { Button } from 'antd';

function pad(num) {
  return num.toString().padStart(3, '0');
}

const GenerateLicensePDF = ({ tradeName, activities, managerName }) => {
  // Generate random 3-digit license number
  const licenseNumber = pad(Math.floor(Math.random() * 900) + 100);
  const companyName = Array.isArray(tradeName) && tradeName.length > 0 ? tradeName[0] : '';
  const today = new Date();
  const issueDate = today.toLocaleDateString();
  const expiry = new Date(today);
  expiry.setFullYear(today.getFullYear() + 1);
  const expiryDate = expiry.toLocaleDateString();

  return (
    <PDFDownloadLink
      document={
        <LicensePDFTemplate
          licenseNumber={licenseNumber}
          companyName={companyName}
          activities={activities}
          managerName={managerName}
          issueDate={issueDate}
          expiryDate={expiryDate}
        />
      }
      fileName={`License_${companyName}_${licenseNumber}.pdf`}
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) =>
        <Button type="primary" style={{marginLeft: 10}} loading={loading}>
          Print License
        </Button>
      }
    </PDFDownloadLink>
  );
};

export default GenerateLicensePDF; 