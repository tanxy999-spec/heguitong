// 慈善组织合规自检工具JavaScript
function initCharityCompliance() {
    // 定义问题权重和评分标准
    const questionWeights = {
        'q1': 5, 'q2': 5, 'q3': 5,
        'q4': 8, 'q5': 8, 'q6': 8,
        'q7': 6, 'q8': 6,
        'q9': 7, 'q10': 7,
        'q11': 9, 'q12': 9, 'q13': 9, 'q14': 9, 'q15': 9,
        'q16': 8, 'q17': 8, 'q18': 8
    };
    
    // 评分标准：每个答案选项对应的分数
    const scoringCriteria = {
        'A': 100,  // 完全合规
        'B': 60,   // 部分合规
        'C': 20,   // 不合规
        'D': 0     // 不清楚/未知
    };
    
    // 定义模块顺序
    const moduleOrder = ['registration', 'finance', 'operation', 'disclosure', 'fundraising', 'tax'];
    
    // 获取当前活动的模块
    function getCurrentModule() {
        // 首先检查哪个模块标签是激活状态
        for (let module of moduleOrder) {
            const tabElement = document.querySelector(`.module-tab[data-module="${module}"]`);
            if (tabElement && tabElement.classList.contains('bg-primary')) {
                console.log(`当前激活的模块标签: ${module}`);
                return module;
            }
        }
        
        // 然后再检查哪个模块内容是显示状态
        for (let module of moduleOrder) {
            const moduleElement = document.getElementById(module + 'Module');
            if (moduleElement) {
                // 检查元素是否显示（style.display为空时也表示显示）
                const displayStyle = window.getComputedStyle(moduleElement).display;
                if (displayStyle !== 'none' && moduleElement.style.display !== 'none') {
                    console.log(`当前显示的模块内容: ${module}`);
                    return module;
                }
            }
        }
        
        // 如果都没找到，默认返回第一个模块
        console.log(`未找到活动模块，默认返回: ${moduleOrder[0]}`);
        return moduleOrder[0];
    }
    
    // 更新右侧按钮文本和功能
    function updateRightButton() {
        const currentModule = getCurrentModule();
        const currentIndex = moduleOrder.indexOf(currentModule);
        const toStep3Btn = document.getElementById('toStep3Btn');
        
        if (currentIndex === moduleOrder.length - 1) {
            // 最后一个模块，显示"生成报告"
            toStep3Btn.innerHTML = '<i class="fas fa-chart-bar mr-2"></i>生成报告';
            toStep3Btn.dataset.action = 'generateReport';
        } else {
            // 不是最后一个模块，显示"下一模块"
            toStep3Btn.innerHTML = '<i class="fas fa-arrow-right mr-2"></i>下一模块';
            toStep3Btn.dataset.action = 'nextModule';
        }
    }
    
    // 切换到下一个模块 - 完全重写的版本
    function goToNextModule() {
        // 1. 获取当前模块
        const currentModule = getCurrentModule();
        
        // 2. 确定当前模块在顺序中的位置
        const currentIndex = moduleOrder.indexOf(currentModule);
        
        // 3. 验证当前模块存在且不是最后一个模块
        if (currentIndex !== -1 && currentIndex < moduleOrder.length - 1) {
            // 4. 严格按照预定义顺序获取下一个模块
            const nextModule = moduleOrder[currentIndex + 1];
            
            // 5. 先隐藏所有模块内容
            moduleOrder.forEach(module => {
                const moduleElement = document.getElementById(module + 'Module');
                if (moduleElement) {
                    moduleElement.style.display = 'none';
                }
            });
            
            // 6. 重置所有标签样式
            moduleOrder.forEach(module => {
                const tabElement = document.querySelector(`.module-tab[data-module="${module}"]`);
                if (tabElement) {
                    tabElement.classList.remove('bg-primary', 'text-white');
                    tabElement.classList.add('bg-lightGray', 'text-neutral');
                }
            });
            
            // 7. 显示下一个模块
            const nextModuleElement = document.getElementById(nextModule + 'Module');
            if (nextModuleElement) {
                nextModuleElement.style.display = 'block';
                
                // 8. 找到并滚动到下一个模块的第一个问题
                setTimeout(() => {
                    const firstQuestion = nextModuleElement.querySelector('.question-card');
                    if (firstQuestion) {
                        // 确保问题是展开状态
                        if (!firstQuestion.classList.contains('open')) {
                            firstQuestion.classList.add('open');
                            // 触发点击事件以展开问题（如果需要）
                            const header = firstQuestion.querySelector('.question-header');
                            if (header) {
                                header.click();
                            }
                        }
                        // 滚动到第一个问题
                        firstQuestion.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }, 100);
            }
            
            // 9. 高亮下一个模块的标签
            const nextTab = document.querySelector(`.module-tab[data-module="${nextModule}"]`);
            if (nextTab) {
                nextTab.classList.remove('bg-lightGray', 'text-neutral');
                nextTab.classList.add('bg-primary', 'text-white');
            }
            
            // 10. 确保按钮状态正确更新
            setTimeout(() => {
                updateRightButton();
            }, 100);
        }
    }
    
    // 模块标签点击事件
    document.querySelectorAll('.module-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // 隐藏所有模块内容
            document.querySelectorAll('.module-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // 重置所有标签样式
            document.querySelectorAll('.module-tab').forEach(t => {
                t.classList.remove('bg-primary', 'text-white');
                t.classList.add('bg-lightGray', 'text-neutral');
            });
            
            // 显示选中的模块内容
            const moduleId = this.getAttribute('data-module') + 'Module';
            document.getElementById(moduleId).style.display = 'block';
            
            // 更新标签样式
            this.classList.remove('bg-lightGray', 'text-neutral');
            this.classList.add('bg-primary', 'text-white');
            
            // 更新按钮
            updateRightButton();
        });
    });
    
    // 问题卡片点击事件 - 展开/收起
    document.querySelectorAll('.question-card').forEach(card => {
        const header = card.querySelector('.question-header');
        header.addEventListener('click', () => {
            card.classList.toggle('open');
        });
        
        // 默认展开第一个问题
        if (card.dataset.questionId === '1') {
            card.classList.add('open');
        }
    });
    
    // 选项点击事件
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            // 移除同问题其他选项的选中样式
            const questionId = this.closest('.question-card').dataset.questionId;
            const questionName = `q${questionId}`;
            
            document.querySelectorAll(`input[name="${questionName}"]`).forEach(input => {
                input.closest('.option').classList.remove('selected');
            });
            
            // 添加当前选项的选中样式
            this.classList.add('selected');
            
            // 确保单选按钮被选中
            const radio = this.querySelector(`input[type="radio"]`);
            if (radio) {
                radio.checked = true;
            }
        });
    });
    
    // 页面导航函数
    function navigateToPage(pageId) {
        // 隐藏所有页面
        document.getElementById('entry-page').style.display = 'none';
        document.getElementById('questionnaire-page').style.display = 'none';
        document.getElementById('report-page').style.display = 'none';
        
        // 显示指定页面
        document.getElementById(pageId).style.display = 'block';
    }
    
    // 更新步骤指示器
    function updateStepIndicators(activeStep) {
        // 重置所有步骤
        for (let i = 1; i <= 3; i++) {
            const step = document.getElementById(`step-indicator-${i}`);
            step.classList.remove('active', 'completed');
            
            if (i < 3) {
                const line = document.getElementById(`step-line-${i}`);
                line.classList.remove('completed');
            }
        }
        
        // 设置当前步骤为激活状态
        document.getElementById(`step-indicator-${activeStep}`).classList.add('active');
        
        // 设置已完成步骤
        for (let i = 1; i < activeStep; i++) {
            document.getElementById(`step-indicator-${i}`).classList.add('completed');
            if (i < 3) {
                document.getElementById(`step-line-${i}`).classList.add('completed');
            }
        }
    }
    
    // 收集用户答案
    function collectUserAnswers() {
        const answers = {};
        
        // 遍历所有问题
        for (let i = 1; i <= 18; i++) {
            const questionId = `q${i}`;
            const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
            answers[questionId] = selectedOption ? selectedOption.value : null;
        }
        
        return answers;
    }
    
    // 计算总分
    function calculateTotalScore(answers) {
        let totalWeight = 0;
        let weightedScore = 0;
        
        Object.keys(answers).forEach(questionId => {
            const answer = answers[questionId];
            const weight = questionWeights[questionId] || 1;
            
            if (answer && scoringCriteria[answer] !== undefined) {
                totalWeight += weight;
                weightedScore += (scoringCriteria[answer] / 100) * weight;
            }
        });
        
        // 计算加权平均分
        const averageScore = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0;
        return averageScore;
    }
    
    // 计算通过率
    function calculatePassRate(answers) {
        const answeredQuestions = Object.values(answers).filter(answer => answer !== null).length;
        const totalQuestions = Object.keys(answers).length;
        
        return totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
    }
    
    // 确定风险等级
    function determineRiskLevel(score) {
        if (score >= 85) return { level: '低风险', className: 'risk-low' };
        if (score >= 60) return { level: '中等风险', className: 'risk-medium' };
        return { level: '高风险', className: 'risk-high' };
    }
    
    // 生成合规问题列表
    function generateComplianceIssues(answers) {
        const issuesContainer = document.getElementById('complianceIssues');
        issuesContainer.innerHTML = '';
        
        // 问题描述
        const questionDescriptions = {
            'q1': '未按规定向登记管理机关报送年度工作报告',
            'q2': '未取得《慈善组织登记证书》',
            'q3': '重大事项变更未办理变更登记手续',
            'q4': '未建立健全的财务管理制度',
            'q5': '年度管理费用超过当年总支出的10%',
            'q6': '未按规定进行财务审计并公示审计报告',
            'q7': '理事会会议召开和决议不符合章程规定',
            'q8': '重大投资方案未经理事会2/3以上成员同意',
            'q9': '未建立信息公开制度',
            'q10': '未在统一信息平台公布年度工作报告和财务会计报告',
            'q11': '未取得公开募捐资格但开展公开募捐活动',
            'q12': '开展公开募捐活动前未按规定备案',
            'q13': '未在募捐活动结束后三个月内公布募捐情况和资金使用情况',
            'q14': '未按照募捐方案中承诺的用途使用募捐款物',
            'q15': '未与具有公开募捐资格的慈善组织合作开展募捐活动',
            'q16': '未办理税务登记或未按时申报纳税',
            'q17': '未取得非营利组织免税资格',
            'q18': '未按规定为捐赠人开具捐赠票据'
        };
        
        // 查找问题
        let hasIssues = false;
        Object.keys(answers).forEach(questionId => {
            const answer = answers[questionId];
            
            // 只有B、C、D选项会被视为问题
            if (answer && ['B', 'C', 'D'].includes(answer)) {
                hasIssues = true;
                
                // 确定风险等级
                let riskClass = 'risk-low';
                if (answer === 'C' || answer === 'D') riskClass = 'risk-high';
                else if (answer === 'B') riskClass = 'risk-medium';
                
                const issueCard = document.createElement('div');
                issueCard.className = 'bg-lightGray rounded-lg p-4';
                
                const issueContent = `
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-semibold">${questionDescriptions[questionId] || '合规问题'}</h4>
                            <p class="text-sm text-gray-600 mt-1">
                                ${getAnswerText(answer)}
                            </p>
                        </div>
                        <span class="risk-level ${riskClass}">${getRiskLevelText(answer)}</span>
                    </div>
                `;
                
                issueCard.innerHTML = issueContent;
                issuesContainer.appendChild(issueCard);
            }
        });
        
        // 如果没有问题
        if (!hasIssues) {
            const noIssuesMessage = document.createElement('div');
            noIssuesMessage.className = 'bg-green-50 rounded-lg p-4 border-l-4 border-green-500';
            noIssuesMessage.innerHTML = `
                <div class="flex">
                    <div class="flex-shrink-0">
                        <i class="fas fa-check-circle text-green-500"></i>
                    </div>
                    <div class="ml-3">
                        <p class="text-green-800">
                            <span class="font-medium">恭喜！</span>
                            您的组织在合规管理方面表现优秀，未发现明显合规风险。建议继续保持良好的合规管理习惯。
                        </p>
                    </div>
                </div>
            `;
            issuesContainer.appendChild(noIssuesMessage);
        }
    }
    
    // 获取答案文本描述
    function getAnswerText(answer) {
        switch (answer) {
            case 'A': return '完全符合规定';
            case 'B': return '部分符合规定，存在改进空间';
            case 'C': return '不符合规定，存在较大风险';
            case 'D': return '情况不明确，建议进一步核实';
            default: return '';
        }
    }
    
    // 获取风险等级文本
    function getRiskLevelText(answer) {
        switch (answer) {
            case 'A': return '低风险';
            case 'B': return '中风险';
            case 'C': return '高风险';
            case 'D': return '高风险';
            default: return '';
        }
    }
    
    // 生成改进建议
    function generateImprovementSuggestions(answers) {
        const suggestionsContainer = document.getElementById('improvementSuggestions');
        suggestionsContainer.innerHTML = '';
        
        // 改进建议
        const suggestionsMap = {
            'q1': '建议立即向登记管理机关报送缺失的年度工作报告，确保组织信息的及时更新和公示。',
            'q2': '建议尽快申请取得《慈善组织登记证书》，以享受更多政策优惠和社会信任。',
            'q3': '建议及时办理法定代表人、住所、业务范围等重大事项的变更登记手续。',
            'q4': '建议建立健全的财务管理制度，明确财务管理流程和责任分工。',
            'q5': '建议控制年度管理费用，确保不超过当年总支出的10%，提高资金使用效率。',
            'q6': '建议每年聘请专业机构进行财务审计，并按规定公示审计报告。',
            'q7': '建议严格按照章程规定定期召开理事会会议，确保会议决议程序合规。',
            'q8': '建议完善重大投资决策机制，确保所有重大投资均经理事会2/3以上成员同意。',
            'q9': '建议建立完善的信息公开制度，明确信息披露的内容、方式和时限。',
            'q10': '建议在统一信息平台（如慈善中国）按时公布年度工作报告和财务会计报告。',
            'q11': '建议在未取得公开募捐资格前，与具有公开募捐资格的慈善组织合作开展募捐活动。',
            'q12': '建议在开展公开募捐活动前，按规定向相关部门备案募捐方案。',
            'q13': '建议在募捐活动结束后三个月内，及时公布募捐情况和资金使用情况。',
            'q14': '建议严格按照募捐方案中承诺的用途使用募捐款物，如需调整应按规定程序办理。',
            'q15': '建议与具有公开募捐资格的慈善组织合作开展募捐活动，或尽快申请取得公开募捐资格。',
            'q16': '建议尽快办理税务登记手续，并按时申报纳税。',
            'q17': '建议申请取得非营利组织免税资格，以享受相关税收优惠政策。',
            'q18': '建议按规定为所有捐赠人开具捐赠票据，保障捐赠人的合法权益。'
        };
        
        // 按模块分组建议
        const moduleGroups = {
            'registration': { name: '登记注册模块', questions: ['q1', 'q2', 'q3'] },
            'finance': { name: '财务管理模块', questions: ['q4', 'q5', 'q6'] },
            'operation': { name: '运营管理模块', questions: ['q7', 'q8'] },
            'disclosure': { name: '信息披露模块', questions: ['q9', 'q10'] },
            'fundraising': { name: '募捐活动模块', questions: ['q11', 'q12', 'q13', 'q14', 'q15'] },
            'tax': { name: '税务合规模块', questions: ['q16', 'q17', 'q18'] }
        };
        
        let hasSuggestions = false;
        
        // 遍历每个模块
        Object.keys(moduleGroups).forEach(moduleKey => {
            const module = moduleGroups[moduleKey];
            const moduleSuggestions = [];
            
            // 收集该模块下的建议
            module.questions.forEach(questionId => {
                const answer = answers[questionId];
                if (answer && ['B', 'C', 'D'].includes(answer) && suggestionsMap[questionId]) {
                    moduleSuggestions.push(suggestionsMap[questionId]);
                }
            });
            
            // 如果该模块有建议，创建模块建议部分
            if (moduleSuggestions.length > 0) {
                hasSuggestions = true;
                
                const moduleSection = document.createElement('div');
                moduleSection.className = 'mb-6';
                
                const moduleTitle = document.createElement('h4');
                moduleTitle.className = 'text-lg font-semibold text-neutral mb-3';
                moduleTitle.textContent = module.name;
                moduleSection.appendChild(moduleTitle);
                
                // 创建建议列表
                const suggestionsList = document.createElement('ul');
                suggestionsList.className = 'space-y-3';
                
                moduleSuggestions.forEach(suggestionText => {
                    const listItem = document.createElement('li');
                    listItem.className = 'flex items-start';
                    listItem.innerHTML = `
                        <div class="flex-shrink-0">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-gray-700">${suggestionText}</p>
                        </div>
                    `;
                    suggestionsList.appendChild(listItem);
                });
                
                moduleSection.appendChild(suggestionsList);
                suggestionsContainer.appendChild(moduleSection);
            }
        });
        
        // 如果没有建议
        if (!hasSuggestions) {
            const noSuggestionsMessage = document.createElement('div');
            noSuggestionsMessage.className = 'bg-green-50 rounded-lg p-4 text-center';
            noSuggestionsMessage.innerHTML = `
                <i class="fas fa-trophy text-3xl text-green-500 mb-3"></i>
                <p class="text-green-800">您的组织在各方面均符合规定，继续保持！</p>
            `;
            suggestionsContainer.appendChild(noSuggestionsMessage);
        }
    }
    
    // 设置报告日期
    function setReportDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
        document.getElementById('reportDate').textContent = formattedDate;
    }
    
    // 开始按钮事件
    document.getElementById('startBtn').addEventListener('click', () => {
        navigateToPage('questionnaire-page');
        updateStepIndicators(2);
    });
    
    // 返回入口按钮事件
    document.getElementById('backToStep1Btn').addEventListener('click', () => {
        navigateToPage('entry-page');
        updateStepIndicators(1);
    });
    
    // 右侧按钮事件（根据data-action决定是切换模块还是生成报告）
    // 移除现有的事件监听器，避免多重绑定
    const toStep3Btn = document.getElementById('toStep3Btn');
    const newToStep3Btn = toStep3Btn.cloneNode(true);
    toStep3Btn.parentNode.replaceChild(newToStep3Btn, toStep3Btn);
    
    // 重新绑定点击事件
    newToStep3Btn.addEventListener('click', function() {
        // 获取按钮元素
        const btn = this;
        
        // 立即禁用按钮，防止连续点击
        btn.disabled = true;
        
        // 直接获取操作类型
        const action = btn.dataset.action;
        
        if (action === 'nextModule') {
            // 执行模块切换
            goToNextModule();
            
            // 模块切换完成后重新启用按钮（给DOM更新留足够时间）
            setTimeout(() => {
                btn.disabled = false;
            }, 1000);
        } else {
            // 生成报告流程
            const userAnswers = collectUserAnswers();
            
            // 检查是否有未回答的问题
            const unansweredQuestions = Object.values(userAnswers).filter(answer => !answer);
            if (unansweredQuestions.length > 0 && !confirm(`您还有${unansweredQuestions.length}个问题未回答，确定要生成报告吗？`)) {
                btn.disabled = false;
                return;
            }
            
            // 计算分数和等级
            const totalScore = calculateTotalScore(userAnswers);
            const passRate = calculatePassRate(userAnswers);
            const riskLevel = determineRiskLevel(totalScore);
            
            // 更新报告显示
            document.getElementById('totalScore').textContent = totalScore;
            document.getElementById('passRate').textContent = `${passRate}%`;
            document.getElementById('riskLevel').textContent = riskLevel.level;
            document.getElementById('riskLevel').className = `risk-level ${riskLevel.className}`;
            
            // 生成合规问题和改进建议
            generateComplianceIssues(userAnswers);
            generateImprovementSuggestions(userAnswers);
            
            // 设置报告日期
            setReportDate();
            
            // 导航到报告页面
            navigateToPage('report-page');
            updateStepIndicators(3);
            
            // 报告生成流程不需要重新启用按钮，因为页面会跳转
        }
    });
    
    // 开始按钮事件后初始化按钮状态
    const originalStartBtnClick = document.getElementById('startBtn').onclick;
    document.getElementById('startBtn').onclick = function() {
        // 执行原有逻辑
        if (typeof originalStartBtnClick === 'function') {
            originalStartBtnClick.apply(this, arguments);
        }
        
        // 初始化按钮状态
        setTimeout(updateRightButton, 100); // 稍微延迟确保DOM更新
    }
    
    // 返回修改按钮事件
    document.getElementById('backToStep2Btn').addEventListener('click', () => {
        navigateToPage('questionnaire-page');
        updateStepIndicators(2);
    });
    
    // 打印报告按钮事件
    document.getElementById('printReportBtn').addEventListener('click', () => {
        window.print();
    });
}

// 页面加载完成后初始化
if (typeof window !== 'undefined') {
    window.addEventListener('load', function() {
        initCharityCompliance();
    });
}