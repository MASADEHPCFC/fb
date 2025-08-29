import React from 'react';
import { Form, Input, Button, Typography, Space, Select, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { BusinessPlanData } from '../../../interfaces/businessPlan.interface';
import { formatCurrencyWithDirham } from '../../../utils/currency';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const { Option } = Select;

interface FundingRequirementsStepProps {
  data: BusinessPlanData;
  onNext: (data: Partial<BusinessPlanData>) => void;
  onBack: () => void;
}

const FundingRequirementsStep: React.FC<FundingRequirementsStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [form] = Form.useForm();

  const fundingSourceOptions = [
    'Personal Investment',
    'Bank Loan',
    'Angel Investors',
    'Venture Capital',
    'Crowdfunding',
    'Government Grants',
    'Family and Friends',
    'Business Incubator',
    'Other',
  ];

  const handleSubmit = (values: any) => {
    onNext({
      fundingRequirements: values,
    });
  };

  return (
    <div>
      <Title level={3}>Funding Requirements</Title>
      <Paragraph>
        Outline your funding needs, including startup costs, operational expenses,
        and how you plan to use the funds.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={data.fundingRequirements}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="startupCosts"
          label="Startup Costs"
          rules={[{ required: true, message: 'Please enter startup costs' }]}
          help="Initial investment needed to start the business"
        >
          <InputNumber
            formatter={(value) => formatCurrencyWithDirham(value || 0)}
            parser={(value) => value!.replace(/[^\d.]/g, '')}
            style={{ width: '100%' }}
            placeholder="Enter startup costs"
          />
        </Form.Item>

        <Form.Item
          name="operationalCosts"
          label="Operational Costs (Monthly)"
          rules={[{ required: true, message: 'Please enter operational costs' }]}
          help="Ongoing monthly expenses to run the business"
        >
          <InputNumber
            formatter={(value) => formatCurrencyWithDirham(value || 0)}
            parser={(value) => value!.replace(/[^\d.]/g, '')}
            style={{ width: '100%' }}
            placeholder="Enter monthly operational costs"
          />
        </Form.Item>

        <Form.Item
          name="fundingSources"
          label="Funding Sources"
          rules={[{ required: true, message: 'Please select at least one funding source' }]}
          help="Select all potential sources of funding"
        >
          <Select
            mode="multiple"
            placeholder="Select funding sources"
            style={{ width: '100%' }}
          >
            {fundingSourceOptions.map((source) => (
              <Option key={source} value={source}>
                {source}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="useOfFunds"
          label="Use of Funds"
          rules={[{ required: true, message: 'Please explain how funds will be used' }]}
          help="Detailed breakdown of how you plan to use the funding"
        >
          <TextArea
            placeholder="Explain how you will allocate and use the funds..."
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
        </Form.Item>

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

export default FundingRequirementsStep;
