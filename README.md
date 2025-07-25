# 💰 Bank System Assignment

A simple banking system built using Node.js and Express to simulate a loan management system for a bank. It supports lending money to customers, accepting payments, tracking transactions, and generating loan overviews.

## 🛠 Features

- **LEND**: Create a loan with principal, period, and interest.
- **PAYMENT**: Repay loans via EMI or lump sum.
- **LEDGER**: Get full loan transaction history.
- **ACCOUNT OVERVIEW**: See all loans, interest, balance, EMI left, etc.

## 📦 Tech Stack

- Node.js
- Express.js
- In-memory storage (no database for simplicity)

---

## 📌 API Endpoints

### 1. **LEND a Loan**

```http
POST /api/v1/loans

Body:

json

{
  "customer_id": "cust001",
  "loan_amount": 100000,
  "loan_period": 2,
  "interest_rate": 10
}
2. Make a PAYMENT

POST /api/v1/loans/:loan_id/payments
Body:

json

{
  "amount": 5000,
  "payment_type": "EMI"
}
3. Get Loan LEDGER

GET /api/v1/loans/:loan_id/ledger
Returns:

All payments

Current balance

Monthly EMI

EMIs left

4. ACCOUNT OVERVIEW (Optional)
http

GET /api/v1/customers/:customer_id/loans
Returns:

All loan summaries per customer.

Calculations
Interest (I) = P × N × R / 100

Total Amount (A) = P + I

EMI = A / (N × 12)

 How to Run

npm install
node server.js
Use curl, Postman, or Invoke-RestMethod (PowerShell) to test the endpoints.

 Folder Structure

bank-system-assignment/
├── server.js
├── routes/
│   ├── loans.js
│   └── payments.js
└── README.md
