let homeTrendChartInstance = null;
let homePieChartInstance = null;
let reportBarChartInstance = null;
let reportPieChartInstance = null;

const COLOR_INCOME = '#4FAF91';
const COLOR_EXPENSE = '#B85C6B';
const COLOR_ACCENT = '#7C86D4';
const COLOR_PRIMARY = '#4B5599';
const TEXT_MAIN = '#E1E3ED';
const TEXT_MUTED = '#777C91';
const BORDER_COLOR = '#252A3D';

export function renderHomeTrendChart(canvasId, transactions, currency = '₹') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const parentDiv = canvas.parentElement;
  let emptyStateContainer = document.getElementById(canvasId + '-empty');

  const hasData = transactions && Array.isArray(transactions) && transactions.length > 0;

  if (!hasData) {
    if (homeTrendChartInstance) {
      homeTrendChartInstance.destroy();
      homeTrendChartInstance = null;
    }
    canvas.style.display = 'none';

    if (!emptyStateContainer) {
      emptyStateContainer = document.createElement('div');
      emptyStateContainer.id = canvasId + '-empty';
      emptyStateContainer.className = 'flex flex-col items-center justify-center py-10 text-center space-y-3';
      emptyStateContainer.innerHTML = `
        <div class="w-12 h-12 rounded-2xl bg-[#252A3D] text-[#7C86D4] flex items-center justify-center text-xl shadow-inner">📈</div>
        <h5 class="font-bold text-sm text-[#E1E3ED]">No transactions yet</h5>
        <p class="text-xs text-[#777C91] max-w-xs">Add your first transaction to see your income and spending trends.</p>
        <button onclick="window.app.openAddTxModal('expense')" class="mt-2 px-4 py-2 bg-[#4B5599] hover:bg-[#626DB5] text-[#E1E3ED] font-bold text-xs rounded-xl shadow transition-all">
          + Add Transaction
        </button>
      `;
      parentDiv.appendChild(emptyStateContainer);
    } else {
      emptyStateContainer.style.display = 'flex';
    }
    return;
  }

  // Data exists
  canvas.style.display = 'block';
  if (emptyStateContainer) {
    emptyStateContainer.style.display = 'none';
  }

  const labels = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const incomeData = [0, 0, 0, 0, 0, 0];
  const expenseData = [0, 0, 0, 0, 0, 0];

  let currentMonthIncome = 0;
  let currentMonthExpense = 0;
  const now = new Date();
  const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  transactions.forEach(tx => {
    if (tx.date && tx.date.startsWith(currentMonthPrefix)) {
      if (tx.type === 'income') currentMonthIncome += Number(tx.amount || 0);
      if (tx.type === 'expense') currentMonthExpense += Number(tx.amount || 0);
    }
  });

  incomeData[5] = currentMonthIncome;
  expenseData[5] = currentMonthExpense;

  if (homeTrendChartInstance) {
    homeTrendChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');
  
  const incomeGradient = ctx.createLinearGradient(0, 0, 0, 300);
  incomeGradient.addColorStop(0, 'rgba(79, 175, 145, 0.35)');
  incomeGradient.addColorStop(1, 'rgba(79, 175, 145, 0.0)');

  const expenseGradient = ctx.createLinearGradient(0, 0, 0, 300);
  expenseGradient.addColorStop(0, 'rgba(184, 92, 107, 0.3)');
  expenseGradient.addColorStop(1, 'rgba(184, 92, 107, 0.0)');

  homeTrendChartInstance = new window.Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          borderColor: COLOR_INCOME,
          backgroundColor: incomeGradient,
          fill: true,
          tension: 0.4,
          borderWidth: 2.5,
          pointBackgroundColor: COLOR_INCOME,
          pointBorderColor: '#151827',
          pointBorderWidth: 2,
          pointHoverRadius: 6
        },
        {
          label: 'Expense',
          data: expenseData,
          borderColor: COLOR_EXPENSE,
          backgroundColor: expenseGradient,
          fill: true,
          tension: 0.4,
          borderWidth: 2.5,
          pointBackgroundColor: COLOR_EXPENSE,
          pointBorderColor: '#151827',
          pointBorderWidth: 2,
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
          labels: {
            usePointStyle: true,
            color: TEXT_MAIN,
            font: { family: 'Inter, sans-serif', weight: '600', size: 11 }
          }
        },
        tooltip: {
          backgroundColor: '#151827',
          titleColor: TEXT_MAIN,
          bodyColor: TEXT_MAIN,
          borderColor: BORDER_COLOR,
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${currency}${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: TEXT_MUTED, font: { family: 'Inter, sans-serif', size: 11 } }
        },
        y: {
          grid: { color: BORDER_COLOR, drawBorder: false },
          ticks: {
            color: TEXT_MUTED,
            font: { family: 'Inter, sans-serif', size: 11 },
            callback: (val) => `${currency}${val}`
          }
        }
      }
    }
  });
}

export function renderHomePieChart(canvasId, transactions, currency = '₹') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const parentDiv = canvas.parentElement;
  let emptyStateContainer = document.getElementById(canvasId + '-empty');

  const expenseTxs = (transactions && Array.isArray(transactions)) ? transactions.filter(t => t.type === 'expense') : [];

  if (expenseTxs.length === 0) {
    if (homePieChartInstance) {
      homePieChartInstance.destroy();
      homePieChartInstance = null;
    }
    canvas.style.display = 'none';

    if (!emptyStateContainer) {
      emptyStateContainer = document.createElement('div');
      emptyStateContainer.id = canvasId + '-empty';
      emptyStateContainer.className = 'flex flex-col items-center justify-center py-10 text-center space-y-3';
      emptyStateContainer.innerHTML = `
        <div class="w-12 h-12 rounded-2xl bg-[#252A3D] text-[#7C86D4] flex items-center justify-center text-xl shadow-inner">🍕</div>
        <h5 class="font-bold text-sm text-[#E1E3ED]">No expenses yet</h5>
        <p class="text-xs text-[#777C91] max-w-xs">Your spending breakdown will appear here once you add expenses.</p>
        <button onclick="window.app.openAddTxModal('expense')" class="mt-2 px-4 py-2 bg-[#4B5599] hover:bg-[#626DB5] text-[#E1E3ED] font-bold text-xs rounded-xl shadow transition-all">
          + Log Expense
        </button>
      `;
      parentDiv.appendChild(emptyStateContainer);
    } else {
      emptyStateContainer.style.display = 'flex';
    }
    return;
  }

  // Data exists
  canvas.style.display = 'block';
  if (emptyStateContainer) {
    emptyStateContainer.style.display = 'none';
  }

  const categoryTotals = {};
  expenseTxs.forEach(t => {
    const cat = t.categoryName || 'Other';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(t.amount || 0);
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);
  const bgColors = [
    COLOR_ACCENT, COLOR_INCOME, COLOR_EXPENSE, COLOR_PRIMARY,
    '#9187C4', '#5663B0', '#38BDF8', '#F59E0B'
  ];

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
        borderColor: '#151827',
        hoverOffset: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 12,
            color: TEXT_MAIN,
            font: { family: 'Inter, sans-serif', size: 11, weight: '500' }
          }
        },
        tooltip: {
          backgroundColor: '#151827',
          titleColor: TEXT_MAIN,
          bodyColor: TEXT_MAIN,
          borderColor: BORDER_COLOR,
          borderWidth: 1,
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${currency}${ctx.parsed.toLocaleString()}`
          }
        }
      }
    }
  });
}

export function renderReportBarChart(canvasId, filterType, transactions, currency = '₹') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  let labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let incomeSeries = [0, 0, 0, 0, 0, 0, 0];
  let expenseSeries = [0, 0, 0, 0, 0, 0, 0];

  if (filterType === 'weekly') {
    labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    incomeSeries = [0, 0, 0, 0];
    expenseSeries = [0, 0, 0, 0];
  } else if (filterType === 'monthly') {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    incomeSeries = [0, 0, 0, 0, 0, 0, 0, 0];
    expenseSeries = [0, 0, 0, 0, 0, 0, 0, 0];
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
          backgroundColor: COLOR_INCOME,
          borderRadius: 6
        },
        {
          label: 'Expense',
          data: expenseSeries,
          backgroundColor: COLOR_EXPENSE,
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
          labels: { color: TEXT_MAIN, font: { family: 'Inter, sans-serif', weight: '600', size: 11 } }
        },
        tooltip: {
          backgroundColor: '#151827',
          titleColor: TEXT_MAIN,
          bodyColor: TEXT_MAIN,
          borderColor: BORDER_COLOR,
          borderWidth: 1,
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${currency}${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: TEXT_MUTED } },
        y: {
          grid: { color: BORDER_COLOR, drawBorder: false },
          ticks: { color: TEXT_MUTED, callback: (val) => `${currency}${val}` }
        }
      }
    }
  });
}

export function renderReportPieChart(canvasId, transactions, currency = '₹') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const typeTotals = {
    Income: 0,
    Expense: 0,
    Investment: 0
  };

  if (transactions && Array.isArray(transactions)) {
    transactions.forEach(tx => {
      if (tx.type === 'income') typeTotals.Income += Number(tx.amount || 0);
      if (tx.type === 'expense') typeTotals.Expense += Number(tx.amount || 0);
      if (tx.type === 'investment') typeTotals.Investment += Number(tx.amount || 0);
    });
  }

  if (reportPieChartInstance) {
    reportPieChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');
  reportPieChartInstance = new window.Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Income', 'Expenses', 'Investments'],
      datasets: [{
        data: [typeTotals.Income, typeTotals.Expense, typeTotals.Investment],
        backgroundColor: [COLOR_INCOME, COLOR_EXPENSE, COLOR_ACCENT],
        borderWidth: 2,
        borderColor: '#151827'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: TEXT_MAIN, font: { family: 'Inter, sans-serif', size: 12, weight: '600' } }
        },
        tooltip: {
          backgroundColor: '#151827',
          titleColor: TEXT_MAIN,
          bodyColor: TEXT_MAIN,
          borderColor: BORDER_COLOR,
          borderWidth: 1,
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${currency}${ctx.parsed.toLocaleString()}`
          }
        }
      }
    }
  });
}
