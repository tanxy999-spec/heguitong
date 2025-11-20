// 通用JavaScript函数库
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function initNavbarScrollEffect() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
        }
    });
}

function initComplianceChecker() {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step1Indicator = document.getElementById('step1Indicator');
    const step2Indicator = document.getElementById('step2Indicator');
    const step3Indicator = document.getElementById('step3Indicator');
    const progressFill = document.querySelector('.progress-fill');
    const toStep2Btn = document.getElementById('toStep2Btn');
    const backToStep1Btn = document.getElementById('backToStep1Btn');
    const toStep3Btn = document.getElementById('toStep3Btn');
    const backToStep2Btn = document.getElementById('backToStep2Btn');
    const resetBtn = document.getElementById('resetBtn');
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    const moduleTabs = document.querySelectorAll('.module-tab');
    const moduleContents = document.querySelectorAll('.module-content');
    
    if (toStep2Btn) {
        toStep2Btn.addEventListener('click', function() {
            const orgType = document.getElementById('orgType').value;
            const registrationTime = document.getElementById('registrationTime').value;
            const activityScope = document.getElementById('activityScope').value;
            
            if (!orgType || !registrationTime || !activityScope) {
                alert('请填写所有必填项');
                return;
            }
            
            step1.classList.remove('active');
            step2.classList.add('active');
            step1Indicator.classList.remove('active');
            step1Indicator.classList.add('completed');
            step2Indicator.classList.add('active');
            progressFill.style.width = '66%';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    if (backToStep1Btn) {
        backToStep1Btn.addEventListener('click', function() {
            step2.classList.remove('active');
            step1.classList.add('active');
            step2Indicator.classList.remove('active');
            step1Indicator.classList.remove('completed');
            step1Indicator.classList.add('active');
            progressFill.style.width = '33%';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // toStep3Btn的点击事件处理已移至charity-compliance.js文件中
    // 移除这里的处理逻辑，避免冲突
    
    if (backToStep2Btn) {
        backToStep2Btn.addEventListener('click', function() {
            step3.classList.remove('active');
            step2.classList.add('active');
            step3Indicator.classList.remove('active');
            step2Indicator.classList.remove('completed');
            step2Indicator.classList.add('active');
            progressFill.style.width = '66%';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (document.getElementById('basicInfoForm')) {
                document.getElementById('basicInfoForm').reset();
            }
            if (document.getElementById('complianceForm')) {
                document.getElementById('complianceForm').reset();
            }
            
            step3.classList.remove('active');
            step1.classList.add('active');
            step3Indicator.classList.remove('active');
            step2Indicator.classList.remove('completed');
            step1Indicator.classList.remove('completed');
            step1Indicator.classList.add('active');
            progressFill.style.width = '33%';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', function() {
            alert('报告生成中，请稍后...');
        });
    }
    
    if (moduleTabs && moduleContents) {
        moduleTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const module = this.getAttribute('data-module');
                moduleTabs.forEach(t => t.classList.remove('active'));
                moduleContents.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                const moduleContent = document.getElementById(module);
                if (moduleContent) {
                    moduleContent.classList.add('active');
                }
            });
        });
    }
}

function calculateScoreAndGenerateReport() {
    const questions = [
        { name: 'annualReport', weight: 10 },
        { name: 'financialDisclosure', weight: 8 },
        { name: 'scopeCompliance', weight: 10 },
        { name: 'financialStaff', weight: 7 },
        { name: 'governance', weight: 9 },
        { name: 'overseasActivities', weight: 6 },
        { name: 'donationUsage', weight: 10 },
        { name: 'illegalCharges', weight: 8 },
        { name: 'staffTraining', weight: 5 },
        { name: 'riskManagement', weight: 7 }
    ];
    
    let totalScore = 0;
    let totalWeight = 0;
    const issues = [];
    
    questions.forEach(q => {
        const answer = document.querySelector(`input[name="${q.name}"]:checked`);
        if (answer) {
            totalWeight += q.weight;
            if (answer.value === 'yes') {
                totalScore += q.weight;
            } else {
                issues.push(getIssueDescription(q.name));
            }
        }
    });
}

function getIssueDescription(questionName) {
    const descriptions = {
        'annualReport': '年度报告提交存在问题',
        'financialDisclosure': '财务信息公开不完整',
        'scopeCompliance': '活动超出章程规定范围',
        'financialStaff': '财务人员配置不足或资质不符',
        'governance': '治理结构不完善',
        'overseasActivities': '涉外活动未按规定备案',
        'donationUsage': '捐赠款物使用不规范',
        'illegalCharges': '存在违规收费情况',
        'staffTraining': '员工培训不足',
        'riskManagement': '风险管理制度缺失'
    };
    return descriptions[questionName] || '存在合规风险';
}

// 搜索过滤功能
function initSearchFunctionality() {
    console.log('初始化搜索功能');
    
    // 获取所有搜索输入框
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="搜索"]');
    console.log(`找到 ${searchInputs.length} 个搜索输入框`);
    
    // 为每个搜索输入框添加事件监听
    searchInputs.forEach(input => {
        // 为搜索按钮添加点击事件
        const searchButton = input.parentElement.querySelector('button');
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                const keyword = input.value.trim().toLowerCase();
                performSearch(keyword);
            });
        }
        
        // 为输入框添加键盘事件（回车键搜索）
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const keyword = input.value.trim().toLowerCase();
                performSearch(keyword);
            }
        });
        
        // 为输入框添加实时搜索功能
        input.addEventListener('input', function() {
            const keyword = input.value.trim().toLowerCase();
            performSearch(keyword);
        });
    });
    
    // 获取所有分类按钮
    const categoryButtons = document.querySelectorAll('button.px-3.py-1.bg-lightGray');
    console.log(`找到 ${categoryButtons.length} 个分类按钮`);
    
    // 为每个分类按钮添加点击事件
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.textContent.trim().toLowerCase();
            
            // 更新按钮样式
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-lightGray');
            });
            
            this.classList.remove('bg-lightGray');
            this.classList.add('bg-primary', 'text-white');
            
            // 执行分类过滤
            filterByCategory(category);
        });
    });
    
    // 为快速查询中的链接式分类按钮添加点击事件
    const categoryLinks = document.querySelectorAll('a[href^="/regulations/?keyword="]');
    console.log(`找到 ${categoryLinks.length} 个链接式分类按钮`);
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const urlParams = new URLSearchParams(this.getAttribute('href').split('?')[1]);
            const keyword = urlParams.get('keyword') || '';
            
            // 执行关键词搜索
            performSearch(keyword);
        });
    });
}

// 执行搜索函数
function performSearch(keyword) {
    console.log(`执行搜索: "${keyword}"`);
    
    // 获取所有可搜索的内容区域
    const contentContainers = [
        document.getElementById('regulationList'),
        document.querySelector('.lg\:col-span-8.space-y-6'),
        document.querySelector('.grid.grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-4')
    ].filter(Boolean);
    
    console.log(`找到 ${contentContainers.length} 个内容容器`);
    
    // 搜索状态统计
    let totalItems = 0;
    let matchedItems = 0;
    
    // 对每个容器执行搜索
    contentContainers.forEach(container => {
        // 获取容器内所有卡片或项目
        const items = Array.from(container.querySelectorAll('.regulation-card, .card-hover, li, div.p-6.border-b'));
        
        items.forEach(item => {
            totalItems++;
            
            // 获取项目的文本内容
            const itemText = item.textContent.toLowerCase();
            
            // 检查是否匹配关键词
            if (keyword === '' || itemText.includes(keyword)) {
                item.style.display = '';
                matchedItems++;
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // 如果搜索结果为空，显示提示信息
    if (totalItems > 0 && matchedItems === 0) {
        // 检查是否已有提示信息
        let noResults = document.querySelector('.no-search-results');
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-search-results text-center py-8 text-gray-500';
            noResults.innerHTML = '<i class="fa fa-search text-2xl mb-2"></i><p>没有找到匹配的内容</p><p class="text-sm mt-1">请尝试使用其他关键词</p>';
            
            // 将提示信息添加到适当的位置
            const mainContainer = document.querySelector('main');
            if (mainContainer) {
                mainContainer.appendChild(noResults);
            }
        }
        noResults.style.display = '';
    } else {
        // 隐藏提示信息
        const noResults = document.querySelector('.no-search-results');
        if (noResults) {
            noResults.style.display = 'none';
        }
    }
    
    console.log(`搜索完成: 共 ${totalItems} 项，匹配 ${matchedItems} 项`);
}

// 根据分类过滤函数
function filterByCategory(category) {
    console.log(`按分类过滤: "${category}"`);
    
    // 获取所有带有data-category属性的元素
    const categorizableItems = document.querySelectorAll('[data-category]');
    console.log(`找到 ${categorizableItems.length} 个可分类的元素`);
    
    // 过滤统计
    let totalItems = 0;
    let matchedItems = 0;
    
    categorizableItems.forEach(item => {
        totalItems++;
        const itemCategories = item.getAttribute('data-category').toLowerCase();
        
        // 检查是否匹配分类
        if (category === 'all' || category === '' || itemCategories.includes(category)) {
            item.style.display = '';
            matchedItems++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // 如果过滤结果为空，显示提示信息
    if (totalItems > 0 && matchedItems === 0) {
        // 检查是否已有提示信息
        let noResults = document.querySelector('.no-category-results');
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-category-results text-center py-8 text-gray-500';
            noResults.innerHTML = `<i class="fa fa-tag text-2xl mb-2"></i><p>该分类下暂无内容</p>`;
            
            // 将提示信息添加到适当的位置
            const regulationList = document.getElementById('regulationList');
            if (regulationList) {
                regulationList.appendChild(noResults);
            }
        }
        noResults.style.display = '';
    } else {
        // 隐藏提示信息
        const noResults = document.querySelector('.no-category-results');
        if (noResults) {
            noResults.style.display = 'none';
        }
    }
    
    console.log(`分类过滤完成: 共 ${totalItems} 项，匹配 ${matchedItems} 项`);
}

function initCommonFeatures() {
    initMobileMenu();
    initSmoothScroll();
    initNavbarScrollEffect();
    initComplianceChecker();
    initSearchFunctionality();
}

if (typeof document !== 'undefined' && document.readyState !== 'loading') {
    initCommonFeatures();
} else if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initCommonFeatures);
}
