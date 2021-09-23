import {AssetEnum, LpTokenInfo, PoolInfo, InputInfo} from "./type";
import BigNumber from "bignumber.js";

export const sortAssetName = (nameA: string, nameB: string) =>
    nameA?.toLowerCase() < nameB?.toLowerCase() ? `${nameA?.toLowerCase()}_${nameB?.toLowerCase()}` : `${nameB?.toLowerCase()}_${nameA?.toLowerCase()}`;

export const AddLiquidityFunc = (poolInfo: PoolInfo, props: LpTokenInfo ) => {
    const key = sortAssetName(props.assetA, props.assetB);
    const lpTokenInfo: LpTokenInfo = {
        assetA: props.assetA,
        assetB: props.assetB,
        reserveA: props.reserveA,
        reserveB: props.reserveB,
    };

    poolInfo[key] = lpTokenInfo;

    return poolInfo;
};

// todo: get the best ration for swap.
export const BestSwapPath = (poolInfo: PoolInfo, props: InputInfo) => {
    const key = sortAssetName(props.assetIn, props.assetOut);
};

export const SwapFunc = (poolInfo: PoolInfo, props: InputInfo) => {
    const key = sortAssetName(props.assetIn, props.assetOut);
    const lpTokenInfo: LpTokenInfo = poolInfo[key];
    const ratio = lpTokenInfo.reserveA*lpTokenInfo.reserveB;

    let amountOut: number = 0;
    let reserveA: number = 0;
    let reserveB: number = 0;

    if(props.assetIn == lpTokenInfo.assetA){
        reserveA = lpTokenInfo.reserveA + props.amountIn;
        amountOut = lpTokenInfo.reserveB - ratio/reserveA;
        reserveB = lpTokenInfo.reserveB - amountOut;
    } else if (props.assetIn == lpTokenInfo.assetB) {
        reserveB = lpTokenInfo.reserveB + props.amountIn;
        amountOut = lpTokenInfo.reserveA - ratio/reserveB;
        reserveA = lpTokenInfo.reserveA - amountOut;
    }

    lpTokenInfo.reserveA = reserveA;
    lpTokenInfo.reserveB = reserveB;

    return amountOut;
};