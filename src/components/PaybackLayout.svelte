<script>
    import {userInput, loanSettings} from '../globals.js';
    import {getPaybackPlan} from '../helpers/api-service.js';

    import SvelteTable from 'svelte-table';
    import Select from 'svelte-select';

    let loanType = $loanSettings.loanTypes[0];

    const columns = [
        {
            key: 'paymentNumber',
            title: 'Payment #',
            value: v => v.id,
            sortable: false
        },
        {
            key: 'roundedMonthlyPayment',
            title: 'Monthly payment',
            value: v => v.roundedMonthlyPayment,
            sortable: false
        },
        {
            key: 'roundedinterestPayment',
            title: 'Interest payment',
            value: v => v.roundedinterestPayment,
            sortable: false
        },
        {
            key: 'principlePayment',
            title: 'Principle payment',
            value: v => v.principlePayment,
            sortable: false
        },
        {
            key: 'remainingLoanAmount',
            title: 'Remaining loan amount',
            value: v => v.remainingLoanAmount,
            sortable: false
        }
    ]

    let showTable = false;

    let selectedValue = undefined;

    //let items = [{value: loanType.interestRate, label: `${loanType.typeLabel} (${loanType.interestRate}%)`}]

    $userInput.loanAmount = loanType.minLoanAmount;
    $userInput.loanTerm = loanType.minTerm;

    let paybackPlanPromise = getPaybackPlan(loanType.schema, loanType.interestRate);
    console.log(paybackPlanPromise);

    function calcClickHandler() {
        paybackPlanPromise = getPaybackPlan(loanType.schema, loanType.interestRate);
    }
    function showHandler() {
        showTable = !showTable;
    }
</script>

<style>
    /* your styles go here */
</style>

<input type=range min={loanType.minLoanAmount} max={loanType.maxLoanAmount} step="10000" bind:value={$userInput.loanAmount}>
<span>{$userInput.loanAmount}</span>

<input type=range min={loanType.minTerm} max={loanType.maxTerm} step="0.5" bind:value={$userInput.loanTerm}>
<span>{$userInput.loanTerm}</span>


<button on:click={calcClickHandler}>Calculate</button>
{#await paybackPlanPromise}
    <p>Calculating your monthly payment</p>
{:then paybackPlan}
    <Select items={$loanSettings.loanTypes} isClearable={false} bind:selectedValue={loanType}></Select>
    <span>Monthly payment: {paybackPlan[0].roundedMonthlyPayment}</span>
    <button on:click={showHandler}>{#if !showTable}Show payback plan{:else}Hide payback paln{/if}</button>
    {#if showTable}
        <SvelteTable columns="{columns}" rows="{paybackPlan}"></SvelteTable>
    {/if}
{/await}




