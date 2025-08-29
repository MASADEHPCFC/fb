import React from 'react';
import { Form, Input, Button, Typography, Space, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { BusinessPlanData } from '../../../interfaces/businessPlan.interface';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

interface TimelineStepProps {
  data: BusinessPlanData;
  onNext: (data: Partial<BusinessPlanData>) => void;
  onBack: () => void;
}

const TimelineStep: React.FC<TimelineStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Convert dayjs objects to string dates
    const timeline = values.timeline.map((item: any) => ({
      ...item,
      date: item.date.format('YYYY-MM-DD'),
    }));

    onNext({
      timeline,
    });
  };

  // Convert string dates to dayjs objects for form initialization
  const initialValues = {
    timeline: data.timeline.map((item) => ({
      ...item,
      date: dayjs(item.date),
    })),
  };

  return (
    <div>
      <Title level={3}>Implementation Timeline</Title>
      <Paragraph>
        Create a timeline of key milestones and goals for your business. This helps
        track progress and ensures all stakeholders understand the implementation plan.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.List name="timeline">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ marginBottom: 24, border: '1px solid #f0f0f0', padding: 16, borderRadius: 8 }}>
                  <Form.Item
                    {...restField}
                    name={[name, 'milestone']}
                    rules={[{ required: true, message: 'Please enter milestone name' }]}
                    label="Milestone"
                  >
                    <Input placeholder="e.g., Launch MVP, Secure Funding, Hire Key Staff" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'date']}
                    rules={[{ required: true, message: 'Please select target date' }]}
                    label="Target Date"
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'description']}
                    rules={[{ required: true, message: 'Please provide milestone description' }]}
                    label="Description"
                  >
                    <TextArea
                      placeholder="Describe the milestone and its importance..."
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>

                  <Button
                    type="text"
                    onClick={() => remove(name)}
                    icon={<MinusCircleOutlined />}
                    danger
                  >
                    Remove Milestone
                  </Button>
                </div>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Milestone
                </Button>
              </Form.Item>

              <div style={{ marginTop: 16 }}>
                <Paragraph type="secondary">
                  Tips for creating milestones:
                  <ul>
                    <li>Start with major goals and break them down into smaller, achievable milestones</li>
                    <li>Include both short-term and long-term objectives</li>
                    <li>Make sure dates are realistic and account for potential delays</li>
                    <li>Consider dependencies between different milestones</li>
                  </ul>
                </Paragraph>
              </div>
            </>
          )}
        </Form.List>

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

export default TimelineStep;
