import React from 'react';
import {Flex, Typography} from "antd";

export const CoinInfoHeader = ({coin, withSymbol}) => {
    return (
        <Flex align={"center"}>
            <img src={coin.icon} alt={coin.symbol} style={{width: 40, marginRight: 10}}/>
            <Typography.Title level={2} style={{margin: 0}}>
                {withSymbol && <span>({coin.symbol})</span>} {coin.name}
            </Typography.Title>
        </Flex>
    );
};

