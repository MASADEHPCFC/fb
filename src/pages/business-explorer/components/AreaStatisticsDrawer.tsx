import React from 'react';
import { Drawer, Typography, Row, Col, Statistic, List, Tag, Button, Card } from 'antd';
import { ShopOutlined, RiseOutlined, TrendingUpOutlined } from '@ant-design/icons';
import { AreaStatistics, DubaiArea } from '../../../interfaces/businessExplorer.interface';

const { Title, Paragraph, Text } = Typography;

interface AreaStatisticsDrawerProps {
  selectedArea: string | null;
  areaStatistics: { [key: string]: AreaStatistics };
  dubaiAreas: DubaiArea[];
  selectedCategory: string | null;
  onClose: () => void;
  onCategoryClick: (category: string) => void;
  onCategoryBack: () => void;
}

const AreaStatisticsDrawer: React.FC<AreaStatisticsDrawerProps> = ({
  selectedArea,
  areaStatistics,
  dubaiAreas,
  selectedCategory,
  onClose,
  onCategoryClick,
  onCategoryBack,
}) => {
  if (!selectedArea) return null;
  
  const stats = areaStatistics[selectedArea];
  if (!stats) return null;

  const areaDescription = dubaiAreas.find(area => area.id === selectedArea)?.description;
  const selectedCategoryData = stats.categories.find(c => c.name === selectedCategory);

  const renderCategoryList = () => (
    <List
      dataSource={stats.categories}
      renderItem={category => (
        <List.Item
          onClick={() => onCategoryClick(category.name)}
          style={{ cursor: 'pointer', transition: 'all 0.3s' }}
          className="hover:bg-gray-50"
        >
          <List.Item.Meta
            title={
              <Text strong>{category.name}</Text>
            }
            description={
              <Row>
                <Col span={16}>
                  {`${category.count} businesses`}
                </Col>
                <Col span={8}>
                  <Text type="secondary">
                    {Math.round((category.count / stats.totalBusinesses) * 100)}% of total
                  </Text>
                </Col>
              </Row>
            }
          />
          <Tag color="blue">{category.count}</Tag>
        </List.Item>
      )}
    />
  );

  const renderSubCategories = () => {
    if (!selectedCategoryData) return null;

    return (
      <>
        <Button 
          type="link" 
          onClick={onCategoryBack}
          style={{ marginBottom: 16, padding: 0 }}
        >
          ← Back to Categories
        </Button>
        
        <Title level={5} style={{ marginBottom: 16 }}>
          {selectedCategoryData.name} Breakdown
        </Title>

        <List
          dataSource={selectedCategoryData.subCategories || []}
          renderItem={subCategory => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Text strong>{subCategory.name}</Text>
                }
                description={
                  <Row>
                    <Col span={16}>
                      {`${subCategory.count} businesses`}
                    </Col>
                    <Col span={8}>
                      <Text type="secondary">
                        {Math.round((subCategory.count / selectedCategoryData.count) * 100)}% of category
                      </Text>
                    </Col>
                  </Row>
                }
              />
              <Tag color="green">{subCategory.count}</Tag>
            </List.Item>
          )}
        />
      </>
    );
  };

  return (
    <Drawer
      title={
        <div>
          <Title level={4} style={{ marginBottom: 8 }}>{stats.name}</Title>
          <Text type="secondary">{areaDescription}</Text>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={!!selectedArea}
      width={400}
    >
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic 
                title="Total Businesses" 
                value={stats.totalBusinesses}
                prefix={<ShopOutlined />} 
              />
            </Col>
            <Col span={12}>
              <Statistic 
                title="Categories" 
                value={stats.categories.length}
                prefix={<RiseOutlined />} 
              />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Card className="statistics-card">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Text type="secondary">Business Distribution</Text>
              </Col>
              {stats.categories.map(category => (
                <Col span={24} key={category.name}>
                  <Text>{category.name}</Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div 
                      style={{ 
                        width: `${(category.count / stats.totalBusinesses) * 100}%`,
                        height: 8,
                        backgroundColor: '#1890ff',
                        borderRadius: 4,
                      }} 
                    />
                    <Text type="secondary">{Math.round((category.count / stats.totalBusinesses) * 100)}%</Text>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          {selectedCategory ? renderSubCategories() : renderCategoryList()}
        </Col>
      </Row>
    </Drawer>
  );
};

export default AreaStatisticsDrawer;
