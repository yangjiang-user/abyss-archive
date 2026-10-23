// ========== 首页JS ==========

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
    loadStatistics();
    loadFeaturedCreatures();
    // 启动冷知识轮播
    rotateFacts();
    setInterval(rotateFacts, 5000);
});

// 加载统计数据
async function loadStatistics() {
    const res = await apiGet('/creatures/statistics');
    if (res.code === 200 && res.data) {
        document.getElementById('totalSpecies').textContent = res.data.totalSpecies || 0;
        document.getElementById('maxDepth').textContent = res.data.maxDepth || 0;
    }
}

// 加载精选生物（按浏览量排序的前8个）
async function loadFeaturedCreatures() {
    const res = await apiGet('/creatures?page=1&size=8');
    const grid = document.getElementById('featuredCreatures');
    if (res.code === 200 && res.data && res.data.length > 0) {
        grid.innerHTML = res.data.map(createCreatureCard).join('');
    } else {
        grid.innerHTML = '<div class="empty-state"><p>暂无数据</p></div>';
    }
}

// 随机探索
async function randomExplore() {
    const res = await apiGet('/creatures/random');
    if (res.code === 200 && res.data) {
        location.href = 'detail.html?id=' + res.data.id;
    }
}
