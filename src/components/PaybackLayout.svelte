<script>
	/**
	 * This component serves as layout container, requests payback plan calculation from API based on user input and renders the response as summary including payback plan table
	 */
    import {userInput, loanSettings, loanType} from '../globals.js';
    import {getPaybackPlan} from '../helpers/api-service.js';
    import {splitByThousands} from '../helpers/math-helpers.js';

    import SvelteTable from 'svelte-table';
    import Select from 'svelte-select';
    import Form from './Form.svelte';

    $loanType = $loanSettings.loanTypes[0];

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
            value: v => splitByThousands(v.roundedMonthlyPayment),
            sortable: false
        },
        {
            key: 'roundedInterestPayment',
            title: 'Interest payment',
            value: v => splitByThousands(v.roundedInterestPayment),
            sortable: false
        },
        {
            key: 'principlePayment',
            title: 'Principle payment',
            value: v => splitByThousands(v.principlePayment),
            sortable: false
        },
        {
            key: 'remainingLoanAmount',
            title: 'Remaining loan amount',
            value: v => splitByThousands(v.remainingLoanAmount),
            sortable: false
        }
    ]

    let showTable = false;

    $userInput.loanAmount = $loanType.minLoanAmount;
    $userInput.loanTerm = $loanType.minTerm;

    let paybackPlanPromise = getPaybackPlan($loanType.schema, $loanType.interestRate);

    function calcClickHandler() {
        paybackPlanPromise = getPaybackPlan($loanType.schema, $loanType.interestRate);
        showTable = false;
    }
    function showHandler() {
        showTable = !showTable;
    }
</script>

<style type="text/less">
    .calculator{
        @apply flex flex-col px-2;
        @media (min-width: 1152px) {
            @apply flex-row;
        }
        @media (min-width: 640px) {
            @apply p-4;
        }
        .calculator-inputs{
            @apply w-full;
            flex-basis: 100%;
            @media (min-width: 1152px) {
                @apply w-2/5;
                flex-basis: 40%;
            }
        }
        .calculator-inputs-container, .summary{
            @apply flex flex-col flex-1 text-gray-700 text-center bg-gray-400 px-4 py-4 m-2 rounded;
            .submit-btn{
                @apply py-4 mt-auto;
                button{
                    @apply bg-purple-500 text-white py-2 px-4 rounded;
                    &:focus{
                        @apply outline-none;
                    }
                }
            }
            @media (min-width: 640px) {
                @apply px-2;
            }
        }
        .summary{
            @apply overflow-hidden;
            max-height: calc(100vh - 120px);
            .summary-loan-info p{
                //@apply font-bold;
            }
            .summary-point-container{
                @apply flex flex-wrap;
                .summary-point{
                    @apply flex-grow-0 flex-shrink-0;
                    @media (min-width: 475px) {
                        @apply w-1/2;
                    }
                }
            }
        }
    }
    .summary-table{
        @apply overflow-y-auto relative;
        :global(thead){
            @apply border-none;
        }
        :global(th){
            @apply bg-white border-gray-800 sticky top-0;
        }
        :global(tr:nth-child(even)){
            @apply bg-gray-200;
        }
        :global(td, th){
            @apply text-xs border-none;
            @media (min-width: 640px) {
                @apply text-base;
            }
        }
    }
    .caption{
        @apply font-bold py-4;
    }
</style>

<div class="calculator ">

    <div class="calculator-inputs">
        <div class="calculator-inputs-container">
            <p class="caption">Loan settings:</p>
            <Form/>
            <div class="submit-btn">
                <button on:click={calcClickHandler}>Calculate</button>
            </div>
        </div>
    </div>

    <div class="summary">
        {#await paybackPlanPromise}
            <p>Calculating your monthly payment...</p>
        {:then paybackEstimation}
            <div class="summary-loan-info">
                <p class="caption">Summary:</p>
                <div class="summary-point-container">
                    <div class="summary-point">Loan amount: {splitByThousands(paybackEstimation.loanAmount)} {$loanType.currency}</div>
                    <div class="summary-point">Loan term: {paybackEstimation.loanTerm} years</div>
                    <div class="summary-point">Interest rate: {paybackEstimation.loanInterestRate}%</div>
                    <div class="summary-point">Monthly payment: {splitByThousands(paybackEstimation.paybackPlan[0].roundedMonthlyPayment)} {$loanType.currency}</div>
                    <div class="summary-point">Loan interest cost: {splitByThousands(paybackEstimation.roundedInterestPaymentTotal)} {$loanType.currency}</div>
                    <div class="summary-point">Total cost: {splitByThousands(paybackEstimation.roundedInterestPaymentTotal + paybackEstimation.loanAmount)} {$loanType.currency}</div>
                </div>
            </div>
            <div class="submit-btn">
                <button on:click={showHandler}>{#if !showTable}Show payback plan{:else}Hide payback paln{/if}</button>
            </div>
            {#if showTable}
                <div class="summary-table">
                    <SvelteTable columns="{columns}" rows="{paybackEstimation.paybackPlan}"></SvelteTable>
                </div>
            {/if}
        {/await}
    </div>
</div>








