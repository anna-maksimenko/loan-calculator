import { LOAN_TYPES } from './_loanTypes.js';
import { LOAN_SCHEMAS } from './_loanSchemas.js';

module.exports = async (req, res) => {
    const response = {
        loanTypes: LOAN_TYPES,
        loanSchemas: LOAN_SCHEMAS
    }
    res.json(response);
}


