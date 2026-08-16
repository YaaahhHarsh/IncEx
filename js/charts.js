let homeTrendChartInstance = null;
let homePieChartInstance = null;
let reportBarChartInstance = null;
let reportPieChartInstance = null;

const ACCENT_INDIGO = '#7B86D9';
const BTN_PRIMARY = '#3F4B8F';
const RED_ACCENT = '#EF4444';
const AMBER_ACCENT = '#F59E0B';
const PURPLE_ACCENT = '#8B5CF6';
const BLUE_ACCENT = '#3B82F6';
const TEAL_ACCENT = '#14B8A6';
const TEXT_MAIN = '#E0E2EF';
const TEXT_MUTED = '#777C91';
const BORDER_COLOR = '#23273B';

export function renderHomeTrendChart(canvasId, transactions, currency = '₹') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const labels = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const incomeData = [0, 0, 0, 0, 0, 0];
  const expenseData = [0, 0, 0, 0, 0, 0];

  let currentMonthIncome = 0;
  let currentMonthExpense = 0;
  const now = new Date();
  const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  if (transactions && Array.isArray(transactions)) {
    transactions.forEach(tx => {
      if (tx.date && tx.date.startsWith(currentMonthPrefix)) {
        if (tx.type === 'income') currentMonthIncome += Number(tx.amount || 0);
        if (tx.type === 'expense') currentMonthExpense += Number(tx.amount || 0);
      }
    });
  }

  incomeData[5] = currentMonthIncome;
  expenseData[5] = currentMonthExpense;

  if (homeTrendChartInstance) {
    homeTrendChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');
  
  const incomeGradient = ctx.createLinearGradient(0, 0, 0, 300);
  incomeGradient.addColorStop(0, 'rgba(123, 134, 217, 0.4)');
  incomeGradient.addColorStop(1, 'rgba(123, 134, 217, 0.0)');

  const expenseGradient = ctx.createLinearGradient(0, 0, 0, 300);
  expenseGradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
  expenseGradient.addColorStop(1, 'rgba(239, 68, 68, 0.0)');

  homeTrendChartInstance = new window.Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          borderColor: ACCENT_INDIGO,
          backgroundColor: incomeGradient,
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: ACCENT_INDIGO,
          pointBorderColor: '#151827',
          pointBorderWidth: 2,
          pointHoverRadius: 7
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
          pointBorderColor: '#151827',
          pointBorderWidth: 2,
          pointHoverRadius: 7
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            color: TEXT_MAIN,
            font: { family: 'Plus Jakarta Sans, sans-serif', weight: '700', size: 12 }
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
          ticks: { color: TEXT_MUTED, font: { family: 'Plus Jakarta Sans, sans-serif', weight: '600' } }
        },
        y: {
          grid: { color: BORDER_COLOR },
          ticks: {
            color: TEXT_MUTED,
            font: { family: 'Plus Jakarta Sans, sans-serif', weight: '600' },
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

  const categoryTotals = {};
  if (transactions && Array.isArray(transactions)) {
    transactions.filter(t => t.type === 'expense').forEach(t => {
      const cat = t.categoryName || 'Other';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(t.amount || 0);
    });
  }

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);
  let bgColors = [
    ACCENT_INDIGO, RED_ACCENT, AMBER_ACCENT, PURPLE_ACCENT,
    BLUE_ACCENT, TEAL_ACCENT, '#EC4899', '#06B6D4'
  ];

  if (labels.length === 0) {
    labels.push('No Expenses Logged');
    data.push(1);
    bgColors = ['#23273B'];
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
        borderColor: '#151827',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '74%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 12,
            color: TEXT_MAIN,
            font: { family: 'Plus Jakarta Sans, sans-serif', size: 11, weight: '600' }
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
          backgroundColor: ACCENT_INDIGO,
          borderRadius: 8
        },
        {
          label: 'Expense',
          data: expenseSeries,
          backgroundColor: RED_ACCENT,
          borderRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: TEXT_MAIN, font: { family: 'Plus Jakarta Sans, sans-serif', weight: '700' } }
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
          grid: { color: BORDER_COLOR },
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
        backgroundColor: [ACCENT_INDIGO, RED_ACCENT, PURPLE_ACCENT],
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
          labels: { color: TEXT_MAIN, font: { family: 'Plus Jakarta Sans, sans-serif', size: 12, weight: '700' } }
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
