
export enum AssetEnum {
    USD = "USD",
    TWD = "TWD",
}

export type LpTokenInfo = {
    assetA: AssetEnum,
    assetB: AssetEnum,
    reserveA: number,
    reserveB: number
};

export type InputInfo = {
    assetIn: AssetEnum,
    assetOut: AssetEnum,
    amountIn: number,
}

export type PoolInfo = Record<string, LpTokenInfo>