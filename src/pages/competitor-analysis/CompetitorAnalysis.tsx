import React, { useState } from 'react';
import { Card, Typography, Form, Select, Input, Button, Row, Col, Statistic, Progress, Alert, Tag, List, Divider } from 'antd';
import { RiseOutlined, WarningOutlined, CheckCircleOutlined, BarChartOutlined, TeamOutlined, ShopOutlined } from '@ant-design/icons';
import { areaStatistics } from '../business-explorer/BusinessExplorer';
import { formatCurrencyWithDirham, formatNumberWithCommas } from '../../utils/currency';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

interface CompetitionLevel {
  level: 'Low' | 'Moderate' | 'High';
  color: string;
  description: string;
}

interface AnalysisResult {
  totalCompetitors: number;
  directCompetitors: number;
  indirectCompetitors: number;
  marketSaturation: number;
  competitionLevel: CompetitionLevel;
  recommendations: string[];
  opportunities: string[];
  risks: string[];
}

const CompetitorAnalysis: React.FC = () => {
  const [form] = Form.useForm();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const areas = Object.values(areaStatistics).map(area => ({
    id: area.id,
    name: area.name,
  }));

  const businessCategories = Array.from(
    new Set(
      Object.values(areaStatistics)
        .flatMap(area => area.categories)
        .map(cat => cat.name)
    )
  );

  const getCompetitionLevel = (saturation: number): CompetitionLevel => {
    if (saturation < 30) {
      return {
        level: 'Low',
        color: '#52c41a',
        description: 'Market has room for new entrants with potential for growth.',
      };
    } else if (saturation < 70) {
      return {
        level: 'Moderate',
        color: '#faad14',
        description: 'Balanced market with established competition but still has opportunities.',
      };
    } else {
      return {
        level: 'High',
        color: '#ff4d4f',
        description: 'Highly competitive market requiring strong differentiation strategy.',
      };
    }
  };

  const analyzeCompetition = (values: any) => {
    setLoading(true);
    const area = areaStatistics[values.area];
    const category = area.categories.find(c => c.name === values.businessType);
    
    if (!category) {
      setLoading(false);
      return;
    }

    const subCategory = category.subCategories?.find(sc => 
      sc.name.toLowerCase().includes(values.businessSubType.toLowerCase())
    );

    const directCompetitors = subCategory?.count || 0;
    const indirectCompetitors = category.count - directCompetitors;
    const marketSaturation = (directCompetitors / (category.count || 1)) * 100;
    const competitionLevel = getCompetitionLevel(marketSaturation);

    const result: AnalysisResult = {
      totalCompetitors: category.count,
      directCompetitors,
      indirectCompetitors,
      marketSaturation,
      competitionLevel,
      recommendations: [
        'Focus on unique value proposition',
        'Consider innovative service delivery',
        'Invest in strong brand identity',
        'Develop customer loyalty programs',
      ],
      opportunities: [
        'Growing market demand',
        'Digital transformation potential',
        'Untapped customer segments',
        'Service quality improvement',
      ],
      risks: [
        'Market saturation in prime locations',
        'Price competition pressure',
        'High customer acquisition costs',
        'Changing consumer preferences',
      ],
    };

    setTimeout(() => {
      setAnalysisResult(result);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2}>Competitor Analysis</Title>
      <Paragraph className="lead" style={{ fontSize: '1.1rem' }}>
        Analyze your competition and market potential in Dubai's key business areas.
        Get insights to make informed decisions about your business location.
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={10}>
          <Card title="Business Details" bordered={false}>
            <Form
              form={form}
              layout="vertical"
              onFinish={analyzeCompetition}
            >
              <Form.Item
                name="area"
                label="Select Area"
                rules={[{ required: true, message: 'Please select an area' }]}
              >
                <Select
                  placeholder="Choose business area"
                  showSearch
                  optionFilterProp="children"
                >
                  {areas.map(area => (
                    <Option key={area.id} value={area.id}>{area.name}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="businessType"
                label="Business Category"
                rules={[{ required: true, message: 'Please select business category' }]}
              >
                <Select
                  placeholder="Select business category"
                  showSearch
                  optionFilterProp="children"
                >
                  {businessCategories.map(category => (
                    <Option key={category} value={category}>{category}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="businessSubType"
                label="Business Sub-Category"
                rules={[{ required: true, message: 'Please enter business sub-category' }]}
              >
                <Input placeholder="e.g., Italian Restaurant, Fashion Boutique" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  Analyze Competition
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          {analysisResult && (
            <Card title="Competition Analysis Results" bordered={false}>
              <Alert
                message={`Competition Level: ${analysisResult.competitionLevel.level}`}
                description={analysisResult.competitionLevel.description}
                type={analysisResult.competitionLevel.level === 'Low' ? 'success' : 
                      analysisResult.competitionLevel.level === 'Moderate' ? 'warning' : 'error'}
                showIcon
                style={{ marginBottom: 24 }}
              />

              <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col span={8}>
                  <Statistic
                    title="Direct Competitors"
                    value={analysisResult.directCompetitors}
                    prefix={<TeamOutlined />}
                    formatter={(value) => formatNumberWithCommas(Number(value))}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Indirect Competitors"
                    value={analysisResult.indirectCompetitors}
                    prefix={<ShopOutlined />}
                    formatter={(value) => formatNumberWithCommas(Number(value))}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Market Saturation"
                    value={analysisResult.marketSaturation}
                    suffix="%"
                    prefix={<BarChartOutlined />}
                  />
                </Col>
              </Row>

              <Progress
                percent={analysisResult.marketSaturation}
                status={analysisResult.marketSaturation > 80 ? 'exception' : 'active'}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': analysisResult.competitionLevel.color,
                }}
              />

              <Divider>Analysis Insights</Divider>

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title level={5}>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> Opportunities
                  </Title>
                  <List
                    size="small"
                    dataSource={analysisResult.opportunities}
                    renderItem={item => (
                      <List.Item>
                        <Text>{item}</Text>
                      </List.Item>
                    )}
                  />
                </Col>

                <Col span={24}>
                  <Title level={5}>
                    <WarningOutlined style={{ color: '#faad14' }} /> Risks to Consider
                  </Title>
                  <List
                    size="small"
                    dataSource={analysisResult.risks}
                    renderItem={item => (
                      <List.Item>
                        <Text>{item}</Text>
                      </List.Item>
                    )}
                  />
                </Col>

                <Col span={24}>
                  <Title level={5}>
                    <RiseOutlined style={{ color: '#1890ff' }} /> Recommendations
                  </Title>
                  <List
                    size="small"
                    dataSource={analysisResult.recommendations}
                    renderItem={item => (
                      <List.Item>
                        <Text>{item}</Text>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CompetitorAnalysis;
