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
    let createLiquidity: LpTokenInfo = {} as LpTokenInfo;

    createLiquidity = {
        assetA: AssetEnum.USD,
        assetB: AssetEnum.TWD,
        reserveA: 1000,
        reserveB: 10000,
    };
    AddLiquidityFunc(pools, createLiquidity);

    createLiquidity = {
        assetA: AssetEnum.ETH,
        assetB: AssetEnum.USD,
        reserveA: 10,
        reserveB: 300,
    };
    AddLiquidityFunc(pools, createLiquidity);

    console.log("add liquidity to the pool => ", pools);

    /**
     * Test swap from pool
     * */
    let inputInfo: InputInfo = {} as InputInfo;


    //Test 0 - test same asset
    console.log("\n===    Test 0    ===");
    inputInfo = {
        isSwapIn: true,
        assetIn: AssetEnum.USD,
        assetOut: AssetEnum.USD,
        amountIn: 6000,
    };
    inputInfo = SwapFunc(pools, inputInfo);
    console.log("swap info => ", {...inputInfo});
    console.log("pool info after swapping => ", pools);

    // Test 1 - amount in TWD
    console.log("\n===    Test 1    ===");
    inputInfo = {
        isSwapIn: true,
        assetIn: AssetEnum.TWD,
        assetOut: AssetEnum.USD,
        amountIn: 6000,
    };
    inputInfo = SwapFunc(pools, inputInfo);
    console.log("swap info => ", {...inputInfo});
    console.log("pool info after swapping => ", pools);

    //Test 2 - amount out TWD
    console.log("\n===    Test 2    ===");
    inputInfo = {
        isSwapIn: false,
        assetIn: AssetEnum.USD,
        assetOut: AssetEnum.TWD,
        amountOut: 6000,
    };
    inputInfo = SwapFunc(pools, inputInfo);
    console.log("swap info => ", {...inputInfo});
    console.log("pool info after swapping => ", pools);

    //Test 3 - amount in USD
    console.log("\n===    Test 3    ===");
    inputInfo = {
        isSwapIn: true,
        assetIn: AssetEnum.USD,
        assetOut: AssetEnum.TWD,
        amountIn: 100,
    };
    inputInfo = SwapFunc(pools, inputInfo);
    console.log("swap info => ", {...inputInfo});
    console.log("pool info after swapping => ", pools);

    //Test 4 - amount out USD
    console.log("\n===    Test 4    ===");
    inputInfo = {
        isSwapIn: false,
        assetIn: AssetEnum.TWD,
        assetOut: AssetEnum.USD,
        amountOut: 100,
    };
    inputInfo = SwapFunc(pools, inputInfo);
    console.log("swap info => ", {...inputInfo});
    console.log("pool info after swapping => ", pools);

    // Test 5 - amount in ETH
    console.log("\n===    Test 5    ===");
    inputInfo = {
        isSwapIn: true,
        assetIn: AssetEnum.ETH,
        assetOut: AssetEnum.USD,
        amountIn: 100,
    };
    inputInfo = SwapFunc(pools, inputInfo);
    console.log("swap info => ", {...inputInfo});
    console.log("pool info after swapping => ", pools);

    //Test 6 - amount out ETH
    console.log("\n===    Test 6    ===");
    inputInfo = {
        isSwapIn: false,
        assetIn: AssetEnum.USD,
        assetOut: AssetEnum.ETH,
        amountOut: 100,
    };
    inputInfo = SwapFunc(pools, inputInfo);
    console.log("swap info => ", {...inputInfo});
    console.log("pool info after swapping => ", pools);

})();

console.log("Done");