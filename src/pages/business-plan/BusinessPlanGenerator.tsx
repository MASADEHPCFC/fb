import React, { useState, useEffect } from "react";
import { Steps, Row, Col, Card, Typography, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  initializeBusinessPlan,
  updateBusinessPlan,
  clearCurrentPlan,
} from "../../store/slices/businessPlanSlice";
import ExecutiveSummaryStep from "./steps/ExecutiveSummaryStep";
import BusinessDescriptionStep from "./steps/BusinessDescriptionStep";
import MarketAnalysisStep from "./steps/MarketAnalysisStep";
import OrganizationStep from "./steps/OrganizationStep";
import ProductServiceStep from "./steps/ProductServiceStep";
import MarketingStrategyStep from "./steps/MarketingStrategyStep";
import FundingRequirementsStep from "./steps/FundingRequirementsStep";
import FinancialProjectionsStep from "./steps/FinancialProjectionsStep";
import TimelineStep from "./steps/TimelineStep";
import BusinessPlanSummary from "./steps/BusinessPlanSummary";

const { Title, Paragraph } = Typography;

const BusinessPlanGenerator: React.FC = () => {
  const dispatch = useDispatch();
  const currentPlan = useSelector(
    (state: RootState) => state.businessPlan.currentPlan
  );
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!currentPlan) {
      dispatch(initializeBusinessPlan({}));
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentPlan());
    };
  }, [dispatch]);

  if (!currentPlan) {
    return <div>Loading...</div>;
  }

  const steps = [
    {
      title: "Executive Summary",
      description: "Company overview and goals",
      content: (
        <ExecutiveSummaryStep
          data={currentPlan}
          onNext={(data) => {
            dispatch(updateBusinessPlan(data));
            setCurrentStep(1);
          }}
        />
      ),
    },
    {
      title: "Business Description",
      description: "Detailed business information",
      content: (
        <BusinessDescriptionStep
          data={currentPlan}
          onNext={(data) => {
            dispatch(updateBusinessPlan(data));
            setCurrentStep(2);
          }}
          onBack={() => setCurrentStep(0)}
        />
      ),
    },
    {
      title: "Market Analysis",
      description: "Market and competition analysis",
      content: (
        <MarketAnalysisStep
          data={currentPlan}
          onNext={(data) => {
            dispatch(updateBusinessPlan(data));
            setCurrentStep(3);
          }}
          onBack={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: "Organization",
      description: "Team and management structure",
      content: (
        <OrganizationStep
          data={currentPlan}
          onNext={(data) => {
            dispatch(updateBusinessPlan(data));
            setCurrentStep(4);
          }}
          onBack={() => setCurrentStep(2)}
        />
      ),
    },
    {
      title: "Product/Service",
      description: "Product or service details",
      content: (
        <ProductServiceStep
          data={currentPlan}
          onNext={(data) => {
            dispatch(updateBusinessPlan(data));
            setCurrentStep(5);
          }}
          onBack={() => setCurrentStep(3)}
        />
      ),
    },
    {
      title: "Marketing Strategy",
      description: "Marketing and sales approach",
      content: (
        <MarketingStrategyStep
          data={currentPlan}
          onNext={(data) => {
            dispatch(updateBusinessPlan(data));
            setCurrentStep(6);
          }}
          onBack={() => setCurrentStep(4)}
        />
      ),
    },
    {
      title: "Funding Requirements",
      description: "Financial needs and allocation",
      content: (
        <FundingRequirementsStep
          data={currentPlan}
          onNext={(data) => {
            dispatch(updateBusinessPlan(data));
            setCurrentStep(7);
          }}
          onBack={() => setCurrentStep(5)}
        />
      ),
    },
    {
      title: "Financial Projections",
      description: "Revenue and cost projections",
      content: (
        <FinancialProjectionsStep
          data={currentPlan}
          onNext={(data) => {
            dispatch(updateBusinessPlan(data));
            setCurrentStep(8);
          }}
          onBack={() => setCurrentStep(6)}
        />
      ),
    },
    {
      title: "Timeline",
      description: "Implementation milestones",
      content: (
        <TimelineStep
          data={currentPlan}
          onNext={(data) => {
            dispatch(updateBusinessPlan(data));
            setCurrentStep(9);
          }}
          onBack={() => setCurrentStep(7)}
        />
      ),
    },
    {
      title: "Summary",
      description: "Review and generate plan",
      content: (
        <BusinessPlanSummary
          data={currentPlan}
          onBack={() => setCurrentStep(8)}
          onGeneratePDF={() => {
            // PDF generation logic will be handled by the GenerateBusinessPlanPDF component
          }}
        />
      ),
    },
  ];

  return (
    <>
      <div className="text-center mb-5">
        <Title level={1}>Business Plan Generator</Title>
        <Paragraph className="lead" style={{ fontSize: "1.2rem" }}>
          Create a professional business plan by following our step-by-step
          guide
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
      </div>
    </>
  );
};

export default BusinessPlanGenerator;
