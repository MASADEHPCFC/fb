import React from 'react';
import { Form, Button, Typography, Space, InputNumber } from 'antd';
import { BusinessPlanData } from '../../../interfaces/businessPlan.interface';
import { formatCurrencyWithDirham } from '../../../utils/currency';

const { Title, Paragraph, Text } = Typography;

interface FinancialProjectionsStepProps {
  data: BusinessPlanData;
  onNext: (data: Partial<BusinessPlanData>) => void;
  onBack: () => void;
}

const FinancialProjectionsStep: React.FC<FinancialProjectionsStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onNext({
      financialProjections: values,
    });
  };

  return (
    <div>
      <Title level={3}>Financial Projections</Title>
      <Paragraph>
        Provide detailed financial projections for your business. These numbers should
        be realistic and based on thorough market research and analysis.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={data.financialProjections}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="startupCosts"
          label="Total Startup Costs"
          rules={[{ required: true, message: 'Please enter startup costs' }]}
          help="Include all initial costs to start the business"
        >
          <InputNumber
            formatter={(value) => formatCurrencyWithDirham(value || 0)}
            parser={(value) => value!.replace(/[^\d.]/g, '')}
            style={{ width: '100%' }}
            placeholder="Enter total startup costs"
          />
        </Form.Item>

        <Form.Item
          name="monthlyExpenses"
          label="Projected Monthly Expenses"
          rules={[{ required: true, message: 'Please enter monthly expenses' }]}
          help="Include all operating expenses (rent, salaries, utilities, etc.)"
        >
          <InputNumber
            formatter={(value) => formatCurrencyWithDirham(value || 0)}
            parser={(value) => value!.replace(/[^\d.]/g, '')}
            style={{ width: '100%' }}
            placeholder="Enter monthly expenses"
          />
        </Form.Item>

        <Form.Item
          name="projectedRevenue"
          label="Projected Annual Revenue (First Year)"
          rules={[{ required: true, message: 'Please enter projected revenue' }]}
          help="Estimated total revenue for the first year of operation"
        >
          <InputNumber
            formatter={(value) => formatCurrencyWithDirham(value || 0)}
            parser={(value) => value!.replace(/[^\d.]/g, '')}
            style={{ width: '100%' }}
            placeholder="Enter projected annual revenue"
          />
        </Form.Item>

        <Form.Item
          name="breakEvenPoint"
          label="Break-even Point"
          rules={[{ required: true, message: 'Please enter break-even point' }]}
          help="The point at which total revenue equals total costs"
        >
          <InputNumber
            formatter={(value) => formatCurrencyWithDirham(value || 0)}
            parser={(value) => value!.replace(/[^\d.]/g, '')}
            style={{ width: '100%' }}
            placeholder="Enter break-even point"
          />
        </Form.Item>

        <Form.Item
          name="projectedProfitMargin"
          label="Projected Profit Margin (%)"
          rules={[
            { required: true, message: 'Please enter projected profit margin' },
            { type: 'number', min: 0, max: 100, message: 'Profit margin must be between 0 and 100' },
          ]}
          help="Expected profit margin as a percentage of revenue"
        >
          <InputNumber
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value!.replace('%', '')}
            style={{ width: '100%' }}
            placeholder="Enter projected profit margin"
          />
        </Form.Item>

        <div style={{ marginBottom: 24 }}>
          <Text type="secondary">
            Note: These projections should be based on realistic assumptions and market
            research. Consider factors such as:
          </Text>
          <ul>
            <li>Market size and potential market share</li>
            <li>Competition and pricing strategy</li>
            <li>Operating costs and overhead</li>
            <li>Seasonal variations in revenue</li>
            <li>Economic conditions and industry trends</li>
          </ul>
        </div>

        <Form.Item>
          <Space>
            <Button onClick={onBack}>Previous</Button>
            <Button type="primary" htmlType="submit">
              Next Step
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FinancialProjectionsStep;
