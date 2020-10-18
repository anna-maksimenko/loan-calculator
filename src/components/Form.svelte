<script>
    import {userInput, loanSettings, loanType} from '../globals.js';

    import Select from 'svelte-select';
    import RangeInput from './shared/RangeInput.svelte';
</script>

<style type="text/less">
    .loan-select{
        @apply py-2;
    }
</style>

<form id="loan-settings">
    <RangeInput name="loan-amount-input" labelText="Loan amount" min={$loanType.minLoanAmount} max={$loanType.maxLoanAmount} step="10000" bind:value={$userInput.loanAmount} outputText={`${$userInput.loanAmount} ${$loanType.currency}`}/>

    <RangeInput name="loan-term-input" labelText="Loan term" min={$loanType.minTerm} max={$loanType.maxTerm} step="0.5" bind:value={$userInput.loanTerm} outputText={`${$userInput.loanTerm} years`}/>

    <div class="loan-select">
        <Select items={$loanSettings.loanTypes} isClearable={false} bind:selectedValue={$loanType}></Select>
    </div>
</form>