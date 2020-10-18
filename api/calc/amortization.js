function calcPaybackPlan(loanAmount, loanTerm, loanInterestRate) {

    const periodicIntRate = (loanInterestRate / 12) / 100;
    const totalPaymentCount = loanTerm * 12;
    const poweredInterestRate = Math.pow(periodicIntRate + 1, totalPaymentCount);

    const monthlyPayment = loanAmount * ((periodicIntRate * poweredInterestRate) / (poweredInterestRate - 1));
    const roundedMonthlyPayment = Math.ceil(monthlyPayment * 100) / 100;


    let remainingLoanAmount = loanAmount;
    let paybackPlan = [];

    while (remainingLoanAmount > 0) {
        let paymentObject;
        const interestPayment = remainingLoanAmount * periodicIntRate;
        const roundedinterestPayment = Math.ceil(interestPayment * 100) / 100;
        const lastMonth = (roundedMonthlyPayment - (remainingLoanAmount + roundedinterestPayment - 5)) > 0
        
        if (lastMonth) {   
            paymentObject = {
                id: paybackPlan.length + 1,
                roundedMonthlyPayment: Math.ceil((remainingLoanAmount + roundedinterestPayment) * 100) / 100,
                roundedinterestPayment,
                principlePayment: remainingLoanAmount,
                remainingLoanAmount: 0
            }
            remainingLoanAmount = 0;
        } else {
            const principlePayment = Math.floor((roundedMonthlyPayment - roundedinterestPayment) * 100) / 100;
            remainingLoanAmount = parseFloat((remainingLoanAmount - principlePayment).toFixed(2));
            paymentObject = {
                id: paybackPlan.length + 1,
                roundedMonthlyPayment,
                roundedinterestPayment,
                principlePayment,
                remainingLoanAmount
            }
        }
        
        paybackPlan = [...paybackPlan, paymentObject];
    }

    return {
        paybackPlan,
        loanAmount,
        loanTerm,
        loanInterestRate
    };

}

function isPositiveNumber(value) {
    return typeof value === 'number' && !isNaN(value) && value > 0;
}

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