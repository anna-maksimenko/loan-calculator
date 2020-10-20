/**
 * Amortization schema calculation logic
 * This file contains backend logic for amortization schema payback plan calculations based on provided input
 * This logic has an API interface for processing basic requests and giving appropriate responses
 * @param {number} amount - number representing total loan amount to calculate. Integer is expected 
 * @param {number} term - number representing the whole period of loan in years (respects values between 0.25 and 60)
 * @param {number} rate - number representing annual interest rate in % (respects values less than 1000)
*/ 


/**
 * calcPaybackPlan 
 * This function calculates loan payback plan based on amortization schema 
 * @param {number} loanAmount - number representing total loan amount to calculate. Integer is expected 
 * @param {number} loanTerm - number representing the whole period of loan in years (respects values between 0.25 and 60)
 * @param {number} loanInterestRate - number representing annual interest rate in % (respects values less than 1000)
 * @return {object} { paybackPlan, loanAmount, loanTerm, loanInterestRate } - object containing payback plan array and loan related info
*/ 

function calcPaybackPlan(loanAmount, loanTerm, loanInterestRate) {
    const periodicIntRate = (loanInterestRate / 12) / 100;
    const totalPaymentCount = loanTerm * 12;
    const poweredInterestRate = Math.pow(periodicIntRate + 1, totalPaymentCount);

    const monthlyPayment = loanAmount * ((periodicIntRate * poweredInterestRate) / (poweredInterestRate - 1));
    const roundedMonthlyPayment = Math.ceil(monthlyPayment * 100) / 100;

    let remainingLoanAmount = loanAmount;
    let paybackPlan = [];
    let roundedInterestPaymentTotal = 0;

    while (remainingLoanAmount > 0) {
        let paymentObject;
        const interestPayment = remainingLoanAmount * periodicIntRate;
        const roundedInterestPayment = Math.ceil(interestPayment * 100) / 100; 
        const lastMonth = (roundedMonthlyPayment - (remainingLoanAmount + roundedInterestPayment - 5)) > 0 // If last month payment is less than 5 we assume that it will be included in current month as the way to prevent super small payments
        roundedInterestPaymentTotal = roundedInterestPaymentTotal + roundedInterestPayment;
        
        if (lastMonth) { 
            // Special case for last month payment to prevent calculation inconsistencies  
            paymentObject = {
                id: paybackPlan.length + 1,
                roundedMonthlyPayment: Math.ceil((remainingLoanAmount + roundedInterestPayment) * 100) / 100,
                roundedInterestPayment,
                principlePayment: remainingLoanAmount,
                remainingLoanAmount: 0
            }
            remainingLoanAmount = 0;
        } else {
            const principlePayment = Math.floor((roundedMonthlyPayment - roundedInterestPayment) * 100) / 100;
            remainingLoanAmount = parseFloat((remainingLoanAmount - principlePayment).toFixed(2));
            paymentObject = {
                id: paybackPlan.length + 1,
                roundedMonthlyPayment,
                roundedInterestPayment,
                principlePayment,
                remainingLoanAmount
            }
        }
        
        paybackPlan = [...paybackPlan, paymentObject];
    }
    roundedInterestPaymentTotal = Math.round(roundedInterestPaymentTotal * 100) / 100;

    return {
        paybackPlan,
        loanAmount,
        loanTerm,
        loanInterestRate,
        roundedInterestPaymentTotal
    };
}

function isPositiveNumber(value) {
    return typeof value === 'number' && !isNaN(value) && value > 0;
}

// For discription and expected request data, please, see L.1
module.exports = async (req, res) => {
    const payLoad = req.body;

    if (payLoad.hasOwnProperty('amount') && isPositiveNumber(payLoad.amount) && 
        payLoad.hasOwnProperty('term') && isPositiveNumber(payLoad.term) && payLoad.term >= 0.25 && payLoad.term < 60 &&
        payLoad.hasOwnProperty('rate') && isPositiveNumber(payLoad.rate) && payLoad.rate < 1000
        ) {
        const response = await calcPaybackPlan(payLoad.amount, payLoad.term, payLoad.rate);
        res.json(response);
        console.log("Success");
    } else {
        console.log('Error: incorrect parameters');
        res.json({error: 'Incorrect parameters'});
    }
}