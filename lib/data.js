export const transactions = [
  { id: 1,  date: "25 May 2026", from: "NexIT",      to: "ITCC",       amount: 33000, note: "Payment sent" },
  { id: 2,  date: "25 May 2026", from: "NexIT",      to: "T-Garden",   amount: 16000, note: "Amount owed" },
  { id: 3,  date: "25 May 2026", from: "Rohit",      to: "NexIT",      amount: 8400,  note: "Receivable" },
  { id: 4,  date: "25 May 2026", from: "Ashish",     to: "NexIT",      amount: 1000,  note: "Receivable" },
  { id: 5,  date: "25 May 2026", from: "Brij",       to: "NexIT",      amount: 15000, note: "Receivable" },
  { id: 6,  date: "28 May 2026", from: "Rohit",      to: "NexIT",      amount: 3000,  note: "Partial payment received" },
  { id: 7,  date: "28 May 2026", from: "Rohit",      to: "NexIT",      amount: 2000,  note: "Partial payment received" },
  { id: 8,  date: "28 May 2026", from: "Cyber Forte",to: "T-Garden",   amount: 16000, note: "Paid on behalf of NexIT" },
  { id: 9,  date: "29 May 2026", from: "ITCC",       to: "NexIT",      amount: 33000, note: "Full payment received" },
  { id: 10, date: "29 May 2026", from: "NexIT",      to: "ITCC",       amount: 44000, note: "New payment sent" },
  { id: 11, date: "29 May 2026", from: "T-Garden",   to: "NexIT",      amount: 22000, note: "Payment received" },
  { id: 12, date: "29 May 2026", from: "T-Garden",   to: "NexIT",      amount: 6000,  note: "Payment received" },
];

export const netPositions = [
  { party: "ITCC",       direction: "Owes NexIT",   original: 77000, settled: 33000, balance: 44000, status: "pending" },
  { party: "T-Garden",   direction: "Paid NexIT",   original: 28000, settled: 28000, balance: 0,     status: "cleared" },
  { party: "Rohit",      direction: "Owes NexIT",   original: 8400,  settled: 5000,  balance: 3400,  status: "pending" },
  { party: "Ashish",     direction: "Owes NexIT",   original: 1000,  settled: 0,     balance: 1000,  status: "pending" },
  { party: "Brij",       direction: "Owes NexIT",   original: 15000, settled: 0,     balance: 15000, status: "pending" },
  { party: "Cyber Forte",direction: "NexIT Owes",   original: 16000, settled: 0,     balance: 16000, status: "payable" },
];

export const totalReceivables = netPositions
  .filter((p) => p.direction !== "NexIT Owes")
  .reduce((sum, p) => sum + p.balance, 0);

export const totalPayables = netPositions
  .filter((p) => p.direction === "NexIT Owes")
  .reduce((sum, p) => sum + p.balance, 0);

export const netPosition = totalReceivables - totalPayables;
