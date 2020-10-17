import { writable, readable } from 'svelte/store';


export const userInput = writable(
    {
        loanAmount: 0,
        loanTerm: 1
    }
)


export const loanSettings = readable({
    loanTypes: [
        {
            typeLabel: 'Home mortgage',
            type: 'mortgage',
            interestRate: 3.5,
            schema: 'amortization',
            minLoanAmount: 10000,
            maxLoanAmount: 20000000,
            minTerm: 2.5,
            maxTerm: 40
        }
    ],
    loanSchemas: {
        amortization: {
            label: 'Amortization schema',
            endpoint: '/amort'
        }
    }
})




