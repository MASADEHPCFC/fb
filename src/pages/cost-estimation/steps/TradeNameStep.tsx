import React from 'react';
import { Form, Radio, Button, Card } from 'antd';
import { CompanySetupData } from '../../../interfaces/company.interface';

interface TradeNameStepProps {
    data: CompanySetupData;
    onNext?: (data: Partial<CompanySetupData>) => void;
    onBack?: () => void;
}

const TradeNameStep: React.FC<TradeNameStepProps> = ({ data, onNext, onBack }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: { hasTradeName: boolean }) => {
        onNext?.({ tradeName: { ...data.tradeName, hasReservedName: values.hasTradeName } });
    };

    return (
        <Card title="Trade Name" className="mb-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ hasTradeName: data.tradeName?.hasReservedName }}
            >
                <Form.Item
                    name="hasTradeName"
                    label="Do you have a trade name?"
                    rules={[{ required: true, message: 'Please select an option' }]}
                >
                    <Radio.Group>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item>
                    <Button type="default" onClick={onBack} style={{ marginRight: 8 }}>
                        Back
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Next
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default TradeNameStep; 