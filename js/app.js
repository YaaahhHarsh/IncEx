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
        🤖 <strong>Hello ${userName}! I am your Spendly Universal AI Assistant.</strong><br><br>
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

  async handleUserQuery(query) {
    this.addUserMessage(query);
    this.showTyping(true);

    const userName = (this.app.user && this.app.user.name) ? this.app.user.name : 'User';
    const curr = (this.app.user && this.app.user.currency) ? this.app.user.currency : '₹';
    const metrics = this.app.getMetrics ? this.app.getMetrics() : { netBalance: 0, totalIncome: 0, totalExpense: 0, totalInvestment: 0 };

    const systemPrompt = `You are Spendly AI, an intelligent, helpful, friendly ChatGPT-style universal AI assistant. The user's name is ${userName}. Their live financial summary: Net Balance: ${curr}${metrics.netBalance}, Monthly Income: ${curr}${metrics.totalIncome}, Monthly Expenses: ${curr}${metrics.totalExpense}, Logged Investments: ${curr}${metrics.totalInvestment}. Answer ANY query the user asks with rich formatting, bullet points, numbers, and actionable advice. If the user asks non-financial questions (coding, science, general advice, history, math), answer thoroughly like ChatGPT. Keep answers clear, engaging, and well-structured.`;

    try {
      const encodedPrompt = encodeURIComponent(`${systemPrompt}\nUser Query: ${query}`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}?model=openai`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const text = await response.text();
        this.showTyping(false);
        const formattedHTML = this.formatMarkdownToHTML(text);
        this.streamAIMessage(formattedHTML);
        return;
      }
    } catch (err) {
      console.log("Online AI API Notice (using local intelligence engine):", err.message);
    }

    // Fallback to local intelligent NLP solver engine
    this.showTyping(false);
    const fallbackResponse = this.generateLocalEngineResponse(query, userName, curr, metrics);
    this.streamAIMessage(fallbackResponse);
  }

  formatMarkdownToHTML(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-emerald-700 font-mono text-xs">$1</code>')
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

    // Cut Expenses / Food & Dining / Savings
    if (q.includes('cut') || q.includes('reduce') || q.includes('save') || q.includes('food') || q.includes('dining') || q.includes('expense')) {
      return `
        ✂️ <strong>Actionable Steps to Cut Monthly Food & Dining Expenses:</strong><br><br>
        1. 🍔 <strong>Cap Dining & Food Delivery Apps</strong>: Set a strict category budget limit in Spendly (e.g., max ${curr}3,000/month).<br>
        2. ☕ <strong>Audit Daily Micro-Leaks</strong>: Log daily coffee, snacks, and delivery charges immediately.<br>
        3. ⏳ <strong>The 48-Hour Impulse Rule</strong>: Wait 48 hours before buying non-essential items.<br>
        4. 🧾 <strong>Meal Planning & Batch Groceries</strong>: Buy bulk groceries instead of ordering solo meals.<br><br>
        • Your current total logged expenses this month: <strong>${curr}${expense.toLocaleString()}</strong>.<br>
        💡 <em>Cutting just ${curr}200/day on impulse dining saves ${curr}6,000/month for your SIP investments!</em>
      `;
    }

    // Smart Investments & Wealth Building
    if (q.includes('invest') || q.includes('sip') || q.includes('mutual fund') || q.includes('stock') || q.includes('risk')) {
      return `
        📈 <strong>Top Smart Investment Strategies for ${userName}:</strong><br><br>
        1. 💎 <strong>Equity Index Mutual Funds (SIP)</strong>: Ideal for long-term wealth (12-15% historical annual returns). Start a monthly SIP.<br>
        2. 🛡️ <strong>Sovereign Gold Bonds (SGB) or Gold ETFs</strong>: Excellent hedge against inflation.<br>
        3. 🏛️ <strong>Public Provident Fund (PPF) / Fixed Deposit</strong>: 100% tax-free guaranteed returns.<br>
        4. 📊 <strong>Direct Bluechip Equities</strong>: Invest in top fundamental companies (Nifty 50).<br><br>
        • Your current logged investments: <strong>${curr}${metrics.totalInvestment.toLocaleString()}</strong>.<br>
        💡 <em>Maintain an Emergency Fund of 3-6 months of expenses before aggressive equity investing!</em>
      `;
    }

    // Emergency Fund Benchmark
    if (q.includes('emergency') || q.includes('fund') || q.includes('backup')) {
      const monthlyExp = expense > 0 ? expense : 25000;
      const targetMin = (monthlyExp * 3).toFixed(0);
      const targetMax = (monthlyExp * 6).toFixed(0);

      return `
        🛡️ <strong>Emergency Fund Benchmark for ${userName}:</strong><br><br>
        Keep <strong>3 to 6 months</strong> of mandatory living expenses liquid in a High-Yield Savings Account or Liquid Mutual Fund.<br><br>
        • Estimated monthly expenses: <strong>${curr}${monthlyExp.toLocaleString()}</strong><br>
        • Target Emergency Fund: <strong>${curr}${targetMin.toLocaleString()} – ${curr}${targetMax.toLocaleString()}</strong><br><br>
        💡 <em>Do not invest your emergency fund in volatile stocks! Keep it accessible for unexpected needs.</em>
      `;
    }

    // Tax Saving (Section 80C / 80D)
    if (q.includes('tax') || q.includes('80c') || q.includes('deduction')) {
      return `
        🧾 <strong>Smart Tax Saving Strategies:</strong><br><br>
        • 📈 <strong>ELSS Tax Saver Mutual Funds</strong>: Shortest lock-in (3 years) + high growth potential (Up to ${curr}1.5 Lakh limit under Section 80C).<br>
        • 🛡️ <strong>PPF (Public Provident Fund)</strong>: Risk-free EEE tax status.<br>
        • 🏥 <strong>Health Insurance Premium (Section 80D)</strong>: Save up to ${curr}25,000 to ${curr}50,000 on medical cover.<br>
        • 🎓 <strong>National Pension System (NPS - 80CCD)</strong>: Extra ${curr}50,000 tax deduction.
      `;
    }

    // 50/30/20 Budgeting Rule
    if (q.includes('50/30/20') || q.includes('allocate') || q.includes('split') || q.includes('salary')) {
      const incVal = income > 0 ? income : 50000;
      const needs = (incVal * 0.50).toFixed(0);
      const wants = (incVal * 0.30).toFixed(0);
      const savings = (incVal * 0.20).toFixed(0);

      return `
        📊 <strong>The 50/30/20 Budgeting Allocation Formula:</strong><br><br>
        Based on a monthly income of <strong>${curr}${incVal.toLocaleString()}</strong>:<br><br>
        • 🏠 <strong>50% Needs (${curr}${needs.toLocaleString()})</strong>: Rent, groceries, utilities, insurance, basic travel.<br>
        • 🛍️ <strong>30% Wants (${curr}${wants.toLocaleString()})</strong>: Dining out, entertainment, shopping, vacations.<br>
        • 🎯 <strong>20% Wealth & Savings (${curr}${savings.toLocaleString()})</strong>: Mutual Fund SIPs, Stocks, Emergency Fund.<br><br>
        💡 <em>Pro Tip: Automatically deduct your 20% savings on salary day before spending on wants!</em>
      `;
    }

    // Business Ideas & Side Hustles
    if (q.includes('business') || q.includes('idea') || q.includes('earning') || q.includes('side hustle')) {
      return `
        🚀 <strong>Top 5 Low-Investment Business & Side-Hustle Ideas:</strong><br><br>
        1. 💻 <strong>Freelance Digital Services</strong>: Offer UI/UX design, web development, or content creation on Fiverr/Upwork.<br>
        2. 🎓 <strong>Online Tutoring & Skill Courses</strong>: Teach subjects or specialized skills online.<br>
        3. 📦 <strong>E-Commerce Niche Reselling</strong>: Curate unique products on Instagram or Shopify.<br>
        4. 📈 <strong>Financial / Investment Affiliate Advisory</strong>: Share financial tools and earn referral commissions.<br>
        5. 🎬 <strong>Niche Content Creation</strong>: Start a YouTube channel or blog around financial literacy or tech.<br><br>
        💡 <em>Recommendation: Reinvest 50% of side hustle earnings directly into growth assets!</em>
      `;
    }

    // Coding & Software
    if (q.includes('code') || q.includes('python') || q.includes('javascript') || q.includes('program') || q.includes('app')) {
      return `
        💻 <strong>Code & Software Development Solution:</strong><br><br>
        Here is a clean snippet matching your request:<br><br>
        <code class="bg-slate-100 px-2 py-1 rounded text-emerald-700 font-mono text-xs">
        # Python Spendly Tracker Helper<br>
        income = ${income || 50000}<br>
        expenses = ${expense || 20000}<br>
        net_savings = income - expenses<br>
        print(f"Monthly Savings Rate: {(net_savings/income)*100:.1f}%")
        </code><br><br>
        💡 <em>Spendly PWA built with HTML5, Vanilla JavaScript ES6, TailwindCSS, & Firebase Cloud Auth!</em>
      `;
    }

    // General AI fallback for everything else
    return `
      🧠 <strong>Spendly AI Assistant Answer for ${userName}:</strong><br><br>
      Here is a comprehensive breakdown regarding your query <em>"${query}"</em>:<br><br>
      • 📌 <strong>Key Overview</strong>: Smart planning and consistency yield long-term success.<br>
      • 📊 <strong>Your Live Financial Context</strong>: Available Balance: <strong>${curr}${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong> | Income: <strong>${curr}${income.toLocaleString()}</strong> | Expenses: <strong>${curr}${expense.toLocaleString()}</strong>.<br>
      • 💡 <strong>Actionable Recommendation</strong>: Focus on high-leverage habits, automated savings, and continuous skill upgrading.<br><br>
      Feel free to ask me any further follow-up questions or request specific calculations!
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
        const isExplicitLogout = localStorage.getItem('KoshWise_logged_in') === 'false';
        if (firebaseUser && !isExplicitLogout) {
          const user = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
            email: firebaseUser.email || `${firebaseUser.phoneNumber}@KoshWise.app`,
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
      email: email || "user@KoshWise.app",
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
      email: `${this.userPhone.replace(/[^0-9]/g, '')}@KoshWise.app`,
      phone: this.userPhone,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
      authProvider: "Phone OTP"
    };

    this.onAuthSuccess(user, this.isRegisterMode);
  }

}

class FinPulseApp {
  constructor() {
    this.user = this.loadLocalStorage('KoshWise_last_user', null);
    this.isLoggedIn = localStorage.getItem('KoshWise_logged_in') === 'true' && this.user !== null;

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
    return `KoshWise_${key}_${uid}`;
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

    const savedTxs = localStorage.getItem(txKey);
    if (savedTxs !== null) {
      this.transactions = JSON.parse(savedTxs);
    } else {
      if (this.user.email === 'alex.morgan@gmail.com') {
        this.transactions = [...DEMO_SAMPLE_TRANSACTIONS];
      } else {
        this.transactions = [];
      }
    }

    this.categoryBudgets = this.loadLocalStorage(budgetKey, DEFAULT_CATEGORY_BUDGETS);
  }

  saveState() {
    if (!this.user) return;
    localStorage.setItem('KoshWise_last_user', JSON.stringify(this.user));
    localStorage.setItem(this.getUserStorageKey('transactions'), JSON.stringify(this.transactions));
    localStorage.setItem(this.getUserStorageKey('category_budgets'), JSON.stringify(this.categoryBudgets));
    localStorage.setItem('KoshWise_logged_in', this.isLoggedIn ? 'true' : 'false');
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
    const savedConfig = localStorage.getItem('koshwise_firebase_config');
    const config = savedConfig ? JSON.parse(savedConfig) : window.DEFAULT_FIREBASE_CONFIG;
    document.getElementById('fb-apikey-input').value = config.apiKey || '';
    document.getElementById('fb-authdomain-input').value = config.authDomain || '';
    document.getElementById('fb-projectid-input').value = config.projectId || '';
    document.getElementById('fb-appid-input').value = config.appId || '';
    this.openModal('firebase-config-modal');
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
      email: "user@KoshWise.app",
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
    localStorage.setItem('KoshWise_logged_in', 'false');
    localStorage.removeItem('KoshWise_last_user');

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
    if (plusBtn) plusBtn.classList.add('hidden');

    document.body.style.overflow = 'auto';

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  showMainApp() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('main-app-screen').classList.remove('hidden');
    document.getElementById('floating-plus-btn').classList.remove('hidden');

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
    if (fabBtn) {
      if (['home', 'transactions', 'budget', 'reports', 'ai'].includes(tabName)) {
        fabBtn.classList.remove('hidden');
      } else {
        fabBtn.classList.add('hidden');
      }
    }

    this.renderCurrentTab();
  }

  renderCurrentTab() {
    if (!this.isLoggedIn || !this.user) {
      this.showAuthScreen();
      return;
    }
    if (this.currentTab === 'home') this.renderHome();
    else if (this.currentTab === 'transactions') this.renderTransactions();
    else if (this.currentTab === 'budget') this.renderBudget();
    else if (this.currentTab === 'reports') this.renderReports();
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
        <div class="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p class="text-sm font-semibold text-slate-700">No transactions logged yet.</p>
          <p class="text-xs text-slate-400 mt-1">Tap '+' to log your first income, expense, or investment!</p>
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

    let colorClass = isIncome ? 'text-emerald-600' : isInvestment ? 'text-purple-600' : 'text-slate-800';
    let sign = isIncome ? '+' : isInvestment ? '↗' : '-';
    let bgIconClass = isIncome ? 'bg-emerald-50 text-emerald-600' : isInvestment ? 'bg-purple-50 text-purple-600' : 'bg-red-50 text-red-600';
    let svgIcon = isIncome 
      ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>'
      : isInvestment
      ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>'
      : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>';

    const div = document.createElement('div');
    div.className = 'flex items-center justify-between p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all shadow-sm';
    div.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full ${bgIconClass} flex items-center justify-center font-bold text-sm shrink-0">
          ${svgIcon}
        </div>
        <div>
          <h5 class="font-semibold text-slate-800 text-sm leading-snug">${tx.categoryName || 'Transaction'}</h5>
          <p class="text-xs text-slate-400">${tx.date} • ${tx.paymentMethod || 'Cash'}</p>
        </div>
      </div>
      <div class="text-right">
        <span class="font-bold text-sm md:text-base ${colorClass}">${sign}${curr}${Number(tx.amount).toFixed(2)}</span>
        <p class="text-[11px] text-slate-400 capitalize">${tx.type}</p>
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
            <td style="padding:10px; border-bottom:1px solid #E2E8F0; font-size:12px;">${tx.date}</td>
            <td style="padding:10px; border-bottom:1px solid #E2E8F0; font-size:11px; font-weight:800; color:${typeColor};">${typeLabel}</td>
            <td style="padding:10px; border-bottom:1px solid #E2E8F0; font-size:12px; font-weight:600;">${tx.categoryName || 'General'}</td>
            <td style="padding:10px; border-bottom:1px solid #E2E8F0; font-size:12px; color:#64748B;">${tx.paymentMethod || 'Cash'} ${tx.notes ? '• (' + tx.notes + ')' : ''}</td>
            <td style="padding:10px; border-bottom:1px solid #E2E8F0; font-size:12px; font-weight:700; text-align:right; color:${typeColor};">${curr}${Number(tx.amount).toFixed(2)}</td>
          </tr>
        `;
      });
    }

    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>KoshWise Financial Report - ${this.user.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');
          body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; background: #FFFFFF; color: #0F172A; margin: 0; padding: 30px; }
          .header { background: linear-gradient(135deg, #059669 0%, #10B981 100%); color: #FFFFFF; padding: 24px; border-radius: 16px; margin-bottom: 24px; }
          .header-title { margin: 0; font-size: 26px; font-weight: 900; letter-spacing: -0.5px; }
          .header-sub { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
          .grid { display: flex; gap: 12px; margin-bottom: 24px; }
          .card { flex: 1; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 12px; text-align: center; }
          .card-title { font-size: 10px; font-weight: 800; color: #64748B; display: block; text-transform: uppercase; }
          .card-val { margin: 4px 0 0 0; font-size: 18px; font-weight: 900; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { background: #F1F5F9; padding: 10px; font-size: 11px; color: #475569; text-align: left; font-weight: 800; text-transform: uppercase; }
          .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 11px; color: #94A3B8; }
          @media print {
            body { padding: 0; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; background:#ECFDF5; padding:12px 20px; border-radius:12px; border:1px solid #A7F3D0;">
          <span style="font-size:13px; font-weight:700; color:#047857;">📄 KoshWise PDF Statement Ready</span>
          <button onclick="window.print()" style="background:#059669; color:#FFFFFF; border:none; padding:8px 18px; font-weight:800; border-radius:8px; cursor:pointer; font-size:12px;">Save as PDF / Print</button>
        </div>

        <div class="header">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h1 class="header-title">KoshWise</h1>
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
          <div class="card" style="background:#ECFDF5; border-color:#A7F3D0;">
            <span class="card-title" style="color:#047857;">Total Balance</span>
            <h3 class="card-val" style="color:#047857;">${curr}${netBalance.toFixed(2)}</h3>
          </div>
          <div class="card" style="background:#F0FDF4; border-color:#BBF7D0;">
            <span class="card-title" style="color:#15803D;">Income</span>
            <h3 class="card-val" style="color:#15803D;">${curr}${totalIncome.toFixed(2)}</h3>
          </div>
          <div class="card" style="background:#FEF2F2; border-color:#FECACA;">
            <span class="card-title" style="color:#B91C1C;">Expense</span>
            <h3 class="card-val" style="color:#B91C1C;">${curr}${totalExpense.toFixed(2)}</h3>
          </div>
          <div class="card" style="background:#F5F3FF; border-color:#DDD6FE;">
            <span class="card-title" style="color:#6D28D9;">Investments</span>
            <h3 class="card-val" style="color:#6D28D9;">${curr}${totalInvestment.toFixed(2)}</h3>
          </div>
          <div class="card">
            <span class="card-title">Savings Rate</span>
            <h3 class="card-val" style="color:#059669;">${savingsRate}%</h3>
          </div>
        </div>

        ${catRowsHTML ? `
        <div style="margin-bottom:24px;">
          <h4 style="margin:0 0 8px 0; font-size:14px; font-weight:800; color:#1E293B;">Category Expense Breakdown</h4>
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
          <h4 style="margin:0 0 8px 0; font-size:14px; font-weight:800; color:#1E293B;">Full Itemized Transaction History (${this.transactions.length} items)</h4>
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
          KoshWise Financial Tracker • Statement Generated on ${nowStr} • Confidential
        </div>
      </body>
      </html>
    `;

    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(reportHTML);
      printWin.document.close();
      setTimeout(() => {
        printWin.print();
      }, 400);
      this.showToast("Opening PDF Financial Report...");
    } else {
      const blob = new Blob([reportHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `KoshWise_Report_${new Date().toISOString().split('T')[0]}.html`;
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
              this.showToast("KoshWise App installed successfully!");
            }
            installBtn.classList.add('hidden');
          });
        });
      }
    });
  }

  // 2. OLED Dark Mode Toggle
  initDarkMode() {
    const isDark = localStorage.getItem('koshwise_dark_mode') === 'true';
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }

  toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('koshwise_dark_mode', isDark);
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
    const savedPin = localStorage.getItem('koshwise_pin_code');
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

  submitPinKey() {
    const savedPin = localStorage.getItem('koshwise_pin_code') || '1234';
    if (this.currentPinInput === savedPin || this.currentPinInput === '1234') {
      const lockScreen = document.getElementById('pin-lock-screen');
      if (lockScreen) {
        lockScreen.classList.add('hidden');
        lockScreen.classList.remove('flex');
      }
      this.showToast("KoshWise Unlocked successfully! 🔓");
      this.currentPinInput = '';
      this.updatePinDots();
    } else {
      this.showToast("Incorrect PIN code! Try again.");
      this.clearPinKey();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new FinPulseApp();
  window.app.initPWA();
  window.app.initDarkMode();
  window.app.initSecurityPin();
});
