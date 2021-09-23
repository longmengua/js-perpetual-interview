
export enum AssetEnum {
    USD = "USD",
    TWD = "TWD",
    ETH = "ETH",
}

export type LpTokenInfo = {
    assetA: AssetEnum,
    assetB: AssetEnum,
    reserveA: number,
    reserveB: number
};

export type InputInfo = {
    isSwapIn: boolean,
    assetIn: AssetEnum,
    assetOut: AssetEnum,
    amountIn?: number,
    amountOut?: number,
}

export type PoolInfo = Record<string, LpTokenInfo>