<script>
    import {userInput, loanSettings} from '../globals.js'

    const loanType = $loanSettings.loanTypes[0];

    $userInput.loanAmount = loanType.minLoanAmount;
    $userInput.loanTerm = loanType.minTerm;

     

    function calcPaybackPlan(loanAmount, loanTerm, loanInterestRate) {

        const periodicIntRate = (loanInterestRate / 12) / 100;
        const totalPaymentCount =  loanTerm * 12;
        const poweredInterestRate = Math.pow(periodicIntRate + 1, totalPaymentCount);
        
        const monthlyPayment = loanAmount * (( periodicIntRate * poweredInterestRate ) / (poweredInterestRate - 1 ));
        const roundedmonthlyPayment = Math.ceil(monthlyPayment * 100) / 100;


        let remainingLoanAmount = loanAmount;
        let paybackPlan = [];

        while (remainingLoanAmount > 0) {
            const interestPayment = remainingLoanAmount * periodicIntRate;
            const roundedinterestPayment = Math.ceil(interestPayment * 100) / 100;
            const principlePayment = roundedmonthlyPayment - roundedinterestPayment;

            if (remainingLoanAmount < principlePayment) {
                remainingLoanAmount -= remainingLoanAmount;
            } else {
                remainingLoanAmount -= principlePayment;
            }
            
            paybackPlan = [...paybackPlan, {
                roundedmonthlyPayment, 
                roundedinterestPayment, 
                principlePayment,
                remainingLoanAmount
            }];
        }

        return paybackPlan;
    }

    $: paybackPlanResult = calcPaybackPlan($userInput.loanAmount, $userInput.loanTerm, loanType.interestRate);

    $: {
        console.log(paybackPlanResult);
    }

</script>

<style>
    /* your styles go here */
</style>

<input type=range min={loanType.minLoanAmount} max={loanType.maxLoanAmount} step="10000" bind:value={$userInput.loanAmount}>
<span>{$userInput.loanAmount}</span>

<input type=range min={loanType.minTerm} max={loanType.maxTerm} step="0.5" bind:value={$userInput.loanTerm}>
<span>{$userInput.loanTerm}</span>

<span>Monthly payment: {paybackPlanResult[0].roundedmonthlyPayment}</span>


