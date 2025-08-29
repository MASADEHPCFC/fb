import React from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { BusinessPlanData } from '../../../interfaces/businessPlan.interface';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

interface ExecutiveSummaryStepProps {
  data: BusinessPlanData;
  onNext: (data: Partial<BusinessPlanData>) => void;
}

const ExecutiveSummaryStep: React.FC<ExecutiveSummaryStepProps> = ({ data, onNext }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onNext(values);
  };

  return (
    <div>
      <Title level={3}>Executive Summary</Title>
      <Paragraph>
        The executive summary is the first and most important section of your business plan.
        It provides a high-level overview of your business and its goals.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          companyName: data.companyName,
          missionStatement: data.missionStatement,
          vision: data.vision,
          executiveSummary: data.executiveSummary,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="companyName"
          label="Company Name"
          rules={[{ required: true, message: 'Please enter your company name' }]}
        >
          <Input placeholder="Enter your company name" />
        </Form.Item>

        <Form.Item
          name="missionStatement"
          label="Mission Statement"
          rules={[{ required: true, message: 'Please enter your mission statement' }]}
          help="A clear and concise statement that explains your company's purpose"
        >
          <TextArea
            placeholder="What is your company's mission?"
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          name="vision"
          label="Vision"
          rules={[{ required: true, message: 'Please enter your company vision' }]}
          help="Describe where you want your company to be in the future"
        >
          <TextArea
            placeholder="What is your company's vision for the future?"
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          name="executiveSummary"
          label="Executive Summary"
          rules={[{ required: true, message: 'Please provide an executive summary' }]}
          help="A brief overview of your business plan (1-2 paragraphs)"
        >
          <TextArea
            placeholder="Summarize your business plan..."
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" size="large">
              Next Step
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ExecutiveSummaryStep;
