import React from 'react';
import { Form, Input, Button, Typography, Space, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { BusinessPlanData } from '../../../interfaces/businessPlan.interface';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

interface OrganizationStepProps {
  data: BusinessPlanData;
  onNext: (data: Partial<BusinessPlanData>) => void;
  onBack: () => void;
}

const OrganizationStep: React.FC<OrganizationStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onNext({
      organizationManagement: values,
    });
  };

  return (
    <div>
      <Title level={3}>Organization & Management</Title>
      <Paragraph>
        Detail your organization's structure, key team members, and advisors.
        Strong leadership and expertise are crucial for business success.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={data.organizationManagement}
        onFinish={handleSubmit}
      >
        <Divider orientation="left">Team Members</Divider>
        <Form.List name="teamMembers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ marginBottom: 24 }}>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Please enter team member name' }]}
                  >
                    <Input placeholder="Team Member Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'role']}
                    rules={[{ required: true, message: 'Please specify the role' }]}
                  >
                    <Input placeholder="Role/Position" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'responsibilities']}
                    rules={[{ required: true, message: 'Please list responsibilities' }]}
                  >
                    <TextArea
                      placeholder="Key responsibilities and duties..."
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'experience']}
                    rules={[{ required: true, message: 'Please provide experience details' }]}
                  >
                    <TextArea
                      placeholder="Relevant experience and qualifications..."
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                  <Button
                    type="text"
                    onClick={() => remove(name)}
                    icon={<MinusCircleOutlined />}
                    danger
                  >
                    Remove Team Member
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
                  Add Team Member
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Divider orientation="left">Advisors</Divider>
        <Form.List name="advisors">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ marginBottom: 24 }}>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Please enter advisor name' }]}
                  >
                    <Input placeholder="Advisor Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'expertise']}
                    rules={[{ required: true, message: 'Please specify area of expertise' }]}
                  >
                    <TextArea
                      placeholder="Area of expertise and contribution..."
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                  <Button
                    type="text"
                    onClick={() => remove(name)}
                    icon={<MinusCircleOutlined />}
                    danger
                  >
                    Remove Advisor
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
                  Add Advisor
                </Button>
              </Form.Item>
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

export default OrganizationStep;
