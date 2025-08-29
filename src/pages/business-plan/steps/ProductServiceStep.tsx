import React from 'react';
import { Form, Input, Button, Typography, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { BusinessPlanData } from '../../../interfaces/businessPlan.interface';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const { Option } = Select;

interface ProductServiceStepProps {
  data: BusinessPlanData;
  onNext: (data: Partial<BusinessPlanData>) => void;
  onBack: () => void;
}

const ProductServiceStep: React.FC<ProductServiceStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [form] = Form.useForm();

  const developmentStages = [
    'Concept/Idea',
    'Prototype',
    'Beta Testing',
    'Market Ready',
    'Already in Market',
    'Expansion Phase',
  ];

  const handleSubmit = (values: any) => {
    onNext({
      productService: values,
    });
  };

  return (
    <div>
      <Title level={3}>Product or Service Line</Title>
      <Paragraph>
        Describe your products or services in detail, including their features,
        benefits, and current development stage.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={data.productService}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="description"
          label="Product/Service Description"
          rules={[{ required: true, message: 'Please describe your product or service' }]}
          help="Provide a comprehensive description of what you offer"
        >
          <TextArea
            placeholder="Describe your product or service in detail..."
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>

        <Form.List name="features">
          {(fields, { add, remove }) => (
            <>
              <Form.Item label="Key Features">
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true, message: 'Please enter feature' }]}
                    >
                      <Input placeholder="Feature" style={{ width: '400px' }} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ marginTop: 8 }}
                >
                  Add Feature
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name="benefits">
          {(fields, { add, remove }) => (
            <>
              <Form.Item label="Customer Benefits">
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true, message: 'Please enter benefit' }]}
                    >
                      <Input placeholder="Benefit" style={{ width: '400px' }} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ marginTop: 8 }}
                >
                  Add Benefit
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name="developmentStage"
          label="Development Stage"
          rules={[{ required: true, message: 'Please select development stage' }]}
          help="Current stage of product/service development"
        >
          <Select placeholder="Select development stage">
            {developmentStages.map((stage) => (
              <Option key={stage} value={stage}>
                {stage}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="intellectualProperty"
          label="Intellectual Property"
          help="Patents, trademarks, copyrights, or other IP protection (if applicable)"
        >
          <TextArea
            placeholder="Describe any intellectual property protection..."
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

export default ProductServiceStep;
