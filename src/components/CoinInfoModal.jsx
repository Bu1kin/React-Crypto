import {Divider, Tag, Typography} from "antd";
import {CoinInfoHeader} from "./CoinInfoHeader.jsx";

export const CoinInfoModal = ({coin}) => {
    return (
        <>
            <CoinInfoHeader coin={coin} withSymbol={true}/>
            <Divider/>
            <Typography.Paragraph>
                <Typography.Text strong>1 hour: </Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
                <Typography.Text strong>1 day: </Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
                <Typography.Text strong>1 week: </Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price: </Typography.Text>
                {coin.price.toFixed(2)}$
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price BTC: </Typography.Text>
                {coin.priceBtc}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Market Cap: </Typography.Text>
                {coin.marketCap.toFixed(0)}$
            </Typography.Paragraph>
            {coin.contractAddress &&
                <Typography.Paragraph>
                    <Typography.Text strong>Contract Address: </Typography.Text>
                    {coin.contractAddress}
                </Typography.Paragraph>
            }
        </>
    );
};

