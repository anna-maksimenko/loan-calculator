import { writable } from 'svelte/store';

export const userInput = writable(
    {
        loanAmount: 0,
        loanTerm: 1
    }
)

export const loanSettings = writable(undefined);