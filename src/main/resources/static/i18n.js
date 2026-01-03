// 다국어 번역 데이터
const translations = {
    ko: {
        // 공통
        'app-name': '도토리 플래너',
        'login': '로그인',
        'signup': '회원가입',
        'logout': '로그아웃',

        // 홈 페이지
        'hero-title': '똑똑하게 모으는<br>당신의 도토리',
        'hero-subtitle': '월별 예산 관리부터 일일 지출 추적까지,<br>도토리 플래너와 함께 재정 목표를 달성하세요',
        'get-started': '무료로 시작하기',
        'features-title': '주요 기능',
        'feature1-title': '월별 예산 설정',
        'feature1-desc': '매월 수입과 고정 지출을 설정하여 실제 사용 가능한 예산을 자동으로 계산합니다.',
        'feature2-title': '일일 권장 지출',
        'feature2-desc': '남은 예산과 일수를 고려하여 하루에 얼마를 쓸 수 있는지 실시간으로 알려드립니다.',
        'feature3-title': '지출 분석',
        'feature3-desc': '카테고리별 지출 내역을 시각화하여 소비 패턴을 한눈에 파악할 수 있습니다.',
        'feature4-title': '고정 지출 관리',
        'feature4-desc': '월세, 통신비 등 매월 반복되는 고정 지출을 등록하여 자동으로 예산에서 차감합니다.',
        'feature5-title': '달력 뷰',
        'feature5-desc': '달력에서 일별 지출을 확인하고, 특정 날짜의 상세 내역을 쉽게 조회할 수 있습니다.',
        'feature6-title': '안전한 데이터',
        'feature6-desc': '개인별 계정으로 안전하게 관리되며, 언제 어디서나 접속하여 확인할 수 있습니다.',
        'cta-title': '지금 바로 시작하세요',
        'cta-subtitle': '무료로 가입하고 똑똑한 재정 관리를 경험해보세요',
        'cta-button': '회원가입하기',
        'footer-copyright': '© 2026 도토리 플래너. All rights reserved.',

        // 법적 고지
        'footer-privacy': '개인정보 처리방침',
        'footer-terms': '이용약관',
        'btn-back-home': '메인으로 돌아가기',
        'go-dashboard': '내 가계부로 이동',
        'last-updated': '최종 수정일: 2026년 1월 2일',
        'privacy-title': '개인정보 처리방침',
        'terms-title': '이용약관',

        // 개인정보 처리방침 본문
        'privacy-intro': "'도토리 플래너' (이하 '서비스')는 이용자의 개인정보를 매우 중요하게 생각하며, \"개인정보 보호법\" 등 관련 법령을 철저히 준수하고 있습니다.",
        'privacy-h1': '1. 수집하는 개인정보의 항목',
        'privacy-desc1': '서비스는 회원가입, 원활한 고객상담, 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.',
        'privacy-list1': '<li><strong>수집항목</strong>: 이메일 주소, 비밀번호(암호화), 사용자 이름, 서비스 이용 기록</li><li><strong>수집방법</strong>: 홈페이지 회원가입</li>',
        'privacy-h2': '2. 개인정보의 수집 및 이용목적',
        'privacy-desc2': '수집한 개인정보를 다음의 목적을 위해 활용합니다.',
        'privacy-list2': '<li>서비스 제공에 따른 본인 인증, 맞춤형 콘텐츠 제공</li><li>회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 부정 이용 방지</li>',
        'privacy-h3': '3. 개인정보의 보유 및 이용기간',
        'privacy-desc3': '원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 일정 기간 동안 회원정보를 보관합니다.',
        'privacy-list3': '<li><strong>보존 항목</strong>: 로그인 ID, 결제 기록 (있는 경우)</li><li><strong>보존 근거</strong>: 전자상거래 등에서의 소비자보호에 관한 법률</li><li><strong>보존 기간</strong>: 3개월 ~ 5년</li>',
        'privacy-h4': '4. 개인정보의 파기절차 및 방법',
        'privacy-desc4': '이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.',
        'privacy-h5': '5. 이용자 및 법정대리인의 권리와 행사방법',
        'privacy-desc5': '이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 가입해지를 요청할 수 있습니다.',

        // 이용약관 본문
        'terms-h1': '제1조 (목적)',
        'terms-desc1': '본 약관은 <strong>도토리 플래너</strong>(이하 "서비스")가 제공하는 모든 서비스의 이용조건 및 절차, 이용자와 서비스의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.',
        'terms-h2': '제2조 (약관의 효력과 변경)',
        'terms-desc2': '서비스는 귀하가 본 약관의 내용에 동의하는 것을 조건으로 귀하에게 서비스를 제공할 것이며, 귀하가 본 약관의 내용에 동의하는 경우, 서비스의 서비스 제공 행위 및 귀하의 서비스 사용 행위에는 본 약관이 우선적으로 적용될 것입니다.',
        'terms-h3': '제3조 (서비스의 제공 및 이용)',
        'terms-desc3': '서비스는 회원의 이용신청을 승낙한 때부터 서비스를 개시합니다. 단, 일부 서비스의 경우에는 지정된 일자부터 서비스를 개시할 수 있습니다.',
        'terms-list3': '<li>서비스 제공 시간은 <strong>연중무휴 1일 24시간</strong>을 원칙으로 합니다.</li><li>정기 점검 등 서비스의 운영상 필요한 경우, 일정 기간 동안 서비스가 일시 중단될 수 있습니다.</li>',
        'terms-h4': '제4조 (회원의 의무)',
        'terms-desc4': '회원은 서비스를 이용할 때 다음 각 호의 행위를 하여서는 아니 됩니다.',
        'terms-list4': '<li>신청 또는 변경 시 허위 내용을 등록하는 행위</li><li>타인의 정보를 도용하는 행위</li><li>서비스의 운영을 고의로 방해하거나 규정에 어긋나는 행동을 하는 행위</li>',
        'terms-h5': '제5조 (책임제한)',
        'terms-desc5': '서비스는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.',

        // 로그인 페이지
        'login-title': '로그인',
        'login-subtitle': '도토리 플래너에 오신 것을 환영합니다',
        'email-label': '이메일',
        'password-label': '비밀번호',
        'login-button': '로그인',
        'no-account': '계정이 없으신가요?',
        'register-link': '회원가입',
        'remember-me': '로그인 유지',

        // 회원가입 페이지
        'register-title': '회원가입',
        'register-subtitle': '도토리 플래너와 함께 시작하세요',
        'username-label': '사용자 이름',
        'confirm-password-label': '비밀번호 확인',
        'register-button': '회원가입',
        'have-account': '이미 계정이 있으신가요?',

        // 유효성 검사 메시지
        'validation-username-short': '사용자 이름은 최소 3자 이상이어야 합니다.',
        'validation-username-available': '사용 가능한 사용자 이름입니다.',
        'validation-username-taken': '이미 사용 중인 사용자 이름입니다.',
        'validation-email-invalid': '유효한 이메일 주소를 입력하세요.',
        'validation-email-available': '사용 가능한 이메일입니다.',
        'validation-email-taken': '이미 사용 중인 이메일입니다.',
        'validation-password-short': '비밀번호는 최소 6자 이상이어야 합니다.',
        'validation-password-match': '비밀번호가 일치하지 않습니다.',
        'password-strength-weak': '약한 비밀번호',
        'password-strength-medium': '보통 비밀번호',
        'password-strength-strong': '강한 비밀번호',

        // 대시보드 (index.html)
        'nav-dashboard': '대시보드',
        'nav-calendar': '달력',
        'nav-transactions': '내역',
        'nav-fixed-expenses': '고정 지출',
        'btn-budget-settings': '예산 설정',
        'btn-add-expense': '지출 추가',
        'btn-add-fixed': '고정 지출 추가',

        // 대시보드 카드
        'card-total-budget': '총 예산',
        'card-spent': '지출 금액',
        'card-remaining': '남은 잔액',
        'card-daily-budget': '일일 권장 지출',
        'chart-expense-trend': '지출 흐름',
        'recent-transactions': '최근 내역',
        'btn-view-all': '모두 보기',

        // 달력
        'day-sun': '일',
        'day-mon': '월',
        'day-tue': '화',
        'day-wed': '수',
        'day-thu': '목',
        'day-fri': '금',
        'day-sat': '토',

        // 거래 내역
        'search-placeholder': '내역 검색...',
        'filter-all-categories': '모든 카테고리',
        'category-food': '식비',
        'category-transport': '교통',
        'category-shopping': '쇼핑',
        'category-bills': '공과금',
        'category-other': '기타',
        'table-date': '날짜',
        'table-description': '내용',
        'table-category': '카테고리',
        'table-amount': '금액',
        'table-actions': '관리',

        // 모달
        'modal-add-expense': '새 지출 추가',
        'modal-add-income': '새 수입 추가',
        'modal-add-fixed': '고정 지출 추가',
        'header-registered-list': '등록된 목록',
        'msg-no-fixed': '등록된 고정 지출이 없습니다.',
        'chart-category': '카테고리별 지출',
        'title-fixed-expenses': '고정 지출 관리',
        'table-fixed-name': '항목명',
        'table-fixed-day': '출금일',
        'label-date': '날짜',
        'label-description': '내용',
        'label-amount': '금액',
        'label-category': '카테고리',
        'btn-save': '저장',
        'btn-cancel': '취소',

        // 추가 누락된 키 (모달/카테고리)
        'type-expense': '지출',
        'type-income': '수입',
        'btn-add': '추가하기',
        'btn-add-expense': '지출 추가하기',
        'btn-add-income': '수입 추가하기',
        'btn-copy-prev': '지난달 내역 불러오기',
        'msg-loading': '로딩 중...',
        'btn-copy-prev': '지난달 내역 불러오기',
        'msg-loading': '로딩 중...',
        'nav-notices': '공지사항',
        'title-notices': '공지사항',
        'btn-write-notice': '글쓰기',
        'msg-no-notices': '등록된 공지사항이 없습니다.',
        'modal-write-notice': '공지사항 작성',
        'label-title': '제목',
        'label-content': '내용',
        'title-budget-settings': '예산 설정',
        'label-total-budget': '월 총 예산',
        'label-current-budget': '현재 예산',
        'category-salary': '월급',
        'category-allowance': '용돈',
        'category-bonus': '보너스',
        'category-carryover': '이월',
        'category-living': '생활',
        'category-personal': '개인',
        'category-hobby': '취미',
        'category-gathering': '모임',
        'category-housing': '주거',
        'category-communication': '통신',
        'category-utilities': '공과금',
        'category-subscription': '구독',
        'category-insurance_finance': '보험/금융',
        'placeholder-expense-desc': '예: 점심 식사',
        'placeholder-income-desc': '예: 월급, 보너스'
    },
    en: {
        // Common
        'app-name': 'Dotori Planner',
        'login': 'Login',
        'signup': 'Sign Up',
        'logout': 'Logout',

        // Home page
        'hero-title': 'Smart Savings<br>Your Acorns',
        'hero-subtitle': 'From monthly budget management to daily expense tracking,<br>achieve your financial goals with Dotori Planner',
        'get-started': 'Get Started Free',
        'features-title': 'Key Features',
        'feature1-title': 'Monthly Budget Setting',
        'feature1-desc': 'Set your monthly income and fixed expenses to automatically calculate your available budget.',
        'feature2-title': 'Daily Spending Recommendation',
        'feature2-desc': 'Get real-time recommendations on how much you can spend per day based on remaining budget and days.',
        'feature3-title': 'Expense Analysis',
        'feature3-desc': 'Visualize spending by category to understand your consumption patterns at a glance.',
        'feature4-title': 'Fixed Expense Management',
        'feature4-desc': 'Register recurring fixed expenses like rent and utilities to automatically deduct from your budget.',
        'feature5-title': 'Calendar View',
        'feature5-desc': 'Check daily expenses on the calendar and easily view detailed records for specific dates.',
        'feature6-title': 'Secure Data',
        'feature6-desc': 'Safely managed with individual accounts, accessible anytime, anywhere.',
        'cta-title': 'Start Now',
        'cta-subtitle': 'Sign up for free and experience smart financial management',
        'cta-button': 'Sign Up Now',
        'footer-copyright': '© 2026 Dotori Planner. All rights reserved.',

        // Legal
        'footer-privacy': 'Privacy Policy',
        'footer-terms': 'Terms of Service',
        'btn-back-home': 'Back to Home',
        'go-dashboard': 'Go to Dashboard',
        'last-updated': 'Last Updated: Jan 2, 2026',
        'privacy-title': 'Privacy Policy',
        'terms-title': 'Terms of Service',

        // Privacy Content
        'privacy-intro': "'Dotori Planner' (hereinafter 'Service') values your personal information highly and strictly complies with relevant laws such as the \"Personal Information Protection Act\".",
        'privacy-h1': '1. Items of Personal Information Collected',
        'privacy-desc1': 'The Service collects the following personal information for membership registration, customer consultation, and service provision.',
        'privacy-list1': '<li><strong>Items</strong>: Email address, encrypted password, username, service usage records</li><li><strong>Method</strong>: Website registration</li>',
        'privacy-h2': '2. Purpose of Collection and Use',
        'privacy-desc2': 'We use the collected personal information for the following purposes.',
        'privacy-list2': '<li>Identity verification for service provision, customized content</li><li>Member management: Identity verification, identification, prevention of unauthorized use</li>',
        'privacy-h3': '3. Retention and Use Period',
        'privacy-desc3': 'In principle, personal information is destroyed without delay after the purpose of collection and use is achieved. However, if preservation is required by relevant laws, the company retains member information for a certain period.',
        'privacy-list3': '<li><strong>Items</strong>: Login ID, payment records (if any)</li><li><strong>Basis</strong>: Act on Consumer Protection in Electronic Commerce, etc.</li><li><strong>Period</strong>: 3 months ~ 5 years</li>',
        'privacy-h4': '4. Destruction Procedures and Methods',
        'privacy-desc4': 'User personal information is destroyed without delay once the purpose is achieved. Information in electronic file form is deleted using technical methods that cannot reproduce the record.',
        'privacy-h5': '5. Rights of Users and Legal Representatives',
        'privacy-desc5': 'Users may view or modify their registered personal information at any time and may request cancellation of membership.',

        // Terms Content
        'terms-h1': 'Article 1 (Purpose)',
        'terms-desc1': 'These Terms aim to prescribe the conditions and procedures for using all services provided by <strong>Dotori Planner</strong> (hereinafter "Service"), as well as the rights, obligations, and responsibilities of users and the Service.',
        'terms-h2': 'Article 2 (Effect and Change of Terms)',
        'terms-desc2': 'The Service will provide services to you on the condition that you agree to these Terms. If you agree, these Terms will apply preferentially to the Service\'s provision and your use of the Service.',
        'terms-h3': 'Article 3 (Provision and Use of Service)',
        'terms-desc3': 'The Service commences when the member\'s application is accepted. However, for some services, the service may commence from a designated date.',
        'terms-list3': '<li>Service hours are <strong>24 hours a day, 365 days a year</strong> in principle.</li><li>Services may be temporarily suspended for a certain period if necessary for operations, such as regular maintenance.</li>',
        'terms-h4': 'Article 4 (Obligations of Members)',
        'terms-desc4': 'Members shall not engage in the following acts when using the Service.',
        'terms-list4': '<li>Registering false information upon application or change</li><li>Stealing other people\'s information</li><li>Intentionally interfering with the operation of the Service or acting against regulations</li>',
        'terms-h5': 'Article 5 (Limitation of Liability)',
        'terms-desc5': 'The Service is exempted from liability for service provision if it cannot provide services due to natural disasters or other force majeure equivalent thereto.',

        // Login page
        'login-title': 'Login',
        'login-subtitle': 'Welcome to Dotori Planner',
        'email-label': 'Email',
        'password-label': 'Password',
        'login-button': 'Login',
        'no-account': "Don't have an account?",
        'register-link': 'Sign Up',
        'remember-me': 'Remember Me',

        // Register page
        'register-title': 'Sign Up',
        'register-subtitle': 'Get started with Dotori Planner',
        'username-label': 'Username',
        'confirm-password-label': 'Confirm Password',
        'register-button': 'Sign Up',
        'have-account': 'Already have an account?',

        // Validation messages
        'validation-username-short': 'Username must be at least 3 characters.',
        'validation-username-available': 'Username is available.',
        'validation-username-taken': 'Username is already taken.',
        'validation-email-invalid': 'Please enter a valid email address.',
        'validation-email-available': 'Email is available.',
        'validation-email-taken': 'Email is already taken.',
        'validation-password-short': 'Password must be at least 6 characters.',
        'validation-password-match': 'Passwords do not match.',
        'password-strength-weak': 'Weak password',
        'password-strength-medium': 'Medium password',
        'password-strength-strong': 'Strong password',

        // Dashboard (index.html)
        'nav-dashboard': 'Dashboard',
        'nav-calendar': 'Calendar',
        'nav-transactions': 'Transactions',
        'nav-fixed-expenses': 'Fixed Expenses',
        'btn-budget-settings': 'Budget Settings',
        'btn-add-expense': 'Add Expense',
        'btn-add-fixed': 'Add Fixed Expense',

        // Dashboard cards
        'card-total-budget': 'Total Budget',
        'card-spent': 'Spent',
        'card-remaining': 'Remaining',
        'card-daily-budget': 'Daily Budget',
        'chart-expense-trend': 'Expense Trend',
        'recent-transactions': 'Recent Transactions',
        'btn-view-all': 'View All',

        // Calendar
        'day-sun': 'Sun',
        'day-mon': 'Mon',
        'day-tue': 'Tue',
        'day-wed': 'Wed',
        'day-thu': 'Thu',
        'day-fri': 'Fri',
        'day-sat': 'Sat',

        // Transactions
        'search-placeholder': 'Search transactions...',
        'filter-all-categories': 'All Categories',
        'category-food': 'Food',
        'category-transport': 'Transport',
        'category-shopping': 'Shopping',
        'category-bills': 'Bills',
        'category-other': 'Other',
        'table-date': 'Date',
        'table-description': 'Description',
        'table-category': 'Category',
        'table-amount': 'Amount',
        'table-actions': 'Actions',

        // Modal
        'modal-add-expense': 'Add New Expense',
        'modal-add-income': 'Add New Income',
        'modal-add-fixed': 'Add Fixed Expense',
        'header-registered-list': 'Registered List',
        'msg-no-fixed': 'No fixed expenses registered.',
        'chart-category': 'Expenses by Category',
        'title-fixed-expenses': 'Fixed Expense Management',
        'table-fixed-name': 'Item Name',
        'table-fixed-day': 'Day',
        'label-date': 'Date',
        'label-description': 'Description',
        'label-amount': 'Amount',
        'label-category': 'Category',
        'btn-save': 'Save',
        'btn-cancel': 'Cancel',

        'type-expense': 'Expense',
        'type-income': 'Income',
        'btn-add': 'Add',
        'btn-add-expense': 'Add Expense',
        'btn-add-income': 'Add Income',
        'btn-copy-prev': 'Copy Last Month',
        'msg-loading': 'Loading...',
        'btn-copy-prev': 'Copy Last Month',
        'msg-loading': 'Loading...',
        'nav-notices': 'Notices',
        'title-notices': 'Notices',
        'btn-write-notice': 'Write Notice',
        'msg-no-notices': 'No notices found.',
        'modal-write-notice': 'Write Notice',
        'label-title': 'Title',
        'label-content': 'Content',
        'title-budget-settings': 'Budget Settings',
        'label-total-budget': 'Total Monthly Budget',
        'label-current-budget': 'Current Budget',
        'category-salary': 'Salary',
        'category-allowance': 'Allowance',
        'category-bonus': 'Bonus',
        'category-carryover': 'Carryover',
        'category-living': 'Living',
        'category-personal': 'Personal',
        'category-hobby': 'Hobby',
        'category-gathering': 'Gathering',
        'category-housing': 'Housing',
        'category-communication': 'Communication',
        'category-utilities': 'Utilities',
        'category-subscription': 'Subscription',
        'category-insurance_finance': 'Insurance/Finance',
        'placeholder-expense-desc': 'e.g. Lunch',
        'placeholder-income-desc': 'e.g. Salary, Bonus'
    },
    ja: {
        // Common
        'app-name': 'どんぐりプランナー',
        'login': 'ログイン',
        'signup': '会員登録',
        'logout': 'ログアウト',

        // Home page
        'hero-title': '賢く貯める<br>あなたのどんぐり',
        'hero-subtitle': '月別予算管理から日々の支出追跡まで、<br>どんぐりプランナーで財務目標を達成しましょう',
        'get-started': '無料で始める',
        'features-title': '主な機能',
        'feature1-title': '月別予算設定',
        'feature1-desc': '毎月の収入と固定支出を設定して、実際に使用可能な予算を自動計算します。',
        'feature2-title': '1日の推奨支出',
        'feature2-desc': '残りの予算と日数を考慮して、1日にいくら使えるかをリアルタイムでお知らせします。',
        'feature3-title': '支出分析',
        'feature3-desc': 'カテゴリー別の支出履歴を視覚化して、消費パターンを一目で把握できます。',
        'feature4-title': '固定支出管理',
        'feature4-desc': '家賃、通信費など毎月繰り返される固定支出を登録して、自動的に予算から差し引きます。',
        'feature5-title': 'カレンダービュー',
        'feature5-desc': 'カレンダーで日別の支出を確認し、特定の日付の詳細履歴を簡単に照会できます。',
        'feature6-title': '安全なデータ',
        'feature6-desc': '個人アカウントで安全に管理され、いつでもどこでもアクセスして確認できます。',
        'cta-title': '今すぐ始めましょう',
        'cta-subtitle': '無料で登録して、賢い財務管理を体験してください',
        'cta-button': '会員登録する',
        'footer-copyright': '© 2026 どんぐりプランナー. All rights reserved.',

        // Legal
        'footer-privacy': 'プライバシーポリシー',
        'footer-terms': '利用規約',
        'btn-back-home': 'ホームに戻る',
        'go-dashboard': 'ダッシュボードへ',
        'last-updated': '最終更新日：2026年1月2日',
        'privacy-title': 'プライバシーポリシー',
        'terms-title': '利用規約',

        // Privacy Content
        'privacy-intro': "「どんぐりプランナー」（以下「サービス」）は、利用者の個人情報を非常に重要視し、「個人情報保護法」などの関連法令を遵守しています。",
        'privacy-h1': '1. 収集する個人情報の項目',
        'privacy-desc1': 'サービスは、会員登録、円滑な顧客相談、サービス提供のために、以下のような個人情報を収集しています。',
        'privacy-list1': '<li><strong>収集項目</strong>：メールアドレス、パスワード（暗号化）、ユーザー名、サービス利用記録</li><li><strong>収集方法</strong>：ホームページ会員登録</li>',
        'privacy-h2': '2. 個人情報の収集および利用目的',
        'privacy-desc2': '収集した個人情報を以下の目的で活用します。',
        'privacy-list2': '<li>サービス提供に伴う本人認証、カスタマイズされたコンテンツ提供</li><li>会員管理：会員制サービス利用に伴う本人確認、個人識別、不正利用防止</li>',
        'privacy-h3': '3. 個人情報の保有および利用期間',
        'privacy-desc3': '原則として、個人情報の収集および利用目的が達成された後は、当該情報を遅滞なく破棄します。ただし、関係法令の規定により保存する必要がある場合、会社は一定期間会員情報を保管します。',
        'privacy-list3': '<li><strong>保存項目</strong>：ログインID、決済記録（ある場合）</li><li><strong>保存根拠</strong>：電子商取引等における消費者保護に関する法律</li><li><strong>保存期間</strong>：3ヶ月〜5年</li>',
        'privacy-h4': '4. 個人情報の破棄手続きおよび方法',
        'privacy-desc4': '利用者の個人情報は、原則として個人情報の収集および利用目的が達成されれば遅滞なく破棄します。電子ファイル形式の情報は、記録を再生できない技術的方法を使用して削除します。',
        'privacy-h5': '5. 利用者および法定代理人の権利とその行使方法',
        'privacy-desc5': '利用者はいつでも登録されている自分の個人情報を照会または修正することができ、退会を要求することができます。',

        // Terms Content
        'terms-h1': '第1条（目的）',
        'terms-desc1': '本約款は、<strong>どんぐりプランナー</strong>（以下「サービス」）が提供するすべてのサービスの利用条件および手続き、利用者とサービスの権利、義務、責任事項、その他必要な事項を規定することを目的とします。',
        'terms-h2': '第2条（約款の効力と変更）',
        'terms-desc2': 'サービスは、お客様が本約款の内容に同意することを条件としてお客様にサービスを提供し、お客様が本約款の内容に同意する場合、サービスの提供行為およびお客様のサービス使用行為には本約款が優先的に適用されます。',
        'terms-h3': '第3条（サービスの提供および利用）',
        'terms-desc3': 'サービスは、会員の利用申請を承諾した時からサービスを開始します。ただし、一部のサービスの場合は、指定された日付からサービスを開始する場合があります。',
        'terms-list3': '<li>サービス提供時間は、原則として<strong>年中無休1日24時間</strong>とします。</li><li>定期点検などサービスの運営上必要な場合、一定期間サービスが一時中断されることがあります。</li>',
        'terms-h4': '第4条（会員の義務）',
        'terms-desc4': '会員は、サービスを利用する際に以下の各号の行為を行ってはなりません。',
        'terms-list4': '<li>申請または変更時に虚偽の内容を登録する行為</li><li>他人の情報を盗用する行為</li><li>サービスの運営を故意に妨害したり、規定に反する行動をする行為</li>',
        'terms-h5': '第5条（責任制限）',
        'terms-desc5': 'サービスは、天災地変またはこれに準ずる不可抗力によりサービスを提供できない場合、サービス提供に関する責任が免除されます。',

        // Login page
        'login-title': 'ログイン',
        'login-subtitle': 'どんぐりプランナーへようこそ',
        'email-label': 'メールアドレス',
        'password-label': 'パスワード',
        'login-button': 'ログイン',
        'no-account': 'アカウントをお持ちでないですか？',
        'register-link': '会員登録',
        'remember-me': 'ログイン状態を保持',

        // Register page
        'register-title': '会員登録',
        'register-subtitle': 'どんぐりプランナーを始めましょう',
        'username-label': 'ユーザー名',
        'confirm-password-label': 'パスワード確認',
        'register-button': '会員登録',
        'have-account': 'すでにアカウントをお持ちですか？',

        // Validation messages
        'validation-username-short': 'ユーザー名は3文字以上必要です。',
        'validation-username-available': '使用可能なユーザー名です。',
        'validation-username-taken': 'すでに使用されているユーザー名です。',
        'validation-email-invalid': '有効なメールアドレスを入力してください。',
        'validation-email-available': '使用可能なメールアドレスです。',
        'validation-email-taken': 'すでに使用されているメールアドレスです。',
        'validation-password-short': 'パスワードは6文字以上必要です。',
        'validation-password-match': 'パスワードが一致しません。',
        'password-strength-weak': '弱いパスワード',
        'password-strength-medium': '普通のパスワード',
        'password-strength-strong': '強いパスワード',

        // Dashboard (index.html)
        'nav-dashboard': 'ダッシュボード',
        'nav-calendar': 'カレンダー',
        'nav-transactions': '履歴',
        'nav-fixed-expenses': '固定支出',
        'btn-budget-settings': '予算設定',
        'btn-add-expense': '支出追加',
        'btn-add-fixed': '固定支出追加',

        // Dashboard cards
        'card-total-budget': '総予算',
        'card-spent': '支出金額',
        'card-remaining': '残高',
        'card-daily-budget': '1日の推奨支出',
        'chart-expense-trend': '支出推移',
        'recent-transactions': '最近の履歴',
        'btn-view-all': 'すべて表示',

        // Calendar
        'day-sun': '日',
        'day-mon': '月',
        'day-tue': '火',
        'day-wed': '水',
        'day-thu': '木',
        'day-fri': '金',
        'day-sat': '土',

        // Transactions
        'search-placeholder': '履歴を検索...',
        'filter-all-categories': 'すべてのカテゴリー',
        'category-food': '食費',
        'category-transport': '交通費',
        'category-shopping': 'ショッピング',
        'category-bills': '公共料金',
        'category-other': 'その他',
        'table-date': '日付',
        'table-description': '内容',
        'table-category': 'カテゴリー',
        'table-amount': '金額',
        'table-actions': '管理',

        // Modal
        'modal-add-expense': '新しい支出を追加',
        'modal-add-income': '新しい収入を追加',
        'modal-add-fixed': '固定支出追加',
        'header-registered-list': '登録済みリスト',
        'msg-no-fixed': '登録された固定支出がありません。',
        'chart-category': 'カテゴリー別支出',
        'title-fixed-expenses': '固定支出管理',
        'table-fixed-name': '項目名',
        'table-fixed-day': '引落日',
        'label-date': '日付',
        'label-description': '内容',
        'label-amount': '金額',
        'label-category': 'カテゴリー',
        'btn-save': '保存',
        'btn-cancel': 'キャンセル',

        'type-expense': '支出',
        'type-income': '収入',
        'btn-add': '追加',
        'btn-add-expense': '支出を追加',
        'btn-add-income': '収入を追加',
        'btn-copy-prev': '先月の履歴をコピー',
        'msg-loading': '読み込み中...',
        'btn-copy-prev': '先月の履歴をコピー',
        'msg-loading': '読み込み中...',
        'nav-notices': 'お知らせ',
        'title-notices': 'お知らせ',
        'btn-write-notice': '作成',
        'msg-no-notices': '登録されたお知らせはありません。',
        'modal-write-notice': 'お知らせ作成',
        'label-title': 'タイトル',
        'label-content': '内容',
        'title-budget-settings': '予算設定',
        'label-total-budget': '月間総予算',
        'label-current-budget': '現在の予算',
        'category-salary': '給料',
        'category-allowance': 'お小遣い',
        'category-bonus': 'ボーナス',
        'category-carryover': '繰越',
        'category-living': '生活',
        'category-personal': '個人',
        'category-hobby': '趣味',
        'category-gathering': '集まり',
        'category-housing': '住居',
        'category-communication': '通信',
        'category-utilities': '光熱費',
        'category-subscription': 'サブスク',
        'category-insurance_finance': '保険/金融',
        'placeholder-expense-desc': '例：ランチ',
        'placeholder-income-desc': '例：給料、ボーナス'
    },
    zh: {
        // Common
        'app-name': '橡果规划师',
        'login': '登录',
        'signup': '注册',
        'logout': '退出',

        // Home page
        'hero-title': '聪明储蓄<br>您的橡果',
        'hero-subtitle': '从月度预算管理到每日支出跟踪，<br>与橡果规划师一起实现您的财务目标',
        'get-started': '免费开始',
        'features-title': '主要功能',
        'feature1-title': '月度预算设置',
        'feature1-desc': '设置每月收入和固定支出，自动计算实际可用预算。',
        'feature2-title': '每日推荐支出',
        'feature2-desc': '根据剩余预算和天数，实时告诉您每天可以花多少钱。',
        'feature3-title': '支出分析',
        'feature3-desc': '按类别可视化支出记录，一目了然地了解消费模式。',
        'feature4-title': '固定支出管理',
        'feature4-desc': '注册房租、通讯费等每月重复的固定支出，自动从预算中扣除。',
        'feature5-title': '日历视图',
        'feature5-desc': '在日历中查看每日支出，轻松查询特定日期的详细记录。',
        'feature6-title': '安全数据',
        'feature6-desc': '通过个人账户安全管理，随时随地访问查看。',
        'cta-title': '立即开始',
        'cta-subtitle': '免费注册，体验智能财务管理',
        'cta-button': '立即注册',
        'footer-copyright': '© 2026 橡果规划师. 保留所有权利。',

        // Legal
        'footer-privacy': '隐私政策',
        'footer-terms': '服务条款',
        'btn-back-home': '返回首页',
        'go-dashboard': '前往仪表板',
        'last-updated': '最后更新：2026年1月2日',
        'privacy-title': '隐私政策',
        'terms-title': '服务条款',

        // Privacy Content
        'privacy-intro': "“橡果规划师”（以下简称“服务”）非常重视用户的个人信息，并严格遵守《个人信息保护法》等相关法律法规。",
        'privacy-h1': '1. 收集的个人信息项目',
        'privacy-desc1': '服务为了会员注册、顺利的客户咨询和服务提供，收集以下个人信息。',
        'privacy-list1': '<li><strong>收集项目</strong>：电子邮件地址、密码（加密）、用户名、服务使用记录</li><li><strong>收集方法</strong>：网站注册</li>',
        'privacy-h2': '2. 个人信息的收集及使用目的',
        'privacy-desc2': '我们将收集的个人信息用于以下目的。',
        'privacy-list2': '<li>提供服务所需的身份验证、定制内容提供</li><li>会员管理：会员制服务使用所需的身份确认、个人识别、防止不正当使用</li>',
        'privacy-h3': '3. 个人信息的保留及使用期间',
        'privacy-desc3': '原则上，个人信息收集及使用目的达成后，将立即销毁该信息。但是，根据相关法律法规的规定需要保存的情况下，公司将在一定期限内保管会员信息。',
        'privacy-list3': '<li><strong>保存项目</strong>：登录ID、支付记录（如有）</li><li><strong>保存依据</strong>：关于电子商务等消费者保护的法律</li><li><strong>保存期间</strong>：3个月 ~ 5年</li>',
        'privacy-h4': '4. 个人信息的销毁程序及方法',
        'privacy-desc4': '用户的个人信息原则上在达成收集及使用目的后立即销毁。电子文件形式的信息使用无法恢复记录的技术方法进行删除。',
        'privacy-h5': '5. 用户及法定代理人的权利及其行使方法',
        'privacy-desc5': '用户可以随时查询或修改自己注册的个人信息，并可以请求注销会员。',

        // Terms Content
        'terms-h1': '第1条（目的）',
        'terms-desc1': '本条款旨在规定使用<strong>橡果规划师</strong>（以下简称“服务”）提供的所有服务的使用条件及程序、用户与服务的权利、义务、责任事项及其他必要事项。',
        'terms-h2': '第2条（条款的效力与变更）',
        'terms-desc2': '服务以您同意本条款内容为条件向您提供服务，如果您同意本条款内容，本条款将优先适用于服务的提供行为及您的服务使用行为。',
        'terms-h3': '第3条（服务的提供及使用）',
        'terms-desc3': '服务自同意会员的使用申请之时起开始。但是，对于部分服务，可能从指定日期开始服务。',
        'terms-list3': '<li>服务提供时间原则上为<strong>全年无休，每天24小时</strong>。</li><li>因定期检查等服务运营需要，服务可能会在一定期间内暂停。</li>',
        'terms-h4': '第4条（会员的义务）',
        'terms-desc4': '会员在使用服务时不得进行以下各号及其行为。',
        'terms-list4': '<li>申请或变更时注册虚假内容的行为</li><li>盗用他人信息的行为</li><li>故意妨碍服务运营或违反规定的行为</li>',
        'terms-h5': '第5条（责任限制）',
        'terms-desc5': '因自然灾害或与之相当的不可抗力导致无法提供服务的，服务免除关于提供服务的责任。',

        // Login page
        'login-title': '登录',
        'login-subtitle': '欢迎来到橡果规划师',
        'email-label': '电子邮箱',
        'password-label': '密码',
        'login-button': '登录',
        'no-account': '还没有账户？',
        'register-link': '注册',
        'remember-me': '记住我',

        // Register page
        'register-title': '注册',
        'register-subtitle': '开始使用橡果规划师',
        'username-label': '用户名',
        'confirm-password-label': '确认密码',
        'register-button': '注册',
        'have-account': '已有账户？',

        // Validation messages
        'validation-username-short': '用户名至少3个字符。',
        'validation-username-available': '用户名可用。',
        'validation-username-taken': '用户名已被使用。',
        'validation-email-invalid': '请输入有效的电子邮箱。',
        'validation-email-available': '电子邮箱可用。',
        'validation-email-taken': '电子邮箱已被使用。',
        'validation-password-short': '密码至少6个字符。',
        'validation-password-match': '密码不匹配。',
        'password-strength-weak': '弱密码',
        'password-strength-medium': '中等密码',
        'password-strength-strong': '强密码',

        // Dashboard (index.html)
        'nav-dashboard': '仪表板',
        'nav-calendar': '日历',
        'nav-transactions': '记录',
        'nav-fixed-expenses': '固定支出',
        'btn-budget-settings': '预算设置',
        'btn-add-expense': '添加支出',
        'btn-add-fixed': '添加固定支出',

        // Dashboard cards
        'card-total-budget': '总预算',
        'card-spent': '已支出',
        'card-remaining': '剩余余额',
        'card-daily-budget': '每日推荐支出',
        'chart-expense-trend': '支出趋势',
        'recent-transactions': '最近记录',
        'btn-view-all': '查看全部',

        // Calendar
        'day-sun': '日',
        'day-mon': '一',
        'day-tue': '二',
        'day-wed': '三',
        'day-thu': '四',
        'day-fri': '五',
        'day-sat': '六',

        // Transactions
        'search-placeholder': '搜索记录...',
        'filter-all-categories': '所有类别',
        'category-food': '餐饮',
        'category-transport': '交通',
        'category-shopping': '购物',
        'category-bills': '账单',
        'category-other': '其他',
        'table-date': '日期',
        'table-description': '描述',
        'table-category': '类别',
        'table-amount': '金额',
        'table-actions': '操作',

        // Modal
        'modal-add-expense': '添加新支出',
        'modal-add-income': '添加新收入',
        'modal-add-fixed': '添加固定支出',
        'header-registered-list': '已注册列表',
        'msg-no-fixed': '没有已注册的固定支出。',
        'chart-category': '按类别支出',
        'title-fixed-expenses': '固定支出管理',
        'table-fixed-name': '项目名称',
        'table-fixed-day': '扣款日',
        'label-date': '日期',
        'label-description': '描述',
        'label-amount': '金额',
        'label-category': '类别',
        'btn-save': '保存',
        'btn-cancel': '取消',

        'type-expense': '支出',
        'type-income': '收入',
        'btn-add': '添加',
        'btn-add-expense': '添加支出',
        'btn-add-income': '添加收入',
        'btn-copy-prev': '复制上月记录',
        'msg-loading': '加载中...',
        'btn-copy-prev': '复制上月记录',
        'msg-loading': '加载中...',
        'nav-notices': '公告',
        'title-notices': '公告',
        'btn-write-notice': '写公告',
        'msg-no-notices': '没有已注册的公告。',
        'modal-write-notice': '写公告',
        'label-title': '标题',
        'label-content': '内容',
        'title-budget-settings': '预算设置',
        'label-total-budget': '月总预算',
        'label-current-budget': '当前预算',
        'category-salary': '工资',
        'category-allowance': '零花钱',
        'category-bonus': '奖金',
        'category-carryover': '结转',
        'category-living': '生活',
        'category-personal': '个人',
        'category-hobby': '爱好',
        'category-gathering': '聚会',
        'category-housing': '住房',
        'category-communication': '通讯',
        'category-utilities': '水电费',
        'category-subscription': '订阅',
        'category-insurance_finance': '保险/金融',
        'placeholder-expense-desc': '例如：午餐',
        'placeholder-income-desc': '例如：工资，奖金'
    }
};

// 언어 플래그 매핑
const langFlags = {
    ko: '🇰🇷 한국어',
    en: '🇺🇸 English',
    ja: '🇯🇵 日本語',
    zh: '🇨🇳 中文'
};

// 현재 언어 가져오기
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'ko';
}

// 언어 설정
function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

// 페이지 로드 시 언어 적용
function applyLanguage(lang) {
    setLanguage(lang);

    // 모든 번역 요소 업데이트
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // placeholder 속성 번역
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // 현재 언어 표시 업데이트 (있는 경우)
    const currentLangElement = document.getElementById('currentLang');
    if (currentLangElement) {
        currentLangElement.textContent = langFlags[lang];
    }

    // 활성 언어 옵션 표시 (있는 경우)
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        }
    });
}

// 언어 선택기 초기화
function initLanguageSelector() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');

    if (!languageBtn || !languageDropdown) return;

    // 언어 드롭다운 토글
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
    });

    // 언어 선택
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            applyLanguage(lang);
            languageDropdown.classList.remove('show');
        });
    });

    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('show');
    });
}

// 페이지 로드 시 자동 실행
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentLanguage();
    applyLanguage(currentLang);
    initLanguageSelector();
});

// 날짜 형식 함수 (언어별)
function formatMonthYear(date, lang = getCurrentLanguage()) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    switch (lang) {
        case 'ko':
            return `${year}년 ${month}월`;
        case 'en':
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            return `${monthNames[month - 1]} ${year}`;
        case 'ja':
            return `${year}年 ${month}月`;
        case 'zh':
            return `${year}年 ${month}月`;
        default:
            return `${year}년 ${month}월`;
    }
}

function formatTodayLabel(date, lang = getCurrentLanguage()) {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    switch (lang) {
        case 'ko':
            return `오늘: ${month}월 ${day}일`;
        case 'en':
            return `Today: ${month}/${day}`;
        case 'ja':
            return `今日: ${month}月${day}日`;
        case 'zh':
            return `今天: ${month}月${day}日`;
        default:
            return `오늘: ${month}월 ${day}일`;
    }
}

function formatDaysLeft(days, lang = getCurrentLanguage()) {
    switch (lang) {
        case 'ko':
            return days > 0 ? `(남은 ${days}일 기준)` : `(기간 종료)`;
        case 'en':
            return days > 0 ? `(${days} days left)` : `(Period ended)`;
        case 'ja':
            return days > 0 ? `(残り${days}日)` : `(期間終了)`;
        case 'zh':
            return days > 0 ? `(剩余${days}天)` : `(期间结束)`;
        default:
            return days > 0 ? `(남은 ${days}일 기준)` : `(기간 종료)`;
    }
}

// 번역 텍스트 가져오기
function t(key, lang = getCurrentLanguage()) {
    if (translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    // fallback to Korean
    return translations['ko'][key] || key;
}

// 전역으로 노출
window.i18n = {
    getCurrentLanguage,
    setLanguage,
    applyLanguage,
    formatMonthYear,
    formatTodayLabel,
    formatDaysLeft,
    t,
    translations
};
