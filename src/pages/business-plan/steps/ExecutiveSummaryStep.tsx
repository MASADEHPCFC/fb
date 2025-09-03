import React, { useState } from "react";
import { Form, Input, Button, Typography, Space, Alert, Spin, Switch } from "antd";
import { BusinessPlanData } from "../../../interfaces/businessPlan.interface";
import {
  executiveSummaryService,
  ExecutiveSummaryResponse,
} from "../../../services/executiveSummary.service";
import { RobotOutlined, EditOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

interface ExecutiveSummaryStepProps {
  data: BusinessPlanData;
  onNext: (data: Partial<BusinessPlanData>) => void;
}

const ExecutiveSummaryStep: React.FC<ExecutiveSummaryStepProps> = ({
  data,
  onNext,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] =
    useState<ExecutiveSummaryResponse | null>(null);
  const [AI, setAI] = useState<boolean>(false);

  const generateSummary = async () => {
    if (AI) {
      try {
        const values = form.getFieldsValue(["missionStatement", "vision"]);
        if (!values.missionStatement || !values.vision) {
          return;
        }

        setLoading(true);
        setError(null);

        const response = await executiveSummaryService.generate(
          values.vision,
          values.missionStatement
        );

        setApiResponse(response);
        // Ensure the summary is set in the form
        form.setFieldsValue({
          executiveSummary: response.summary,
        });

        // Double-check the value is set
        console.log("Setting executive summary:", response.summary);
        console.log("Form values after set:", form.getFieldsValue());
      } catch (err) {
        setError("Failed to generate summary. Please try again.");
        console.error("Error generating summary:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Watch for changes in both fields
  // const handleFieldChange = async (_: any, allFields: any) => {
  //   const mission = form.getFieldValue('missionStatement');
  //   const vision = form.getFieldValue('vision');

  //   if (mission && vision) {
  //     await generateSummary();
  //   }
  // };

  const onFieldBlur = async (e: any) => {
    if(AI){
    const mission = form.getFieldValue("missionStatement");
    const vision = form.getFieldValue("vision");

    if (mission && vision) {
        await generateSummary();
      }
    }
  };

  const handleSubmit = (values: any) => {
    onNext(values);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={3}>Executive Summary</Title>
          <Paragraph>
            The executive summary is the first and most important section of your
            business plan. It provides a high-level overview of your business and
            its goals.
          </Paragraph>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EditOutlined style={{ fontSize: '18px', color: !AI ? '#1890ff' : '#999' }} />
          <Switch
            checked={AI}
            onChange={(checked) => setAI(checked)}
            checkedChildren="AI"
            unCheckedChildren="Manual"
          />
          <RobotOutlined style={{ fontSize: '18px', color: AI ? '#1890ff' : '#999' }} />
        </div>
      </div>

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
        // onFieldsChange={handleFieldChange}
      >
        <Form.Item
          name="companyName"
          label="Company Name"
          rules={[
            { required: true, message: "Please enter your company name" },
          ]}
        >
          <Input placeholder="Enter your company name" />
        </Form.Item>

        <Form.Item
          name="missionStatement"
          label="Mission Statement"
          rules={[
            { required: true, message: "Please enter your mission statement" },
          ]}
          help="A clear and concise statement that explains your company's purpose"
        >
          <TextArea
            placeholder="What is your company's mission?"
            autoSize={{ minRows: 2, maxRows: 4 }}
            onBlur={onFieldBlur}
          />
        </Form.Item>

        <Form.Item
          name="vision"
          label="Vision"
          rules={[
            { required: true, message: "Please enter your company vision" },
          ]}
          help="Describe where you want your company to be in the future"
        >
          <TextArea
            placeholder="What is your company's vision for the future?"
            autoSize={{ minRows: 2, maxRows: 4 }}
            onBlur={onFieldBlur}
          />
        </Form.Item>

        {error && (
          <Form.Item>
            <Alert type="error" message={error} showIcon />
          </Form.Item>
        )}

        {/* {apiResponse && (
          <div style={{ marginBottom: 24 }}>
            <Title level={4}>Analysis</Title>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Vision Analysis:</Text>
              <Paragraph>{apiResponse.vision_analysis}</Paragraph>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Mission Analysis:</Text>
              <Paragraph>{apiResponse.mission_analysis}</Paragraph>
            </div>
          </div>
        )} */}

        <Form.Item
          name="executiveSummary"
          label="Executive Summary"
          rules={[
            { required: true, message: "Please provide an executive summary" },
          ]}
          help={AI 
            ? "The summary will be generated automatically when you complete the vision and mission statements." 
            : "A brief overview of your business plan (1-2 paragraphs). Write a compelling summary that captures your business essence."
          }
        >
          <div style={{ position: "relative" }}>
            <TextArea
              placeholder={
                loading
                  ? "Generating summary..."
                  : AI 
                    ? "Complete the vision and mission statements above to generate your summary..."
                    : "Write your executive summary here..."
              }
              autoSize={{ minRows: 4, maxRows: 8 }}
              disabled={loading }
              value={form.getFieldValue("executiveSummary")}
              onChange={(e) =>
                form.setFieldsValue({ executiveSummary: e.target.value })
              }
            />
            {loading && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Spin tip="Generating summary..." />
              </div>
            )}
          </div>
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
