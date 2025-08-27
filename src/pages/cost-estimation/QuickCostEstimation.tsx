import React, { useState } from "react";
import { Steps, Row, Col, Card, Typography } from "antd";
import { CompanySetupData } from "../../interfaces/company.interface";
import BusinessTypeStep from "./steps/BusinessTypeStep";
import BusinessCategoryStep from "./steps/BusinessCategoryStep";
import ActivitySelectionStep from "./steps/ActivitySelectionStep";
import ShareholderCountStep from "./steps/ShareholderCountStep";
import TradeNameStep from "./steps/TradeNameStep";
import BusinessLocationStep from "./steps/BusinessLocationStep";
import SummaryStep from "./steps/SummaryStep";
import { formatCurrencyWithDirham } from "../../utils/currency";

const { Title, Paragraph } = Typography;

const QuickCostEstimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [estimationData, setEstimationData] = useState<CompanySetupData>({
    businessType: null,
    businessCategory: null,
    activity: [],
    tradeName: {
      hasReservedName: false,
      suggestedNames: [],
    },
    numberOfShareholders: 0,
    shareholders: [],
    manager: null,
    businessLocation: '',
    costs: {
      baseCost: 5000, // Base cost for any setup
      activityCost: 0,
      shareholderCost: 0,
      tradeNameCost: 0,
      locationCost: 0,
      totalCost: 5000,
    },
  });

  const updateCosts = (newData: Partial<CompanySetupData>) => {
    const updatedData = { ...estimationData, ...newData };
    const activityCount = (updatedData.activity || []).length;
    const costs = {
      baseCost: 5000,
      activityCost: activityCount * 1000,
      shareholderCost: updatedData.numberOfShareholders * 500,
      tradeNameCost: updatedData.tradeName?.hasReservedName ? 2000 : 0,
      locationCost: updatedData.businessLocation ? 3000 : 0,
      totalCost: 0, // Will be calculated below
    };

    costs.totalCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);

    setEstimationData({
      ...updatedData,
      costs,
    });
  };

  const steps = [
    {
      title: "Business Type",
      description: "New or Existing",
      content: (
        <BusinessTypeStep
          data={estimationData}
          onNext={(data: Partial<CompanySetupData>) => {
            updateCosts(data);
            setCurrentStep(1);
          }}
        />
      ),
    },
    {
      title: "Business Category",
      description: "Select your business category",
      content: (
        <BusinessCategoryStep
          data={estimationData}
          onNext={(data: Partial<CompanySetupData>) => {
            updateCosts(data);
            setCurrentStep(2);
          }}
          onBack={() => setCurrentStep(0)}
        />
      ),
    },
    {
      title: "Business Activity",
      description: "Select your business activities",
      content: (
        <ActivitySelectionStep
          data={estimationData}
          onNext={(data: Partial<CompanySetupData>) => {
            updateCosts(data);
            setCurrentStep(3);
          }}
          onBack={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: "Number of Shareholders",
      description: "Specify shareholder count",
      content: (
        <ShareholderCountStep
          data={estimationData}
          onNext={(data: Partial<CompanySetupData>) => {
            updateCosts(data);
            setCurrentStep(4);
          }}
          onBack={() => setCurrentStep(2)}
        />
      ),
    },
    {
      title: "Trade Name",
      description: "Do you have a trade name?",
      content: (
        <TradeNameStep
          data={estimationData}
          onNext={(data: Partial<CompanySetupData>) => {
            updateCosts(data);
            setCurrentStep(5);
          }}
          onBack={() => setCurrentStep(3)}
        />
      ),
    },
    {
      title: "Business Location",
      description: "Select your business location",
      content: (
        <BusinessLocationStep
          data={estimationData}
          onNext={(data: Partial<CompanySetupData>) => {
            updateCosts(data);
            setCurrentStep(6);
          }}
          onBack={() => setCurrentStep(4)}
        />
      ),
    },
    {
      title: "Cost Summary",
      description: "Review your estimated costs",
      content: (
        <SummaryStep
          data={estimationData}
          onBack={() => setCurrentStep(5)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="text-center mb-5">
        <Title level={1}>Quick Cost Estimation</Title>
        <Paragraph className="lead" style={{ fontSize: "1.2rem" }}>
          Get an instant estimate of your business setup costs in Dubai's free zone.
        </Paragraph>
      </div>
      <div className="container mt-4">
        <Card>
          <Row gutter={24}>
            <Col xs={24} md={6}>
              <Steps
                direction="vertical"
                current={currentStep}
                items={steps.map((item) => ({
                  title: item.title,
                  description: item.description,
                }))}
                className="mb-4"
              />
            </Col>
            <Col xs={24} md={18}>
              <div className="steps-content">{steps[currentStep].content}</div>
            </Col>
          </Row>
        </Card>
        {/* Estimated Cost at bottom right */}
        <div style={{
          position: 'fixed',
          right: '2rem',
          bottom: '7rem',
          background: '#fff',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '1rem 2rem',
          zIndex: 1000,
          minWidth: 180,
          textAlign: 'center',
        }}>
          <Typography.Text strong style={{ fontSize: 16 }}>
            Estimated Cost: {" "}
            <span style={{ color: "#1677ff" }}>
              {formatCurrencyWithDirham(estimationData.costs.totalCost, { color: "#1677ff" })}
            </span>
          </Typography.Text>
        </div>
      </div>
    </>
  );
};

export default QuickCostEstimation; 