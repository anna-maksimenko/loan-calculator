<script>
    import axios from 'axios';

    import {userInput, loanSettings} from '../globals.js'

    const loanType = $loanSettings.loanTypes[0];

    $userInput.loanAmount = loanType.minLoanAmount;
    $userInput.loanTerm = loanType.minTerm;

    let paybackPlanPromise = getPaybackPlan();

    async function getPaybackPlan() {
        const request = await axios({
			url: `/api/calc${$loanSettings.loanSchemas[loanType.schema].endpoint}`,
            method: 'post',
            data: {
                amount: $userInput.loanAmount,
                term: $userInput.loanTerm,
                rate: loanType.interestRate
            }
        })
        const response = await request;

 		if (response.status === 200 && response.hasOwnProperty('data') && !response.data.hasOwnProperty('error')) {
			return response.data;
		} else {
			throw new Error((response.hasOwnProperty('data') && response.data.hasOwnProperty('error')) ? response.data.error : 'Request error');
		} 
    }

    function calcClickHandler() {
        paybackPlanPromise = getPaybackPlan();
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


