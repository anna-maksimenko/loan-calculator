import { writable } from 'svelte/store';

export const userInput = writable(
    {
        loanAmount: 0,
        loanTerm: 1
    }
)

export const loanType = writable(undefined);

export const loanSettings = writable(undefined);