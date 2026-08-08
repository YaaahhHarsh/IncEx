export const DEFAULT_USER = {
  name: "Alex Morgan",
  email: "alex.morgan@gmail.com",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  currency: "₹",
  currencyCode: "INR",
  joinDate: "2026-01-15",
  budgetLimit: 45000,
  alertThreshold: 85,
  pinEnabled: false,
  pinCode: "1234",
  notifications: true
};

export const CATEGORIES = {
  INCOME: [
    { id: "salary", name: "Salary", icon: "briefcase", color: "#10B981" },
    { id: "investment_income", name: "Investment Yield", icon: "trending-up", color: "#059669" },
    { id: "freelance", name: "Freelance", icon: "laptop", color: "#34D399" },
    { id: "business", name: "Business", icon: "building", color: "#047857" },
    { id: "bonus", name: "Bonus & Rewards", icon: "gift", color: "#6EE7B7" },
    { id: "other_income", name: "Other Income", icon: "plus-circle", color: "#A7F3D0" }
  ],
  EXPENSE: [
    { id: "food", name: "Food & Dining", icon: "utensils", color: "#EF4444" },
    { id: "rent", name: "Rent & Housing", icon: "home", color: "#F59E0B" },
    { id: "shopping", name: "Shopping", icon: "shopping-bag", color: "#8B5CF6" },
    { id: "utilities", name: "Utilities & Bills", icon: "zap", color: "#3B82F6" },
    { id: "transport", name: "Travel & Transport", icon: "car", color: "#06B6D4" },
    { id: "entertainment", name: "Entertainment", icon: "film", color: "#EC4899" },
    { id: "health", name: "Health & Fitness", icon: "heart-pulse", color: "#14B8A6" },
    { id: "education", name: "Education", icon: "book-open", color: "#6366F1" },
    { id: "other_expense", name: "Misc Expense", icon: "more-horizontal", color: "#64748B" }
  ],
  INVESTMENT: [
    { id: "stocks", name: "Stocks & Equities", icon: "line-chart", color: "#059669" },
    { id: "mutual_funds", name: "Mutual Funds / SIP", icon: "pie-chart", color: "#10B981" },
    { id: "crypto", name: "Crypto Assets", icon: "bitcoin", color: "#34D399" },
    { id: "real_estate", name: "Real Estate REITs", icon: "landmark", color: "#047857" },
    { id: "gold", name: "Gold & Commodities", icon: "coins", color: "#F59E0B" },
    { id: "savings_deposit", name: "Fixed Deposit / FD", icon: "shield-check", color: "#0D9488" }
  ]
};

export const DEFAULT_CATEGORY_BUDGETS = {
  food: 12000,
  rent: 18000,
  shopping: 8000,
  utilities: 4000,
  transport: 3500,
  entertainment: 3000,
  health: 2500,
  other_expense: 2000
};

export const INITIAL_TRANSACTIONS = [
  {
    id: "tx-101",
    type: "income",
    category: "salary",
    categoryName: "Salary",
    amount: 75000,
    date: "2026-08-01",
    time: "09:00",
    paymentMethod: "Bank Transfer",
    notes: "Monthly salary payout",
    status: "completed"
  },
  {
    id: "tx-102",
    type: "investment",
    category: "mutual_funds",
    categoryName: "Mutual Funds / SIP",
    amount: 15000,
    date: "2026-08-01",
    time: "10:30",
    paymentMethod: "Bank Transfer",
    notes: "Monthly Index Fund SIP",
    status: "completed"
  },
  {
    id: "tx-103",
    type: "expense",
    category: "rent",
    categoryName: "Rent & Housing",
    amount: 18000,
    date: "2026-08-01",
    time: "12:00",
    paymentMethod: "Bank Transfer",
    notes: "Apartment rent",
    status: "completed"
  },
  {
    id: "tx-104",
    type: "expense",
    category: "food",
    categoryName: "Food & Dining",
    amount: 2450.00,
    date: "2026-08-02",
    time: "13:15",
    paymentMethod: "UPI / Online",
    notes: "Organic grocery shopping",
    status: "completed"
  },
  {
    id: "tx-105",
    type: "expense",
    category: "shopping",
    categoryName: "Shopping",
    amount: 6800.00,
    date: "2026-08-02",
    time: "15:45",
    paymentMethod: "Credit Card",
    notes: "Ergonomic chair",
    status: "completed"
  },
  {
    id: "tx-106",
    type: "income",
    category: "freelance",
    categoryName: "Freelance",
    amount: 18500.00,
    date: "2026-07-28",
    time: "16:20",
    paymentMethod: "UPI / Online",
    notes: "UI Design client payout",
    status: "completed"
  },
  {
    id: "tx-107",
    type: "expense",
    category: "utilities",
    categoryName: "Utilities & Bills",
    amount: 3200.00,
    date: "2026-07-27",
    time: "11:00",
    paymentMethod: "UPI / Online",
    notes: "Electricity + Fiber internet",
    status: "completed"
  },
  {
    id: "tx-108",
    type: "investment",
    category: "stocks",
    categoryName: "Stocks & Equities",
    amount: 10000.00,
    date: "2026-07-25",
    time: "09:15",
    paymentMethod: "Bank Transfer",
    notes: "Nifty 50 shares investment",
    status: "completed"
  }
];

export const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80"
];
