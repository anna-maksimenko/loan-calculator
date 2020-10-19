/**
 * Predifined loan types
 * All information related to selectable loan types
 * Loan types (_loanTypes.js) and loan schemas (_loanSchemas.js) are handed down in 2 different files for scalability
 * E.g. if in the future it will be needed to calculate payback plan based on same loan type but different schemas
 * @constant {array} LOAN_TYPES - array of data and settings for selectable loans to be used for app setup and fuctionality
*/ 

export const LOAN_TYPES = [
    {
        label: 'Home mortgage (3.5%)',
        value: 'mortgage_higher_rate',
        interestRate: 3.5,
        currency: 'NOK',
        schema: 'amort',
        minLoanAmount: 10000,
        maxLoanAmount: 20000000,
        minTerm: 2.5,
        maxTerm: 40,
    },
    {
        label: 'Home mortgage (2%)',
        value: 'mortgage_lower_rate',
        interestRate: 2,
        currency: 'NOK',
        schema: 'amort',
        minLoanAmount: 10000,
        maxLoanAmount: 20000000,
        minTerm: 2.5,
        maxTerm: 40,
    }
]