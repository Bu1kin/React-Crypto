import {Card, Layout, List, Spin, Statistic, Tag, Typography} from "antd";
import {useEffect, useState} from "react";
import {fetchAssets, fetchCrypto} from "../../api.js";
import {percentDifference} from "../../utils.js";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import {useCrypto} from "../../context/crypto-context.jsx";

const siderStyle = {
    padding: '1rem',
};

export const AppSider = () => {
    const {assets} = useCrypto()

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => (
                <Card key={asset.id} style={{marginBottom: '1rem'}}>
                    <Statistic
                        title={asset.name}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{color: asset.grow ? '#3f8600' : '#cf1322'}}
                        prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                        suffix={'$'}
                    />
                    <List
                        size="small"
                        dataSource={[
                            {title: 'Total Profit:', value: asset.totalProfit, withTag: true},
                            {title: 'Asset Amount:', value: asset.amount, isPlain: true},
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                {item.isPlain ?
                                    <span>{item.value}</span> :
                                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                        {item.withTag &&
                                            <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>
                                        }
                                        {item.value.toFixed(2)}$
                                    </Typography.Text>
                                }
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    );
};

