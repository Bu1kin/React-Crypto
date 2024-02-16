import {Card, Layout, List, Spin, Statistic, Tag, Typography} from "antd";
import {useEffect, useState} from "react";
import {fetchAssets, fetchCrypto} from "../../api.js";
import {capitalize, percentDifference} from "../../utils.js";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";

const siderStyle = {
    padding: '1rem',
};

export const AppSider = () => {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function preload() {
            setLoading(true)
            // result поле, так как
            const {result} = await fetchCrypto()
            const assets = await fetchAssets()

            setCrypto(result)
            setAssets(assets.map(asset => {
                const coin = result.find((c) => c.id === asset.id)
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    name: coin.name,
                    ...asset
                }
            }))
            setLoading(false)
        }

        preload()
    }, []);

    if (loading) {
        return <Spin fullscreen/>
    }

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
            Sider
        </Layout.Sider>
    );
};

