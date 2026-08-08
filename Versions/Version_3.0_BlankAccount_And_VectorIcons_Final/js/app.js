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
        if (firebaseUser) {
          const user = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
            email: firebaseUser.email || `${firebaseUser.phoneNumber}@myexpense.app`,
            phone: firebaseUser.phoneNumber || "+91 98765 43210",
            avatar: firebaseUser.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
            authProvider: "Firebase Cloud Auth"
          };
          this.onAuthSuccess(user, this.isRegisterMode);
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
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          const user = {
            uid: result.user.uid,
            name: result.user.displayName,
            email: result.user.email,
            phone: result.user.phoneNumber || "+91 98765 43210",
            avatar: result.user.photoURL,
            authProvider: "Firebase Google OAuth"
          };
          this.onAuthSuccess(user, this.isRegisterMode);
        })
        .catch(err => {
          console.warn("Firebase Google Auth Notice:", err.message);
          const googleModal = document.getElementById('google-account-modal');
          if (googleModal) {
            googleModal.classList.remove('hidden');
            googleModal.classList.add('flex');
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
      email: email || "user@myexpense.app",
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
      email: `${this.userPhone.replace(/[^0-9]/g, '')}@myexpense.app`,
      phone: this.userPhone,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
      authProvider: "Phone OTP"
    };

    this.onAuthSuccess(user, this.isRegisterMode);
  }

  handleDemoLogin() {
    const user = {
      name: "Alex Morgan",
      email: "alex.morgan@gmail.com",
      phone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      authProvider: "Demo Access"
    };
    this.onAuthSuccess(user, false);
  }
}

class FinPulseApp {
  constructor() {
    this.user = this.loadLocalStorage('myexpense_last_user', DEFAULT_USER);
    this.isLoggedIn = localStorage.getItem('myexpense_logged_in') === 'true';

    this.currentTab = 'home';
    this.txFilter = 'all';
    this.txCategoryFilter = 'all';
    this.txSearchQuery = '';
    this.reportsFilter = 'monthly';
    this.editingTxId = null;

    if (this.isLoggedIn && this.user) {
      this.loadAccountData(this.user);
    } else {
      this.transactions = [...DEMO_SAMPLE_TRANSACTIONS];
      this.categoryBudgets = DEFAULT_CATEGORY_BUDGETS;
    }

    this.init();
  }

  getUserStorageKey(key) {
    const uid = (this.user && (this.user.uid || this.user.email)) ? (this.user.uid || this.user.email).replace(/[^a-zA-Z0-9]/g, '_') : 'guest';
    return `myexpense_${key}_${uid}`;
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
    localStorage.setItem('myexpense_last_user', JSON.stringify(this.user));
    localStorage.setItem(this.getUserStorageKey('transactions'), JSON.stringify(this.transactions));
    localStorage.setItem(this.getUserStorageKey('category_budgets'), JSON.stringify(this.categoryBudgets));
    localStorage.setItem('myexpense_logged_in', this.isLoggedIn ? 'true' : 'false');
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
    this.user = { ...this.user, ...user };
    this.isLoggedIn = true;

    if (isNewAccount) {
      this.transactions = [];
      this.categoryBudgets = DEFAULT_CATEGORY_BUDGETS;
      this.saveState();
      this.showToast(`New Blank Account Created! Welcome ${this.user.name}!`);
    } else {
      this.loadAccountData(user);
      this.saveState();
      this.showToast(`Welcome back, ${this.user.name}!`);
    }

    this.showMainApp();
  }

  handleLogout() {
    this.saveState();
    this.isLoggedIn = false;
    localStorage.setItem('myexpense_logged_in', 'false');
    
    this.showAuthScreen();
    this.showToast("Logged out successfully.");
  }

  showAuthScreen() {
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('main-app-screen').classList.add('hidden');
    document.getElementById('floating-plus-btn').classList.add('hidden');
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
    document.querySelectorAll('.user-name-display').forEach(el => el.textContent = this.user.name);
    document.querySelectorAll('.user-email-display').forEach(el => el.textContent = this.user.email);
    document.querySelectorAll('.user-avatar-display').forEach(el => el.src = this.user.avatar);
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
        link.className = 'desktop-nav-link px-4 py-2 text-xs font-bold rounded-xl text-emerald-700 bg-white shadow-sm transition-all';
      } else {
        link.className = 'desktop-nav-link px-4 py-2 text-xs font-bold rounded-xl text-slate-600 hover:text-emerald-600 transition-all';
      }
    });

    document.querySelectorAll('.tab-view-page').forEach(page => {
      page.classList.add('hidden');
    });

    const targetPage = document.getElementById(`page-${tabName}`);
    if (targetPage) targetPage.classList.remove('hidden');

    const fabBtn = document.getElementById('floating-plus-btn');
    if (fabBtn) {
      if (['home', 'transactions', 'budget', 'reports'].includes(tabName)) {
        fabBtn.classList.remove('hidden');
      } else {
        fabBtn.classList.add('hidden');
      }
    }

    this.renderCurrentTab();
  }

  renderCurrentTab() {
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
    const curr = this.user.currency || '₹';
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
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.transactions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `myexpense_report_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast("Financial Report exported successfully!");
  }

  renderProfile() {
    document.getElementById('profile-display-name').textContent = this.user.name;
    document.getElementById('profile-display-email').textContent = this.user.email;
    document.getElementById('profile-display-phone').textContent = this.user.phone;
    document.getElementById('profile-display-avatar').src = this.user.avatar;

    const editProfileBtn = document.getElementById('open-edit-profile-btn');
    if (editProfileBtn) {
      editProfileBtn.onclick = () => this.openEditProfileModal();
    }
  }

  openEditProfileModal() {
    document.getElementById('edit-profile-name-input').value = this.user.name;
    document.getElementById('edit-profile-email-input').value = this.user.email;
    document.getElementById('edit-profile-phone-input').value = this.user.phone;
    document.getElementById('profile-avatar-preview').src = this.user.avatar;
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
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new FinPulseApp();
});
