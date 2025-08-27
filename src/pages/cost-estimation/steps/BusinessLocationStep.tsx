import React from "react";
import { Form, Select, Button, Card, Modal } from "antd";
import { CompanySetupData } from '../../../interfaces/company.interface';

interface BusinessLocationStepProps {
  data: CompanySetupData;
  onNext?: (data: Partial<CompanySetupData>) => void;
  onBack?: () => void;
}

const businessLocations = [
  "Dragon Mart One",
  "Dragon Mart Two",
  "Dragon Mart Six",
  "Palm Jumeirah",
  "Jumeirah Village Circle",
  "Jumeirah Village Triangle",
];

const BusinessLocationStep: React.FC<BusinessLocationStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { businessLocation: string }) => {
    onNext?.({ businessLocation: values.businessLocation });
  };

  const handleVirtualLicenseClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    Modal.info({
      title: "Virtual License Information",
      content: (
        <div>
          Ready to go virtual? Our partner <b>DUQE</b> offers seamless virtual
          business licenses—
          <a
            href="https://www.duqe.ae/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1677ff" }}
          >
            click here to explore your options!
          </a>
        </div>
      ),
      okText: "Close",
    });
  };

  return (
    <Card title="Business Location" className="mb-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ businessLocation: data.businessLocation }}
      >
        <Form.Item
          name="businessLocation"
          label="Business Location"
          rules={[{ required: true, message: "Please select a business location" }]}
        >
          <Select placeholder="Select a business location">
            {businessLocations.map((location) => (
              <Select.Option key={location} value={location}>
                {location}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="default" onClick={onBack} style={{ marginRight: 8 }}>
            Back
          </Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
        <div style={{ marginTop: 16 }}>
          <a href="#" onClick={handleVirtualLicenseClick} style={{ color: "#1677ff" }}>
            Learn about Virtual License
          </a>
        </div>
      </Form>
    </Card>
  );
};

export default BusinessLocationStep;
