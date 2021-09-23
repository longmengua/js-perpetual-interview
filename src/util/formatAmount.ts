import BigNumber from "bignumber.js";

export const AmountValidation = (amount: string): boolean => /^[0-9]*(.[0-9]*)?$/.test(amount);

export const AmountFormat = (
    props: {
        amount: string | number,
        digit?: number,
        isConvertToString?: boolean
    }
): number | string => {

    const {amount, digit, isConvertToString} = props;

    const defaultDigit = digit || 4;

    let _amount: BigNumber;

    try{
        if(typeof amount === "string" && AmountValidation(amount)) {
            _amount = new BigNumber(amount);
        } else if (typeof amount == "number") {
            _amount = new BigNumber(Math.trunc((amount || 0)*10**defaultDigit))
        } else {
            throw new Error("amount is out of exception");
        }

    }catch (e) {
        console.error(e);
    }
    return isConvertToString ? _amount.toFixed(defaultDigit) : _amount.toNumber();
};


export const TestAmountValidation = () => {
    const outcome: Record<string, any> = {};

    outcome.a = AmountValidation("123456789123456789.123456789123456789");

    console.log(outcome);
};

export const TestAmountFormat = () => {
    const outcome: Record<string, any> = {};
    outcome.a = AmountFormat({amount: "123456789123456789", isConvertToString: true});
    outcome.b = AmountFormat({amount: "123456789123456789.123456789", isConvertToString: true});
    outcome.c = AmountFormat({amount: "123456789123456789.123456789987654321", isConvertToString: true});
    outcome.d = AmountFormat({amount: "123456789123456789.123456789987654321", digit: 13, isConvertToString: true});
    outcome.f = AmountFormat({amount: "123456789123456789.123456789987654321", digit: 18, isConvertToString: true});

    console.log(outcome);
};