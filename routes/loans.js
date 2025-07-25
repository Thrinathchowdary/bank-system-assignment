// routes/loans.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let loans = [];
let payments = []; // 🔧 Add this!

router.post('/loans', (req, res) => {
  const { customer_id, loan_amount, loan_period, interest_rate } = req.body;

  if (!customer_id || !loan_amount || !loan_period || !interest_rate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const interest = loan_amount * loan_period * (interest_rate / 100);
  const total_amount_payable = loan_amount + interest;
  const monthly_emi = total_amount_payable / (loan_period * 12);

  const loan = {
    loan_id: uuidv4(),
    customer_id,
    principal: loan_amount,
    total_amount_payable,
    monthly_emi,
    created_at: new Date(),
  };

  loans.push(loan);

  res.status(201).json({
    loan_id: loan.loan_id,
    customer_id: loan.customer_id,
    total_amount_payable,
    monthly_emi,
  });
});

router.post('/loans/:loan_id/payments', (req, res) => {
  const { loan_id } = req.params;
  const { amount, payment_type } = req.body;

  const loan = loans.find(l => l.loan_id === loan_id);
  if (!loan) return res.status(404).json({ error: 'Loan not found' });

  const payment = {
    payment_id: uuidv4(),
    loan_id,
    amount,
    payment_type,
    date: new Date()
  };

  payments.push(payment);

  // Calculate remaining balance
  const totalPaid = payments
    .filter(p => p.loan_id === loan_id)
    .reduce((sum, p) => sum + p.amount, 0);
  const remaining = loan.total_amount_payable - totalPaid;
  const emis_left = Math.ceil(remaining / loan.monthly_emi);

  res.status(201).json({
    payment_id: payment.payment_id,
    loan_id,
    message: 'Payment recorded successfully.',
    remaining_balance: remaining,
    emis_left
  });
});

router.get('/loans/:loan_id/ledger', (req, res) => {
  const { loan_id } = req.params;

  const loan = loans.find(l => l.loan_id === loan_id);
  if (!loan) return res.status(404).json({ error: "Loan not found" });

  const loanPayments = payments.filter(p => p.loan_id === loan_id);
  const amountPaid = loanPayments.reduce((sum, p) => sum + p.amount, 0);
  const balance = loan.total_amount_payable - amountPaid;
  const emisLeft = Math.ceil(balance / loan.monthly_emi);

  res.json({
    loan_id,
    transactions: loanPayments,
    balance,
    monthly_emi: loan.monthly_emi,
    emis_left: emisLeft
  });
});

module.exports = router;
