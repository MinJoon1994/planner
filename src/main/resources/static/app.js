// State
const state = {
    currentDate: new Date(),
    viewingDate: null, // For daily modal refresh
    budgets: {},
    transactions: [],
    editingId: null,
    currentBudget: { total: 0, fixed: [] },
    userRole: null,
    // Budget Groups
    budgetGroups: [],
    currentBudgetGroupId: null,
    currentBudgetName: '로딩 중...',
    budgetStartDay: 1
};

// Constants
const API_BASE = '/api';

const EXPENSE_CATEGORIES = [
    { value: 'food', label: '식비' },
    { value: 'transport', label: '교통' },
    { value: 'living', label: '생활' },
    { value: 'personal', label: '개인' },
    { value: 'hobby', label: '취미/여가' },
    { value: 'gathering', label: '모임' },
    { value: 'other', label: '기타' }
];

const INCOME_CATEGORIES = [
    { value: 'salary', label: '월급' },
    { value: 'allowance', label: '용돈' },
    { value: 'bonus', label: '보너스' },
    { value: 'carryover', label: '이월' },
    { value: 'other', label: '기타' }
];

const FIXED_CATEGORIES = [
    { value: 'HOUSING', label: '주거' },
    { value: 'COMMUNICATION', label: '통신' },
    { value: 'UTILITIES', label: '공과금' },
    { value: 'TRANSPORT', label: '교통' },
    { value: 'SUBSCRIPTION', label: '구독' },
    { value: 'INSURANCE_FINANCE', label: '보험/금융' },
    { value: 'OTHER', label: '기타' }
];

// DOM Elements
const elements = {
    views: document.querySelectorAll('.view-section'),
    navLinks: document.querySelectorAll('.nav-links li'),
    currentMonthDisplay: document.getElementById('current-month-display'),
    prevMonthBtn: document.getElementById('prev-month'),
    nextMonthBtn: document.getElementById('next-month'),

    // Display
    totalBudget: document.getElementById('display-total-budget'),
    totalSpent: document.getElementById('display-spent'),
    remaining: document.getElementById('display-remaining'),
    dailyBudget: document.getElementById('display-daily-budget'),
    dailyDaysLeft: document.getElementById('daily-days-left'),
    todayDateText: document.getElementById('today-date-text'),

    // Charts & Lists
    chartContainer: document.getElementById('expense-trend-chart'),
    recentList: document.getElementById('recent-tx-list'),
    fullList: document.getElementById('full-tx-list-ul'),
    calendarGrid: document.getElementById('calendar-grid'),
    viewAllBtn: document.getElementById('view-all-tx'),

    // Fixed Expenses View
    fixedExpensesTableBody: document.getElementById('fixed-expenses-list-ul'),
    fixedExpensesEmpty: document.getElementById('fixed-expenses-empty'),
    modalFixedList: document.getElementById('modal-fixed-list'),

    // Filters
    searchInput: document.querySelector('.search-input'),
    categorySelect: document.querySelector('.category-select'),

    // Modals
    addModal: document.getElementById('add-modal'),
    budgetModal: document.getElementById('budget-modal'),
    fixedModal: document.getElementById('fixed-modal'),
    dailyModal: document.getElementById('daily-modal'),

    openAddBtn: document.getElementById('open-add-modal'), // Expense Btn
    openIncomeBtn: document.getElementById('open-income-modal'), // Income Btn
    openBudgetBtn: document.getElementById('open-budget-modal'),
    openFixedBtn: document.getElementById('open-fixed-modal'),
    closeModalBtns: document.querySelectorAll('.close-modal'),
    modalTitle: document.querySelector('#add-modal #add-modal-title'),
    modalSubmitBtn: document.querySelector('#add-tx-form button[type="submit"]'),

    // Daily Modal Elements
    dailyDateTitle: document.getElementById('daily-date-title'),
    dailyListContainer: document.getElementById('daily-tx-list-container'),
    dailyTotalAmount: document.getElementById('daily-total-amount'),

    // Forms
    addTxForm: document.getElementById('add-tx-form'),
    addTxForm: document.getElementById('add-tx-form'),
    budgetForm: document.getElementById('budget-form'),
    analysisStartDate: document.getElementById('analysis-start-date'),
    analysisEndDate: document.getElementById('analysis-end-date'),
    btnRunAnalysis: document.getElementById('btn-run-analysis'),
    analysisResults: document.getElementById('analysis-results'),
    analysisTxList: document.getElementById('analysis-tx-list'),
    analysisTotalIncome: document.getElementById('analysis-total-income'),
    analysisTotalExpense: document.getElementById('analysis-total-expense'),
    analysisBalance: document.getElementById('analysis-balance'),
    analysisDonutChart: document.getElementById('analysis-donut-chart'),
    analysisLegend: document.getElementById('analysis-legend'),
    fixedTxForm: document.getElementById('fixed-tx-form'),

    // Inputs
    budgetInput: document.getElementById('budget-input'),
    previewTotalBudget: document.getElementById('preview-total-budget'),

    // Fixed Inputs
    newFixedName: document.getElementById('new-fixed-name'),
    newFixedAmount: document.getElementById('new-fixed-amount'),
    newFixedCategory: document.getElementById('new-fixed-category'),

    // Transaction Inputs
    txDate: document.getElementById('tx-date'),
    txDesc: document.getElementById('tx-desc'),
    txAmount: document.getElementById('tx-amount'),
    txCategory: document.getElementById('tx-category'),

    // Type Buttons
    typeBtnExpense: document.getElementById('type-btn-expense'),
    typeBtnIncome: document.getElementById('type-btn-income'),

    // Mobile
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebar-overlay'),

    // Notices
    btnWriteNotice: document.getElementById('btn-write-notice'),
    noticeModal: document.getElementById('notice-modal'),
    noticeForm: document.getElementById('notice-form'),
    noticeTitle: document.getElementById('notice-title'),
    noticeContent: document.getElementById('notice-content'),
    noticeListContainer: document.getElementById('notice-list-container'),
};

// Initialization
async function init() {
    setupEventListeners();
    populateFixedCategories();
    await loadUserInfo();
    await loadBudgetGroups(); // Load groups first
    await refreshData();
    elements.txDate.valueAsDate = new Date();
}

function populateFixedCategories() {
    if (elements.newFixedCategory) {
        elements.newFixedCategory.innerHTML = FIXED_CATEGORIES.map(c =>
            `<option value="${c.value}">${c.label}</option>`
        ).join('');
    }
}

// Transaction Type Logic
window.updateModalType = function () {
    const type = document.querySelector('input[name="tx-type"]:checked').value;
    const isIncome = type === 'INCOME';

    // Toggle active class
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = isIncome ? document.getElementById('type-btn-income') : document.getElementById('type-btn-expense');
    if (activeBtn) activeBtn.classList.add('active');

    if (elements.modalSubmitBtn) {
        elements.modalSubmitBtn.className = 'btn full-width';

        if (isIncome) {
            elements.modalSubmitBtn.classList.add('btn-income');
            elements.modalSubmitBtn.setAttribute('data-i18n', 'btn-add-income');
            if (window.i18n) elements.modalSubmitBtn.textContent = window.i18n.t('btn-add-income');

            if (elements.txDesc) {
                elements.txDesc.setAttribute('data-i18n-placeholder', 'placeholder-income-desc');
                if (window.i18n) elements.txDesc.placeholder = window.i18n.t('placeholder-income-desc');
            }
        } else {
            elements.modalSubmitBtn.classList.add('btn-expense');
            elements.modalSubmitBtn.setAttribute('data-i18n', 'btn-add-expense');
            if (window.i18n) elements.modalSubmitBtn.textContent = window.i18n.t('btn-add-expense');

            if (elements.txDesc) {
                elements.txDesc.setAttribute('data-i18n-placeholder', 'placeholder-expense-desc');
                if (window.i18n) elements.txDesc.placeholder = window.i18n.t('placeholder-expense-desc');
            }
        }
    }

    const categories = isIncome ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    elements.txCategory.innerHTML = categories.map(c => {
        const i18nKey = `category-${c.value.toLowerCase()}`;
        const label = (window.i18n && window.i18n.t(i18nKey)) || c.label;
        return `<option value="${c.value}" data-i18n="${i18nKey}">${label}</option>`;
    }).join('');
}

// Set Modal Mode
function setModalMode(type) {
    state.editingId = null;
    elements.addTxForm.reset();
    elements.txDate.valueAsDate = new Date();

    const radio = document.querySelector(`input[name="tx-type"][value="${type}"]`);
    if (radio) radio.checked = true;

    updateModalType();

    if (elements.modalTitle) {
        const key = type === 'INCOME' ? 'modal-add-income' : 'modal-add-expense';
        elements.modalTitle.setAttribute('data-i18n', key);
        if (window.i18n) elements.modalTitle.textContent = window.i18n.t(key);
    }
}

// Budget Group Logic
async function loadBudgetGroups() {
    try {
        const response = await fetch('/api/budget-groups');
        if (response.ok) {
            state.budgetGroups = await response.json();

            // Set default if not set
            if (!state.currentBudgetGroupId && state.budgetGroups.length > 0) {
                state.currentBudgetGroupId = state.budgetGroups[0].id;
                state.currentBudgetName = state.budgetGroups[0].name;
            }
            renderBudgetSwitcher();
        }
    } catch (error) {
        console.error('Error loading budget groups:', error);
    }
}

function renderBudgetSwitcher() {
    const btnText = document.getElementById('current-budget-name');
    const list = document.getElementById('budget-list');

    if (btnText) btnText.textContent = state.currentBudgetName;

    if (list) {
        list.innerHTML = state.budgetGroups.map(bg => `
            <li class="budget-item" style="padding: 0.6rem; border-radius: 8px; font-size: 0.9rem; color: var(--text-primary); display: flex; align-items: center; justify-content: space-between;">
                <span onclick="switchBudgetGroup(${bg.id}, '${bg.name}')" style="flex:1; cursor:pointer;">${bg.name}</span>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    ${bg.id === state.currentBudgetGroupId ? '<i class="fa-solid fa-check" style="color: var(--accent-color); font-size:0.8rem;"></i>' : ''}
                    <button onclick="renameBudgetGroup(${bg.id}, '${bg.name}', event)" style="background:none; border:none; cursor:pointer; color:var(--text-secondary); opacity:0.6; padding:0.2rem;" title="이름 수정">
                        <i class="fa-solid fa-pencil" style="font-size:0.8rem;"></i>
                    </button>
                    ${state.budgetGroups.length > 1 && bg.name !== '기본 예산안' ? `
                    <button onclick="deleteBudgetGroup(${bg.id}, '${bg.name}', event)" style="background:none; border:none; cursor:pointer; color:var(--danger-color); opacity:0.6; padding:0.2rem;" title="가계부 삭제">
                        <i class="fa-solid fa-trash" style="font-size:0.8rem;"></i>
                    </button>` : ''}
                </div>
            </li>
        `).join('');

        document.querySelectorAll('.budget-item').forEach(item => {
            item.addEventListener('mouseenter', () => item.style.background = 'rgba(0,0,0,0.05)');
            item.addEventListener('mouseleave', () => item.style.background = 'transparent');
        });
    }
}

window.deleteBudgetGroup = async function (id, name, event) {
    if (event) event.stopPropagation();

    if (state.budgetGroups.length <= 1) {
        alert('최소 하나의 가계부는 존재해야 합니다.');
        return;
    }

    if (name === '기본 예산안') {
        alert('기본 예산안은 삭제할 수 없습니다.');
        return;
    }

    if (!confirm(`'${name}' 가계부를 삭제하시겠습니까?\n\n※ 주의: 포함된 모든 거래 내역과 예산 설정이 영구적으로 삭제됩니다.`)) return;

    // Safety check: Prompt user to type name to confirm deletion
    const check = prompt(`삭제를 확인하려면 가계부의 이름('${name}')을 똑같이 입력하세요.`);
    if (check !== name) {
        if (check !== null) alert('이름이 일치하지 않습니다.');
        return;
    }

    try {
        const response = await fetch(`/api/budget-groups/${id}`, { method: 'DELETE' });
        if (response.ok) {
            // Remove from local state
            state.budgetGroups = state.budgetGroups.filter(g => g.id !== id);

            // If deleted current group, switch to the first available
            if (state.currentBudgetGroupId === id && state.budgetGroups.length > 0) {
                const next = state.budgetGroups[0];
                state.currentBudgetGroupId = next.id;
                state.currentBudgetName = next.name;
            }

            renderBudgetSwitcher();
            await refreshData();
            alert('가계부가 삭제되었습니다.');
        } else {
            alert('삭제 실패');
        }
    } catch (e) {
        console.error(e);
        alert('삭제 중 오류 발생');
    }
}

window.renameBudgetGroup = async function (id, currentName, event) {
    if (event) event.stopPropagation(); // Prevent switching when clicking edit

    const newName = prompt('가계부 이름을 수정하세요:', currentName);
    if (!newName || newName.trim() === '' || newName === currentName) return;

    try {
        const response = await fetch(`/api/budget-groups/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName.trim() })
        });

        if (response.ok) {
            // Update local state
            const group = state.budgetGroups.find(g => g.id === id);
            if (group) group.name = newName.trim();

            if (state.currentBudgetGroupId === id) {
                state.currentBudgetName = newName.trim();
            }

            renderBudgetSwitcher();
        } else {
            alert('이름 수정 실패');
        }
    } catch (e) {
        console.error(e);
        alert('오류 발생: ' + e);
    }
}

window.switchBudgetGroup = async function (id, name) {
    if (state.currentBudgetGroupId === id) return;
    state.currentBudgetGroupId = id;
    state.currentBudgetName = name;

    // Hide dropdown
    document.getElementById('budget-dropdown').style.display = 'none';

    renderBudgetSwitcher();
    await refreshData(); // Reload data for new group
}

async function createBudgetGroup(name) {
    try {
        const response = await fetch('/api/budget-groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            const newGroup = await response.json();
            state.budgetGroups.push(newGroup);

            // Auto switch to new group
            state.currentBudgetGroupId = newGroup.id;
            state.currentBudgetName = newGroup.name;

            document.getElementById('budget-group-modal').classList.remove('open');
            renderBudgetSwitcher();
            await refreshData();
        } else if (response.status === 403) {
            // Limit Reached
            document.getElementById('budget-group-modal').classList.remove('open');
            if (state.membershipType === 'PRO') {
                alert('최대 생성 가능 개수(30개)를 초과했습니다.');
            } else {
                upgradeToPro();
            }
        } else {
            alert('가계부 생성 실패');
        }
    } catch (e) {
        console.error(e);
        alert('오류 발생');
    }
}

// Load User Info
async function loadUserInfo() {
    try {
        const response = await fetch('/api/user/me');
        if (response.ok) {
            const userInfo = await response.json();
            document.getElementById('user-name').textContent = userInfo.username;
            document.getElementById('user-email').textContent = userInfo.email;

            // Set Avatar based on Membership
            const avatarEl = document.getElementById('user-avatar');
            avatarEl.innerHTML = ''; // Clear text
            const avatarImg = document.createElement('img');
            avatarImg.style.width = '100%';
            avatarImg.style.height = '100%';
            avatarImg.style.borderRadius = '50%';
            avatarImg.style.objectFit = 'cover';

            state.membershipType = userInfo.membershipType || 'FREE';

            if (state.membershipType === 'PRO') {
                avatarImg.src = '/images/dotori_king.png?v=2';
            } else {
                avatarImg.src = '/images/dotori_main.png';
            }
            avatarEl.appendChild(avatarImg);

            // Show Membership Badge
            const badge = document.createElement('span');
            badge.style.fontSize = '0.7rem';
            badge.style.padding = '0.1rem 0.4rem';
            badge.style.borderRadius = '10px';
            badge.style.marginLeft = '0.5rem';

            state.membershipType = userInfo.membershipType || 'FREE';

            if (state.membershipType === 'PRO') {
                badge.textContent = 'PRO';
            } else {
                badge.style.background = '#ccc';
                badge.style.color = '#555';
                badge.textContent = 'FREE';

                // Add Upgrade Button
                if (!document.getElementById('upgrade-btn')) {
                    const upgradeBtn = document.createElement('button');
                    upgradeBtn.id = 'upgrade-btn';
                    upgradeBtn.textContent = '⚡ Pro로 업그레이드';
                    upgradeBtn.className = 'btn-upgrade-sidebar'; // Use CSS class
                    upgradeBtn.onclick = upgradeToPro;
                    document.querySelector('.user-info').appendChild(upgradeBtn);
                }
            }
            document.getElementById('user-name').appendChild(badge);

            // Set Budget Start Day
            state.budgetStartDay = userInfo.budgetStartDay || 1;



            updateMonthDisplay(); // Refresh display with range

            state.userRole = userInfo.role;
            if (elements.btnWriteNotice && (state.userRole === 'ROLE_ADMIN' || state.userRole === 'ADMIN')) {
                elements.btnWriteNotice.style.display = 'block';

                // Add Admin Page Link to Sidebar
                const nav = document.querySelector('.nav-links');
                if (nav && !document.getElementById('admin-link')) {
                    const li = document.createElement('li');
                    li.id = 'admin-link';
                    li.innerHTML = `<i class="fa-solid fa-user-shield"></i> <span>관리자 페이지</span>`;
                    li.addEventListener('click', () => window.location.href = '/admin.html');
                    nav.appendChild(li);
                }
            }
        }
    } catch (error) {
        console.error('Error loading user info:', error);
    }
}

function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        window.location.href = '/api/auth/logout';
    }
}

// Data Management
async function refreshData() {
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth() + 1;

    try {
        const bgParam = state.currentBudgetGroupId ? `&budgetGroupId=${state.currentBudgetGroupId}` : '';

        const txRes = await fetch(`${API_BASE}/transactions?year=${year}&month=${month}${bgParam}`);
        if (!txRes.ok) throw new Error(`HTTP error! status: ${txRes.status}`);
        state.transactions = await txRes.json();

        const budgetRes = await fetch(`${API_BASE}/budget?year=${year}&month=${month}${bgParam}`);
        if (!budgetRes.ok) throw new Error(`HTTP error! status: ${budgetRes.status}`);
        const budgetData = await budgetRes.json();

        if (budgetData && budgetData.yearMonth) {
            state.currentBudget = {
                total: budgetData.totalAmount || 0,
                fixed: budgetData.fixedExpenses || []
            };
        } else {
            state.currentBudget = { total: 0, fixed: [] };
        }

        renderAll();
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

// Summary Logic
function calculateSummary() {
    const baseBudget = Number(state.currentBudget.total) || 0;

    let totalIncomeTx = 0;
    let totalExpenseTx = 0;

    // Define Range First
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    const startDay = state.budgetStartDay || 1;

    let startDate, endDate;
    if (startDay === 1) {
        startDate = new Date(year, month, 1);
        endDate = new Date(year, month + 1, 0);
    } else {
        startDate = new Date(year, month, startDay);
        endDate = new Date(year, month + 1, startDay - 1);
    }
    // Set hours for strict comparison
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Remaining Days Logic
    let daysLeft = 0;

    state.transactions.forEach(tx => {
        const tDate = new Date(tx.date);
        if (tDate >= startDate && tDate <= endDate) {
            const amount = Number(tx.amount);
            if (tx.type === 'INCOME') {
                totalIncomeTx += amount;
            } else {
                totalExpenseTx += amount;
            }
        }
    });

    const fixedSum = (state.currentBudget.fixed || []).reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const totalAvailable = baseBudget + totalIncomeTx;
    const disposableBudget = Math.max(0, totalAvailable - fixedSum);
    const remaining = disposableBudget - totalExpenseTx;

    if (today > endDate) {
        daysLeft = 0;
    } else if (today < startDate) {
        // Future (Viewing next month logic)
        daysLeft = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    } else {
        // Active
        const diffTime = endDate - today;
        daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }

    const daily = daysLeft > 0 && remaining > 0 ? Math.floor(remaining / daysLeft) : 0;

    return { budget: disposableBudget, spent: totalExpenseTx, remaining, daily, daysLeft, incomeTx: totalIncomeTx };
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
}

function renderAll() {
    updateMonthDisplay();
    renderDashboard();
    renderTransactions();
    renderCalendar();
    renderFixedExpensesView();
    if (elements.fixedModal.classList.contains('open')) {
        renderModalFixedList();
    }
    // Refresh Daily Modal if open
    if (elements.dailyModal.classList.contains('open') && state.viewingDate) {
        renderDailyDetails();
    }
}

function updateMonthDisplay() {
    let dateStr = '';

    if (window.i18n && window.i18n.formatMonthYear) {
        dateStr = window.i18n.formatMonthYear(state.currentDate);
    } else {
        const formatter = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long' });
        dateStr = formatter.format(state.currentDate);
    }

    // Add Range Subtitle if budgetStartDay > 1
    if (state.budgetStartDay > 1) {
        // Updated Logic: "Jan settings" -> "Jan 25 ~ Feb 24"
        const startDay = state.budgetStartDay;
        const targetYear = state.currentDate.getFullYear();
        const targetMonth = state.currentDate.getMonth();

        const rangeStart = new Date(targetYear, targetMonth, startDay);
        const rangeEnd = new Date(targetYear, targetMonth + 1, startDay - 1);

        const sm = rangeStart.getMonth() + 1;
        const sd = rangeStart.getDate();
        const em = rangeEnd.getMonth() + 1;
        const ed = rangeEnd.getDate();

        dateStr += ` <span style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-top:4px; text-align:center;">(${sm}.${sd} ~ ${em}.${ed})</span>`;
    }
    elements.currentMonthDisplay.innerHTML = dateStr;

    const today = new Date();
    if (window.i18n && window.i18n.formatTodayLabel) {
        if (elements.todayDateText) elements.todayDateText.textContent = window.i18n.formatTodayLabel(today);
    } else {
        const todayLabel = `${today.getMonth() + 1}월 ${today.getDate()}일`;
        if (elements.todayDateText) elements.todayDateText.textContent = `오늘: ${todayLabel}`;
    }
}

function renderDashboard() {
    const summary = calculateSummary();

    elements.totalBudget.textContent = formatCurrency(summary.budget);
    elements.totalSpent.textContent = formatCurrency(summary.spent);
    elements.remaining.textContent = formatCurrency(summary.remaining);
    elements.dailyBudget.textContent = formatCurrency(summary.daily);

    if (elements.dailyDaysLeft) {
        if (window.i18n && window.i18n.formatDaysLeft) {
            elements.dailyDaysLeft.textContent = window.i18n.formatDaysLeft(summary.daysLeft);
        } else {
            if (summary.daysLeft > 0) elements.dailyDaysLeft.textContent = `(${summary.daysLeft}일 남음)`;
            else elements.dailyDaysLeft.textContent = `(기간 종료)`;
        }
    }

    renderChart();
    renderCategoryChart();
    renderRecentTransactions();
}

function renderChart() {
    elements.chartContainer.innerHTML = '';
    const daysInMonth = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 0).getDate();
    const dailySpend = new Array(daysInMonth + 1).fill(0);

    state.transactions.forEach(tx => {
        if (tx.type !== 'INCOME') {
            const d = new Date(tx.date).getDate();
            dailySpend[d] += Number(tx.amount);
        }
    });

    const maxSpend = Math.max(...dailySpend, 1);

    for (let d = 1; d <= daysInMonth; d++) {
        const amount = dailySpend[d];
        const bar = document.createElement('div');
        bar.className = 'chart-bar';

        if (amount > 0) {
            const heightPct = (amount / maxSpend) * 100;
            bar.style.height = `${Math.max(heightPct, 5)}%`;
            bar.setAttribute('data-day', d);
            bar.title = `${d}일: ${formatCurrency(amount)}`;
        } else {
            bar.style.height = '2px';
            bar.style.background = 'rgba(255,255,255,0.02)';
            bar.setAttribute('data-day', d);
        }
        elements.chartContainer.appendChild(bar);
    }
}

const CATEGORY_COLORS = {
    food: '#FF7043',
    transport: '#42A5F5',
    living: '#66BB6A',
    personal: '#AB47BC',
    hobby: '#EC407A',
    gathering: '#FFCA28',
    shopping: '#26C6DA',
    bills: '#78909C',
    other: '#BDBDBD'
};

function renderCategoryChart() {
    const donutEl = document.getElementById('category-donut-chart');
    const legendEl = document.getElementById('category-legend');
    if (!donutEl || !legendEl) return;

    const expenses = state.transactions.filter(t => t.type !== 'INCOME');

    if (expenses.length === 0) {
        donutEl.style.background = '#f5f5f5';
        legendEl.innerHTML = '<span style="color:var(--text-secondary); font-size:0.8rem;">지출 없음</span>';
        return;
    }

    const totals = {};
    let grandTotal = 0;

    expenses.forEach(tx => {
        const cat = tx.category || 'other';
        const amt = Number(tx.amount);
        totals[cat] = (totals[cat] || 0) + amt;
        grandTotal += amt;
    });

    const sortedCats = Object.keys(totals).sort((a, b) => totals[b] - totals[a]);

    let conic = '';
    let startDeg = 0;

    legendEl.innerHTML = '';

    sortedCats.forEach(cat => {
        const amt = totals[cat];
        const pct = (amt / grandTotal) * 100;
        const deg = (amt / grandTotal) * 360;
        const endDeg = startDeg + deg;
        const color = CATEGORY_COLORS[cat] || '#999';

        conic += `${color} ${startDeg}deg ${endDeg}deg, `;
        startDeg = endDeg;

        const item = document.createElement('div');
        item.className = 'donut-legend-item';
        item.innerHTML = `<div class="donut-legend-color" style="background:${color}"></div>${convertCategory(cat)} ${Math.round(pct)}%`;
        legendEl.appendChild(item);
    });

    conic = conic.slice(0, -2);
    donutEl.style.background = `conic-gradient(${conic})`;
}

function renderRecentTransactions() {
    const txs = [...state.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    elements.recentList.innerHTML = txs.slice(0, 5).map(tx => {
        const isIncome = tx.type === 'INCOME';
        const sign = isIncome ? '+' : '-';
        const colorClass = isIncome ? 'income' : 'expense';
        const colorStyle = isIncome ? 'color: #2E7D32;' : 'color: var(--danger-color);';

        return `
        <li>
            <div class="tx-info">
                <h4>${tx.description}</h4>
                <span>${new Date(tx.date).toLocaleDateString('ko-KR')}</span>
            </div>
            <div class="tx-amount ${colorClass}" style="${colorStyle} font-weight: 700;">
                ${sign}${formatCurrency(tx.amount)}
            </div>
        </li>
    `}).join('');
}

function renderTransactions() {
    const searchTerm = elements.searchInput ? elements.searchInput.value.toLowerCase() : '';
    const categoryFilter = elements.categorySelect ? elements.categorySelect.value : 'all';

    let txs = [...state.transactions];

    if (searchTerm) {
        txs = txs.filter(tx => tx.description.toLowerCase().includes(searchTerm));
    }
    if (categoryFilter !== 'all') {
        txs = txs.filter(tx => tx.category === categoryFilter);
    }

    txs.sort((a, b) => new Date(b.date) - new Date(a.date));

    elements.fullList.innerHTML = txs.map(tx => {
        const sign = tx.type === 'INCOME' ? '+' : '-';
        const colorStyle = tx.type === 'INCOME' ? 'color:#2E7D32; font-weight:700;' : 'color:#C62828; font-weight:700;';
        return `
        <li onclick="openEditModal(${tx.id})" style="cursor: pointer;">
            <div class="tx-info">
                <h4>${tx.description}</h4>
                <span>${new Date(tx.date).toLocaleDateString('ko-KR')} · ${convertCategory(tx.category)}</span>
            </div>
            <div class="tx-amount" style="${colorStyle}">
                ${sign}${formatCurrency(tx.amount)}
                <span style="font-size:0.8rem; margin-left:4px; font-weight:normal; color:#999;" title="${tx.paymentMethod === 'CASH' ? '현금' : '카드'}">
                    ${tx.paymentMethod === 'CASH' ? '💵' : '💳'}
                </span>
            </div>
        </li>
    `}).join('');

    if (txs.length === 0) {
        elements.fullList.innerHTML = '<li style="justify-content:center; padding: 2rem; color: var(--text-secondary);">내역이 없습니다.</li>';
    }
}

function renderCalendar() {
    elements.calendarGrid.innerHTML = '';
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        div.className = 'calendar-day other-month';
        elements.calendarGrid.appendChild(div);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const div = document.createElement('div');
        div.className = 'calendar-day';
        const today = new Date();
        if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d) {
            div.classList.add('today');
        }

        div.innerHTML = `<span class="day-num">${d}</span>`;

        // Container for amounts
        const infoDiv = document.createElement('div');
        infoDiv.className = 'day-info';

        const dayTxs = state.transactions.filter(t => new Date(t.date).getDate() === d);
        const expenseTotal = dayTxs.filter(t => t.type !== 'INCOME').reduce((sum, t) => sum + Number(t.amount), 0);
        const incomeTotal = dayTxs.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + Number(t.amount), 0);

        if (expenseTotal > 0) {
            const totalDisplay = document.createElement('span');
            totalDisplay.className = 'calendar-day-total';
            if (expenseTotal >= 10000) {
                const val = parseFloat((expenseTotal / 10000).toFixed(1)); // 42.0 -> 42, 4.3 -> 4.3
                totalDisplay.textContent = `-${val}만`;
            } else {
                totalDisplay.textContent = `-${expenseTotal.toLocaleString()}`;
            }
            infoDiv.appendChild(totalDisplay);
        }

        if (incomeTotal > 0) {
            const incomeDisplay = document.createElement('span');
            // Use same class for layout consistency if desired, or keep inline styles
            incomeDisplay.className = 'calendar-day-total';
            incomeDisplay.style.color = '#2E7D32';

            if (incomeTotal >= 10000) {
                const val = parseFloat((incomeTotal / 10000).toFixed(1));
                incomeDisplay.textContent = `+${val}만`;
            } else {
                incomeDisplay.textContent = `+${incomeTotal.toLocaleString()}`;
            }
            infoDiv.appendChild(incomeDisplay);
        }

        div.appendChild(infoDiv);

        if (dayTxs.length > 0) {
            div.onclick = () => openDailyDetails(year, month, d, dayTxs);
            div.style.cursor = 'pointer';
        }
        elements.calendarGrid.appendChild(div);
    }
}

// Open Daily Modal (Delegates to renderDailyDetails)
function openDailyDetails(year, month, day) {
    state.viewingDate = { year, month, day };
    renderDailyDetails();
    elements.dailyModal.classList.add('open');
}

// Render Daily Details Logic (with Delete Btn)
function renderDailyDetails() {
    if (!state.viewingDate) return;
    const { year, month, day } = state.viewingDate;

    // Filter transactions for this day
    const txs = state.transactions.filter(t => {
        const d = new Date(t.date);
        return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    });

    elements.dailyDateTitle.textContent = `${month + 1}월 ${day}일 상세`;
    elements.dailyListContainer.innerHTML = '';

    let totalEx = 0;
    let totalIn = 0;

    if (txs.length === 0) {
        elements.dailyListContainer.innerHTML = '<div class="daily-empty">지출 내역이 없습니다.</div>';
    } else {
        txs.forEach(tx => {
            const isIncome = tx.type === 'INCOME';
            if (isIncome) totalIn += Number(tx.amount);
            else totalEx += Number(tx.amount);

            const el = document.createElement('div');
            el.className = 'daily-item';
            // Add slight padding-right for delete button space
            el.style.cssText = 'position: relative; padding-right: 40px;';

            const color = isIncome ? '#2E7D32' : 'var(--danger-color)';
            const sign = isIncome ? '+' : '-';

            el.innerHTML = `
                <div class="daily-item-info">
                    <h4>${tx.description}</h4>
                    <span class="daily-item-category">${convertCategory(tx.category)}</span>
                </div>
                <div class="tx-amount" style="color: ${color}; font-weight: bold;">
                    ${sign}${formatCurrency(tx.amount)}
                </div>
                
                <button type="button" onclick="deleteTransaction(${tx.id})" 
                    style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); 
                           background: none; border: none; color: var(--text-secondary); 
                           opacity: 0.5; cursor: pointer; padding: 0.5rem; transition: opacity 0.2s;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            elements.dailyListContainer.appendChild(el);
        });
    }

    const net = totalIn - totalEx;
    const netSign = net >= 0 ? '+' : '';
    const netColor = net >= 0 ? '#2E7D32' : 'var(--danger-color)';

    elements.dailyTotalAmount.innerHTML = `
        <div style="font-size: 1.1rem; font-weight: 700; display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="color:var(--text-primary)">합계</span>
            <span style="color: ${netColor}">${netSign}${formatCurrency(net)}</span>
        </div>
        <div style="font-size: 0.9rem; color: var(--danger-color); display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <span>지출</span>
            <span>-${formatCurrency(totalEx)}</span>
        </div>
        <div style="font-size: 0.9rem; color: #2E7D32; display: flex; justify-content: space-between; align-items: center;">
            <span>수입</span>
            <span>+${formatCurrency(totalIn)}</span>
        </div>
    `;
}

function convertFixedCategory(catCode) {
    if (!catCode) return '';
    const i18nKey = `category-${catCode.toLowerCase()}`;
    return (window.i18n && window.i18n.t(i18nKey)) || catCode;
}

function renderFixedExpensesView() {
    if (!elements.fixedExpensesTableBody) return;
    const fixedList = state.currentBudget.fixed || [];

    if (fixedList.length === 0) {
        elements.fixedExpensesTableBody.innerHTML = '';
        if (elements.fixedExpensesEmpty) elements.fixedExpensesEmpty.style.display = 'block';
    } else {
        if (elements.fixedExpensesEmpty) elements.fixedExpensesEmpty.style.display = 'none';
        elements.fixedExpensesTableBody.innerHTML = fixedList.map((item, index) => `
            <li onclick="openFixedEditModal(${index})" style="cursor: pointer;">
                <div class="tx-info">
                    <h4>${item.name}</h4>
                    <span>${convertFixedCategory(item.category)}</span>
                </div>
                <div class="tx-amount">
                    ${formatCurrency(item.amount)}
                    <span style="font-size:0.8rem; margin-left:4px; font-weight:normal; color:#999;" title="${item.paymentMethod === 'CASH' ? '현금' : '카드'}">
                        ${item.paymentMethod === 'CASH' ? '💵' : '💳'}
                    </span>
                </div>
            </li>
        `).join('');
    }
}

window.openFixedEditModal = function (index) {
    const list = state.currentBudget.fixed || [];
    if (!list[index]) return;
    const item = list[index];

    state.editingFixedIndex = index;

    // Populate Form
    elements.newFixedName.value = item.name;
    elements.newFixedAmount.value = item.amount.toLocaleString('ko-KR');
    elements.newFixedCategory.value = item.category;

    // Payment Method
    const methodInput = document.querySelector(`input[name="fixed-method"][value="${item.paymentMethod || 'CARD'}"]`);
    if (methodInput) methodInput.checked = true;

    // Change Button Text (Assumption: fixed modal has a button? It's hidden in main list but modal has add form)
    // Wait, Fixed Expense logic uses 'elements.fixedModal'.

    // Add 'Edit Mode' behavior (Visuals)
    const submitBtn = elements.fixedTxForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> 수정 완료';

    // Change Title & Hide List (Edit Mode)
    const title = elements.fixedModal.querySelector('h3');
    if (title) {
        title.innerText = '고정 지출 수정';
        title.removeAttribute('data-i18n');
    }
    if (elements.modalFixedList) elements.modalFixedList.style.display = 'none';
    const copyBtn = document.getElementById('btn-copy-prev-fixed');
    if (copyBtn) copyBtn.style.display = 'none';

    // Show Delete Button
    const delBtn = document.getElementById('btn-delete-fixed');
    if (delBtn) {
        delBtn.style.display = 'flex';
        delBtn.onclick = async () => {
            if (await deleteFixedExpense(state.editingFixedIndex)) {
                elements.fixedModal.classList.remove('open');
            }
        };
    }

    elements.fixedModal.classList.add('open');
}

function renderModalFixedList() {
    const listContainer = elements.modalFixedList;
    if (!listContainer) return;
    const fixedList = state.currentBudget.fixed || [];
    listContainer.innerHTML = '';

    if (fixedList.length === 0) {
        const msg = (window.i18n && window.i18n.t('msg-no-fixed')) || '등록된 고정 지출이 없습니다.';
        listContainer.innerHTML = `<div class="empty-msg" style="color: var(--text-secondary); font-size: 0.8rem; text-align: center;">${msg}</div>`;
        return;
    }

    fixedList.forEach((item, index) => {
        const div = document.createElement('div');
        div.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.02); padding: 0.5rem 0.8rem; border-radius: 8px; border: 1px solid var(--glass-border); font-size: 0.9rem;';
        div.innerHTML = `
            <div style="display:flex; align-items:center;">
                <span style="font-size:0.8rem; background:#eee; padding:2px 6px; border-radius:4px; margin-right:8px; color:#555;">${convertFixedCategory(item.category)}</span>
                <div>
                    <span style="font-weight: 600;">${item.name}</span>
                    <span style="color: var(--text-secondary); margin-left: 0.5rem;">
                        ${item.amount.toLocaleString()}
                        <span style="font-size:0.8rem; margin-left:4px;">${item.paymentMethod === 'CASH' ? '💵' : '💳'}</span>
                    </span>
                </div>
            </div>
            <button type="button" onclick="deleteFixedExpense(${index})" style="background: none; border: none; color: var(--danger-color); cursor: pointer;"><i class="fa-solid fa-trash"></i></button>
        `;

        listContainer.appendChild(div);
    });
}

function convertCategory(cat) {
    if (!cat) return '';
    const i18nKey = `category-${cat.toLowerCase()}`;
    return (window.i18n && window.i18n.t(i18nKey)) || cat;
}

function parseNumberInput(str) {
    if (!str) return 0;
    return Number(String(str).replace(/,/g, ''));
}

function formatInputNumber(e) {
    let value = e.target.value;
    const number = value.replace(/[^0-9]/g, '');
    if (number) e.target.value = Number(number).toLocaleString('ko-KR');
    else e.target.value = '';
}

window.deleteTransaction = async function (id) {
    if (confirm('이 내역을 삭제하시겠습니까?')) {
        try {
            const response = await fetch(`${API_BASE}/transactions/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status} `);
            await refreshData();
        } catch (e) {
            alert('삭제 실패: ' + e);
        }
    }
}

window.deleteFixedExpense = async function (index) {
    if (!confirm('이 고정 지출 항목을 삭제하시겠습니까?')) return false;
    const currentBudget = state.currentBudget;
    const updatedFixed = [...currentBudget.fixed];
    updatedFixed.splice(index, 1);
    const result = await updateBudgetOnServer(currentBudget.total, updatedFixed);
    return result;
}

async function updateBudgetOnServer(totalAmount, fixedExpenses) {
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth() + 1;
    const key = `${year}-${String(month).padStart(2, '0')}`;

    const payload = {
        yearMonth: key,
        totalAmount: totalAmount,
        fixedExpenses: fixedExpenses
    };

    const bgParam = state.currentBudgetGroupId ? `?budgetGroupId=${state.currentBudgetGroupId}` : '';

    try {
        const response = await fetch(`${API_BASE}/budget${bgParam}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        await refreshData();
        return true;
    } catch (err) {
        alert('저장 실패: ' + err);
        return false;
    }
}

window.openEditModal = function (id) {
    const tx = state.transactions.find(t => t.id == id);
    if (!tx) return;

    // Set Type First (resets form)
    const type = tx.type || 'EXPENSE';
    setModalMode(type);

    state.editingId = tx.id;
    elements.txDate.value = tx.date;
    elements.txDesc.value = tx.description;
    elements.txAmount.value = tx.amount.toLocaleString('ko-KR');

    // UI Update for Edit Mode
    if (elements.modalSubmitBtn) elements.modalSubmitBtn.innerHTML = '<i class="fa-solid fa-check"></i> 수정 완료';
    const deleteBtn = document.getElementById('btn-delete-tx');
    if (deleteBtn) {
        deleteBtn.style.display = 'flex';
        deleteBtn.onclick = async () => {
            if (confirm('정말 삭제하시겠습니까?')) {
                await deleteTransaction(state.editingId);
                elements.addModal.classList.remove('open');
            }
        };
    }

    // Set Category after options update
    elements.txCategory.value = tx.category;

    // Payment Method
    const methodInput = document.querySelector(`input[name="tx-method"][value="${tx.paymentMethod || 'CARD'}"]`);
    if (methodInput) methodInput.checked = true;

    // Update Title
    if (elements.modalTitle) {
        elements.modalTitle.innerText = type === 'INCOME' ? '수입 내역 수정' : '지출 내역 수정';
        elements.modalTitle.removeAttribute('data-i18n'); // prevent override
    }

    elements.addModal.classList.add('open');
}

function switchToTab(tabId) {
    if (tabId === 'analysis') {
        if (state.membershipType !== 'PRO') {
            upgradeToPro();
            return;
        }
        // Default dates: Current Month
        if (elements.analysisStartDate && !elements.analysisStartDate.value) {
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const offset = new Date().getTimezoneOffset() * 60000;
            elements.analysisStartDate.valueAsDate = new Date(firstDay - offset);
            elements.analysisEndDate.valueAsDate = new Date(now - offset);
        }
    }

    elements.navLinks.forEach(l => {
        if (l.getAttribute('data-tab') === tabId) l.classList.add('active');
        else l.classList.remove('active');
    });
    elements.views.forEach(view => {
        view.classList.remove('active');
        if (view.id === `view-${tabId}`) {
            view.classList.add('active');
            if (tabId === 'fixed-expenses') renderFixedExpensesView();
            if (tabId === 'notices') renderNotices();
        }
    });
}

function setupEventListeners() {
    populateFilterSelect();

    if (elements.txAmount) elements.txAmount.addEventListener('input', formatInputNumber);
    if (elements.budgetInput) elements.budgetInput.addEventListener('input', formatInputNumber);
    if (elements.newFixedAmount) elements.newFixedAmount.addEventListener('input', formatInputNumber);

    elements.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('data-tab');
            switchToTab(targetId);
            if (window.innerWidth <= 1024) {
                elements.sidebar.classList.remove('active');
                elements.sidebarOverlay.classList.remove('active');
            }
        });
    });

    if (elements.mobileMenuBtn && elements.sidebar) {
        elements.mobileMenuBtn.addEventListener('click', () => {
            elements.sidebar.classList.add('active');
            elements.sidebarOverlay.classList.add('active');
        });
    }

    if (elements.sidebarOverlay) {
        elements.sidebarOverlay.addEventListener('click', () => {
            elements.sidebar.classList.remove('active');
            elements.sidebarOverlay.classList.remove('active');
        });
    }

    if (elements.viewAllBtn) {
        elements.viewAllBtn.addEventListener('click', () => {
            switchToTab('transactions');
        });
    }

    if (elements.btnWriteNotice) {
        elements.btnWriteNotice.addEventListener('click', () => {
            elements.noticeForm.reset();
            elements.noticeModal.classList.add('open');
        });
    }

    // Settings
    if (elements.openSettingsBtn) {
        elements.openSettingsBtn.addEventListener('click', () => {
            if (elements.settingStartDay) elements.settingStartDay.value = state.budgetStartDay;
            elements.settingsModal.classList.add('open');
        });
    }

    if (elements.settingsForm) {
        elements.settingsForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const day = parseInt(elements.settingStartDay.value);
            if (day < 1 || day > 31) return alert('1~31 사이의 숫자를 입력해주세요.');

            try {
                const res = await fetch('/api/user/settings', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ budgetStartDay: day })
                });
                if (res.ok) {
                    alert('저장되었습니다.');
                    location.reload();
                } else {
                    alert('저장 실패');
                }
            } catch (err) { alert('오류: ' + err); }
        });
    }
    if (elements.noticeForm) elements.noticeForm.addEventListener('submit', saveNotice);

    if (elements.searchInput) elements.searchInput.addEventListener('input', renderTransactions);
    if (elements.categorySelect) elements.categorySelect.addEventListener('change', renderTransactions);

    if (elements.prevMonthBtn) elements.prevMonthBtn.addEventListener('click', async () => {
        state.currentDate.setMonth(state.currentDate.getMonth() - 1);
        await refreshData();
    });

    if (elements.nextMonthBtn) elements.nextMonthBtn.addEventListener('click', async () => {
        state.currentDate.setMonth(state.currentDate.getMonth() + 1);
        await refreshData();
    });

    // Expense Button
    elements.openAddBtn.addEventListener('click', () => {
        setModalMode('EXPENSE');
        if (elements.modalSubmitBtn) elements.modalSubmitBtn.innerHTML = '추가하기';
        const deleteBtn = document.getElementById('btn-delete-tx');
        if (deleteBtn) deleteBtn.style.display = 'none';

        elements.addModal.classList.add('open');
    });

    // Income Button
    if (elements.openIncomeBtn) {
        elements.openIncomeBtn.addEventListener('click', () => {
            setModalMode('INCOME');
            if (elements.modalSubmitBtn) elements.modalSubmitBtn.innerHTML = '추가하기';
            const deleteBtn = document.getElementById('btn-delete-tx');
            if (deleteBtn) deleteBtn.style.display = 'none';

            elements.addModal.classList.add('open');
        });
    }

    elements.openBudgetBtn.addEventListener('click', () => {
        const total = state.currentBudget.total;
        elements.budgetInput.value = total ? total.toLocaleString('ko-KR') : '';
        if (document.getElementById('budget-start-day-input')) {
            document.getElementById('budget-start-day-input').value = state.budgetStartDay || 1;
        }
        if (elements.previewTotalBudget) elements.previewTotalBudget.textContent = formatCurrency(total);
        elements.budgetModal.classList.add('open');
    });

    if (elements.openFixedBtn) {
        elements.openFixedBtn.addEventListener('click', () => {
            elements.fixedTxForm.reset();
            state.editingFixedIndex = null; // Reset Edit Mode
            const submitBtn = elements.fixedTxForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.innerHTML = '추가하기';

            // Restore Title & List (Add Mode)
            const title = elements.fixedModal.querySelector('h3');
            if (title) {
                title.innerText = (window.i18n && window.i18n.t('modal-add-fixed')) || '고정 지출 추가';
                title.setAttribute('data-i18n', 'modal-add-fixed');
            }
            if (elements.modalFixedList) elements.modalFixedList.style.display = 'block';
            const copyBtn = document.getElementById('btn-copy-prev-fixed');
            if (copyBtn) copyBtn.style.display = 'inline-block';
            const delBtn = document.getElementById('btn-delete-fixed');
            if (delBtn) delBtn.style.display = 'none';

            renderModalFixedList();
            elements.fixedModal.classList.add('open');
        });
    }

    elements.closeModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal-overlay').classList.remove('open');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            // e.target.classList.remove('open'); // Disabled background click close
        }
    });

    // Budget Switcher
    const budgetSelector = document.getElementById('budget-selector-btn');
    if (budgetSelector) {
        budgetSelector.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = document.getElementById('budget-dropdown');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    }

    const btnAddBudgetGroup = document.getElementById('btn-add-budget-group');
    if (btnAddBudgetGroup) {
        btnAddBudgetGroup.addEventListener('click', () => {
            document.getElementById('budget-dropdown').style.display = 'none';
            document.getElementById('budget-group-modal').classList.add('open');
            document.getElementById('new-budget-group-name').focus();
        });
    }

    // Close dropdown on click outside
    window.addEventListener('click', () => {
        const dropdown = document.getElementById('budget-dropdown');
        if (dropdown) dropdown.style.display = 'none';

        // Also close sidebar on mobile if clicking outside
        if (window.innerWidth <= 768 && elements.sidebar.classList.contains('active')) {
            // Logic handled by overlay usually
        }
    });

    window.upgradeToPro = function () {
        // Try to find modal first
        const modal = document.getElementById('upgrade-modal');
        if (modal) {
            modal.classList.add('open');

            // Setup Close
            const closeBtn = document.getElementById('close-upgrade-modal');
            if (closeBtn) closeBtn.onclick = () => modal.classList.remove('open');

            // Setup Confirm
            const confirmBtn = document.getElementById('btn-confirm-upgrade');
            if (confirmBtn) {
                // Remove old listeners to prevent duplicates if function called multiple times? 
                // Actually upgradeToPro is called once per click. assigning onclick overwrites previous.
                confirmBtn.onclick = async () => {
                    confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 처리중...';
                    try {
                        const response = await fetch('/api/user/upgrade', { method: 'POST' });
                        if (response.ok) {
                            modal.classList.remove('open');
                            alert('✨ 축하합니다! Pro 회원이 되셨습니다!');
                            location.reload();
                        } else {
                            alert('업그레이드 실패');
                            confirmBtn.innerHTML = '<span>Pro로 업그레이드 하기</span><i class="fa-solid fa-arrow-right"></i>';
                        }
                    } catch (e) {
                        console.error(e);
                        alert('오류 발생');
                        confirmBtn.innerHTML = '<span>Pro로 업그레이드 하기</span><i class="fa-solid fa-arrow-right"></i>';
                    }
                };
            }
        } else {
            // Fallback
            if (confirm('Pro 플랜으로 업그레이드 하시겠습니까?\n(가계부를 무제한-최대 30개까지 생성할 수 있습니다)')) {
                fetch('/api/user/upgrade', { method: 'POST' }).then(() => location.reload());
            }
        }
    }

    const budgetGroupForm = document.getElementById('budget-group-form');
    if (budgetGroupForm) {
        budgetGroupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('new-budget-group-name');
            const name = nameInput.value.trim();
            if (name) {
                await createBudgetGroup(name);
                nameInput.value = '';
                document.getElementById('budget-group-modal').classList.remove('open');
            }
        });
    }

    // Add/Edit Transaction Submit
    elements.addTxForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!confirm('저장하시겠습니까?')) return;
        e.preventDefault();

        const type = document.querySelector('input[name="tx-type"]:checked').value;
        const paymentMethod = document.querySelector('input[name="tx-method"]:checked')?.value || 'CARD';
        const payload = {
            date: elements.txDate.value,
            description: elements.txDesc.value,
            amount: parseNumberInput(elements.txAmount.value),
            category: elements.txCategory.value,
            category: elements.txCategory.value,
            paymentMethod: paymentMethod,
            type: type
        };

        const bgParam = state.currentBudgetGroupId ? `?budgetGroupId=${state.currentBudgetGroupId}` : '';

        try {
            let response;
            if (state.editingId) {
                response = await fetch(`${API_BASE}/transactions/${state.editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } else {
                response = await fetch(`${API_BASE}/transactions${bgParam}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            elements.addModal.classList.remove('open');
            await refreshData();
        } catch (err) {
            alert('저장 실패: ' + err);
        }
    });

    elements.budgetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const totalAmount = parseNumberInput(elements.budgetInput.value);

        // Save Settings (Start Day) first
        const startDayInput = document.getElementById('budget-start-day-input');
        if (startDayInput) {
            const day = parseInt(startDayInput.value);
            if (day >= 1 && day <= 31) {
                try {
                    await fetch('/api/user/settings', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ budgetStartDay: day })
                    });
                    state.budgetStartDay = day;
                } catch (err) { console.error("Failed to save start day", err); }
            }
        }

        const fixedExpenses = state.currentBudget.fixed || [];
        const success = await updateBudgetOnServer(totalAmount, fixedExpenses);
        if (success) {
            elements.budgetModal.classList.remove('open');
            location.reload(); // Reload to re-calc everything with new cycle
        }
    });

    const copyBtn = document.getElementById('btn-copy-prev-fixed');
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            if (!confirm('지난달 고정지출 내역을 불러오시겠습니까?\n현재 목록에 추가됩니다.')) return;

            const year = state.currentDate.getFullYear();
            const month = state.currentDate.getMonth() + 1;

            const bgParam = state.currentBudgetGroupId ? `?budgetGroupId=${state.currentBudgetGroupId}` : '';
            try {
                const res = await fetch(`${API_BASE}/budget/${year}/${month}/copy${bgParam}`, { method: 'POST' });
                if (!res.ok) throw new Error('지난달 데이터가 없거나 불러오지 못했습니다.');

                await refreshData();
                renderModalFixedList();
                alert('성공적으로 불러왔습니다.');
            } catch (err) {
                alert('오류: ' + err.message);
            }
        });
    }

    if (elements.fixedTxForm) {
        elements.fixedTxForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Confirmation logic depends on mode?
            const isEdit = state.editingFixedIndex !== null && state.editingFixedIndex !== undefined;
            const msg = isEdit ? '수정하시겠습니까?' : '저장하시겠습니까?';
            if (!confirm(msg)) return;

            const name = elements.newFixedName.value.trim();
            const amount = parseNumberInput(elements.newFixedAmount.value);
            const category = elements.newFixedCategory.value;
            const paymentMethod = document.querySelector('input[name="fixed-method"]:checked')?.value || 'CARD';

            if (!name || amount <= 0) return;

            const currentTotal = state.currentBudget.total || 0;
            const updatedFixed = [...(state.currentBudget.fixed || [])];

            if (isEdit) {
                // Update existing
                updatedFixed[state.editingFixedIndex] = { name, amount, category, paymentMethod };
            } else {
                // Add new
                updatedFixed.push({ name, amount, category, paymentMethod });
            }

            const success = await updateBudgetOnServer(currentTotal, updatedFixed);
            if (success) {
                elements.newFixedName.value = '';
                elements.newFixedAmount.value = '';
                state.editingFixedIndex = null; // Reset
                const submitBtn = elements.fixedTxForm.querySelector('button[type="submit"]');
                if (submitBtn) submitBtn.textContent = '추가하기'; // Reset text
                elements.fixedModal.classList.remove('open'); // Auto close
            }
        });

        // Ensure "Add Fixed Expense" button resets state
        const openFixedBtn = document.getElementById('open-fixed-btn');
        // Need to find the button that opens table? "고정 지출 추가" button id is likely btn-fixed-expenses or similar?
        // Step 1680 showed elements.openFixedBtn
    }
}




// PWA & Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log('Service Worker Failed', err));
    });
}

// PWA Install Logic removed (Button deleted from Sidebar)

/* Notices Logic */
async function renderNotices() {
    if (!elements.noticeListContainer) return;
    try {
        const res = await fetch('/api/notices');
        if (!res.ok) throw new Error('Failed to fetch notices');
        const notices = await res.json();

        elements.noticeListContainer.innerHTML = '';
        if (notices.length === 0) {
            const msg = (window.i18n && window.i18n.t('msg-no-notices')) || '등록된 공지사항이 없습니다.';
            elements.noticeListContainer.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-secondary);">${msg}</div>`;
            return;
        }

        const isAdmin = state.userRole === 'ROLE_ADMIN' || state.userRole === 'ADMIN';

        notices.forEach(n => {
            const date = new Date(n.createdDate).toLocaleDateString();
            const div = document.createElement('div');
            div.className = 'card glass-panel';
            div.style.cssText = 'overflow: hidden; padding: 0; border: 1px solid var(--glass-border); margin-bottom: 0.8rem; border-radius: 8px;';

            // Header
            const header = document.createElement('div');
            header.style.cssText = 'padding: 1rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.1); transition: background 0.2s;';
            header.innerHTML = `
                <div style="font-weight: bold; font-size: 1.1rem; color: var(--text-primary); display:flex; align-items:center; gap:8px;">
                    <i class="fa-solid fa-chevron-right notice-icon" style="font-size:0.8rem; transition: transform 0.2s; color: var(--text-secondary);"></i>
                    <span style="flex:1;">${n.title}</span>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:0.8rem; color:var(--text-secondary); white-space:nowrap;">${date}</span>
                    ${isAdmin ? `<button onclick="event.stopPropagation(); deleteNotice(${n.id})" style="color:var(--danger-color); background:none; border:none; cursor:pointer; padding:0.5rem;"><i class="fa-solid fa-trash"></i></button>` : ''}
                </div>
            `;

            // Body
            const body = document.createElement('div');
            body.className = 'notice-content';
            body.style.cssText = 'display: none; padding: 1.2rem; border-top: 1px solid var(--glass-border); background: rgba(255,255,255,0.02);';
            body.innerHTML = `
                <div style="font-size:0.95rem; line-height:1.6; white-space:pre-wrap; color:var(--text-primary);">${n.content}</div>
            `;

            div.appendChild(header);
            div.appendChild(body);

            // Toggle
            header.onclick = () => {
                const isOpen = body.style.display !== 'none';
                body.style.display = isOpen ? 'none' : 'block';
                // Rotate icon
                const icon = header.querySelector('.notice-icon');
                if (icon) icon.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
                header.style.background = isOpen ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)';
            };

            elements.noticeListContainer.appendChild(div);
        });
    } catch (e) { console.error(e); }
}

async function saveNotice(e) {
    e.preventDefault();
    if (!elements.noticeTitle || !elements.noticeContent) return;
    try {
        const res = await fetch('/api/notices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: elements.noticeTitle.value,
                content: elements.noticeContent.value
            })
        });
        if (!res.ok) throw new Error('Failed to save notice');
        elements.noticeModal.classList.remove('open');
        elements.noticeForm.reset();
        renderNotices();
    } catch (e) { alert('저장 실패: ' + e); }
}

window.deleteNotice = async function (id) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
        const res = await fetch(`/api/notices/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
        renderNotices();
    } catch (e) { alert('삭제 실패: ' + e); }
};

function renderDonutChart(txs, donutEl, legendEl) {
    if (!donutEl || !legendEl) return;
    const expenses = txs.filter(t => t.type !== 'INCOME');
    if (expenses.length === 0) {
        donutEl.style.background = '#f5f5f5';
        legendEl.innerHTML = '<span style="color:var(--text-secondary); font-size:0.8rem;">지출 없음</span>';
        return;
    }
    const totals = {};
    let grandTotal = 0;
    expenses.forEach(tx => {
        const cat = tx.category || 'other';
        totals[cat] = (totals[cat] || 0) + Number(tx.amount);
        grandTotal += Number(tx.amount);
    });
    const sortedCats = Object.keys(totals).sort((a, b) => totals[b] - totals[a]);
    let conic = '';
    let startDeg = 0;
    legendEl.innerHTML = '';

    // Safety check for CATEGORY_COLORS
    const colors = (typeof CATEGORY_COLORS !== 'undefined') ? CATEGORY_COLORS : {};

    sortedCats.forEach(cat => {
        const amt = totals[cat];
        const pct = (amt / grandTotal) * 100;
        const deg = (amt / grandTotal) * 360;
        const endDeg = startDeg + deg;
        const color = colors[cat] || '#999';
        conic += `${color} ${startDeg}deg ${endDeg}deg, `;
        startDeg = endDeg;
        const item = document.createElement('div');
        item.className = 'donut-legend-item';
        const labelText = (window.i18n && window.i18n.t && window.i18n.t(`category-${cat}`)) || cat;
        item.innerHTML = `<div class="donut-legend-color" style="background:${color}"></div>${labelText} ${Math.round(pct)}%`;
        legendEl.appendChild(item);
    });
    conic = conic.slice(0, -2);
    donutEl.style.background = `conic-gradient(${conic})`;
}

async function runAnalysis() {
    if (!elements.analysisStartDate || !elements.analysisEndDate) return;
    const start = elements.analysisStartDate.value;
    const end = elements.analysisEndDate.value;
    if (!start || !end) return alert('날짜를 선택해주세요.');
    if (new Date(start) > new Date(end)) return alert('시작일이 종료일보다 늦을 수 없습니다.');

    try {
        elements.btnRunAnalysis.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        const bgParam = state.currentBudgetGroupId ? `&budgetGroupId=${state.currentBudgetGroupId}` : '';
        const res = await fetch(`/api/transactions/range?startDate=${start}&endDate=${end}${bgParam}`);
        if (!res.ok) throw new Error('Failed');
        const txs = await res.json();

        elements.analysisResults.style.display = 'block';
        elements.btnRunAnalysis.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> 조회';

        // Summary
        let inc = 0, exp = 0;
        txs.forEach(t => {
            if (t.type === 'INCOME') inc += t.amount;
            else exp += t.amount;
        });
        if (elements.analysisTotalIncome) elements.analysisTotalIncome.textContent = formatCurrency(inc);
        if (elements.analysisTotalExpense) elements.analysisTotalExpense.textContent = formatCurrency(exp);
        if (elements.analysisBalance) elements.analysisBalance.textContent = formatCurrency(inc - exp);

        renderDonutChart(txs, elements.analysisDonutChart, elements.analysisLegend);

        if (elements.analysisTxList) {
            elements.analysisTxList.innerHTML = txs.map(tx => {
                const isInc = tx.type === 'INCOME';
                const sign = isInc ? '+' : '-';
                const color = isInc ? 'var(--income-color)' : 'var(--expense-color)';
                const catLabel = (window.i18n && window.i18n.t && window.i18n.t(`category-${tx.category}`)) || tx.category;

                return `
                <li class="transaction-item" style="display:flex; justify-content:space-between; padding:0.8rem; border-bottom:1px solid var(--glass-border);">
                    <div style="display:flex; flex-direction:column;">
                        <span style="font-weight:500;">${tx.description}</span>
                        <span style="font-size:0.8rem; color:var(--text-secondary);">${new Date(tx.date).toLocaleDateString()} · ${catLabel}</span>
                    </div>
                    <span style="font-weight:bold; color:${color};">${sign}${formatCurrency(tx.amount)}</span>
                </li>`;
            }).join('');
        }

    } catch (e) {
        console.error(e);
        alert('조회 실패');
        elements.btnRunAnalysis.innerHTML = '조회';
    }
}

if (elements.btnRunAnalysis) elements.btnRunAnalysis.addEventListener('click', runAnalysis);

function populateFilterSelect() {
    const select = document.querySelector('.category-select');
    if (!select) return;

    // Reset keeping first option
    select.innerHTML = '<option value="all" data-i18n="filter-all-categories">모든 카테고리</option>';

    try {
        const expGroup = document.createElement('optgroup');
        expGroup.label = "지출";
        // Directly access global constant
        EXPENSE_CATEGORIES.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.value;
            opt.textContent = cat.label;
            // Use translation if available, fallback to label
            if (window.i18n && window.i18n.t) {
                const translated = window.i18n.t(`category-${cat.value}`);
                if (translated) opt.textContent = translated;
            }
            opt.setAttribute('data-i18n', `category-${cat.value}`);
            expGroup.appendChild(opt);
        });
        select.appendChild(expGroup);

        const incGroup = document.createElement('optgroup');
        incGroup.label = "수입";
        INCOME_CATEGORIES.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.value;
            opt.textContent = cat.label;
            if (window.i18n && window.i18n.t) {
                const translated = window.i18n.t(`category-${cat.value}`);
                if (translated) opt.textContent = translated;
            }
            opt.setAttribute('data-i18n', `category-${cat.value}`);
            incGroup.appendChild(opt);
        });
        select.appendChild(incGroup);
    } catch (e) {
        console.error("Error populating categories", e);
    }
}

// Prepare Init
document.addEventListener('DOMContentLoaded', init);

// Force run immediately in case DOMContentLoaded already passed (rare but possible w/ defer)
// or just to ensure it runs.
populateFilterSelect();
