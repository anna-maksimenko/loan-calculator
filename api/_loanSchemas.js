/**
 * Predifined loan schemas
 * All information related to used loan schemas (endpoint to request calculation from, label, any needed data to be added)
 * Loan types (_loanTypes.js) and loan schemas (_loanSchemas.js) are handed down in 2 different files for scalability
 * E.g. if in the future it will be needed to calculate payback plan based on same loan type but different schemas
 * @constant {object} LOAN_SCHEMAS - object with schema type named props containig schema related information
*/ 

export const LOAN_SCHEMAS = {
    amort: {
        label: 'Amortization schema',
        endpoint: '/amortization'
    }
}