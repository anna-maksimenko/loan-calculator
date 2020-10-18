<script>
    import {userInput, loanSettings} from '../globals.js';
    import {getPaybackPlan} from '../helpers/api-service.js';

    const loanType = $loanSettings.loanTypes[0];

    $userInput.loanAmount = loanType.minLoanAmount;
    $userInput.loanTerm = loanType.minTerm;

    let paybackPlanPromise = getPaybackPlan(loanType.schema, loanType.interestRate);

    function calcClickHandler() {
        paybackPlanPromise = getPaybackPlan(loanType.schema, loanType.interestRate);
    }

</script>

<style>
    /* your styles go here */
</style>

<input type=range min={loanType.minLoanAmount} max={loanType.maxLoanAmount} step="10000" bind:value={$userInput.loanAmount}>
<span>{$userInput.loanAmount}</span>

<input type=range min={loanType.minTerm} max={loanType.maxTerm} step="0.5" bind:value={$userInput.loanTerm}>
<span>{$userInput.loanTerm}</span>

{#await paybackPlanPromise}
    <p>Calculating your monthly payment</p>
{:then paybackPlan}
    <span>Monthly payment: {paybackPlan[0].roundedMonthlyPayment}</span>
{/await}
<button on:click={calcClickHandler}>Calculate</button>


