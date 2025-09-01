import React, { useState, useEffect } from "react";
import { Steps, Row, Col, Card, Typography, Button, Descriptions } from "antd";
import { CompanySetupData } from "../../interfaces/company.interface";
import BusinessTypeStep from "./steps/BusinessTypeStep";
import BusinessCategoryStep from "./steps/BusinessCategoryStep";
import ActivitySelectionStep from "./steps/ActivitySelectionStep";
import TradeNameStep from "./steps/TradeNameStep";
import ShareholderCountStep from "./steps/ShareholderCountStep";
import ShareholderDetailsStep from "./steps/ShareholderDetailsStep";
import ManagerDetailsStep from "./steps/ManagerDetailsStep";
import { formatCurrencyWithDirham } from "../../utils/currency";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  setQuickEstimate,
  initializeCompany,
  updateCompanyDetails,
  clearCurrentCompany,
} from "../../store/slices/companySetupSlice";
import GenerateLicensePDF from "@/components/GenerateLicensePDF";

const { Title, Paragraph } = Typography;
const CompanySetup: React.FC = () => {
  const dispatch = useDispatch();
  const quickEstimate = useSelector(
    (state: RootState) => state.companySetup.quickEstimate
  );
  const currentCompany = useSelector(
    (state: RootState) => state.companySetup.currentCompany
  );
  const [currentStep, setCurrentStep] = useState(0);

  // Initialize company setup only once
  useEffect(() => {
    // Only initialize if currentCompany doesn't exist
    if (!currentCompany) {
      if (quickEstimate) {
        // Use quickEstimate data if available
        dispatch(initializeCompany(quickEstimate));
        // Clear quickEstimate immediately after using it
        dispatch(setQuickEstimate(undefined));
      } else {
        // Initialize with default values if no quickEstimate
        dispatch(initializeCompany({}));
      }
    }
  }, []); // Empty dependency array to run only once

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      // Clear current company when component unmounts
      dispatch(clearCurrentCompany());
    };
  }, [dispatch]);

  // Helper to update company details in Redux
  const updateCosts = (data: Partial<CompanySetupData>) => {
    if (!currentCompany) return;
    const updatedData = { ...currentCompany, ...data };
    const costs = {
      baseCost: 5000,
      activityCost: (updatedData.activity?.length || 0) * 1000,
      shareholderCost: updatedData.numberOfShareholders * 500,
      tradeNameCost: updatedData.tradeName?.hasReservedName ? 2000 : 0,
      locationCost: 0,
      totalCost: 0,
    };
    costs.totalCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
    dispatch(updateCompanyDetails({ ...data, costs }));
  };

  if (!currentCompany) {
    // Optionally show a loading spinner or message
    return <div>Loading...</div>;
  }

  const steps = [
    {
      title: "Business Type",
      description: "New or Existing",
      content: (
        <BusinessTypeStep
          businessType={currentCompany.businessType}
          onNext={(businessType) => {
            updateCosts({ businessType });
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
          data={currentCompany}
          onNext={(businessCategory) => {
            updateCosts({ businessCategory });
            setCurrentStep(2);
          }}
          onBack={() => setCurrentStep(0)}
        />
      ),
    },
    {
      title: "Activity Selection",
      description: "Select your business activity",
      content: (
        <ActivitySelectionStep
          businessCategory={currentCompany.businessCategory}
          selectedActivity={currentCompany.activity}
          onNext={(activity) => {
            updateCosts({ activity });
            setCurrentStep(3);
          }}
          onChange={(activity) => {
            updateCosts({ activity });
          }}
          onBack={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: "Trade Name",
      description: "Provide company name details",
      content: (
        <TradeNameStep
          data={currentCompany}
          onNext={(tradeName) => {
            updateCosts({ tradeName });
            setCurrentStep(4);
          }}
          onChange={(tradeName) => {
            updateCosts({ tradeName });
          }}
          onBack={() => setCurrentStep(2)}
        />
      ),
    },
    {
      title: "Number of Shareholders",
      description: "Specify shareholder count",
      content: (
        <ShareholderCountStep
          data={currentCompany}
          onNext={(count) => {
            // Update shareholders array as well
            const shareholders = Array(count)
              .fill(null)
              .map((_, index) => ({
                id: index + 1,
                name: "",
                email: "",
                phone: "",
                address: "",
                sharePercentage: 0,
              }));
            updateCosts({ numberOfShareholders: count, shareholders });
            setCurrentStep(5);
          }}
          onChange={(count) => {
            updateCosts({ numberOfShareholders: count });
          }}
          onBack={() => setCurrentStep(3)}
        />
      ),
    },
    {
      title: "Shareholder Details",
      description: "Enter shareholder information",
      content: (
        <ShareholderDetailsStep
          data={currentCompany}
          onComplete={(shareholders) => {
            updateCosts({ shareholders });
            setCurrentStep(6);
          }}
          onBack={() => setCurrentStep(4)}
        />
      ),
    },
    {
      title: "Manager Details",
      description: "Enter license manager information",
      content: (
        <ManagerDetailsStep
          data={currentCompany.manager}
          onNext={(manager) => {
            updateCosts({ manager });
            setCurrentStep(7);
          }}
          onBack={() => setCurrentStep(5)}
        />
      ),
    },
    {
      title: "Summary",
      description: "Review and finish setup",
      content: (
        <Card title="Cost Summary" className="mb-4">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Business Type">
              {currentCompany.businessType === "new"
                ? "New Business"
                : "Existing Business Branch"}
            </Descriptions.Item>
            <Descriptions.Item label="Business Category">
              {currentCompany.businessCategory?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Number of Activities">
              {currentCompany.activity?.length || 0}
            </Descriptions.Item>
            <Descriptions.Item label="Number of Shareholders">
              {currentCompany.numberOfShareholders}
            </Descriptions.Item>
            <Descriptions.Item label="Trade Name">
              {currentCompany.tradeName?.hasReservedName ? "Yes" : "No"}
            </Descriptions.Item>
          </Descriptions>
          <Typography.Title level={4} style={{ marginTop: 24 }}>
            Cost Breakdown
          </Typography.Title>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Base Cost">
              {formatCurrencyWithDirham(currentCompany.costs.baseCost)}
            </Descriptions.Item>
            <Descriptions.Item label="Activity Cost">
              {formatCurrencyWithDirham(currentCompany.costs.activityCost)}
            </Descriptions.Item>
            <Descriptions.Item label="Shareholder Cost">
              {formatCurrencyWithDirham(currentCompany.costs.shareholderCost)}
            </Descriptions.Item>
            <Descriptions.Item label="Trade Name Cost">
              {formatCurrencyWithDirham(currentCompany.costs.tradeNameCost)}
            </Descriptions.Item>
            <Descriptions.Item label="Total Cost" className="font-bold">
              {formatCurrencyWithDirham(currentCompany.costs.totalCost)}
            </Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: "1rem" }}>
            <div style={{ marginTop: 24, textAlign: "right" }}>
              <Button
                type="primary"
                size="middle"
                style={{ minWidth: 140, fontSize: 14 }}
                onClick={() => {
                  /* TODO: Integrate payment flow here */
                }}
              >
                Proceed to Payment
              </Button>
              <GenerateLicensePDF
                tradeName={currentCompany.tradeName.suggestedNames}
                activities={currentCompany.activity.map((a) => a.description)}
                managerName={currentCompany.manager?.name || ""}
              />
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <>
      <div className="text-center mb-5">
        <Title level={1}>Start Your Business</Title>
        <Paragraph className="lead" style={{ fontSize: "1.2rem" }}>
          Your trusted partner in establishing and growing your business in
          Dubai's thriving free zone.
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
        <div
          style={{
            position: "fixed",
            right: "2rem",
            bottom: "7rem",
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            padding: "1rem 2rem",
            zIndex: 1000,
            minWidth: 180,
            textAlign: "center",
          }}
        >
          <Typography.Text strong style={{ fontSize: 16 }}>
            License Cost:{" "}
            <span style={{ color: "#1677ff" }}>
              {formatCurrencyWithDirham(currentCompany.costs.totalCost)}
            </span>
          </Typography.Text>
        </div>
      </div>
    </>
  );
};

export default CompanySetup;
