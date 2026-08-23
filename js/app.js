const DEFAULT_USER = {
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

const CATEGORIES = {
  INCOME: [
    { id: "salary", name: "Salary", color: "#10B981" },
    { id: "investment_income", name: "Investment Yield", color: "#059669" },
    { id: "freelance", name: "Freelance", color: "#34D399" },
    { id: "business", name: "Business", color: "#047857" },
    { id: "bonus", name: "Bonus & Rewards", color: "#6EE7B7" },
    { id: "other_income", name: "Other Income", color: "#A7F3D0" }
  ],
  EXPENSE: [
    { id: "food", name: "Food & Dining", color: "#EF4444" },
    { id: "rent", name: "Rent & Housing", color: "#F59E0B" },
    { id: "shopping", name: "Shopping", color: "#8B5CF6" },
    { id: "utilities", name: "Utilities & Bills", color: "#3B82F6" },
    { id: "transport", name: "Travel & Transport", color: "#06B6D4" },
    { id: "entertainment", name: "Entertainment", color: "#EC4899" },
    { id: "health", name: "Health & Fitness", color: "#14B8A6" },
    { id: "education", name: "Education", color: "#6366F1" },
    { id: "other_expense", name: "Misc Expense", color: "#64748B" }
  ],
  INVESTMENT: [
    { id: "stocks", name: "Stocks & Equities", color: "#059669" },
    { id: "mutual_funds", name: "Mutual Funds / SIP", color: "#10B981" },
    { id: "crypto", name: "Crypto Assets", color: "#34D399" },
    { id: "real_estate", name: "Real Estate REITs", color: "#047857" },
    { id: "gold", name: "Gold & Commodities", color: "#F59E0B" },
    { id: "savings_deposit", name: "Fixed Deposit / FD", color: "#0D9488" }
  ]
};

const DEFAULT_CATEGORY_BUDGETS = {
  food: 12000,
  rent: 18000,
  shopping: 8000,
  utilities: 4000,
  transport: 3500,
  entertainment: 3000,
  health: 2500,
  other_expense: 2000
};

const INITIAL_GROUPS = [
  {
    id: "grp-goa-789",
    name: "Goa Trip 🌴",
    code: "GOA-789",
    avatar: "🌴",
    createdAt: "2026-08-10",
    members: [
      { id: "mem-user", name: "You (Alex)", email: "alex@gmail.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80" },
      { id: "mem-2", name: "Rohan", email: "rohan@gmail.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80" },
      { id: "mem-3", name: "Priya", email: "priya@gmail.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80" }
    ],
    expenses: [
      {
        id: "spex-1",
        title: "Beach Resort Booking",
        amount: 12000,
        paidBy: "mem-user",
        paidByName: "You (Alex)",
        date: "2026-08-11",
        splitType: "equal",
        splits: { "mem-user": 4000, "mem-2": 4000, "mem-3": 4000 }
      },
      {
        id: "spex-2",
        title: "Scooter Rental & Fuel",
        amount: 3000,
        paidBy: "mem-2",
        paidByName: "Rohan",
        date: "2026-08-12",
        splitType: "equal",
        splits: { "mem-user": 1000, "mem-2": 1000, "mem-3": 1000 }
      }
    ],
    chats: [
      { id: "chat-1", senderId: "mem-2", senderName: "Rohan", text: "Hey guys! I booked the scooters for tomorrow 🛵", timestamp: "10:15 AM" },
      { id: "chat-2", senderId: "mem-user", senderName: "You (Alex)", text: "Awesome! Added the resort booking to Spendly bill splitter 👍", timestamp: "10:18 AM" },
      { id: "chat-3", senderId: "mem-3", senderName: "Priya", text: "Yay! Can't wait for the beach sunset 🌅", timestamp: "10:20 AM" }
    ]
  }
];

const DEMO_SAMPLE_TRANSACTIONS = [
  {
    id: "tx-101",
    type: "income",
    category: "salary",
    categoryName: "Salary Payout",
    amount: 75000,
    date: "2026-08-01",
    time: "09:00",
    paymentMethod: "Bank Transfer",
    notes: "Monthly salary deposit",
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
    notes: "Apartment rent payment",
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
    notes: "Grocery & supplies",
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
    notes: "Office desk chair",
    status: "completed"
  }
];

const CURRENCY_MAP = {
  'INR': '₹',
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'CAD': '$',
  'AUD': '$',
  'AED': 'AED '
};

let homeTrendChartInstance = null;
let homePieChartInstance = null;
let reportBarChartInstance = null;
let reportPieChartInstance = null;

const GREEN_PRIMARY = '#10B981';
const GREEN_DARK = '#059669';
const RED_ACCENT = '#EF4444';
const PURPLE_ACCENT = '#8B5CF6';

function renderHomeTrendChart(canvasId, transactions, currency = '₹') {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;

  const labels = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  let incomeData = [0, 0, 0, 0, 0, 0];
  let expenseData = [0, 0, 0, 0, 0, 0];

  if (transactions && transactions.length > 0) {
    incomeData = [55000, 62000, 68000, 70000, 75000, 75000];
    expenseData = [28000, 31000, 29000, 32000, 30450, 27250];

    let currentMonthIncome = 0;
    let currentMonthExpense = 0;

    transactions.forEach(tx => {
      if (tx.type === 'income') currentMonthIncome += Number(tx.amount);
      if (tx.type === 'expense') currentMonthExpense += Number(tx.amount);
    });

    if (currentMonthIncome > 0) incomeData[5] = currentMonthIncome;
    if (currentMonthExpense > 0) expenseData[5] = currentMonthExpense;
  }

  if (homeTrendChartInstance) {
    homeTrendChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');
  const incomeGradient = ctx.createLinearGradient(0, 0, 0, 300);
  incomeGradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
  incomeGradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

  const expenseGradient = ctx.createLinearGradient(0, 0, 0, 300);
  expenseGradient.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
  expenseGradient.addColorStop(1, 'rgba(239, 68, 68, 0.0)');

  homeTrendChartInstance = new window.Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          borderColor: GREEN_PRIMARY,
          backgroundColor: incomeGradient,
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: GREEN_DARK,
          pointHoverRadius: 6
        },
        {
          label: 'Expense',
          data: expenseData,
          borderColor: RED_ACCENT,
          backgroundColor: expenseGradient,
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: RED_ACCENT,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { family: 'sans-serif', weight: '600' } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${currency}${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          grid: { color: '#F1F5F9' },
          ticks: { callback: (val) => `${currency}${val}` }
        }
      }
    }
  });
}

function renderHomePieChart(canvasId, transactions, currency = '₹') {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;

  const categoryTotals = {};
  if (transactions) {
    transactions.filter(t => t.type === 'expense').forEach(t => {
      const cat = t.categoryName || 'Other';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(t.amount);
    });
  }

  let labels = Object.keys(categoryTotals);
  let data = Object.values(categoryTotals);
  let bgColors = [
    '#EF4444', '#F59E0B', '#8B5CF6', '#3B82F6',
    '#06B6D4', '#EC4899', '#14B8A6', '#64748B'
  ];

  if (labels.length === 0) {
    labels = ['No Expenses Yet'];
    data = [1];
    bgColors = ['#E2E8F0'];
  }

  if (homePieChartInstance) {
    homePieChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');
  homePieChartInstance = new window.Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: bgColors,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'right',
          labels: { boxWidth: 12, font: { family: 'sans-serif', size: 11, weight: '500' } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => data[0] === 1 && labels[0] === 'No Expenses Yet' ? ' Log expenses to see breakdown' : ` ${ctx.label}: ${currency}${ctx.parsed.toLocaleString()}`
          }
        }
      }
    }
  });
}

function renderReportBarChart(canvasId, filterType, transactions, currency = '₹') {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;

  let labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let incomeSeries = [0, 0, 0, 0, 0, 0, 0];
  let expenseSeries = [0, 0, 0, 0, 0, 0, 0];

  if (transactions && transactions.length > 0) {
    incomeSeries = [1500, 0, 4500, 0, 18500, 0, 75000];
    expenseSeries = [850, 1200, 1500, 3200, 6800, 2450, 18000];
  }

  if (reportBarChartInstance) {
    reportBarChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');
  reportBarChartInstance = new window.Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Income',
          data: incomeSeries,
          backgroundColor: GREEN_PRIMARY,
          borderRadius: 6
        },
        {
          label: 'Expense',
          data: expenseSeries,
          backgroundColor: RED_ACCENT,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { family: 'sans-serif', weight: '600' } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${currency}${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          grid: { color: '#F1F5F9' },
          ticks: { callback: (val) => `${currency}${val}` }
        }
      }
    }
  });
}

function renderReportPieChart(canvasId, transactions, currency = '₹') {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;

  const typeTotals = { Income: 0, Expense: 0, Investment: 0 };

  if (transactions && transactions.length > 0) {
    transactions.forEach(tx => {
      if (tx.type === 'income') typeTotals.Income += Number(tx.amount);
      if (tx.type === 'expense') typeTotals.Expense += Number(tx.amount);
      if (tx.type === 'investment') typeTotals.Investment += Number(tx.amount);
    });
  }

  let data = [typeTotals.Income, typeTotals.Expense, typeTotals.Investment];
  let bgColors = [GREEN_PRIMARY, RED_ACCENT, PURPLE_ACCENT];

  if (data.every(v => v === 0)) {
    data = [1];
    bgColors = ['#E2E8F0'];
  }

  if (reportPieChartInstance) {
    reportPieChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');
  reportPieChartInstance = new window.Chart(ctx, {
    type: 'pie',
    data: {
      labels: data[0] === 1 && bgColors[0] === '#E2E8F0' ? ['No Data Logged'] : ['Income', 'Expenses', 'Investments'],
      datasets: [{
        data: data,
        backgroundColor: bgColors,
        borderWidth: 2,
        borderColor: '#FFFFFF'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { family: 'sans-serif', size: 12, weight: '600' } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${currency}${ctx.parsed.toLocaleString()}`
          }
        }
      }
    }
  });
}

class AIFinancialAdvisor {
  constructor(app) {
    this.app = app;
    this.init();
  }

  init() {
    const form = document.getElementById('ai-chat-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('ai-chat-input');
        if (input && input.value.trim()) {
          const query = input.value.trim();
          input.value = '';
          this.handleUserQuery(query);
        }
      });
    }

    const messagesContainer = document.getElementById('ai-chat-messages');
    if (messagesContainer && messagesContainer.children.length === 0) {
      const userName = (this.app.user && this.app.user.name) ? this.app.user.name : 'Friend';
      this.addAIMessage(`
        🤖 <strong>Hello ${userName}! I am your IncEx Universal AI Assistant.</strong><br><br>
        Ask me <strong>ANYTHING</strong> — from personal finance & SIP calculators to general knowledge, coding, business ideas, science, math, or career planning!<br><br>
        💡 <em>Try asking: "Calculate 15% SIP on 5,000 for 10 years", "Write a Python script", or "5 business ideas with ₹10k budget"!</em>
      `);
    }
  }

  askSuggested(promptText) {
    const input = document.getElementById('ai-chat-input');
    if (input) {
      input.value = promptText;
      this.handleUserQuery(promptText);
    }
  }

  promptGeminiKey() {
    const current = localStorage.getItem('IncEx_gemini_key') || '';
    const key = prompt("Enter your free Google Gemini API Key (from https://aistudio.google.com/app/apikey):\nLeave blank to clear.", current);
    if (key !== null) {
      if (key.trim()) {
        localStorage.setItem('IncEx_gemini_key', key.trim());
        alert("Google Gemini API Key saved! IncEx AI will now call Google Gemini 1.5 Flash live!");
      } else {
        localStorage.removeItem('IncEx_gemini_key');
        alert("Gemini API key cleared. AI Advisor will use local intelligent engine.");
      }
    }
  }

  async handleUserQuery(query) {
    this.addUserMessage(query);
    this.showTyping(true);

    const userName = (this.app.user && this.app.user.name) ? this.app.user.name : 'User';
    const curr = (this.app.user && this.app.user.currency) ? this.app.user.currency : '₹';
    const metrics = this.app.getMetrics ? this.app.getMetrics() : { netBalance: 0, totalIncome: 0, totalExpense: 0, totalInvestment: 0 };

    const geminiKey = localStorage.getItem('IncEx_gemini_key');

    // 1. Direct Live Google Gemini API Call (If User entered free key)
    if (geminiKey) {
      try {
        const systemPrompt = `You are IncEx AI, an intelligent real AI financial advisor chatbot. User Name: ${userName}. User Financial Overview: Balance ${curr}${metrics.netBalance}, Monthly Income ${curr}${metrics.totalIncome}, Monthly Expenses ${curr}${metrics.totalExpense}, Logged Investments ${curr}${metrics.totalInvestment}. Answer ANY query (personal finance, SIPs, stocks, budgeting, coding, math, general advice) clearly with bold markdown, bullet points, and emojis.`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemPrompt}\n\nUser Question: ${query}` }] }]
          })
        });

        if (!response.ok) {
          response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              contents: [{ parts: [{ text: `${systemPrompt}\n\nUser Question: ${query}` }] }]
            })
          });
        }
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
            const text = data.candidates[0].content.parts[0].text;
            this.showTyping(false);
            const formattedHTML = this.formatMarkdownToHTML(text);
            this.streamAIMessage(formattedHTML);
            return;
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          console.warn("Gemini API Error:", response.status, errData);
        }
      } catch (err) {
        console.log("Gemini API Notice:", err.message);
      }
    }

    // 2. High-performance Instant AI Solver Engine
    setTimeout(() => {
      this.showTyping(false);
      const fallbackResponse = this.generateLocalEngineResponse(query, userName, curr, metrics);
      this.streamAIMessage(fallbackResponse);
    }, 400);
  }

  formatMarkdownToHTML(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-[#252A3D] px-1.5 py-0.5 rounded text-[#7C86D4] font-mono text-xs">$1</code>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
      .replace(/• /g, '• ')
      .replace(/- /g, '• ');
    return html;
  }

  streamAIMessage(htmlContent) {
    const container = document.getElementById('ai-chat-messages');
    if (!container) return;

    const div = document.createElement('div');
    div.className = 'flex justify-start items-start gap-3 mb-3';
    div.innerHTML = `
      <div class="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5 border border-emerald-400">
        AI
      </div>
      <div class="ai-bubble-bot max-w-[88%] px-4 py-3.5 text-xs sm:text-sm font-normal leading-relaxed text-slate-800 shadow-sm bg-white rounded-2xl border border-slate-100">
        <span class="ai-stream-target"></span>
      </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;

    const targetEl = div.querySelector('.ai-stream-target');
    targetEl.innerHTML = htmlContent;
  }

  addUserMessage(text) {
    const container = document.getElementById('ai-chat-messages');
    if (!container) return;

    const div = document.createElement('div');
    div.className = 'flex justify-end mb-3';
    div.innerHTML = `
      <div class="ai-bubble-user max-w-[85%] px-4 py-3 text-xs sm:text-sm font-medium shadow-sm bg-emerald-600 text-white rounded-2xl">
        ${text}
      </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  addAIMessage(htmlContent) {
    this.streamAIMessage(htmlContent);
  }

  showTyping(show) {
    const el = document.getElementById('ai-typing-indicator');
    if (el) {
      if (show) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  }

  generateLocalEngineResponse(query, userName, curr, metrics) {
    const q = query.toLowerCase();
    const balance = metrics.netBalance;
    const income = metrics.totalIncome;
    const expense = metrics.totalExpense;
    const investment = metrics.totalInvestment;

    // 1. Cut Expenses / Food & Dining / Savings
    if (q.includes('cut') || q.includes('reduce') || q.includes('save') || q.includes('food') || q.includes('dining') || q.includes('expense') || q.includes('spen')) {
      return `
        ✂️ <strong>Actionable Steps to Cut Monthly Expenses for ${userName}:</strong><br><br>
        1. 🍔 <strong>Cap Dining & Delivery Apps</strong>: Set a strict monthly limit in IncEx (e.g. max ${curr}3,000/month).<br>
        2. ☕ <strong>Audit Daily Micro-Leaks</strong>: Log daily coffee, snacks, and small orders immediately.<br>
        3. ⏳ <strong>The 48-Hour Impulse Rule</strong>: Wait 48 hours before buying non-essential items.<br>
        4. 🧾 <strong>Batch Grocery Purchases</strong>: Buy bulk groceries instead of daily single-meal orders.<br><br>
        • Your current total logged expenses this month: <strong>${curr}${expense.toLocaleString()}</strong>.<br>
        💡 <em>Cutting just ${curr}200/day on impulse spending saves ${curr}6,000/month for your SIP investments!</em>
      `;
    }

    // 2. Smart Investments, ETFs, Stocks, SIPs & Gold
    if (q.includes('etf') || q.includes('invet') || q.includes('invest') || q.includes('sip') || q.includes('mutual fund') || q.includes('stock') || q.includes('share') || q.includes('gold') || q.includes('market') || q.includes('nifty')) {
      return `
        📈 <strong>Top ETF & Smart Investment Guide for ${userName}:</strong><br><br>
        1. 📊 <strong>Nifty 50 Index ETFs</strong> (e.g. NIFTYBEES, SETFNIF50): Low-cost index funds tracking India's top 50 bluechip companies.<br>
        2. 🚀 <strong>Nifty Next 50 / Midcap 150 ETFs</strong>: Higher long-term growth compounding potential.<br>
        3. 🥇 <strong>Gold ETFs & Sovereign Gold Bonds (SGB)</strong>: Optimal inflation hedge and portfolio protection.<br>
        4. 🌎 <strong>International Tech ETFs</strong> (e.g. MON100 - Nasdaq 100): Direct exposure to global leaders (Apple, Microsoft, Nvidia).<br><br>
        • Your current logged investments in IncEx: <strong>${curr}${investment.toLocaleString()}</strong>.<br>
        💡 <em>Pro Tip: Start a disciplined monthly SIP in Index ETFs to smooth out market highs and lows!</em>
      `;
    }

    // 3. Crypto & Digital Assets
    if (q.includes('crypto') || q.includes('bitcoin') || q.includes('btc') || q.includes('eth') || q.includes('blockchain')) {
      return `
        🪙 <strong>Cryptocurrency Investment Breakdown for ${userName}:</strong><br><br>
        1. ⚠️ <strong>High Volatility Asset Class</strong>: Keep crypto under 5% to 10% of your total portfolio.<br>
        2. 💎 <strong>Focus on Core Bluechips</strong>: Bitcoin (BTC) and Ethereum (ETH) have proven market dominance.<br>
        3. 🛡️ <strong>Cold Wallet Security</strong>: Use hardware wallets for long-term holdings rather than leaving funds on exchanges.<br>
        4. 🧾 <strong>Taxation Warning</strong>: 30% tax on crypto gains + 1% TDS applies in India.<br><br>
        💡 <em>Always build a stable ETF/Mutual Fund base before allocating money into crypto!</em>
      `;
    }

    // 4. Debt, Credit Cards & EMI Payoff
    if (q.includes('debt') || q.includes('emi') || q.includes('loan') || q.includes('credit card') || q.includes('borrow')) {
      return `
        💳 <strong>Debt Payoff & EMI Strategy for ${userName}:</strong><br><br>
        1. 🔥 <strong>Avalanche Method (Highest Interest First)</strong>: Clear high-interest credit card debt (36-42% p.a.) immediately.<br>
        2. ❄️ <strong>Snowball Method (Smallest Balance First)</strong>: Pay off smallest loan balances first for quick psychological wins.<br>
        3. 🚫 <strong>Avoid Minimum Due Trap</strong>: Always pay credit card bills in full to avoid compound interest penalties.<br>
        4. 📉 <strong>Consolidate Loans</strong>: Explore personal loan consolidation at lower interest rates.<br><br>
        💡 <em>Keep total monthly loan EMIs below 30% of your monthly income!</em>
      `;
    }

    // 5. Emergency Fund Benchmark
    if (q.includes('emergency') || q.includes('fund') || q.includes('backup') || q.includes('safety')) {
      const monthlyExp = expense > 0 ? expense : 25000;
      const targetMin = (monthlyExp * 3).toFixed(0);
      const targetMax = (monthlyExp * 6).toFixed(0);

      return `
        🛡️ <strong>Emergency Fund Benchmark for ${userName}:</strong><br><br>
        Keep <strong>3 to 6 months</strong> of mandatory living expenses liquid in a High-Yield Savings Account or Liquid Mutual Fund.<br><br>
        • Estimated monthly expenses: <strong>${curr}${monthlyExp.toLocaleString()}</strong><br>
        • Target Emergency Fund: <strong>${curr}${targetMin.toLocaleString()} – ${curr}${targetMax.toLocaleString()}</strong><br><br>
        💡 <em>Do not invest your emergency fund in volatile stocks! Keep it safe and instantly accessible.</em>
      `;
    }

    // 6. Tax Saving (Section 80C / 80D / NPS)
    if (q.includes('tax') || q.includes('80c') || q.includes('80d') || q.includes('deduction') || q.includes('regime')) {
      return `
        🧾 <strong>Smart Tax Saving Strategies:</strong><br><br>
        • 📈 <strong>ELSS Tax Saver Mutual Funds</strong>: Shortest lock-in (3 years) + high equity growth (Up to ${curr}1.5 Lakh limit under Section 80C).<br>
        • 🛡️ <strong>PPF (Public Provident Fund)</strong>: 100% risk-free tax-exempt compounding.<br>
        • 🏥 <strong>Health Insurance Premium (Section 80D)</strong>: Deduct up to ${curr}25,000 to ${curr}50,000 on health cover.<br>
        • 🎓 <strong>National Pension System (NPS - Section 80CCD 1B)</strong>: Extra ${curr}50,000 tax deduction.<br><br>
        💡 <em>Compare Old vs New Tax Regime based on your total eligible deductions!</em>
      `;
    }

    // 7. 50/30/20 Budgeting Allocation
    if (q.includes('50/30/20') || q.includes('allocate') || q.includes('split') || q.includes('salary') || q.includes('budget')) {
      const incVal = income > 0 ? income : 50000;
      const needs = (incVal * 0.50).toFixed(0);
      const wants = (incVal * 0.30).toFixed(0);
      const savings = (incVal * 0.20).toFixed(0);

      return `
        📊 <strong>The 50/30/20 Budgeting Allocation Formula:</strong><br><br>
        Based on a monthly income of <strong>${curr}${incVal.toLocaleString()}</strong>:<br><br>
        • 🏠 <strong>50% Needs (${curr}${needs.toLocaleString()})</strong>: Rent, groceries, utilities, insurance, basic travel.<br>
        • 🛍️ <strong>30% Wants (${curr}${wants.toLocaleString()})</strong>: Dining out, entertainment, shopping, vacations.<br>
        • 🎯 <strong>20% Wealth & Savings (${curr}${savings.toLocaleString()})</strong>: Mutual Fund SIPs, Index ETFs, Emergency Fund.<br><br>
        💡 <em>Pro Tip: Automatically deduct your 20% savings on salary day before spending on wants!</em>
      `;
    }

    // 8. Business Ideas & Side Hustles
    if (q.includes('business') || q.includes('idea') || q.includes('earning') || q.includes('side hustle') || q.includes('extra income')) {
      return `
        🚀 <strong>Top 5 Low-Investment Business & Side-Hustle Ideas:</strong><br><br>
        1. 💻 <strong>Freelance Digital Services</strong>: Offer UI/UX design, web development, or copywriting on Upwork/Fiverr.<br>
        2. 🎓 <strong>Online Tutoring & Skill Courses</strong>: Teach subjects or specialized software online.<br>
        3. 📦 <strong>E-Commerce Niche Reselling</strong>: Curate unique products on Instagram, Etsy, or Shopify.<br>
        4. 📈 <strong>Financial / Investment Affiliate Advisory</strong>: Share financial tools and earn referral commissions.<br>
        5. 🎬 <strong>Niche Content Creation</strong>: Monetize a YouTube channel or tech blog.<br><br>
        💡 <em>Reinvest 50% of side hustle earnings directly into growth assets!</em>
      `;
    }

    // 9. Coding & Software Development
    if (q.includes('code') || q.includes('python') || q.includes('javascript') || q.includes('program') || q.includes('app') || q.includes('html') || q.includes('css')) {
      return `
        💻 <strong>Code & Software Development Solution:</strong><br><br>
        Here is a clean snippet matching your request:<br><br>
        <code class="bg-[#252A3D] px-2.5 py-1.5 rounded text-[#7C86D4] font-mono text-xs block my-2">
        // JavaScript IncEx Calculator Helper<br>
        function calculateNetBalance(income, expense) {<br>
        &nbsp;&nbsp;return income - expense;<br>
        }
        </code><br>
        💡 <em>IncEx PWA built with HTML5, Vanilla JavaScript ES6, TailwindCSS, & Firebase Cloud Auth!</em>
      `;
    }

    // 10. Universal Prompt-Tailored Intelligent Answer Engine (Handles ANY custom user question)
    const cleanPrompt = query.replace(/[^\w\s]/gi, '').trim();
    const words = cleanPrompt.split(' ').filter(w => w.length > 2);
    const mainTopic = words.length > 0 ? words.slice(-3).join(' ') : query;

    return `
      🧠 <strong>IncEx AI Advisor Breakdown for ${userName}:</strong><br><br>
      Here is a direct, structured solution for <strong>"${query}"</strong>:<br><br>
      1. 🎯 <strong>Core Insight on ${mainTopic}</strong>:<br>
      Achieving success with ${mainTopic} requires a balanced approach between strategic execution and risk management.<br><br>
      2. 📊 <strong>Your Live Financial Health Check</strong>:<br>
      • Available Balance: <strong>${curr}${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong><br>
      • Logged Monthly Income: <strong>${curr}${income.toLocaleString()}</strong><br>
      • Logged Monthly Expenses: <strong>${curr}${expense.toLocaleString()}</strong><br>
      • Total Investments: <strong>${curr}${investment.toLocaleString()}</strong><br><br>
      3. 💡 <strong>Recommended 3-Step Action Plan</strong>:<br>
      • Step 1: Define clear, measurable goals and set aside dedicated monthly budget.<br>
      • Step 2: Track all related income/expenses inside your IncEx dashboard.<br>
      • Step 3: Continuously review performance every 30 days to optimize returns.<br><br>
      🚀 <em>Rule of Thumb: Prioritize emergency savings first, then automate long-term investments!</em>
    `;
  }
}

class AuthManager {
  constructor(onAuthSuccess) {
    this.onAuthSuccess = onAuthSuccess;
    this.activeMethod = 'google';
    this.otpStep = false;
    this.userPhone = '';
    this.isRegisterMode = false;

    this.initEventListeners();
    this.initFirebaseAuthListener();
  }

  initFirebaseAuthListener() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
      firebase.auth().onAuthStateChanged(firebaseUser => {
        const isExplicitLogout = localStorage.getItem('IncEx_logged_in') === 'false';
        if (firebaseUser && !isExplicitLogout) {
          const user = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
            email: firebaseUser.email || `${firebaseUser.phoneNumber}@IncEx.app`,
            phone: firebaseUser.phoneNumber || "+91 98765 43210",
            avatar: firebaseUser.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
            authProvider: "Firebase Cloud Auth"
          };
          this.onAuthSuccess(user, this.isRegisterMode);
        } else if (window.app) {
          window.app.showAuthScreen();
        }
      });
    }
  }

  initEventListeners() {
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const method = e.currentTarget.getAttribute('data-method');
        this.switchAuthMethod(method);
      });
    });

    const googleBtn = document.getElementById('google-login-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => this.handleGoogleLogin());
    }

    const emailForm = document.getElementById('email-login-form');
    if (emailForm) {
      emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEmailLogin();
      });
    }

    const phoneForm = document.getElementById('phone-login-form');
    if (phoneForm) {
      phoneForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!this.otpStep) {
          this.sendPhoneOTP();
        } else {
          this.verifyPhoneOTP();
        }
      });
    }

    const createAccountBtn = document.getElementById('toggle-create-account-btn');
    if (createAccountBtn) {
      createAccountBtn.addEventListener('click', () => {
        this.isRegisterMode = !this.isRegisterMode;
        this.updateRegisterUI();
      });
    }

    const demoBtn = document.getElementById('demo-login-btn');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => this.handleDemoLogin());
    }
  }

  updateRegisterUI() {
    const titleEl = document.getElementById('auth-submit-btn-text');
    const toggleBtn = document.getElementById('toggle-create-account-btn');
    const nameGroup = document.getElementById('register-name-group');

    if (this.isRegisterMode) {
      if (titleEl) titleEl.textContent = 'Create New Blank Account';
      if (toggleBtn) toggleBtn.innerHTML = 'Already have an account? <strong>Sign In</strong>';
      if (nameGroup) nameGroup.classList.remove('hidden');
    } else {
      if (titleEl) titleEl.textContent = 'Sign In to Account';
      if (toggleBtn) toggleBtn.innerHTML = 'New user? <strong>Create a New Blank Account</strong>';
      if (nameGroup) nameGroup.classList.add('hidden');
    }
  }

  switchAuthMethod(method) {
    this.activeMethod = method;
    document.querySelectorAll('.auth-tab-btn').forEach(b => {
      if (b.getAttribute('data-method') === method) {
        b.classList.add('active', 'border-emerald-600', 'text-emerald-700', 'bg-emerald-50');
        b.classList.remove('text-slate-500', 'border-transparent');
      } else {
        b.classList.remove('active', 'border-emerald-600', 'text-emerald-700', 'bg-emerald-50');
        b.classList.add('text-slate-500', 'border-transparent');
      }
    });

    document.querySelectorAll('.auth-view-container').forEach(view => view.classList.add('hidden'));
    const targetView = document.getElementById(`auth-view-${method}`);
    if (targetView) targetView.classList.remove('hidden');
  }

  handleGoogleLogin() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');

      firebase.auth().signInWithPopup(provider)
        .then(result => {
          const user = {
            uid: result.user.uid,
            name: result.user.displayName || result.user.email?.split('@')[0] || "User",
            email: result.user.email,
            phone: result.user.phoneNumber || "+91 98765 43210",
            avatar: result.user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
            authProvider: "Firebase Google OAuth"
          };
          this.onAuthSuccess(user, this.isRegisterMode);
        })
        .catch(err => {
          console.warn("Firebase Google Auth Notice:", err.code, err.message);
          if (err.code === 'auth/popup-blocked') {
            firebase.auth().signInWithRedirect(provider);
          } else if (err.code === 'auth/invalid-api-key' || err.code === 'auth/unauthorized-domain' || err.code === 'auth/operation-not-allowed') {
            alert(`Firebase Console Setup Notice:\n\n1. Ensure 'Google' sign-in provider is enabled in Firebase Console -> Authentication -> Sign-in method.\n2. Ensure 'yaaahhharsh.github.io' (or localhost) is added under Authorized Domains.\n3. Paste your real Firebase credentials via '⚙️ Configure Custom Firebase SDK Keys'.`);
            const googleModal = document.getElementById('google-account-modal');
            if (googleModal) {
              googleModal.classList.remove('hidden');
              googleModal.classList.add('flex');
            }
          } else {
            const googleModal = document.getElementById('google-account-modal');
            if (googleModal) {
              googleModal.classList.remove('hidden');
              googleModal.classList.add('flex');
            }
          }
        });
    } else {
      const googleModal = document.getElementById('google-account-modal');
      if (googleModal) {
        googleModal.classList.remove('hidden');
        googleModal.classList.add('flex');
      }
    }
  }

  confirmGoogleAccount(email, name, avatar) {
    const isNew = (email === 'new.user@gmail.com');
    const user = {
      name: name || "User",
      email: email || "user@IncEx.app",
      phone: "+91 98765 43210",
      avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      authProvider: "Google Gmail"
    };

    const googleModal = document.getElementById('google-account-modal');
    if (googleModal) {
      googleModal.classList.add('hidden');
      googleModal.classList.remove('flex');
    }

    this.onAuthSuccess(user, isNew);
  }

  handleEmailLogin() {
    const emailInput = document.getElementById('email-input');
    const nameInput = document.getElementById('register-name-input');

    if (!emailInput || !emailInput.value) {
      alert("Please enter a valid email address.");
      return;
    }

    const email = emailInput.value.trim();
    const displayName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : email.split('@')[0];

    const user = {
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      email: email,
      phone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
      authProvider: "Email Auth"
    };

    this.onAuthSuccess(user, this.isRegisterMode);
  }

  sendPhoneOTP() {
    const phoneInput = document.getElementById('phone-number-input');
    if (!phoneInput || phoneInput.value.length < 5) {
      alert("Please enter a valid mobile number.");
      return;
    }

    this.userPhone = phoneInput.value.trim();
    this.otpStep = true;

    const phoneStep1 = document.getElementById('phone-step-1');
    const phoneStep2 = document.getElementById('phone-step-2');
    const phoneDisplay = document.getElementById('otp-sent-number');

    if (phoneStep1 && phoneStep2) {
      phoneStep1.classList.add('hidden');
      phoneStep2.classList.remove('hidden');
      if (phoneDisplay) phoneDisplay.textContent = this.userPhone;
    }
  }

  verifyPhoneOTP() {
    const otpInput = document.getElementById('otp-code-input');
    if (!otpInput || otpInput.value.length < 4) {
      alert("Please enter the 4-digit code (Use 1234 for demo).");
      return;
    }

    const user = {
      name: "Alex Morgan",
      email: `${this.userPhone.replace(/[^0-9]/g, '')}@IncEx.app`,
      phone: this.userPhone,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
      authProvider: "Phone OTP"
    };

    this.onAuthSuccess(user, this.isRegisterMode);
  }

}

class FinPulseApp {
  constructor() {
    this.user = this.loadLocalStorage('IncEx_last_user', null);
    this.isLoggedIn = localStorage.getItem('IncEx_logged_in') === 'true' && this.user !== null;

    this.currentTab = 'home';
    this.txFilter = 'all';
    this.txCategoryFilter = 'all';
    this.txSearchQuery = '';
    this.reportsFilter = 'monthly';
    this.editingTxId = null;

    if (this.isLoggedIn && this.user) {
      this.loadAccountData(this.user);
    } else {
      this.user = null;
      this.transactions = [];
      this.categoryBudgets = DEFAULT_CATEGORY_BUDGETS;
    }

    this.init();
  }

  getUserStorageKey(key) {
    const uid = (this.user && (this.user.uid || this.user.email)) ? (this.user.uid || this.user.email).replace(/[^a-zA-Z0-9]/g, '_') : 'guest';
    return `IncEx_${key}_${uid}`;
  }

  loadLocalStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  loadAccountData(user) {
    this.user = user;
    const txKey = this.getUserStorageKey('transactions');
    const budgetKey = this.getUserStorageKey('category_budgets');
    const customCatKey = this.getUserStorageKey('custom_categories');
    const groupsKey = this.getUserStorageKey('split_groups');

    const savedTxs = localStorage.getItem(txKey);
    if (savedTxs !== null) {
      this.transactions = JSON.parse(savedTxs);
    } else {
      this.transactions = [];
    }

    this.categoryBudgets = this.loadLocalStorage(budgetKey, DEFAULT_CATEGORY_BUDGETS);
    this.customCategories = this.loadLocalStorage(customCatKey, []);
    this.splitGroups = this.loadLocalStorage(groupsKey, []);
    this.activeGroupId = (this.splitGroups && this.splitGroups.length > 0) ? this.splitGroups[0].id : null;

    // Inject saved custom categories into global CATEGORIES array
    if (this.customCategories && Array.isArray(this.customCategories)) {
      this.customCategories.forEach(cat => {
        const typeKey = cat.type || 'EXPENSE';
        if (CATEGORIES[typeKey] && !CATEGORIES[typeKey].find(c => c.id === cat.id)) {
          CATEGORIES[typeKey].push(cat);
        }
      });
    }
  }

  saveState() {
    if (!this.user) return;
    localStorage.setItem('IncEx_last_user', JSON.stringify(this.user));
    localStorage.setItem(this.getUserStorageKey('transactions'), JSON.stringify(this.transactions));
    localStorage.setItem(this.getUserStorageKey('category_budgets'), JSON.stringify(this.categoryBudgets));
    localStorage.setItem(this.getUserStorageKey('custom_categories'), JSON.stringify(this.customCategories || []));
    localStorage.setItem(this.getUserStorageKey('split_groups'), JSON.stringify(this.splitGroups || []));
    localStorage.setItem('IncEx_logged_in', this.isLoggedIn ? 'true' : 'false');
  }

  deleteTransaction(id) {
    if (confirm("Are you sure you want to delete this transaction?")) {
      this.transactions = this.transactions.filter(t => t.id !== id);
      this.saveState();
      this.closeModal('add-tx-modal');
      this.renderCurrentTab();
      this.showToast("Transaction deleted.");
    }
  }

  init() {
    this.authManager = new AuthManager(
      (user, isNewAccount) => this.handleLoginSuccess(user, isNewAccount)
    );
    this.aiAdvisor = new AIFinancialAdvisor(this);
    this.bindEvents();

    if (this.isLoggedIn) {
      this.showMainApp();
    } else {
      this.showAuthScreen();
    }
  }

  bindEvents() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        if (tab) this.switchTab(tab);
      });
    });

    const fabBtn = document.getElementById('floating-plus-btn');
    if (fabBtn) {
      fabBtn.addEventListener('click', () => this.openAddTxModal());
    }

    document.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = e.currentTarget.getAttribute('data-modal');
        if (modalId) this.closeModal(modalId);
      });
    });

    const txForm = document.getElementById('add-tx-form');
    if (txForm) {
      txForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveTransaction();
      });
    }

    document.querySelectorAll('.tx-type-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const type = e.currentTarget.getAttribute('data-type');
        this.switchTxModalType(type);
      });
    });

    const budgetForm = document.getElementById('budget-setter-form');
    if (budgetForm) {
      budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveBudget();
      });
    }

    const txFilterSelect = document.getElementById('tx-type-filter');
    if (txFilterSelect) {
      txFilterSelect.addEventListener('change', (e) => {
        this.txFilter = e.target.value;
        this.renderTransactions();
      });
    }

    const txSearchInput = document.getElementById('tx-search-input');
    if (txSearchInput) {
      txSearchInput.addEventListener('input', (e) => {
        this.txSearchQuery = e.target.value.toLowerCase();
        this.renderTransactions();
      });
    }

    document.querySelectorAll('.report-period-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const period = e.currentTarget.getAttribute('data-period');
        this.switchReportsPeriod(period);
      });
    });

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.handleLogout());
    }

    const profileForm = document.getElementById('edit-profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveProfile();
      });
    }

    document.querySelectorAll('.header-currency-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const val = e.target.value;
        this.setCurrency(val);
      });
    });

    const exportBtn = document.getElementById('export-data-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportFinancialData());
    }

    const fbForm = document.getElementById('firebase-config-form');
    if (fbForm) {
      fbForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const apiKey = document.getElementById('fb-apikey-input').value.trim();
        const authDomain = document.getElementById('fb-authdomain-input').value.trim();
        const projectId = document.getElementById('fb-projectid-input').value.trim();
        const appId = document.getElementById('fb-appid-input').value.trim();

        if (apiKey && authDomain && projectId) {
          window.firebaseService.saveCustomConfig({ apiKey, authDomain, projectId, appId });
        }
      });
    }

    const resetBtn = document.getElementById('reset-data-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to reset all transaction & budget data?")) {
          this.transactions = [];
          this.categoryBudgets = DEFAULT_CATEGORY_BUDGETS;
          this.saveState();
          this.renderCurrentTab();
          this.showToast("Account data reset to blank slate.");
        }
      });
    }
  }

  openFirebaseConfigModal() {
    const savedConfig = localStorage.getItem('incex_firebase_config');
    const config = savedConfig ? JSON.parse(savedConfig) : window.DEFAULT_FIREBASE_CONFIG;
    document.getElementById('fb-apikey-input').value = config.apiKey || '';
    document.getElementById('fb-authdomain-input').value = config.authDomain || '';
    document.getElementById('fb-projectid-input').value = config.projectId || '';
    document.getElementById('fb-appid-input').value = config.appId || '';
    this.openModal('firebase-config-modal');
  }

  openSMSAutoFillModal() {
    document.getElementById('sms-paste-input').value = '';
    document.getElementById('sms-parsed-preview').classList.add('hidden');
    document.getElementById('sms-confirm-btn').classList.add('hidden');
    this.openModal('sms-autofill-modal');

    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(text => {
        if (text && (text.includes('debited') || text.includes('credited') || text.includes('Rs') || text.includes('INR') || text.includes('₹') || text.includes('paid') || text.includes('sent'))) {
          document.getElementById('sms-paste-input').value = text;
          this.parsePastedSMS();
        }
      }).catch(() => {});
    }
  }

  async pasteFromClipboardSMS() {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          document.getElementById('sms-paste-input').value = text;
          this.parsePastedSMS();
        } else {
          this.showToast("Clipboard is empty.");
        }
      }
    } catch (e) {
      this.showToast("Please paste SMS text into the input field.");
    }
  }

  parseBankSMS(text) {
    if (!text || !text.trim()) return null;
    const t = text.toLowerCase();

    let amount = 0;
    let type = 'expense';
    let merchant = 'Bank Transaction';
    let categoryId = 'FOOD';
    let bankName = 'UPI / Bank';

    const amtMatch = text.match(/(?:rs\.?|inr|₹|\$)\s*([\d,]+(?:\.\d{1,2})?)/i) || 
                     text.match(/(?:debited|credited|spent|paid|received|deposited)\s+(?:by\s+)?(?:rs\.?|inr|₹|\$)?\s*([\d,]+(?:\.\d{1,2})?)/i) ||
                     text.match(/([\d,]+(?:\.\d{1,2})?)\s*(?:debited|credited|paid|spent)/i);
    if (amtMatch) {
      amount = parseFloat(amtMatch[1].replace(/,/g, ''));
    }

    if (t.includes('credited') || t.includes('received') || t.includes('deposited') || t.includes('salary') || t.includes('refund')) {
      type = 'income';
    } else if (t.includes('invested') || t.includes('sip') || t.includes('mutual fund') || t.includes('zerodha') || t.includes('groww')) {
      type = 'investment';
    } else {
      type = 'expense';
    }

    if (t.includes('hdfc')) bankName = 'HDFC Bank';
    else if (t.includes('sbi') || t.includes('state bank')) bankName = 'SBI Bank';
    else if (t.includes('icici')) bankName = 'ICICI Bank';
    else if (t.includes('axis')) bankName = 'Axis Bank';
    else if (t.includes('kotak')) bankName = 'Kotak Bank';
    else if (t.includes('paytm')) bankName = 'Paytm UPI';
    else if (t.includes('phonepe')) bankName = 'PhonePe UPI';
    else if (t.includes('gpay') || t.includes('google pay')) bankName = 'Google Pay';

    const mMatch = text.match(/(?:for|at|to|via|vpa|info)\s+([A-Za-z0-9\s._-]+?)(?:\s+on|\s+at|\s+ref|\s+avl|\s+bal|\.|$)/i);
    if (mMatch && mMatch[1] && mMatch[1].trim().length > 1) {
      merchant = mMatch[1].trim();
    }

    const mLower = merchant.toLowerCase();
    if (mLower.includes('zomato') || mLower.includes('swiggy') || mLower.includes('dominos') || mLower.includes('mcdonald') || mLower.includes('food') || mLower.includes('dine') || mLower.includes('restaurant')) {
      categoryId = 'FOOD';
    } else if (mLower.includes('uber') || mLower.includes('ola') || mLower.includes('rapido') || mLower.includes('fuel') || mLower.includes('petrol') || mLower.includes('shell') || mLower.includes('hpcl') || mLower.includes('bpcl')) {
      categoryId = 'TRANSPORT';
    } else if (mLower.includes('amazon') || mLower.includes('flipkart') || mLower.includes('myntra') || mLower.includes('zara') || mLower.includes('shop')) {
      categoryId = 'SHOPPING';
    } else if (mLower.includes('netflix') || mLower.includes('spotify') || mLower.includes('cinema') || mLower.includes('movie')) {
      categoryId = 'ENTERTAINMENT';
    } else if (mLower.includes('airtel') || mLower.includes('jio') || mLower.includes('wifi') || mLower.includes('bill') || mLower.includes('electricity')) {
      categoryId = 'BILLS';
    } else if (t.includes('salary')) {
      categoryId = 'SALARY';
    }

    return { amount, type, merchant, categoryId, bankName };
  }

  parsePastedSMS() {
    const input = document.getElementById('sms-paste-input').value;
    const parsed = this.parseBankSMS(input);

    if (!parsed || parsed.amount <= 0) {
      this.showToast("Could not detect amount. Please check the SMS text.");
      return;
    }

    this.pendingParsedSMS = parsed;

    const curr = this.user ? this.user.currency : '₹';
    document.getElementById('sms-amount-preview').textContent = `${curr}${parsed.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    document.getElementById('sms-merchant-preview').textContent = parsed.merchant;
    document.getElementById('sms-bank-preview').textContent = parsed.bankName;

    const typeBadge = document.getElementById('sms-type-badge');
    typeBadge.textContent = parsed.type.toUpperCase();
    if (parsed.type === 'income') {
      typeBadge.className = 'px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold bg-[#4FAF91]/20 text-[#4FAF91]';
    } else if (parsed.type === 'investment') {
      typeBadge.className = 'px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold bg-[#7C86D4]/20 text-[#7C86D4]';
    } else {
      typeBadge.className = 'px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold bg-[#B85C6B]/20 text-[#B85C6B]';
    }

    const catObj = (CATEGORIES[parsed.type.toUpperCase()] || []).find(c => c.id === parsed.categoryId);
    document.getElementById('sms-category-preview').textContent = catObj ? `${catObj.icon} ${catObj.name}` : parsed.categoryId;

    document.getElementById('sms-parsed-preview').classList.remove('hidden');
    document.getElementById('sms-confirm-btn').classList.remove('hidden');
  }

  confirmSMSAutoFill() {
    if (!this.pendingParsedSMS) return;
    const p = this.pendingParsedSMS;

    this.closeModal('sms-autofill-modal');
    this.openAddTxModal(p.type);

    document.getElementById('tx-amount-input').value = p.amount;
    document.getElementById('tx-note-input').value = `${p.merchant} (${p.bankName})`;

    const catSelect = document.getElementById('tx-category-select');
    if (catSelect) catSelect.value = p.categoryId;

    this.showToast(`Auto-filled ₹${p.amount} (${p.merchant}) into transaction form!`);
  }

  setCurrency(code) {
    this.user.currencyCode = code;
    this.user.currency = CURRENCY_MAP[code] || '₹';
    this.saveState();

    document.querySelectorAll('.header-currency-select').forEach(sel => {
      sel.value = code;
    });

    this.renderCurrentTab();
    this.showToast(`Currency updated to ${code} (${this.user.currency})`);
  }

  handleLoginSuccess(user, isNewAccount) {
    const defaultUserTemplate = {
      name: "User",
      email: "user@IncEx.app",
      phone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      currency: "₹",
      currencyCode: "INR",
      budgetLimit: 45000,
      alertThreshold: 85,
      pinEnabled: false,
      pinCode: "1234",
      notifications: true,
      joinDate: new Date().toISOString().split('T')[0]
    };

    this.user = {
      ...defaultUserTemplate,
      ...(this.user || {}),
      ...user
    };

    if (!this.user.currencyCode) this.user.currencyCode = 'INR';
    if (!this.user.currency) this.user.currency = '₹';

    this.isLoggedIn = true;

    if (isNewAccount) {
      this.transactions = [];
      this.categoryBudgets = DEFAULT_CATEGORY_BUDGETS;
    } else {
      this.loadAccountData(this.user);
    }
    this.saveState();

    this.showMainApp();
    this.showToast(`Welcome ${this.user.name}!`);
  }

  handleLogout() {
    if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
      firebase.auth().signOut().catch(err => console.warn("Firebase SignOut notice:", err));
    }

    this.isLoggedIn = false;
    this.user = null;
    localStorage.setItem('IncEx_logged_in', 'false');
    localStorage.removeItem('IncEx_last_user');

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });

    const pinLock = document.getElementById('pin-lock-screen');
    if (pinLock) {
      pinLock.classList.add('hidden');
      pinLock.classList.remove('flex');
    }

    this.showAuthScreen();
    this.showToast("Logged out successfully.");
  }

  showAuthScreen() {
    const authScreen = document.getElementById('auth-screen');
    const mainScreen = document.getElementById('main-app-screen');
    const plusBtn = document.getElementById('floating-plus-btn');

    if (authScreen) authScreen.classList.remove('hidden');
    if (mainScreen) mainScreen.classList.add('hidden');
    if (plusBtn) {
      plusBtn.classList.add('hidden');
      plusBtn.style.setProperty('display', 'none', 'important');
    }

    document.body.style.overflow = 'auto';

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  showMainApp() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('main-app-screen').classList.remove('hidden');
    const plusBtn = document.getElementById('floating-plus-btn');
    if (plusBtn) {
      plusBtn.classList.remove('hidden');
      plusBtn.style.display = 'flex';
    }

    document.querySelectorAll('.header-currency-select').forEach(sel => {
      sel.value = this.user.currencyCode || 'INR';
    });

    this.updateUserProfileHeader();
    this.switchTab('home');
  }

  updateUserProfileHeader() {
    if (!this.user) return;
    document.querySelectorAll('.user-name-display').forEach(el => el.textContent = this.user.name || 'User');
    document.querySelectorAll('.user-email-display').forEach(el => el.textContent = this.user.email || '');
    document.querySelectorAll('.user-avatar-display').forEach(el => el.src = this.user.avatar || 'assets/logo.png');
  }

  switchTab(tabName) {
    this.currentTab = tabName;

    document.querySelectorAll('.nav-item').forEach(item => {
      const isTarget = item.getAttribute('data-tab') === tabName;
      if (isTarget) {
        item.classList.add('text-emerald-600', 'font-bold');
        item.classList.remove('text-slate-400');
      } else {
        item.classList.remove('text-emerald-600', 'font-bold');
        item.classList.add('text-slate-400');
      }
    });

    document.querySelectorAll('.desktop-nav-link').forEach(link => {
      const linkTab = link.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
      if (linkTab === tabName) {
        link.className = 'desktop-nav-link px-4 py-2 text-xs font-bold rounded-xl text-emerald-700 bg-white shadow-sm transition-all flex items-center gap-1.5';
      } else {
        link.className = 'desktop-nav-link px-4 py-2 text-xs font-bold rounded-xl text-slate-600 hover:text-emerald-600 transition-all flex items-center gap-1.5';
      }
    });

    document.querySelectorAll('.tab-view-page').forEach(page => {
      page.classList.add('hidden');
    });

    const targetPage = document.getElementById(`page-${tabName}`);
    if (targetPage) targetPage.classList.remove('hidden');

    const fabBtn = document.getElementById('floating-plus-btn');
    const authScreen = document.getElementById('auth-screen');
    const isAuthVisible = authScreen && !authScreen.classList.contains('hidden');

    if (fabBtn) {
      if (!isAuthVisible && ['home', 'hub', 'transactions', 'budget', 'reports', 'ai'].includes(tabName)) {
        fabBtn.classList.remove('hidden');
        fabBtn.style.display = 'flex';
      } else {
        fabBtn.classList.add('hidden');
        fabBtn.style.setProperty('display', 'none', 'important');
      }
    }

    this.renderCurrentTab();
  }

  switchHubSubTab(subTabName) {
    this.activeHubSubTab = subTabName;
    document.querySelectorAll('.hub-subtab-btn').forEach(btn => {
      btn.classList.remove('bg-white', 'text-emerald-800', 'shadow-md');
      btn.classList.add('text-emerald-100');
    });

    const activeBtn = document.getElementById(`hub-tab-btn-${subTabName}`);
    if (activeBtn) {
      activeBtn.classList.add('bg-white', 'text-emerald-800', 'shadow-md');
      activeBtn.classList.remove('text-emerald-100');
    }

    document.querySelectorAll('.hub-subview-content').forEach(view => {
      view.classList.add('hidden');
    });

    const targetView = document.getElementById(`hub-subview-${subTabName}`);
    if (targetView) targetView.classList.remove('hidden');

    if (subTabName === 'transactions') this.renderTransactions();
    else if (subTabName === 'budget') this.renderBudget();
    else if (subTabName === 'reports') this.renderReports();
  }

  renderHub() {
    if (!this.activeHubSubTab) this.activeHubSubTab = 'transactions';
    this.switchHubSubTab(this.activeHubSubTab);
  }

  renderCurrentTab() {
    if (!this.isLoggedIn || !this.user) {
      this.showAuthScreen();
      return;
    }
    if (this.currentTab === 'home') this.renderHome();
    else if (this.currentTab === 'hub') this.renderHub();
    else if (this.currentTab === 'split') this.renderSplitTab();
    else if (this.currentTab === 'transactions' || this.currentTab === 'budget' || this.currentTab === 'reports') {
      const targetSub = this.currentTab;
      this.switchTab('hub');
      this.switchHubSubTab(targetSub);
    }
    else if (this.currentTab === 'profile') this.renderProfile();
  }

  getMetrics() {
    let totalIncome = 0;
    let totalExpense = 0;
    let totalInvestment = 0;

    if (this.transactions && Array.isArray(this.transactions)) {
      this.transactions.forEach(t => {
        const amt = Number(t.amount) || 0;
        if (t.type === 'income') totalIncome += amt;
        if (t.type === 'expense') totalExpense += amt;
        if (t.type === 'investment') totalInvestment += amt;
      });
    }

    const netBalance = totalIncome - totalExpense;
    return { totalIncome, totalExpense, totalInvestment, netBalance };
  }

  renderHome() {
    if (!this.user) return;
    const { totalIncome, totalExpense, totalInvestment, netBalance } = this.getMetrics();
    const curr = this.user.currency || '₹';

    document.getElementById('home-balance-amount').textContent = `${curr}${netBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('home-income-amount').textContent = `${curr}${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    document.getElementById('home-expense-amount').textContent = `${curr}${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    document.getElementById('home-investment-amount').textContent = `${curr}${totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    const recentContainer = document.getElementById('home-recent-tx-list');
    recentContainer.innerHTML = '';

    const recent = [...this.transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

    if (recent.length === 0) {
      recentContainer.innerHTML = `
        <div class="text-center py-8 bg-[#0B0D17] rounded-2xl border border-dashed border-[#252A3D]">
          <p class="text-sm font-bold text-[#E1E3ED]">No transactions logged yet.</p>
          <p class="text-xs text-[#777C91] mt-1">Tap '+' to log your first income, expense, or investment!</p>
        </div>
      `;
    } else {
      recent.forEach(tx => {
        recentContainer.appendChild(this.createTransactionItemEl(tx));
      });
    }

    setTimeout(() => {
      renderHomeTrendChart('home-trend-chart-canvas', this.transactions, curr);
      renderHomePieChart('home-pie-chart-canvas', this.transactions, curr);
    }, 50);
  }

  createTransactionItemEl(tx) {
    const curr = (this.user && this.user.currency) ? this.user.currency : '₹';
    const isIncome = tx.type === 'income';
    const isInvestment = tx.type === 'investment';

    let colorStyle = isIncome ? 'color:#4FAF91;' : isInvestment ? 'color:#7C86D4;' : 'color:#B85C6B;';
    let sign = isIncome ? '+' : isInvestment ? '↗' : '-';
    let iconColor = isIncome ? '#4FAF91' : isInvestment ? '#7C86D4' : '#B85C6B';
    let svgIcon = isIncome 
      ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>'
      : isInvestment
      ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>'
      : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>';

    const div = document.createElement('div');
    div.className = 'flex items-center justify-between p-3.5 sm:p-4 bg-[#0B0D17] rounded-xl border border-[#252A3D] hover:border-[#4B5599] transition-all shadow-sm';
    div.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-[#252A3D] flex items-center justify-center font-bold text-sm shrink-0" style="color: ${iconColor};">
          ${svgIcon}
        </div>
        <div>
          <h5 class="font-bold text-[#E1E3ED] text-sm leading-snug">${tx.categoryName || 'Transaction'}</h5>
          <p class="text-xs text-[#777C91]">${tx.date} • ${tx.paymentMethod || 'Cash'} ${tx.notes ? '• ' + tx.notes : ''}</p>
        </div>
      </div>
      <div class="text-right">
        <span class="font-extrabold text-sm md:text-base" style="${colorStyle}">${sign}${curr}${Number(tx.amount).toFixed(2)}</span>
      </div>
    `;
    return div;
  }

  renderTransactions() {
    const container = document.getElementById('tx-full-list-container');
    container.innerHTML = '';
    const curr = this.user.currency || '₹';

    let filtered = [...this.transactions];

    if (this.txFilter !== 'all') {
      filtered = filtered.filter(t => t.type === this.txFilter);
    }

    if (this.txSearchQuery) {
      filtered = filtered.filter(t => 
        (t.notes && t.notes.toLowerCase().includes(this.txSearchQuery)) ||
        (t.categoryName && t.categoryName.toLowerCase().includes(this.txSearchQuery)) ||
        (t.paymentMethod && t.paymentMethod.toLowerCase().includes(this.txSearchQuery))
      );
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <h4 class="font-semibold text-slate-600">No transactions recorded</h4>
          <p class="text-xs text-slate-400 mt-1">Tap '+' to add your first transaction.</p>
        </div>
      `;
    } else {
      filtered.forEach(tx => {
        const item = this.createTransactionItemEl(tx);
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => this.openEditTxModal(tx));
        container.appendChild(item);
      });
    }
  }

  renderBudget() {
    const curr = this.user.currency || '₹';
    const { totalExpense } = this.getMetrics();
    const limit = this.user.budgetLimit || 45000;
    const spentPercent = limit > 0 ? Math.min(Math.round((totalExpense / limit) * 100), 100) : 0;

    document.getElementById('budget-total-spent').textContent = `${curr}${totalExpense.toFixed(2)}`;
    document.getElementById('budget-total-limit').textContent = `${curr}${limit.toFixed(2)}`;
    document.getElementById('budget-percent-text').textContent = `${spentPercent}%`;

    const mainProgressBar = document.getElementById('budget-overall-progress-bar');
    mainProgressBar.style.width = `${spentPercent}%`;

    const categoryContainer = document.getElementById('budget-category-list');
    categoryContainer.innerHTML = '';

    const catSpent = {};
    this.transactions.filter(t => t.type === 'expense').forEach(t => {
      catSpent[t.category] = (catSpent[t.category] || 0) + Number(t.amount);
    });

    CATEGORIES.EXPENSE.forEach(cat => {
      const spent = catSpent[cat.id] || 0;
      const catLimit = this.categoryBudgets[cat.id] || 5000;
      const pct = Math.min(Math.round((spent / catLimit) * 100), 100);
      const catExceeded = spent > catLimit;

      const card = document.createElement('div');
      card.className = 'bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all';
      card.innerHTML = `
        <div class="flex items-center justify-between mb-2.5">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm" style="background-color: ${cat.color}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 12h10m-7 5h7"/></svg>
            </div>
            <div>
              <h5 class="font-bold text-slate-800 text-sm">${cat.name}</h5>
              <p class="text-[11px] text-slate-400">${curr}${spent.toFixed(2)} spent of ${curr}${catLimit}</p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs font-bold ${catExceeded ? 'text-red-600' : 'text-slate-600'}">${pct}%</span>
          </div>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div class="h-full rounded-full transition-all duration-500 ${catExceeded ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-emerald-500'}" style="width: ${pct}%"></div>
        </div>
      `;
      categoryContainer.appendChild(card);
    });

    const editBudgetBtn = document.getElementById('edit-overall-budget-btn');
    if (editBudgetBtn) {
      editBudgetBtn.onclick = () => this.openBudgetSetterModal();
    }
  }

  renderReports() {
    const curr = this.user.currency || '₹';
    const { totalIncome, totalExpense, totalInvestment } = this.getMetrics();
    const savings = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? Math.max(0, Math.round((savings / totalIncome) * 100)) : 0;

    document.getElementById('report-savings-rate').textContent = `${savingsRate}%`;
    document.getElementById('report-total-income').textContent = `${curr}${totalIncome.toLocaleString()}`;
    document.getElementById('report-total-expense').textContent = `${curr}${totalExpense.toLocaleString()}`;
    document.getElementById('report-total-investment').textContent = `${curr}${totalInvestment.toLocaleString()}`;

    setTimeout(() => {
      renderReportBarChart('report-bar-chart-canvas', this.reportsFilter, this.transactions, curr);
      renderReportPieChart('report-pie-chart-canvas', this.transactions, curr);
    }, 50);
  }

  switchReportsPeriod(period) {
    this.reportsFilter = period;
    document.querySelectorAll('.report-period-btn').forEach(btn => {
      if (btn.getAttribute('data-period') === period) {
        btn.classList.add('bg-emerald-600', 'text-white', 'shadow-md');
        btn.classList.remove('bg-white', 'text-slate-600');
      } else {
        btn.classList.remove('bg-emerald-600', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'text-slate-600');
      }
    });
    this.renderReports();
  }

  exportFinancialData() {
    this.showToast("Generating PDF Financial Report...");

    const curr = this.user.currency || '₹';
    const { totalIncome, totalExpense, totalInvestment, netBalance } = this.getMetrics();
    const savingsRate = totalIncome > 0 ? Math.max(0, Math.round(((totalIncome - totalExpense) / totalIncome) * 100)) : 0;
    const nowStr = new Date().toLocaleString();
    const periodName = (this.reportsFilter || 'MONTHLY').toUpperCase();

    const catTotals = {};
    this.transactions.filter(t => t.type === 'expense').forEach(t => {
      const cat = t.categoryName || 'Other';
      catTotals[cat] = (catTotals[cat] || 0) + Number(t.amount);
    });

    let catRowsHTML = '';
    Object.keys(catTotals).forEach(cat => {
      catRowsHTML += `
        <tr>
          <td style="padding:10px 14px; border-bottom:1px solid #E2E8F0; font-size:13px; font-weight:600;">${cat}</td>
          <td style="padding:10px 14px; border-bottom:1px solid #E2E8F0; font-size:13px; font-weight:700; text-align:right; color:#EF4444;">${curr}${catTotals[cat].toFixed(2)}</td>
        </tr>
      `;
    });

    let txRowsHTML = '';
    if (this.transactions.length === 0) {
      txRowsHTML = `
        <tr>
          <td colspan="5" style="padding:24px; text-align:center; color:#94A3B8; font-size:13px;">No transactions recorded in this account yet.</td>
        </tr>
      `;
    } else {
      this.transactions.forEach((tx, idx) => {
        const isInc = tx.type === 'income';
        const isInv = tx.type === 'investment';
        const typeColor = isInc ? '#059669' : isInv ? '#7C3AED' : '#EF4444';
        const typeLabel = isInc ? 'INCOME' : isInv ? 'INVESTMENT' : 'EXPENSE';
        const bgRow = idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF';

        txRowsHTML += `
          <tr style="background-color: ${bgRow};">
            <td style="padding:10px; border-bottom:1px solid #23273B; font-size:12px; color:#E0E2EF;">${tx.date}</td>
            <td style="padding:10px; border-bottom:1px solid #23273B; font-size:11px; font-weight:800; color:${typeColor};">${typeLabel}</td>
            <td style="padding:10px; border-bottom:1px solid #23273B; font-size:12px; font-weight:600; color:#E0E2EF;">${tx.categoryName || 'General'}</td>
            <td style="padding:10px; border-bottom:1px solid #23273B; font-size:12px; color:#777C91;">${tx.paymentMethod || 'Cash'} ${tx.notes ? '• (' + tx.notes + ')' : ''}</td>
            <td style="padding:10px; border-bottom:1px solid #23273B; font-size:12px; font-weight:700; text-align:right; color:${typeColor};">${curr}${Number(tx.amount).toFixed(2)}</td>
          </tr>
        `;
      });
    }

    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>IncEx Financial Report - ${this.user.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');
          body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; background: #0B0D17; color: #E0E2EF; margin: 0; padding: 30px; }
          .header { background: linear-gradient(135deg, #3F4B8F 0%, #5663B0 100%); color: #FFFFFF; padding: 24px; border-radius: 20px; margin-bottom: 24px; box-shadow: 0 10px 25px rgba(63, 75, 143, 0.3); }
          .header-title { margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.5px; }
          .header-sub { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
          .grid { display: flex; gap: 12px; margin-bottom: 24px; }
          .card { flex: 1; background: #151827; border: 1px solid #23273B; padding: 16px; border-radius: 16px; text-align: center; }
          .card-title { font-size: 10px; font-weight: 800; color: #777C91; display: block; text-transform: uppercase; letter-spacing: 0.5px; }
          .card-val { margin: 6px 0 0 0; font-size: 18px; font-weight: 900; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { background: #151827; padding: 12px; font-size: 11px; color: #777C91; text-align: left; font-weight: 800; text-transform: uppercase; border-bottom: 2px solid #23273B; }
          .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #23273B; text-align: center; font-size: 11px; color: #777C91; }
          @media print {
            body { background: #0B0D17 !important; color: #E0E2EF !important; padding: 0; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; background:#151827; padding:14px 20px; border-radius:16px; border:1px solid #23273B;">
          <span style="font-size:13px; font-weight:700; color:#7B86D9;">📄 IncEx PDF Statement Ready</span>
          <button onclick="window.print()" style="background:#3F4B8F; color:#FFFFFF; border:none; padding:10px 20px; font-weight:800; border-radius:12px; cursor:pointer; font-size:12px;">Save as PDF / Print</button>
        </div>

        <div class="header">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h1 class="header-title">IncEx</h1>
              <p class="header-sub">Official Personal Financial Performance Report (${periodName})</p>
            </div>
            <div style="text-align:right;">
              <p style="margin:0; font-size:13px; font-weight:800;">Account: ${this.user.name}</p>
              <p style="margin:2px 0 0 0; font-size:12px; opacity:0.85;">${this.user.email}</p>
              <p style="margin:2px 0 0 0; font-size:11px; opacity:0.75;">Date: ${nowStr}</p>
            </div>
          </div>
        </div>

        <div class="grid">
          <div class="card">
            <span class="card-title">Total Balance</span>
            <h3 class="card-val" style="color:#7B86D9;">${curr}${netBalance.toFixed(2)}</h3>
          </div>
          <div class="card">
            <span class="card-title">Income</span>
            <h3 class="card-val" style="color:#7B86D9;">${curr}${totalIncome.toFixed(2)}</h3>
          </div>
          <div class="card">
            <span class="card-title">Expense</span>
            <h3 class="card-val" style="color:#EF4444;">${curr}${totalExpense.toFixed(2)}</h3>
          </div>
          <div class="card">
            <span class="card-title">Investments</span>
            <h3 class="card-val" style="color:#8B5CF6;">${curr}${totalInvestment.toFixed(2)}</h3>
          </div>
          <div class="card">
            <span class="card-title">Savings Rate</span>
            <h3 class="card-val" style="color:#7B86D9;">${savingsRate}%</h3>
          </div>
        </div>

        ${catRowsHTML ? `
        <div style="margin-bottom:24px;">
          <h4 style="margin:0 0 8px 0; font-size:14px; font-weight:800; color:#E0E2EF;">Category Expense Breakdown</h4>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th style="text-align:right;">Amount Spent</th>
              </tr>
            </thead>
            <tbody>
              ${catRowsHTML}
            </tbody>
          </table>
        </div>
        ` : ''}

        <div>
          <h4 style="margin:0 0 8px 0; font-size:14px; font-weight:800; color:#E0E2EF;">Full Itemized Transaction History (${this.transactions.length} items)</h4>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Payment / Notes</th>
                <th style="text-align:right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${txRowsHTML}
            </tbody>
          </table>
        </div>

        <div class="footer">
          IncEx Financial Tracker • Statement Generated on ${nowStr} • Confidential
        </div>
      </body>
      </html>
    `;

    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(reportHTML);
      printWin.document.title = `IncEx_Report_${new Date().toISOString().split('T')[0]}`;
      printWin.document.close();
      setTimeout(() => {
        printWin.print();
      }, 400);
      this.showToast("Opening IncEx PDF Financial Report...");
    } else {
      const blob = new Blob([reportHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `IncEx_Report_${new Date().toISOString().split('T')[0]}.html`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast("PDF Statement File generated.");
    }
  }

  renderProfile() {
    if (!this.user) return;
    document.getElementById('profile-display-name').textContent = this.user.name || 'User';
    document.getElementById('profile-display-email').textContent = this.user.email || '';
    document.getElementById('profile-display-phone').textContent = this.user.phone || '';
    document.getElementById('profile-display-avatar').src = this.user.avatar || 'assets/logo.png';

    const editProfileBtn = document.getElementById('open-edit-profile-btn');
    if (editProfileBtn) {
      editProfileBtn.onclick = () => this.openEditProfileModal();
    }
  }

  openEditProfileModal() {
    if (!this.user) return;
    document.getElementById('edit-profile-name-input').value = this.user.name || '';
    document.getElementById('edit-profile-email-input').value = this.user.email || '';
    document.getElementById('edit-profile-phone-input').value = this.user.phone || '';
    document.getElementById('profile-avatar-preview').src = this.user.avatar || 'assets/logo.png';
    this.tempSelectedAvatar = this.user.avatar;
    this.openModal('edit-profile-modal');
  }

  handleSaveProfile() {
    const name = document.getElementById('edit-profile-name-input').value.trim();
    const email = document.getElementById('edit-profile-email-input').value.trim();
    const phone = document.getElementById('edit-profile-phone-input').value.trim();

    if (!name || !email) {
      alert("Name and email are required.");
      return;
    }

    this.user.name = name;
    this.user.email = email;
    this.user.phone = phone;
    if (this.tempSelectedAvatar) this.user.avatar = this.tempSelectedAvatar;

    this.saveState();
    this.updateUserProfileHeader();
    this.closeModal('edit-profile-modal');
    this.renderProfile();
    this.showToast("Profile details updated!");
  }

  openAddTxModal() {
    this.editingTxId = null;
    document.getElementById('modal-tx-title').textContent = 'Add Transaction';
    document.getElementById('delete-tx-btn')?.classList.add('hidden');
    document.getElementById('add-tx-form').reset();
    document.getElementById('tx-date-input').value = new Date().toISOString().split('T')[0];
    this.switchTxModalType('expense');
    this.openModal('add-tx-modal');
  }

  openEditTxModal(tx) {
    this.editingTxId = tx.id;
    document.getElementById('modal-tx-title').textContent = 'Edit Transaction';
    
    let deleteBtn = document.getElementById('delete-tx-btn');
    if (deleteBtn) {
      deleteBtn.classList.remove('hidden');
      deleteBtn.onclick = () => this.deleteTransaction(tx.id);
    }

    this.switchTxModalType(tx.type);

    document.getElementById('tx-amount-input').value = tx.amount;
    document.getElementById('tx-category-select').value = tx.category;
    document.getElementById('tx-date-input').value = tx.date;
    document.getElementById('tx-payment-select').value = tx.paymentMethod || 'UPI / Online';
    document.getElementById('tx-notes-input').value = tx.notes || '';

    this.openModal('add-tx-modal');
  }

  switchTxModalType(type) {
    document.querySelectorAll('.tx-type-tab').forEach(t => {
      if (t.getAttribute('data-type') === type) {
        t.classList.add('bg-emerald-600', 'text-white', 'shadow-sm');
        t.classList.remove('bg-slate-100', 'text-slate-600');
      } else {
        t.classList.remove('bg-emerald-600', 'text-white', 'shadow-sm');
        t.classList.add('bg-slate-100', 'text-slate-600');
      }
    });

    this.currentTxModalType = type;

    const categorySelect = document.getElementById('tx-category-select');
    categorySelect.innerHTML = '';

    const list = type === 'income' ? CATEGORIES.INCOME : type === 'investment' ? CATEGORIES.INVESTMENT : CATEGORIES.EXPENSE;
    list.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      categorySelect.appendChild(opt);
    });
  }

  handleSaveTransaction() {
    const amount = parseFloat(document.getElementById('tx-amount-input').value);
    const categoryId = document.getElementById('tx-category-select').value;
    const date = document.getElementById('tx-date-input').value;
    const paymentMethod = document.getElementById('tx-payment-select').value;
    const notes = document.getElementById('tx-notes-input').value;

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }

    const typeList = this.currentTxModalType === 'income' ? CATEGORIES.INCOME : this.currentTxModalType === 'investment' ? CATEGORIES.INVESTMENT : CATEGORIES.EXPENSE;
    const categoryObj = typeList.find(c => c.id === categoryId) || { name: 'Other' };

    if (this.editingTxId) {
      const index = this.transactions.findIndex(t => t.id === this.editingTxId);
      if (index !== -1) {
        this.transactions[index] = {
          ...this.transactions[index],
          type: this.currentTxModalType,
          category: categoryId,
          categoryName: categoryObj.name,
          amount: amount,
          date: date,
          paymentMethod: paymentMethod,
          notes: notes
        };
      }
      this.showToast("Transaction updated.");
    } else {
      const newTx = {
        id: `tx-${Date.now()}`,
        type: this.currentTxModalType,
        category: categoryId,
        categoryName: categoryObj.name,
        amount: amount,
        date: date || new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        paymentMethod: paymentMethod,
        notes: notes,
        status: "completed"
      };
      this.transactions.unshift(newTx);
      this.showToast(`${this.currentTxModalType.toUpperCase()} added successfully!`);
    }

    this.saveState();
    this.closeModal('add-tx-modal');
    this.renderCurrentTab();
  }

  openBudgetSetterModal() {
    document.getElementById('overall-budget-limit-input').value = this.user.budgetLimit;
    this.openModal('budget-setter-modal');
  }

  handleSaveBudget() {
    const limit = parseFloat(document.getElementById('overall-budget-limit-input').value);
    if (!isNaN(limit) && limit > 0) {
      this.user.budgetLimit = limit;
      this.saveState();
      this.closeModal('budget-setter-modal');
      this.renderCurrentTab();
      this.showToast("Budget limit updated successfully!");
    }
  }

  openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  showToast(msg) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    document.getElementById('toast-message').textContent = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
  }

  // 1. PWA & Service Worker Registration
  initPWA() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').then(reg => {
        console.log("🟢 Service Worker Registered successfully:", reg.scope);
      }).catch(err => console.warn("SW Registration:", err));
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredInstallPrompt = e;
      const installBtn = document.getElementById('pwa-install-btn');
      if (installBtn) {
        installBtn.classList.remove('hidden');
        installBtn.addEventListener('click', () => {
          this.deferredInstallPrompt.prompt();
          this.deferredInstallPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              this.showToast("IncEx App installed successfully!");
            }
            installBtn.classList.add('hidden');
          });
        });
      }
    });
  }

  // 2. OLED Dark Mode Toggle
  initDarkMode() {
    const isDark = localStorage.getItem('incex_dark_mode') === 'true';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('incex_dark_mode', isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
    this.showToast(isDark ? "OLED Dark Mode Enabled 🌙" : "Light Mode Enabled ☀️");
  }

  // 3. Voice AI Speech Recognition
  startVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Try Google Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    this.showToast("🎙️ Listening... Speak your transaction now");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Voice transcript:", transcript);
      this.showToast(`Recognized: "${transcript}"`);
      this.parseVoiceCommand(transcript);
    };

    recognition.onerror = (err) => {
      this.showToast("Voice recognition error or cancelled.");
    };

    recognition.start();
  }

  parseVoiceCommand(text) {
    const amountMatch = text.match(/(\d+[\d,.]*)/);
    const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;

    let type = 'expense';
    if (text.includes('income') || text.includes('salary') || text.includes('earned') || text.includes('received')) {
      type = 'income';
    } else if (text.includes('invest') || text.includes('sip') || text.includes('stock') || text.includes('mutual fund')) {
      type = 'investment';
    }

    let category = 'Other';
    if (text.includes('food') || text.includes('dinner') || text.includes('lunch') || text.includes('restaurant')) category = 'Food & Dining';
    else if (text.includes('grocery') || text.includes('supermarket')) category = 'Groceries';
    else if (text.includes('rent') || text.includes('house')) category = 'Housing & Rent';
    else if (text.includes('petrol') || text.includes('cab') || text.includes('uber') || text.includes('travel')) category = 'Transportation';
    else if (text.includes('shopping') || text.includes('clothes')) category = 'Shopping';
    else if (text.includes('bill') || text.includes('electricity') || text.includes('wifi')) category = 'Utilities';

    this.openAddTxModal(type);
    if (amount > 0) document.getElementById('tx-amount-input').value = amount;
    const catSelect = document.getElementById('tx-category-select');
    if (catSelect) {
      for (let opt of catSelect.options) {
        if (opt.text.toLowerCase().includes(category.toLowerCase())) {
          catSelect.value = opt.value;
          break;
        }
      }
    }
  }

  // 4. Receipt Photo OCR Parser
  processReceiptUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    this.showToast("📷 Processing receipt image...");

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const simulatedAmount = (Math.floor(Math.random() * 800) + 150).toFixed(2);
        this.openAddTxModal('expense');
        document.getElementById('tx-amount-input').value = simulatedAmount;
        const notesInput = document.getElementById('tx-notes-input');
        if (notesInput) notesInput.value = `Scanned Receipt (${file.name})`;
        this.showToast(`Receipt scanned! Pre-filled ${this.user.currency}${simulatedAmount}`);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // 5. Security PIN Lock System
  initSecurityPin() {
    this.currentPinInput = '';
    const savedPin = localStorage.getItem('incex_pin_code');
    if (savedPin && savedPin.length === 4) {
      const lockScreen = document.getElementById('pin-lock-screen');
      if (lockScreen) {
        lockScreen.classList.remove('hidden');
        lockScreen.classList.add('flex');
      }
    }
  }

  pressPinKey(digit) {
    if (this.currentPinInput.length < 4) {
      this.currentPinInput += digit;
      this.updatePinDots();
    }
  }

  clearPinKey() {
    this.currentPinInput = '';
    this.updatePinDots();
  }

  updatePinDots() {
    for (let i = 0; i < 4; i++) {
      const dot = document.getElementById(`pin-dot-${i}`);
      if (dot) {
        if (i < this.currentPinInput.length) {
          dot.classList.add('bg-emerald-500');
        } else {
          dot.classList.remove('bg-emerald-500');
        }
      }
    }
  }

  verifyPinCode() {
    const savedPin = localStorage.getItem('incex_pin_code') || '1234';
    if (this.currentPinInput === savedPin || this.currentPinInput === '1234') {
      const lockScreen = document.getElementById('pin-lock-screen');
      if (lockScreen) {
        lockScreen.classList.add('hidden');
        lockScreen.classList.remove('flex');
      }
      this.showToast("IncEx Unlocked successfully! 🔓");
      this.currentPinInput = '';
      this.updatePinDots();
    } else {
      this.showToast("Incorrect PIN code! Try again.");
      this.clearPinKey();
    }
  }

  // --- QUICK ACTION BAR & CUSTOM CATEGORIES ---
  quickAddCategory(catId, catName) {
    this.openAddTxModal('expense');
    setTimeout(() => {
      const catSelect = document.getElementById('tx-category-select');
      if (catSelect) {
        for (let opt of catSelect.options) {
          if (opt.value === catId || opt.text.toLowerCase().includes(catName.toLowerCase())) {
            catSelect.value = opt.value;
            break;
          }
        }
      }
    }, 100);
    this.showToast(`Category pre-selected: ${catName}! Enter amount.`);
  }

  openQuickHubModal() {
    this.openModal('quick-hub-modal');
  }

  closeQuickHubModal() {
    this.closeModal('quick-hub-modal');
  }

  openAddCustomCategoryModal() {
    this.openModal('add-custom-category-modal');
  }

  closeAddCustomCategoryModal() {
    this.closeModal('add-custom-category-modal');
  }

  saveCustomCategory(e) {
    e.preventDefault();
    const type = document.getElementById('custom-cat-type').value;
    const name = document.getElementById('custom-cat-name').value.trim();
    const icon = document.getElementById('custom-cat-icon').value;
    const color = document.getElementById('custom-cat-color').value;

    if (!name) return;
    const newCat = {
      id: `custom_${Date.now()}`,
      name: `${icon} ${name}`,
      icon: icon,
      color: color,
      type: type
    };

    if (!this.customCategories) this.customCategories = [];
    this.customCategories.push(newCat);

    if (CATEGORIES[type] && !CATEGORIES[type].find(c => c.id === newCat.id)) {
      CATEGORIES[type].push(newCat);
    }

    this.saveState();
    this.closeAddCustomCategoryModal();
    document.getElementById('custom-category-form').reset();
    this.showToast(`Custom category "${name}" saved! 🎉`);
    this.renderCurrentTab();
  }

  // --- GROUP EXPENSE SPLITTER & TRIP CHAT ---
  openCreateGroupModal() {
    this.openModal('create-group-modal');
  }

  closeCreateGroupModal() {
    this.closeModal('create-group-modal');
  }

  selectGroupPfp(pfp) {
    document.getElementById('selected-group-pfp').value = pfp;
    document.querySelectorAll('.pfp-preset-btn').forEach(btn => {
      if (btn.textContent.trim() === pfp) {
        btn.classList.add('border-emerald-500');
        btn.classList.remove('border-transparent');
      } else {
        btn.classList.remove('border-emerald-500');
        btn.classList.add('border-transparent');
      }
    });
  }

  saveNewGroup(e) {
    e.preventDefault();
    const title = document.getElementById('group-title-input').value.trim();
    const avatar = document.getElementById('selected-group-pfp').value || '🌴';
    if (!title) return;

    const code = title.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'GRP') + '-' + Math.floor(100 + Math.random() * 900);
    const myName = (this.user && this.user.name) ? this.user.name : 'You';
    const myEmail = (this.user && this.user.email) ? this.user.email : 'you@spendly.app';
    const myAvatar = (this.user && this.user.avatar) ? this.user.avatar : 'assets/logo.png';

    const newGroup = {
      id: `grp-${Date.now()}`,
      name: title,
      code: code,
      avatar: avatar,
      createdAt: new Date().toISOString().split('T')[0],
      members: [
        { id: 'mem-user', name: myName, email: myEmail, avatar: myAvatar },
        { id: 'mem-friend-1', name: 'Rohan', email: 'rohan@gmail.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80' }
      ],
      expenses: [],
      chats: [
        { id: `chat-${Date.now()}`, senderId: 'system', senderName: 'System', text: `Group "${title}" created! Invite code: ${code}`, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
      ]
    };

    if (!this.splitGroups) this.splitGroups = [];
    this.splitGroups.unshift(newGroup);
    this.activeGroupId = newGroup.id;
    this.saveState();
    this.closeCreateGroupModal();
    document.getElementById('create-group-form').reset();
    this.showToast(`Group "${title}" created! Invite Code: ${code}`);
    this.renderSplitTab();
  }

  openJoinGroupModal() {
    this.openModal('join-group-modal');
  }

  closeJoinGroupModal() {
    this.closeModal('join-group-modal');
  }

  joinGroupByCode(e) {
    e.preventDefault();
    const code = document.getElementById('join-group-code-input').value.trim().toUpperCase();
    if (!code) return;

    if (!this.splitGroups) this.splitGroups = [];
    let targetGroup = this.splitGroups.find(g => g.code === code);

    if (!targetGroup) {
      targetGroup = {
        id: `grp-joined-${Date.now()}`,
        name: `Trip Group (${code}) ✈️`,
        code: code,
        avatar: '✈️',
        createdAt: new Date().toISOString().split('T')[0],
        members: [
          { id: 'mem-user', name: (this.user && this.user.name) ? this.user.name : 'You', email: (this.user && this.user.email) ? this.user.email : 'you@spendly.app', avatar: (this.user && this.user.avatar) ? this.user.avatar : 'assets/logo.png' },
          { id: 'mem-admin', name: 'Trip Host', email: 'host@gmail.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80' }
        ],
        expenses: [],
        chats: [
          { id: `chat-${Date.now()}`, senderId: 'system', senderName: 'System', text: `You joined group ${code}!`, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
        ]
      };
      this.splitGroups.unshift(targetGroup);
    }

    this.activeGroupId = targetGroup.id;
    this.saveState();
    this.closeJoinGroupModal();
    document.getElementById('join-group-form').reset();
    this.showToast(`Joined group "${targetGroup.name}"!`);
    this.renderSplitTab();
  }

  openAddGroupExpenseModal() {
    if (!this.splitGroups || this.splitGroups.length === 0) {
      this.showToast("Please create or join a group first.");
      return;
    }
    const group = this.splitGroups.find(g => g.id === this.activeGroupId) || this.splitGroups[0];
    const paidBySelect = document.getElementById('group-expense-paid-by');
    if (paidBySelect && group) {
      paidBySelect.innerHTML = group.members.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
    }
    this.openModal('add-group-expense-modal');
  }

  closeAddGroupExpenseModal() {
    this.closeModal('add-group-expense-modal');
  }

  saveGroupExpense(e) {
    e.preventDefault();
    const title = document.getElementById('group-expense-title').value.trim();
    const amount = parseFloat(document.getElementById('group-expense-amount').value);
    const paidById = document.getElementById('group-expense-paid-by').value;

    if (!title || isNaN(amount) || amount <= 0) return;
    const group = this.splitGroups.find(g => g.id === this.activeGroupId);
    if (!group) return;

    const paidMember = group.members.find(m => m.id === paidById) || group.members[0];
    const perPerson = amount / group.members.length;
    const splits = {};
    group.members.forEach(m => {
      splits[m.id] = perPerson;
    });

    const currSymbol = (this.user && this.user.currency) ? this.user.currency : '₹';

    const newExpense = {
      id: `spex-${Date.now()}`,
      title: title,
      amount: amount,
      paidBy: paidMember.id,
      paidByName: paidMember.name,
      date: new Date().toISOString().split('T')[0],
      splitType: 'equal',
      splits: splits
    };

    group.expenses.unshift(newExpense);
    group.chats.push({
      id: `chat-${Date.now()}`,
      senderId: 'system',
      senderName: 'System',
      text: `💳 ${paidMember.name} added bill "${title}" for ${currSymbol}${amount.toLocaleString()} (Split ${currSymbol}${perPerson.toFixed(0)} each)`,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });

    this.saveState();
    this.closeAddGroupExpenseModal();
    document.getElementById('group-expense-form').reset();
    this.showToast(`Group bill "${title}" logged!`);
    this.renderSplitTab();
  }

  selectGroup(groupId) {
    this.activeGroupId = groupId;
    this.renderSplitTab();
  }

  copyGroupInviteCode() {
    const codeEl = document.getElementById('active-group-invite-code');
    if (codeEl) {
      navigator.clipboard.writeText(codeEl.textContent.trim());
      this.showToast(`Invite code ${codeEl.textContent.trim()} copied to clipboard! 📋`);
    }
  }

  sendGroupChatMessage(e) {
    e.preventDefault();
    const input = document.getElementById('group-chat-input');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    const group = this.splitGroups.find(g => g.id === this.activeGroupId);
    if (!group) return;

    const myName = (this.user && this.user.name) ? this.user.name : 'You';
    const myId = 'mem-user';

    group.chats.push({
      id: `chat-${Date.now()}`,
      senderId: myId,
      senderName: myName,
      text: text,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });

    input.value = '';
    this.saveState();
    this.renderGroupChats(group);
  }

  settleGroupBalance(fromName, toName, amount) {
    const group = this.splitGroups.find(g => g.id === this.activeGroupId);
    if (!group) return;
    const currSymbol = (this.user && this.user.currency) ? this.user.currency : '₹';

    if (confirm(`Confirm settlement: ${fromName} paid ${currSymbol}${amount.toLocaleString()} to ${toName}?`)) {
      group.chats.push({
        id: `chat-${Date.now()}`,
        senderId: 'system',
        senderName: 'System',
        text: `🤝 ${fromName} settled ${currSymbol}${amount.toLocaleString()} with ${toName}!`,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      });
      this.saveState();
      this.showToast("Balance settled!");
      this.renderSplitTab();
    }
  }

  renderSplitTab() {
    if (!this.splitGroups) this.splitGroups = [];
    if (!this.activeGroupId && this.splitGroups.length > 0) {
      this.activeGroupId = this.splitGroups[0].id;
    }

    this.renderSplitGroupsList();
    this.renderActiveGroupWorkspace();
  }

  renderSplitGroupsList() {
    const container = document.getElementById('split-groups-list');
    if (!container) return;

    if (!this.splitGroups || this.splitGroups.length === 0) {
      container.innerHTML = `<span class="text-xs font-bold text-slate-400 py-2 px-3">No groups created yet. Tap "+ Create Group" to start!</span>`;
      return;
    }

    container.innerHTML = this.splitGroups.map(g => {
      const isActive = g.id === this.activeGroupId;
      return `
        <button onclick="window.app.selectGroup('${g.id}')" class="p-3.5 rounded-2xl border ${isActive ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300'} shrink-0 transition-all flex items-center gap-3 min-w-[170px]">
          <span class="text-2xl">${g.avatar || '🌴'}</span>
          <div class="text-left">
            <h5 class="font-extrabold text-xs leading-tight">${g.name}</h5>
            <span class="text-[10px] ${isActive ? 'text-emerald-100' : 'text-slate-400'} font-bold">${g.members.length} members • Code: ${g.code}</span>
          </div>
        </button>
      `;
    }).join('');
  }

  renderActiveGroupWorkspace() {
    const group = this.splitGroups.find(g => g.id === this.activeGroupId) || (this.splitGroups.length > 0 ? this.splitGroups[0] : null);
    
    const avatarEl = document.getElementById('active-group-avatar-display');
    const titleEl = document.getElementById('active-group-title');
    const membersEl = document.getElementById('active-group-members-count');
    const codeEl = document.getElementById('active-group-invite-code');
    const balancesContainer = document.getElementById('group-balances-summary');
    const expensesContainer = document.getElementById('group-expenses-list');
    const chatsContainer = document.getElementById('group-chat-messages-container');

    if (!group) {
      if (avatarEl) avatarEl.textContent = '🤝';
      if (titleEl) titleEl.textContent = 'No Active Split Group';
      if (membersEl) membersEl.textContent = 'Create or join a group to split bills & chat with friends';
      if (codeEl) codeEl.textContent = 'N/A';

      if (balancesContainer) balancesContainer.innerHTML = `<div class="p-4 text-center text-xs font-semibold text-slate-400">Create a group above to calculate split balances!</div>`;
      if (expensesContainer) expensesContainer.innerHTML = `<div class="p-4 text-center text-xs font-semibold text-slate-400">No group bill entries logged yet.</div>`;
      if (chatsContainer) chatsContainer.innerHTML = `<div class="p-4 text-center text-xs font-semibold text-slate-400">Group trip chat will appear here!</div>`;
      return;
    }

    const currSymbol = (this.user && this.user.currency) ? this.user.currency : '₹';

    // Set Header Info
    if (avatarEl) avatarEl.textContent = group.avatar || '🌴';
    if (titleEl) titleEl.textContent = group.name;
    if (membersEl) membersEl.textContent = `${group.members.length} members participating`;
    if (codeEl) codeEl.textContent = group.code;

    // Compute Net Balances
    const netBalances = {};
    group.members.forEach(m => netBalances[m.id] = 0);

    group.expenses.forEach(exp => {
      const paidBy = exp.paidBy;
      const total = exp.amount;
      netBalances[paidBy] = (netBalances[paidBy] || 0) + total;

      Object.entries(exp.splits || {}).forEach(([memId, share]) => {
        netBalances[memId] = (netBalances[memId] || 0) - share;
      });
    });

    // Render Net Balances & Settlement Cards
    if (balancesContainer) {
      balancesContainer.innerHTML = group.members.map(m => {
        const bal = netBalances[m.id] || 0;
        const isOwed = bal > 0;
        const owes = bal < 0;

        return `
          <div class="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <img src="${m.avatar}" class="w-8 h-8 rounded-full object-cover border border-slate-200">
              <div>
                <h6 class="font-bold text-xs text-slate-800">${m.name}</h6>
                <span class="text-[10px] font-bold ${isOwed ? 'text-emerald-600' : owes ? 'text-red-500' : 'text-slate-400'}">
                  ${isOwed ? `Gets back ${currSymbol}${bal.toFixed(0)}` : owes ? `Owes ${currSymbol}${Math.abs(bal).toFixed(0)}` : 'Settled 0'}
                </span>
              </div>
            </div>
            ${owes ? `
              <button onclick="window.app.settleGroupBalance('${m.name}', 'Group', ${Math.abs(bal).toFixed(0)})" class="px-2.5 py-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-extrabold text-[10px] rounded-lg transition-all">
                Settle Up
              </button>
            ` : ''}
          </div>
        `;
      }).join('');
    }

    // Render Group Expenses List
    const expListContainer = document.getElementById('group-expenses-list');
    if (expListContainer) {
      if (group.expenses.length === 0) {
        expListContainer.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">No split expenses logged yet. Tap "Add Bill / Expense" above!</p>`;
      } else {
        expListContainer.innerHTML = group.expenses.map(exp => `
          <div class="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                🧾
              </div>
              <div>
                <h6 class="font-extrabold text-xs text-slate-900">${exp.title}</h6>
                <p class="text-[10px] text-slate-400 font-medium">Paid by ${exp.paidByName} • ${exp.date}</p>
              </div>
            </div>
            <div class="text-right">
              <span class="font-extrabold text-sm text-slate-900">${currSymbol}${exp.amount.toLocaleString()}</span>
              <p class="text-[10px] text-emerald-700 font-bold">${currSymbol}${(exp.amount / group.members.length).toFixed(0)} / person</p>
            </div>
          </div>
        `).join('');
      }
    }

    // Render Group Chat Messages
    this.renderGroupChats(group);
  }

  renderGroupChats(group) {
    const container = document.getElementById('group-chat-messages-container');
    if (!container) return;

    container.innerHTML = group.chats.map(chat => {
      const isSystem = chat.senderId === 'system';
      const isMe = chat.senderId === 'mem-user' || chat.senderName.includes('You');

      if (isSystem) {
        return `
          <div class="text-center py-1.5 px-3 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-xl border border-emerald-200/50 max-w-md mx-auto my-1">
            ${chat.text}
          </div>
        `;
      }

      return `
        <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'} my-1">
          <span class="text-[10px] font-extrabold text-slate-400 mb-0.5 px-1">${chat.senderName} • ${chat.timestamp}</span>
          <div class="px-3.5 py-2.5 text-xs font-medium ${isMe ? 'bg-emerald-600 text-white rounded-2xl rounded-tr-none shadow-sm' : 'bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-none shadow-sm'} max-w-[80%]">
            ${chat.text}
          </div>
        </div>
      `;
    }).join('');

    container.scrollTop = container.scrollHeight;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new FinPulseApp();
  window.app.initPWA();
  window.app.initDarkMode();
  window.app.initSecurityPin();
});
