let homeTrendChartInstance = null;
let homePieChartInstance = null;
let reportBarChartInstance = null;
let reportPieChartInstance = null;

const GREEN_PRIMARY = '#10B981';
const GREEN_DARK = '#059669';
const GREEN_LIGHT = '#6EE7B7';
const RED_ACCENT = '#EF4444';
const PURPLE_ACCENT = '#8B5CF6';
const BLUE_ACCENT = '#3B82F6';
const AMBER_ACCENT = '#F59E0B';

export function renderHomeTrendChart(canvasId, transactions, currency = '$') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const labels = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const incomeData = [3800, 4100, 4200, 4000, 4770, 5450];
  const expenseData = [2100, 2400, 1950, 2300, 2100, 2070.50];

  let currentMonthIncome = 0;
  let currentMonthExpense = 0;
  const now = new Date();
  const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  transactions.forEach(tx => {
    if (tx.date.startsWith(currentMonthPrefix)) {
      if (tx.type === 'income') currentMonthIncome += Number(tx.amount);
      if (tx.type === 'expense') currentMonthExpense += Number(tx.amount);
    }
  });

  if (currentMonthIncome > 0) incomeData[5] = currentMonthIncome;
  if (currentMonthExpense > 0) expenseData[5] = currentMonthExpense;

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
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            font: { family: 'Plus Jakarta Sans, sans-serif', weight: '600' }
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${currency}${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          grid: { color: '#F1F5F9' },
          ticks: {
            callback: (val) => `${currency}${val}`
          }
        }
      }
    }
  });
}

export function renderHomePieChart(canvasId, transactions, currency = '$') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const categoryTotals = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    const cat = t.categoryName || 'Other';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(t.amount);
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  if (labels.length === 0) {
    labels.push('No Expenses');
    data.push(1);
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
        backgroundColor: [
          '#EF4444', '#F59E0B', '#8B5CF6', '#3B82F6',
          '#06B6D4', '#EC4899', '#14B8A6', '#64748B'
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverOffset: 6
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
            font: { family: 'Plus Jakarta Sans, sans-serif', size: 11, weight: '500' }
          }
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

export function renderReportBarChart(canvasId, filterType, transactions, currency = '$') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  let labels = [];
  let incomeSeries = [];
  let expenseSeries = [];

  if (filterType === 'daily') {
    labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    incomeSeries = [120, 0, 350, 0, 950, 0, 4500];
    expenseSeries = [45, 110, 65, 180, 420, 85.5, 1200];
  } else if (filterType === 'weekly') {
    labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    incomeSeries = [1500, 950, 1200, 4820];
    expenseSeries = [850, 620, 410, 1985.5];
  } else if (filterType === 'monthly') {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    incomeSeries = [3500, 3900, 3800, 4100, 4200, 4000, 4770, 5770];
    expenseSeries = [2000, 2200, 2100, 2400, 1950, 2300, 2100, 2085.5];
  } else {
    labels = ['2024', '2025', '2026 Q1', '2026 Q2', '2026 Q3'];
    incomeSeries = [42000, 48500, 11900, 12300, 16340];
    expenseSeries = [26000, 27400, 6300, 6650, 6285.5];
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
          labels: { font: { family: 'Plus Jakarta Sans, sans-serif', weight: '600' } }
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

export function renderReportPieChart(canvasId, transactions, currency = '$') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const typeTotals = {
    Income: 0,
    Expense: 0,
    Investment: 0
  };

  transactions.forEach(tx => {
    if (tx.type === 'income') typeTotals.Income += Number(tx.amount);
    if (tx.type === 'expense') typeTotals.Expense += Number(tx.amount);
    if (tx.type === 'investment') typeTotals.Investment += Number(tx.amount);
  });

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
        backgroundColor: [GREEN_PRIMARY, RED_ACCENT, PURPLE_ACCENT],
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
          labels: { font: { family: 'Plus Jakarta Sans, sans-serif', size: 12, weight: '600' } }
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
