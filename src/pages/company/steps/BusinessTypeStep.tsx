import React from 'react';
import { Card, Radio, Button, Form } from 'antd';
import { BusinessType } from '../../../interfaces/company.interface';

interface BusinessTypeStepProps {
    businessType: BusinessType | null;
    onNext: (businessType: BusinessType) => void;
}

const BusinessTypeStep: React.FC<BusinessTypeStepProps> = ({ businessType, onNext }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: { businessType: BusinessType }) => {
        if (onNext) {
            onNext(values.businessType);
        }
    };

    return (
        <Card title="Business Type: New Or Existing" className="mb-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ businessType }}
            >
                <Form.Item
                    name="businessType"
                    label="Are you starting a new business or expanding an existing one?"
                    rules={[{ required: true, message: 'Please select an option' }]}
                >
                    <Radio.Group>
                        <Radio value="new">I want to open a New Business</Radio>
                        <Radio value="existing">I want to open a branch for an Existing Business</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >
                        Next
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default BusinessTypeStep;
