export const LOAN_TYPES = [
    {
        label: 'Home mortgage (3.5%)',
        value: 'mortgage_higher_rate',
        interestRate: 3.5,
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
        schema: 'amort',
        minLoanAmount: 10000,
        maxLoanAmount: 20000000,
        minTerm: 2.5,
        maxTerm: 40,
    }
]