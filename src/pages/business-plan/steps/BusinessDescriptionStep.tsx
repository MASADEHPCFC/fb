import React from 'react';
import { Form, Input, Button, Typography, Space, Select } from 'antd';
import { BusinessPlanData } from '../../../interfaces/businessPlan.interface';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const { Option } = Select;

interface BusinessDescriptionStepProps {
  data: BusinessPlanData;
  onNext: (data: Partial<BusinessPlanData>) => void;
  onBack: () => void;
}

const BusinessDescriptionStep: React.FC<BusinessDescriptionStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [form] = Form.useForm();

  const legalStructureOptions = [
    'Sole Proprietorship',
    'Partnership',
    'Limited Liability Company (LLC)',
    'Corporation',
    'Free Zone Company',
    'Branch of Foreign Company',
  ];

  const handleSubmit = (values: any) => {
    onNext({
      businessDescription: values,
    });
  };

  return (
    <div>
      <Title level={3}>Business Description</Title>
      <Paragraph>
        Provide detailed information about your business structure and operations.
        This section helps stakeholders understand the fundamental aspects of your business.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={data.businessDescription}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="industry"
          label="Industry"
          rules={[{ required: true, message: 'Please specify your industry' }]}
          help="The specific industry or sector your business operates in"
        >
          <Input placeholder="e.g., Technology, Healthcare, Retail, etc." />
        </Form.Item>

        <Form.Item
          name="businessModel"
          label="Business Model"
          rules={[{ required: true, message: 'Please describe your business model' }]}
          help="Explain how your business creates, delivers, and captures value"
        >
          <TextArea
            placeholder="Describe your business model..."
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>

        <Form.Item
          name="legalStructure"
          label="Legal Structure"
          rules={[{ required: true, message: 'Please select your legal structure' }]}
          help="The legal form of your business entity"
        >
          <Select placeholder="Select your legal structure">
            {legalStructureOptions.map((structure) => (
              <Option key={structure} value={structure}>
                {structure}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="location"
          label="Business Location"
          rules={[{ required: true, message: 'Please specify your business location' }]}
          help="Physical location and/or operational jurisdiction of your business"
        >
          <TextArea
            placeholder="Describe your business location and any relevant details..."
            autoSize={{ minRows: 2, maxRows: 4 }}
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

export default BusinessDescriptionStep;
