// Generate sample-accounting.csv — a messy, realistic SME dataset for Day 1 Session 4 (Dashboard 财).
// Run: node data/generate-sample-accounting.mjs
// Output: data/sample-accounting.csv (~2000 rows, 6 months, income + expenses, multi-category).
//
// Scenario: a Malaysian SME bakery/cafe chain — "Roti & Co" — 3 outlets, 6 months of transactions.
// Intentionally noisy: inconsistent descriptions, mixed payment methods, some typos — like real Excel.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const START = new Date('2025-10-01');
const MONTHS = 6;
const OUTLETS = ['SS15', 'Bangsar', 'Cheras'];

const INCOME_CATEGORIES = [
  { category: 'Sales - Dine In',   sub: ['Pastries', 'Coffee', 'Set Lunch', 'Cakes'],       min: 120, max: 2400 },
  { category: 'Sales - Takeaway',  sub: ['Pastries', 'Coffee', 'Bread Loaf'],                min: 40,  max: 900 },
  { category: 'Sales - Delivery',  sub: ['GrabFood', 'FoodPanda', 'ShopeeFood'],             min: 80,  max: 1600 },
  { category: 'Sales - Catering',  sub: ['Corporate Order', 'Event', 'Wedding'],             min: 600, max: 8500 },
  { category: 'Other Income',      sub: ['Merchandise', 'Gift Card', 'Workshop Ticket'],     min: 50,  max: 1200 },
];

const EXPENSE_CATEGORIES = [
  { category: 'COGS - Ingredients',  sub: ['Flour', 'Butter', 'Eggs', 'Coffee Beans', 'Sugar', 'Dairy'], min: 120, max: 3200 },
  { category: 'COGS - Packaging',    sub: ['Boxes', 'Bags', 'Cups', 'Stickers'],                          min: 80,  max: 900 },
  { category: 'Staff - Salary',      sub: ['Baker', 'Barista', 'Cashier', 'Manager'],                     min: 1500, max: 4800 },
  { category: 'Staff - OT',          sub: ['Weekend', 'Public Holiday', 'Extended Hours'],                min: 80,  max: 600 },
  { category: 'Rent',                sub: ['Shop Rental'],                                                min: 3500, max: 8500 },
  { category: 'Utilities',           sub: ['Electricity', 'Water', 'Internet', 'Gas'],                    min: 180,  max: 1400 },
  { category: 'Marketing',           sub: ['FB Ads', 'IG Ads', 'Flyers', 'Influencer'],                   min: 100,  max: 2500 },
  { category: 'Equipment',           sub: ['Oven Repair', 'New Fridge', 'POS Upgrade', 'Cutlery'],        min: 150,  max: 6500 },
  { category: 'Admin',               sub: ['Accountant Fee', 'SSM', 'Bank Charge', 'Stationery'],         min: 30,   max: 1200 },
  { category: 'Delivery Platforms',  sub: ['GrabFood Commission', 'FoodPanda Commission'],                min: 50,   max: 1400 },
];

const PAYMENT_METHODS = ['Cash', 'DuitNow', 'TnG eWallet', 'Credit Card', 'Bank Transfer', 'GrabPay'];

const NOTE_NOISE = [
  '', '', '', // most rows empty (realistic)
  'pending receipt',
  'urgent',
  'check w boss',
  'reimbursed',
  'sofi invoice',
  'dobule check',   // intentional typo
  'recurring',
  '',
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function pad(n) {
  return String(n).padStart(2, '0');
}
function fmtDate(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function round2(n) {
  return Math.round(n * 100) / 100;
}

const rows = [];
let txnId = 10001;

for (let m = 0; m < MONTHS; m++) {
  const monthStart = new Date(START);
  monthStart.setMonth(monthStart.getMonth() + m);
  const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();

  // Income: ~8-15 transactions per day per outlet
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), d);
    for (const outlet of OUTLETS) {
      const count = Math.floor(rand(8, 16));
      for (let i = 0; i < count; i++) {
        const cat = pick(INCOME_CATEGORIES);
        rows.push({
          date: fmtDate(date),
          txn_id: `T${txnId++}`,
          type: 'income',
          category: cat.category,
          subcategory: pick(cat.sub),
          description: `${outlet} - ${pick(cat.sub)}`,
          amount: round2(rand(cat.min, cat.max)),
          payment_method: pick(PAYMENT_METHODS),
          outlet,
          note: pick(NOTE_NOISE),
        });
      }
    }
  }

  // Expenses: variable cadence — rent once/month, salary monthly, COGS almost daily
  for (const outlet of OUTLETS) {
    // Rent (monthly)
    const rentDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), Math.floor(rand(1, 6)));
    rows.push({
      date: fmtDate(rentDate),
      txn_id: `T${txnId++}`,
      type: 'expense',
      category: 'Rent',
      subcategory: 'Shop Rental',
      description: `${outlet} rent ${rentDate.getFullYear()}-${pad(rentDate.getMonth() + 1)}`,
      amount: round2(rand(4500, 8000)),
      payment_method: 'Bank Transfer',
      outlet,
      note: 'recurring',
    });

    // Salary (monthly, multiple staff)
    const staffCount = Math.floor(rand(3, 7));
    for (let s = 0; s < staffCount; s++) {
      const salDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), 28);
      rows.push({
        date: fmtDate(salDate),
        txn_id: `T${txnId++}`,
        type: 'expense',
        category: 'Staff - Salary',
        subcategory: pick(['Baker', 'Barista', 'Cashier', 'Manager']),
        description: `${outlet} payroll`,
        amount: round2(rand(1800, 4500)),
        payment_method: 'Bank Transfer',
        outlet,
        note: '',
      });
    }

    // COGS + utilities + everything else (sprinkled across month)
    const noise = Math.floor(rand(35, 60));
    for (let i = 0; i < noise; i++) {
      const cat = pick(EXPENSE_CATEGORIES.filter(c => c.category !== 'Rent' && c.category !== 'Staff - Salary'));
      const day = Math.floor(rand(1, daysInMonth + 1));
      const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), day);
      rows.push({
        date: fmtDate(date),
        txn_id: `T${txnId++}`,
        type: 'expense',
        category: cat.category,
        subcategory: pick(cat.sub),
        description: `${outlet} - ${pick(cat.sub)}`,
        amount: round2(rand(cat.min, cat.max)),
        payment_method: pick(PAYMENT_METHODS),
        outlet,
        note: pick(NOTE_NOISE),
      });
    }
  }
}

// Sort chronologically (but not perfectly — real Excel is messy; leave some out of order).
rows.sort((a, b) => {
  if (Math.random() < 0.05) return 0; // 5% stay unsorted
  return a.date.localeCompare(b.date);
});

const headers = ['date', 'txn_id', 'type', 'category', 'subcategory', 'description', 'amount', 'payment_method', 'outlet', 'note'];
const csv = [
  headers.join(','),
  ...rows.map(r => headers.map(h => {
    const v = r[h] ?? '';
    const s = String(v);
    return s.includes(',') || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
  }).join(',')),
].join('\n');

const out = join(__dirname, 'sample-accounting.csv');
writeFileSync(out, csv);
console.log(`Wrote ${rows.length} rows to ${out}`);
