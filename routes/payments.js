// routes/payments.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let payments = [];
let loans = require('./loans').loans; // Use shared loan data

// POST /loans/:loan_id/payments
router.post('/loans/:loan_id/payments', (req, res) => {
  const loanId = req.params.loan_id;
  const { amount, payment_type } = req.body;

  const loan = loans.find(l => l.loan_id === loanId);
  if (!loan) {
    return res.status(404).json({ error: 'Loan not found' });
  }

  // Deduct payment from balance
  loan.total_amount_payable -= amount;

  // Recalculate EMIs left
  loan.emis_left = Math.ceil(loan.total_amount_payable / loan.monthly_emi);

  const payment = {
    payment_id: uuidv4(),
    loan_id: loanId,
    amount,
    payment_type,
    payment_date: new Date().toISOString()
  };

  payments.push(payment);

  res.status(200).json({
    payment_id: payment.payment_id,
    loan_id: loanId,
    message: 'Payment recorded successfully.',
    remaining_balance: loan.total_amount_payable,
    emis_left: loan.emis_left
  });
});

module.exports = router;
module.exports.payments = payments;
