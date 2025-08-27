import React from 'react';
import { Card, Button, Descriptions, Typography, Modal, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { updateStepData, setQuickEstimate } from '../../../store/slices/companySetupSlice';
import { formatCurrencyWithDirham } from '../../../utils/currency';
import { CompanySetupData } from '../../../interfaces/company.interface';

const { Title } = Typography;

interface SummaryStepProps {
    data: CompanySetupData;
    onBack?: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ data, onBack }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleContinue = () => {
        Modal.info({
            title: 'Complete Business setup',
            content: 'You will be redirected to complete your business setup. Your selections will be pre-filled.',
            okText: 'Go to Business Setup',
            onOk: () => {
                console.log(data)
                dispatch(updateStepData({
                    step: 1,
                    data: data,
                    isValid: true
                }));
                dispatch(setQuickEstimate(data));
                navigate('/company-setup');
            },
        });
    };

    return (
        <Card title="Cost Summary" className="mb-4">
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Business Type">
                    <Tooltip title="FZE: Single shareholder (Free Zone Establishment), FZCO: Multiple shareholders (Free Zone Company)">
                        {data.numberOfShareholders === 1
                            ? 'FZE'
                            : (data.numberOfShareholders > 1
                                ? 'FZCO'
                                : <span style={{ color: '#faad14' }}>Not specified</span>)}
                    </Tooltip>
                </Descriptions.Item>
                <Descriptions.Item label="Business Category">
                    {data.businessCategory?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Selected Activities">
                    {(data.activity && data.activity.length > 0)
                        ? data.activity.map((a: any) => a.description).join(', ')
                        : 'None selected'}
                </Descriptions.Item>
                <Descriptions.Item label="Number of Shareholders">
                    {data.numberOfShareholders}
                </Descriptions.Item>
                <Descriptions.Item label="Trade Name">
                    {data.tradeName?.hasReservedName ? 'Yes' : 'No'}
                </Descriptions.Item>
                <Descriptions.Item label="Business Location">
                    {data.businessLocation}
                </Descriptions.Item>
            </Descriptions>

            <div className="mt-6">
                <Title level={4}>Cost Breakdown</Title>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Base Cost">
                        {formatCurrencyWithDirham(data.costs.baseCost)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Activity Cost">
                        {formatCurrencyWithDirham(data.costs.activityCost)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Shareholder Cost">
                        {formatCurrencyWithDirham(data.costs.shareholderCost)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trade Name Cost">
                        {formatCurrencyWithDirham(data.costs.tradeNameCost)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Location Cost">
                        {formatCurrencyWithDirham(data.costs.locationCost)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Cost" className="font-bold">
                        {formatCurrencyWithDirham(data.costs.totalCost, { size: 18 })}
                    </Descriptions.Item>
                </Descriptions>
            </div>

            <div style={{ marginTop: '1rem' }} className="summary-actions">
                <Button type="default" onClick={onBack} style={{ marginRight: 8 }}>
                    Back
                </Button>
                <Button type="primary" onClick={() => window.print()} style={{ marginRight: 8 }}>
                    Print Estimate
                </Button>
                <Button type="primary" onClick={handleContinue}>
                    Continue Business Setup
                </Button>
            </div>
        </Card>
    );
};

export default SummaryStep; 