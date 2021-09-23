import {AssetEnum, InputInfo, LpTokenInfo, PoolInfo} from "./pool/type";
import {AddLiquidityFunc, SwapFunc} from "./pool";


(() => {
    /**
     * Init pool
     * */
    const pools: PoolInfo = {};
    console.log("init pool => ", pools);
    /**
     * Test add liquidity to pool
     * */
    const createLiquidity: LpTokenInfo = {
        assetA: AssetEnum.USD,
        assetB: AssetEnum.TWD,
        reserveA: 1000,
        reserveB: 10000,
    };
    AddLiquidityFunc(pools, createLiquidity);
    console.log("add liquidity to the pool => ", pools);
    /**
     * Test swap from pool
     * */
    let inputInfo: InputInfo = {} as InputInfo;
    let amountOut: number = 0;

    //Test 1 - amount in TWD
    inputInfo = {
        assetIn: AssetEnum.TWD,
        assetOut: AssetEnum.USD,
        amountIn: 6000,
    };
    amountOut = SwapFunc(pools, inputInfo);
    console.log("swap info => ", {...inputInfo, amountOut});
    console.log("pool info after swapping => ", pools);

    //Test 2 - amount in USD
    inputInfo = {
        assetIn: AssetEnum.USD,
        assetOut: AssetEnum.TWD,
        amountIn: 375,
    };
    amountOut = SwapFunc(pools, inputInfo);
    console.log("swap info => ", {...inputInfo, amountOut});
    console.log("pool info after swapping => ", pools);
})();

console.log("Done");