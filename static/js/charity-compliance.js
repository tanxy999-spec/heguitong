// 慈善组织合规自查问卷逻辑
function initCharityCompliance() {
    console.log('慈善组织合规自查问卷页面加载完成');
    
    // 步骤导航逻辑 - 添加元素存在性检查
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const progressBar = document.getElementById('progressBar');
    const step1Indicator = document.getElementById('step1Indicator');
    const step2Indicator = document.getElementById('step2Indicator');
    const step3Indicator = document.getElementById('step3Indicator');
    
    // 模块相关变量
    const moduleTabs = document.querySelectorAll('.module-tab');
    
    // 按钮 - 添加元素存在性检查
    const toStep2Btn = document.getElementById('toStep2Btn');
    const backToStep1Btn = document.getElementById('backToStep1Btn');
    const toStep3Btn = document.getElementById('toStep3Btn');
    const backToStep2Btn = document.getElementById('backToStep2Btn');
    
    // 强化的模块切换逻辑 - 添加更多调试信息和样式控制
    function showModule(moduleId) {
        console.log('showModule函数被调用，模块ID:', moduleId);
        try {
            // 验证moduleId参数
            if (!moduleId || typeof moduleId !== 'string') {
                console.error('无效的moduleId参数:', moduleId);
                return;
            }
            
            // 隐藏所有模块，使用多种样式属性确保完全隐藏
            try {
                const moduleContents = document.querySelectorAll('.module-content');
                if (moduleContents && moduleContents.length > 0) {
                    console.log('找到', moduleContents.length, '个模块内容');
                    moduleContents.forEach((module, index) => {
                        if (module) {
                            module.style.display = 'none';
                            module.style.visibility = 'hidden';
                            module.style.opacity = '0';
                            module.style.height = '0';
                            module.style.overflow = 'hidden';
                            console.log(`隐藏模块 ${index}:`, module.id);
                        }
                    });
                } else {
                    console.error('未找到任何模块内容元素');
                }
            } catch (error) {
                console.error('隐藏模块时出错:', error);
            }
            
            // 显示指定模块，使用多种样式属性确保完全显示
            try {
                const moduleToShow = document.getElementById(`${moduleId}Module`);
                if (moduleToShow) {
                    console.log('找到要显示的模块:', moduleToShow.id);
                    // 重置所有可能影响显示的样式
                    moduleToShow.style.display = 'block';
                    moduleToShow.style.visibility = 'visible';
                    moduleToShow.style.opacity = '1';
                    moduleToShow.style.height = 'auto';
                    moduleToShow.style.overflow = 'visible';
                    moduleToShow.style.position = 'relative';
                    moduleToShow.style.zIndex = '10';
                    console.log('模块已成功显示:', moduleId);
                } else {
                    console.error(`未找到ID为 ${moduleId}Module 的模块元素`);
                }
            } catch (error) {
                console.error(`显示模块 ${moduleId} 时出错:`, error);
            }
        } catch (error) {
            console.error('showModule 函数执行出错:', error);
        }
    }
    
    // 初始化步骤显示状态
    if (step1 && step2 && step3) {
        step1.style.display = 'block';
        step2.style.display = 'none';
        step3.style.display = 'none';
        console.log('初始化步骤状态：步骤1显示，步骤2和3隐藏');
    }
    
    // 初始化时先隐藏所有模块内容，确保页面加载时只有步骤1显示
    try {
        const moduleContents = document.querySelectorAll('.module-content');
        if (moduleContents && moduleContents.length > 0) {
            moduleContents.forEach(module => {
                if (module) {
                    module.style.display = 'none';
                }
            });
        }
    } catch (error) {
        console.error('Error hiding modules during initialization:', error);
    }
    
    // 模块标签点击事件
    if (moduleTabs) {
        moduleTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有标签的激活状态
                moduleTabs.forEach(t => {
                    t.classList.remove('bg-primary', 'text-white');
                    t.classList.add('bg-lightGray', 'text-neutral');
                });
                
                // 添加当前标签的激活状态
                this.classList.remove('bg-lightGray', 'text-neutral');
                this.classList.add('bg-primary', 'text-white');
                
                // 显示对应模块
                const moduleId = this.getAttribute('data-module');
                showModule(moduleId);
            });
        });
    }
    
    // 步骤切换按钮事件
    if (toStep2Btn) {
        toStep2Btn.addEventListener('click', function() {
            // 验证表单
            const orgType = document.getElementById('orgType').value;
            const registrationTime = document.getElementById('registrationTime').value;
            const activityScope = document.getElementById('activityScope').value;
            
            if (!orgType || !registrationTime || !activityScope) {
                alert('请填写所有必填项');
                return;
            }
            
            // 切换步骤
            if (step1 && step2) {
                step1.style.display = 'none';
                step2.style.display = 'block';
                
                // 更新进度条
                if (progressBar) progressBar.style.width = '66%';
                if (step1Indicator) {
                    step1Indicator.querySelector('div').classList.remove('bg-primary');
                    step1Indicator.querySelector('div').classList.add('bg-green-500');
                }
                if (step2Indicator) {
                    step2Indicator.querySelector('div').classList.remove('bg-gray-200', 'text-gray-600');
                    step2Indicator.querySelector('div').classList.add('bg-primary', 'text-white');
                }
                
                // 显示默认模块
                setTimeout(function() {
                    showModule('fundraising');
                }, 300);
                
                // 滚动到顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    if (backToStep1Btn) {
        backToStep1Btn.addEventListener('click', function() {
            if (step1 && step2) {
                step2.style.display = 'none';
                step1.style.display = 'block';
                
                if (progressBar) progressBar.style.width = '33%';
                if (step1Indicator) {
                    step1Indicator.querySelector('div').classList.remove('bg-green-500');
                    step1Indicator.querySelector('div').classList.add('bg-primary');
                }
                if (step2Indicator) {
                    step2Indicator.querySelector('div').classList.remove('bg-primary', 'text-white');
                    step2Indicator.querySelector('div').classList.add('bg-gray-200', 'text-gray-600');
                }
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    if (toStep3Btn) {
        toStep3Btn.addEventListener('click', function() {
            // 简单验证
            const annualReport = document.querySelector('input[name="annualReport"]:checked');
            if (!annualReport) {
                alert('请至少完成一个问题');
                return;
            }
            
            // 生成报告（这里可以添加更多逻辑）
            
            if (step2 && step3) {
                step2.style.display = 'none';
                step3.style.display = 'block';
                
                if (progressBar) progressBar.style.width = '100%';
                if (step2Indicator) {
                    step2Indicator.querySelector('div').classList.remove('bg-primary');
                    step2Indicator.querySelector('div').classList.add('bg-green-500');
                }
                if (step3Indicator) {
                    step3Indicator.querySelector('div').classList.remove('bg-gray-200', 'text-gray-600');
                    step3Indicator.querySelector('div').classList.add('bg-primary', 'text-white');
                }
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    // 重置按钮事件
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // 重置表单
            const basicInfoForm = document.getElementById('basicInfoForm');
            const complianceForm = document.getElementById('complianceForm');
            if (basicInfoForm) basicInfoForm.reset();
            if (complianceForm) complianceForm.reset();
            
            // 重置步骤
            if (step1 && step2 && step3) {
                step3.style.display = 'none';
                step2.style.display = 'none';
                step1.style.display = 'block';
                
                if (progressBar) progressBar.style.width = '33%';
                
                // 重置指示器
                if (step1Indicator) {
                    step1Indicator.querySelector('div').classList.remove('bg-green-500');
                    step1Indicator.querySelector('div').classList.add('bg-primary', 'text-white');
                }
                if (step2Indicator) {
                    step2Indicator.querySelector('div').classList.remove('bg-green-500', 'bg-primary', 'text-white');
                    step2Indicator.querySelector('div').classList.add('bg-gray-200', 'text-gray-600');
                }
                if (step3Indicator) {
                    step3Indicator.querySelector('div').classList.remove('bg-primary', 'text-white');
                    step3Indicator.querySelector('div').classList.add('bg-gray-200', 'text-gray-600');
                }
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    // 下载报告按钮事件
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', function() {
            alert('报告生成中，请稍后...');
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initCharityCompliance();
});
