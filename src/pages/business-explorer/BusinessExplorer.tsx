import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import AreaStatisticsDrawer from './components/AreaStatisticsDrawer';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';

const libraries: Libraries = ['places'];
const googleMapsApiKey = "AIzaSyBYlvvEDIguVLg7DGVLpFCQk3bdrSzlo7M";
import { EnvironmentOutlined, ShopOutlined, RiseOutlined } from '@ant-design/icons';
import { AreaStatistics, DubaiArea } from '../../interfaces/businessExplorer.interface';

const { Title, Paragraph } = Typography;

const dubaiAreas: DubaiArea[] = [
  {
    id: 'jlt',
    name: 'Jumeirah Lake Towers',
    coordinates: { lat: 25.0693, lng: 55.1407 },
    description: 'Mixed-use development with residential and business towers',
  },
  {
    id: 'dso',
    name: 'Dubai Silicon Oasis',
    coordinates: { lat: 25.1185, lng: 55.3811 },
    description: 'Technology hub and integrated community',
  },
  {
    id: 'businessbay',
    name: 'Business Bay',
    coordinates: { lat: 25.1857, lng: 55.2766 },
    description: 'Major business district and commercial hub',
  },
  {
    id: 'difc',
    name: 'Dubai International Financial Centre',
    coordinates: { lat: 25.2147, lng: 55.2796 },
    description: 'Financial hub and business district',
  },
  {
    id: 'dip',
    name: 'Dubai Investment Park',
    coordinates: { lat: 25.0256, lng: 55.1505 },
    description: 'Mixed-use industrial, commercial and residential zone',
  },
  {
    id: 'palmjumeirah',
    name: 'Palm Jumeirah',
    coordinates: { lat: 25.1124, lng: 55.1390 },
    description: 'Luxury residential and hospitality destination',
  },
  {
    id: 'dragonmart',
    name: 'Dragon Mart',
    coordinates: { lat: 25.1719, lng: 55.4075 },
    description: 'Largest Chinese trading hub outside China',
  },
  {
    id: 'dubaisouth',
    name: 'Dubai South',
    coordinates: { lat: 24.9027, lng: 55.1715 },
    description: 'Major aviation and logistics hub, home to Expo 2020 site',
  },
  {
    id: 'dubaimall',
    name: 'Dubai Mall Area',
    coordinates: { lat: 25.1972, lng: 55.2744 },
    description: 'Premier retail and entertainment destination',
  },
  {
    id: 'dubaimarina',
    name: 'Dubai Marina',
    coordinates: { lat: 25.0819, lng: 55.1367 },
    description: 'Waterfront residential and commercial district',
  }
];

const areaStatistics: { [key: string]: AreaStatistics } = {
  jlt: {
    id: 'jlt',
    name: 'Jumeirah Lake Towers',
    coordinates: { lat: 25.0693, lng: 55.1407 },
    totalBusinesses: 1250,
    categories: [
      {
        name: 'Food & Beverage',
        count: 280,
        subCategories: [
          { name: 'Restaurants', count: 150 },
          { name: 'Cafes', count: 80 },
          { name: 'Food Services', count: 50 },
        ],
      },
      {
        name: 'Professional Services',
        count: 420,
        subCategories: [
          { name: 'Financial Services', count: 150 },
          { name: 'Consulting', count: 120 },
          { name: 'Legal Services', count: 100 },
          { name: 'Real Estate', count: 50 },
        ],
      },
      {
        name: 'Retail',
        count: 350,
        subCategories: [
          { name: 'Fashion', count: 120 },
          { name: 'Electronics', count: 80 },
          { name: 'Home & Office', count: 100 },
          { name: 'Convenience Stores', count: 50 },
        ],
      },
    ],
  },
  dso: {
    id: 'dso',
    name: 'Dubai Silicon Oasis',
    coordinates: { lat: 25.1185, lng: 55.3811 },
    totalBusinesses: 850,
    categories: [
      {
        name: 'Technology',
        count: 380,
        subCategories: [
          { name: 'Software Development', count: 150 },
          { name: 'IT Services', count: 120 },
          { name: 'Hardware & Electronics', count: 80 },
          { name: 'Digital Media', count: 30 },
        ],
      },
      {
        name: 'Education & Training',
        count: 120,
        subCategories: [
          { name: 'Technical Training', count: 50 },
          { name: 'Higher Education', count: 40 },
          { name: 'Research Centers', count: 30 },
        ],
      },
      {
        name: 'Support Services',
        count: 350,
        subCategories: [
          { name: 'Business Centers', count: 100 },
          { name: 'Retail & F&B', count: 150 },
          { name: 'Professional Services', count: 100 },
        ],
      },
    ],
  },
  businessbay: {
    id: 'businessbay',
    name: 'Business Bay',
    coordinates: { lat: 25.1857, lng: 55.2766 },
    totalBusinesses: 1800,
    categories: [
      {
        name: 'Corporate Offices',
        count: 800,
        subCategories: [
          { name: 'Financial Services', count: 300 },
          { name: 'Real Estate', count: 250 },
          { name: 'Professional Services', count: 250 },
        ],
      },
      {
        name: 'Hospitality',
        count: 400,
        subCategories: [
          { name: 'Hotels', count: 150 },
          { name: 'Restaurants', count: 180 },
          { name: 'Entertainment', count: 70 },
        ],
      },
      {
        name: 'Retail',
        count: 600,
        subCategories: [
          { name: 'Luxury Retail', count: 200 },
          { name: 'Fashion & Accessories', count: 250 },
          { name: 'Services', count: 150 },
        ],
      },
    ],
  },
  difc: {
    id: 'difc',
    name: 'Dubai International Financial Centre',
    coordinates: { lat: 25.2147, lng: 55.2796 },
    totalBusinesses: 1500,
    categories: [
      {
        name: 'Financial Services',
        count: 750,
        subCategories: [
          { name: 'Banking', count: 250 },
          { name: 'Investment Firms', count: 300 },
          { name: 'Insurance', count: 200 },
        ],
      },
      {
        name: 'Legal Services',
        count: 350,
        subCategories: [
          { name: 'Law Firms', count: 200 },
          { name: 'Corporate Services', count: 150 },
        ],
      },
      {
        name: 'Support & Lifestyle',
        count: 400,
        subCategories: [
          { name: 'Fine Dining', count: 150 },
          { name: 'Luxury Retail', count: 150 },
          { name: 'Business Services', count: 100 },
        ],
      },
    ],
  },
  dip: {
    id: 'dip',
    name: 'Dubai Investment Park',
    coordinates: { lat: 25.0256, lng: 55.1505 },
    totalBusinesses: 1100,
    categories: [
      {
        name: 'Industrial',
        count: 450,
        subCategories: [
          { name: 'Manufacturing', count: 200 },
          { name: 'Warehousing', count: 150 },
          { name: 'Logistics', count: 100 },
        ],
      },
      {
        name: 'Commercial',
        count: 350,
        subCategories: [
          { name: 'Retail', count: 150 },
          { name: 'Services', count: 120 },
          { name: 'Offices', count: 80 },
        ],
      },
      {
        name: 'Support Services',
        count: 300,
        subCategories: [
          { name: 'F&B', count: 120 },
          { name: 'Business Services', count: 100 },
          { name: 'Community Services', count: 80 },
        ],
      },
    ],
  },
  palmjumeirah: {
    id: 'palmjumeirah',
    name: 'Palm Jumeirah',
    coordinates: { lat: 25.1124, lng: 55.1390 },
    totalBusinesses: 950,
    categories: [
      {
        name: 'Hospitality',
        count: 400,
        subCategories: [
          { name: 'Hotels', count: 150 },
          { name: 'Resorts', count: 100 },
          { name: 'Serviced Apartments', count: 150 },
        ],
      },
      {
        name: 'F&B',
        count: 350,
        subCategories: [
          { name: 'Fine Dining', count: 150 },
          { name: 'Casual Dining', count: 120 },
          { name: 'Cafes & Lounges', count: 80 },
        ],
      },
      {
        name: 'Retail & Services',
        count: 200,
        subCategories: [
          { name: 'Luxury Retail', count: 80 },
          { name: 'Beach Clubs', count: 50 },
          { name: 'Wellness Services', count: 70 },
        ],
      },
    ],
  },
  dragonmart: {
    id: 'dragonmart',
    name: 'Dragon Mart',
    coordinates: { lat: 25.1719, lng: 55.4075 },
    totalBusinesses: 1600,
    categories: [
      {
        name: 'Wholesale & Retail',
        count: 800,
        subCategories: [
          { name: 'Electronics', count: 250 },
          { name: 'Home & Garden', count: 300 },
          { name: 'Textiles & Clothing', count: 250 },
        ],
      },
      {
        name: 'Trading Services',
        count: 500,
        subCategories: [
          { name: 'Import/Export', count: 250 },
          { name: 'Distribution', count: 150 },
          { name: 'Logistics', count: 100 },
        ],
      },
      {
        name: 'Support Services',
        count: 300,
        subCategories: [
          { name: 'F&B', count: 150 },
          { name: 'Business Services', count: 100 },
          { name: 'Storage Solutions', count: 50 },
        ],
      },
    ],
  },
  dubaisouth: {
    id: 'dubaisouth',
    name: 'Dubai South',
    coordinates: { lat: 24.9027, lng: 55.1715 },
    totalBusinesses: 1200,
    categories: [
      {
        name: 'Aviation & Logistics',
        count: 500,
        subCategories: [
          { name: 'Air Cargo', count: 200 },
          { name: 'Logistics Services', count: 200 },
          { name: 'Aviation Services', count: 100 },
        ],
      },
      {
        name: 'Commercial',
        count: 400,
        subCategories: [
          { name: 'Office Spaces', count: 200 },
          { name: 'Retail', count: 120 },
          { name: 'Services', count: 80 },
        ],
      },
      {
        name: 'Events & Exhibitions',
        count: 300,
        subCategories: [
          { name: 'Event Spaces', count: 100 },
          { name: 'Exhibition Services', count: 120 },
          { name: 'Support Services', count: 80 },
        ],
      },
    ],
  },
  dubaimall: {
    id: 'dubaimall',
    name: 'Dubai Mall Area',
    coordinates: { lat: 25.1972, lng: 55.2744 },
    totalBusinesses: 1800,
    categories: [
      {
        name: 'Retail',
        count: 1000,
        subCategories: [
          { name: 'Fashion & Accessories', count: 400 },
          { name: 'Electronics', count: 200 },
          { name: 'Department Stores', count: 400 },
        ],
      },
      {
        name: 'F&B',
        count: 500,
        subCategories: [
          { name: 'Restaurants', count: 250 },
          { name: 'Cafes', count: 150 },
          { name: 'Food Courts', count: 100 },
        ],
      },
      {
        name: 'Entertainment',
        count: 300,
        subCategories: [
          { name: 'Family Entertainment', count: 150 },
          { name: 'Cinema & Theatre', count: 100 },
          { name: 'Sports & Leisure', count: 50 },
        ],
      },
    ],
  },
  dubaimarina: {
    id: 'dubaimarina',
    name: 'Dubai Marina',
    coordinates: { lat: 25.0819, lng: 55.1367 },
    totalBusinesses: 1400,
    categories: [
      {
        name: 'F&B',
        count: 600,
        subCategories: [
          { name: 'Restaurants', count: 300 },
          { name: 'Cafes', count: 200 },
          { name: 'Bars & Lounges', count: 100 },
        ],
      },
      {
        name: 'Retail & Services',
        count: 500,
        subCategories: [
          { name: 'Fashion & Beauty', count: 200 },
          { name: 'Convenience Stores', count: 150 },
          { name: 'Personal Services', count: 150 },
        ],
      },
      {
        name: 'Tourism & Leisure',
        count: 300,
        subCategories: [
          { name: 'Water Activities', count: 100 },
          { name: 'Tourism Services', count: 120 },
          { name: 'Entertainment', count: 80 },
        ],
      },
    ],
  },
};

const BusinessExplorer: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const mapContainerStyle = {
    width: '100%',
    height: '600px',
  };

  const defaultCenter = {
    lat: 25.1185,
    lng: 55.2708,
  };

  const handleMarkerClick = (areaId: string) => {
    setSelectedArea(areaId);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Business Explorer</Title>
      <Paragraph>
        Explore business distribution across Dubai's key areas. Click on any area 
        to view detailed statistics and make informed decisions for your business location.
      </Paragraph>

      <Card style={{ marginBottom: 20 }}>
        <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={11}
            options={{
              styles: [
                {
                  featureType: 'poi',
                  elementType: 'labels',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'road',
                  elementType: 'labels.text',
                  stylers: [{ visibility: 'on' }],
                },
                {
                  featureType: 'transit',
                  elementType: 'labels',
                  stylers: [{ visibility: 'off' }],
                },
              ],
              mapTypeControl: true,
              streetViewControl: false,
              fullscreenControl: true,
              zoomControl: true,
            }}
          >
            {dubaiAreas.map((area) => (
              <Marker
                key={area.id}
                position={area.coordinates}
                onClick={() => handleMarkerClick(area.id)}
                label={{
                  text: area.name,
                  color: '#000000',
                  fontSize: '13px',
                }}
                icon={{
                  path: "M -5,0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
                  fillColor: selectedArea === area.id ? '#ff4d4f' : '#1890ff',
                  fillOpacity: 0.7,
                  strokeWeight: 1,
                  strokeColor: '#ffffff',
                  scale: 6,
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </Card>

      <AreaStatisticsDrawer
        selectedArea={selectedArea}
        areaStatistics={areaStatistics}
        dubaiAreas={dubaiAreas}
        selectedCategory={selectedCategory}
        onClose={() => setSelectedArea(null)}
        onCategoryClick={handleCategoryClick}
        onCategoryBack={() => setSelectedCategory(null)}
      />
    </div>
  );
};

export default BusinessExplorer;