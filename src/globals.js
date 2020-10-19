/**
 * Global stores
 * This file is used to initialize the global stores
 * And to use essential data throughout the application without parent-child and child-parent relation
 * @store {object} userInput - data based on user input
 * @store {object} loanType - currently selected loan type
 * @store {object} loanSettings - app basic data and settings. Fetched from API upon up initialization
*/ 

import { writable } from 'svelte/store';

export const userInput = writable(
    {
        loanAmount: 0,
        loanTerm: 1
    }
)

export const loanType = writable(undefined);

export const loanSettings = writable(undefined);