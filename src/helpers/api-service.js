/**
 * API service helpers
 * This file contains reusable logic for making API calls via axios and handling responses
 * Consists of two major parts: generic API functions and request specific functions
*/ 

import axios from 'axios';
import { get } from 'svelte/store';

import {loanSettings, userInput} from '../globals.js';

// Generic API call related functions
async function apiRequest(options, callback) {
    const request = await axios(options);
    const response = await request;

    return responseHandler(response, callback);
}

function responseHandler(response, callback) {
 	if (response.status === 200 && response.hasOwnProperty('data') && !response.data.hasOwnProperty('error')) {
        if (callback !== undefined) {
            callback(response);
        }

        return response.data;
 	} else {
 	    throw new Error((response.hasOwnProperty('data') && response.data.hasOwnProperty('error')) ? response.data.error : 'Request error');
 	}
}

//Request specific functions
export async function getSettings() {
    return apiRequest({url: '/api/settings', method: 'get'}, (response) => {loanSettings.set(response.data)});
}

export async function getPaybackPlan(schema, interestRate) {
    const inputData = get(userInput);

    return apiRequest({
        url: `/api/calc${get(loanSettings).loanSchemas[schema].endpoint}`,
        method: 'post',
        data: {
            amount: inputData.loanAmount,
            term: inputData.loanTerm,
            rate: interestRate
        }
    });
}
