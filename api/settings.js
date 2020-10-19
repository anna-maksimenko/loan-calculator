/**
 * API that returns basic app settings and initialization data
 * This API doesn't expect any request parameters and simply returns data for application
 * @response {object} { loanTypes, loanSchemas } - object containing expected app data and settings
*/ 

import { LOAN_TYPES } from './_loanTypes.js';
import { LOAN_SCHEMAS } from './_loanSchemas.js';

module.exports = async (req, res) => {
    const response = {
        loanTypes: LOAN_TYPES,
        loanSchemas: LOAN_SCHEMAS
    }
    res.json(response);
}


