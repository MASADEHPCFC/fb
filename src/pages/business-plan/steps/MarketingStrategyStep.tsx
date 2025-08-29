import React from 'react';
import { Form, Input, Button, Typography, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { BusinessPlanData } from '../../../interfaces/businessPlan.interface';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const { Option } = Select;

interface MarketingStrategyStepProps {
  data: BusinessPlanData;
  onNext: (data: Partial<BusinessPlanData>) => void;
  onBack: () => void;
}

const MarketingStrategyStep: React.FC<MarketingStrategyStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [form] = Form.useForm();

  const marketingChannelOptions = [
    'Social Media Marketing',
    'Content Marketing',
    'Email Marketing',
    'Search Engine Marketing (SEM)',
    'Search Engine Optimization (SEO)',
    'Print Advertising',
    'Television/Radio',
    'Trade Shows',
    'Direct Mail',
    'Influencer Marketing',
    'Affiliate Marketing',
    'Public Relations',
    'Word of Mouth',
    'Other',
  ];

  const handleSubmit = (values: any) => {
    onNext({
      marketingStrategy: values,
    });
  };

  return (
    <div>
      <Title level={3}>Marketing & Sales Strategy</Title>
      <Paragraph>
        Define how you will reach and acquire customers, and outline your sales process
        and pricing strategy.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={data.marketingStrategy}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="marketingChannels"
          label="Marketing Channels"
          rules={[{ required: true, message: 'Please select at least one marketing channel' }]}
          help="Select all channels you plan to use for marketing"
        >
          <Select
            mode="multiple"
            placeholder="Select marketing channels"
            style={{ width: '100%' }}
          >
            {marketingChannelOptions.map((channel) => (
              <Option key={channel} value={channel}>
                {channel}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="promotionalStrategy"
          label="Promotional Strategy"
          rules={[{ required: true, message: 'Please describe your promotional strategy' }]}
          help="Detail your promotional activities and campaigns"
        >
          <TextArea
            placeholder="Describe your promotional strategy..."
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>

        <Form.Item
          name="salesProcess"
          label="Sales Process"
          rules={[{ required: true, message: 'Please outline your sales process' }]}
          help="Describe your complete sales cycle from lead generation to closing"
        >
          <TextArea
            placeholder="Outline your sales process..."
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>

        <Form.Item
          name="pricingStrategy"
          label="Pricing Strategy"
          rules={[{ required: true, message: 'Please explain your pricing strategy' }]}
          help="Explain your pricing model and how it compares to competitors"
        >
          <TextArea
            placeholder="Detail your pricing strategy..."
            autoSize={{ minRows: 3, maxRows: 6 }}
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

export default MarketingStrategyStep;
