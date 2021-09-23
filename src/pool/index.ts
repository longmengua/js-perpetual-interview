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

export const SwapFunc = (poolInfo: PoolInfo, props: InputInfo): InputInfo => {
    const key = sortAssetName(props.assetIn, props.assetOut);
    const lpTokenInfo: LpTokenInfo = poolInfo[key];
    const ratio = lpTokenInfo?.reserveA*lpTokenInfo?.reserveB;
    const condition1 = props.isSwapIn ? 1 : 0;
    const condition2 = props.assetIn == lpTokenInfo?.assetA ? 1 : 0;
    const amountIn = props.isSwapIn ? props?.amountIn : (props?.amountOut*-1);

    let amountOut: BigNumber;

    if(
        !lpTokenInfo ||
        (condition1 && !props.amountIn) ||
        (!condition1 && !props.amountOut) ||
        (!condition1 && condition2 && props.amountOut > lpTokenInfo?.reserveB) ||
        (!condition1 && !condition2 && props.amountOut > lpTokenInfo?.reserveA)
    ) {
        props.amountIn = 0;
        props.amountOut = 0;
        console.error(`[The input params are not proper]`);
        return {...props};
    }
    if(condition1 ^ condition2){
        lpTokenInfo.reserveB = lpTokenInfo.reserveB + amountIn;
        amountOut = new BigNumber(ratio).div(lpTokenInfo.reserveB).minus(lpTokenInfo.reserveA).times(-1);
        lpTokenInfo.reserveA = amountOut.minus(lpTokenInfo.reserveA).times(-1).toNumber();
    } else {
        lpTokenInfo.reserveA = lpTokenInfo.reserveA + amountIn;
        amountOut = new BigNumber(ratio).div(lpTokenInfo.reserveA).minus(lpTokenInfo.reserveB).times(-1);
        lpTokenInfo.reserveB = amountOut.minus(lpTokenInfo.reserveB).times(-1).toNumber();
    }

    props.isSwapIn ? (props.amountOut = Math.abs(amountOut?.toNumber())) : (props.amountIn = Math.abs(amountOut?.toNumber()));

    return {...props};
};