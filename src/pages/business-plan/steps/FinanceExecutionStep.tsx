import React from 'react';
import { Form, Input, Button, Space, Typography, Card, InputNumber } from 'antd';
import { BusinessPlanData } from '../../../interfaces/businessPlan.interface';
import TimelineList from '../components/TimelineList';

const { TextArea } = Input;
const { Title } = Typography;

interface FinanceExecutionStepProps {
  data: BusinessPlanData;
  onNext: (data: Partial<BusinessPlanData>) => void;
  onBack: () => void;
}

const FinanceExecutionStep: React.FC<FinanceExecutionStepProps> = ({ data, onNext, onBack }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onNext({
      financeAndExecution: {
        ...data.financeAndExecution,
        ...values,
      },
    });
  };

  return (
    <Card>
      <Title level={3}>Finance & Execution</Title>
      <Form
        form={form}
        layout="vertical"
        initialValues={data.financeAndExecution}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="startupCosts"
          label="Startup Costs"
          rules={[{ required: true, message: 'Please enter startup costs' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name="operationalCosts"
          label="Operational Costs"
          rules={[{ required: true, message: 'Please enter operational costs' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.List name="fundingSources">
          {(fields, { add, remove }) => (
            <div style={{ marginBottom: 24 }}>
              <Typography.Text strong>Funding Sources</Typography.Text>
              {fields.map((field, index) => (
                <Form.Item required={false} key={field.key}>
                  <Space>
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[{ required: true, message: 'Please input funding source or delete this field' }]}
                      noStyle
                    >
                      <Input placeholder="Enter a funding source" style={{ width: '400px' }} />
                    </Form.Item>
                    <Button onClick={() => remove(field.name)}>Delete</Button>
                  </Space>
                </Form.Item>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                Add Funding Source
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item
          name="useOfFunds"
          label="Use of Funds"
          rules={[{ required: true, message: 'Please describe use of funds' }]}
        >
          <TextArea
            placeholder="Describe how the funds will be used"
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="monthlyExpenses"
          label="Monthly Expenses"
          rules={[{ required: true, message: 'Please enter monthly expenses' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name="projectedRevenue"
          label="Projected Revenue"
          rules={[{ required: true, message: 'Please enter projected revenue' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name="breakEvenPoint"
          label="Break-Even Point"
          rules={[{ required: true, message: 'Please enter break-even point' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name="projectedProfitMargin"
          label="Projected Profit Margin (%)"
          rules={[{ required: true, message: 'Please enter projected profit margin' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            max={100}
            formatter={value => `${value}%`}
            parser={value => Math.min(100, Math.max(0, Number(value!.replace('%', '')))) as 0 | 100}
          />
        </Form.Item>

        <Form.List name="marketingChannels">
          {(fields, { add, remove }) => (
            <div style={{ marginBottom: 24 }}>
              <Typography.Text strong>Marketing Channels</Typography.Text>
              {fields.map((field, index) => (
                <Form.Item required={false} key={field.key}>
                  <Space>
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[{ required: true, message: 'Please input marketing channel or delete this field' }]}
                      noStyle
                    >
                      <Input placeholder="Enter a marketing channel" style={{ width: '400px' }} />
                    </Form.Item>
                    <Button onClick={() => remove(field.name)}>Delete</Button>
                  </Space>
                </Form.Item>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                Add Marketing Channel
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item
          name="salesStrategy"
          label="Sales Strategy"
          rules={[{ required: true, message: 'Please describe your sales strategy' }]}
        >
          <TextArea
            placeholder="Describe your sales strategy"
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="timeline"
          label="Implementation Timeline"
        >
          <TimelineList />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button onClick={onBack}>
              Back
            </Button>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FinanceExecutionStep;
