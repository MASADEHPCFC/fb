import React from 'react';
import { Card, Typography, Button, Space, Descriptions, List } from 'antd';
import GenerateBusinessPlanPDF from '../../../components/GenerateBusinessPlanPDF';
import { BusinessPlanData } from '../../../interfaces/businessPlan.interface';
import { formatCurrencyWithDirham } from '../../../utils/currency';
import dayjs from 'dayjs';

const { Title, Paragraph, Text } = Typography;

interface BusinessPlanSummaryProps {
  data: BusinessPlanData;
  onBack: () => void;
}

const BusinessPlanSummary: React.FC<BusinessPlanSummaryProps> = ({
  data,
  onBack,
}) => {
  return (
    <div>
      <Title level={3}>Business Plan Summary</Title>
      <Paragraph>
        Review your business plan details before generating the final document.
      </Paragraph>

      <Card title="Executive Summary" className="mb-4">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Company Name">
            {data.companyName}
          </Descriptions.Item>
          <Descriptions.Item label="Mission Statement">
            {data.missionStatement}
          </Descriptions.Item>
          <Descriptions.Item label="Vision">
            {data.vision}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Business Description" className="mb-4">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Industry">
            {data.businessDescription.industry}
          </Descriptions.Item>
          <Descriptions.Item label="Business Model">
            {data.businessDescription.businessModel}
          </Descriptions.Item>
          <Descriptions.Item label="Legal Structure">
            {data.businessDescription.legalStructure}
          </Descriptions.Item>
          <Descriptions.Item label="Location">
            {data.businessDescription.location}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Market Analysis" className="mb-4">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Target Market">
            {data.marketAnalysis.targetMarket}
          </Descriptions.Item>
          <Descriptions.Item label="Market Size">
            {data.marketAnalysis.marketSize}
          </Descriptions.Item>
          <Descriptions.Item label="Competitive Advantage">
            {data.marketAnalysis.competitiveAdvantage}
          </Descriptions.Item>
        </Descriptions>
        
        <Title level={5} style={{ marginTop: 16 }}>Competitors</Title>
        <List
          dataSource={data.marketAnalysis.competitors}
          renderItem={(competitor) => (
            <List.Item>
              <List.Item.Meta
                title={competitor.name}
                description={
                  <>
                    <Text strong>Strengths:</Text> {competitor.strengths}
                    <br />
                    <Text strong>Weaknesses:</Text> {competitor.weaknesses}
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <Card title="Product/Service Line" className="mb-4">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Description">
            {data.productService.description}
          </Descriptions.Item>
          <Descriptions.Item label="Development Stage">
            {data.productService.developmentStage}
          </Descriptions.Item>
        </Descriptions>

        <Title level={5} style={{ marginTop: 16 }}>Features</Title>
        <List
          dataSource={data.productService.features}
          renderItem={(feature) => <List.Item>{feature}</List.Item>}
        />

        <Title level={5} style={{ marginTop: 16 }}>Benefits</Title>
        <List
          dataSource={data.productService.benefits}
          renderItem={(benefit) => <List.Item>{benefit}</List.Item>}
        />
      </Card>

      <Card title="Marketing Strategy" className="mb-4">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Marketing Channels">
            {data.marketingStrategy.marketingChannels.join(', ')}
          </Descriptions.Item>
          <Descriptions.Item label="Promotional Strategy">
            {data.marketingStrategy.promotionalStrategy}
          </Descriptions.Item>
          <Descriptions.Item label="Sales Process">
            {data.marketingStrategy.salesProcess}
          </Descriptions.Item>
          <Descriptions.Item label="Pricing Strategy">
            {data.marketingStrategy.pricingStrategy}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Financial Projections" className="mb-4">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Startup Costs">
            {formatCurrencyWithDirham(data.financialProjections.startupCosts)}
          </Descriptions.Item>
          <Descriptions.Item label="Monthly Expenses">
            {formatCurrencyWithDirham(data.financialProjections.monthlyExpenses)}
          </Descriptions.Item>
          <Descriptions.Item label="Projected Revenue">
            {formatCurrencyWithDirham(data.financialProjections.projectedRevenue)}
          </Descriptions.Item>
          <Descriptions.Item label="Break-even Point">
            {formatCurrencyWithDirham(data.financialProjections.breakEvenPoint)}
          </Descriptions.Item>
          <Descriptions.Item label="Projected Profit Margin">
            {data.financialProjections.projectedProfitMargin}%
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Implementation Timeline" className="mb-4">
        <List
          dataSource={data.timeline}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.milestone}
                description={
                  <>
                    <Text strong>Date:</Text> {dayjs(item.date).format('MMMM D, YYYY')}
                    <br />
                    <Text strong>Description:</Text> {item.description}
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <Space>
          <Button onClick={onBack}>
            Previous
          </Button>
          <GenerateBusinessPlanPDF data={data} />
        </Space>
      </div>
    </div>
  );
};

export default BusinessPlanSummary;
