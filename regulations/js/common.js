// 法规政策页面通用JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 法规分类标签切换功能已内联在页面中实现
    // 此处添加其他通用功能
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 法规搜索功能
    const searchInput = document.querySelector('input[placeholder="输入关键词搜索法规..."]');
    const searchButton = document.querySelector('button.absolute.right-2');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            const keyword = searchInput.value.trim();
            if (keyword) {
                // 简单的前端搜索实现
                document.querySelectorAll('.regulation-card').forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(keyword.toLowerCase()) || description.includes(keyword.toLowerCase())) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            } else {
                // 如果搜索框为空，显示所有法规
                document.querySelectorAll('.regulation-card').forEach(card => {
                    card.classList.remove('hidden');
                });
            }
        });
        
        // 按回车键也可以搜索
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    // 热门法规点击事件处理
    document.querySelectorAll('.regulation-card a, .space-y-4 li a').forEach(link => {
        link.addEventListener('click', function() {
            // 可以在这里添加点击统计等功能
        });
    });
    
    // 关键词按钮点击事件
    document.querySelectorAll('.flex.flex-wrap.gap-2 button').forEach(button => {
        button.addEventListener('click', function() {
            const keyword = this.textContent.trim();
            if (searchInput) {
                searchInput.value = keyword;
                // 触发搜索
                const event = new Event('keyup');
                event.key = 'Enter';
                searchInput.dispatchEvent(event);
            }
        });
    });
});
