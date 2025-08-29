import React from 'react';
import { Form, Input, Button, Typography, Space, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { BusinessPlanData } from '../../../interfaces/businessPlan.interface';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

interface MarketAnalysisStepProps {
  data: BusinessPlanData;
  onNext: (data: Partial<BusinessPlanData>) => void;
  onBack: () => void;
}

const MarketAnalysisStep: React.FC<MarketAnalysisStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onNext({
      marketAnalysis: values,
    });
  };

  return (
    <div>
      <Title level={3}>Market Analysis</Title>
      <Paragraph>
        A thorough market analysis demonstrates your understanding of the industry,
        target market, and competitive landscape.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={data.marketAnalysis}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="targetMarket"
          label="Target Market"
          rules={[{ required: true, message: 'Please define your target market' }]}
          help="Describe your ideal customer profile and market segmentation"
        >
          <TextArea
            placeholder="Who are your target customers? What are their characteristics?"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>

        <Form.Item
          name="marketSize"
          label="Market Size"
          rules={[{ required: true, message: 'Please provide market size information' }]}
          help="Include both Total Addressable Market (TAM) and Serviceable Obtainable Market (SOM)"
        >
          <TextArea
            placeholder="What is the size of your market? Include relevant statistics and sources..."
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>

        <Divider orientation="left">Competitor Analysis</Divider>
        <Form.List name="competitors">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ marginBottom: 24 }}>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Please enter competitor name' }]}
                  >
                    <Input placeholder="Competitor Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'strengths']}
                    rules={[{ required: true, message: 'Please list competitor strengths' }]}
                  >
                    <TextArea
                      placeholder="Competitor's strengths..."
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'weaknesses']}
                    rules={[{ required: true, message: 'Please list competitor weaknesses' }]}
                  >
                    <TextArea
                      placeholder="Competitor's weaknesses..."
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                  <Button
                    type="text"
                    onClick={() => remove(name)}
                    icon={<MinusCircleOutlined />}
                    danger
                  >
                    Remove Competitor
                  </Button>
                  <Divider />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Competitor
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name="competitiveAdvantage"
          label="Competitive Advantage"
          rules={[{ required: true, message: 'Please describe your competitive advantage' }]}
          help="What makes your business unique in the market?"
        >
          <TextArea
            placeholder="Describe your unique value proposition and competitive advantages..."
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

export default MarketAnalysisStep;
