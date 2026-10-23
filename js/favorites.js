// ========== 收藏页JS ==========

document.addEventListener('DOMContentLoaded', async () => {
    await loadFavorites();
});

// 加载收藏的生物
async function loadFavorites() {
    const favIds = getFavorites();
    const grid = document.getElementById('favoritesGrid');

    if (favIds.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1;">
                <div class="icon">⭐</div>
                <p>你还没有收藏任何深海生物</p>
                <p style="font-size:0.9rem;margin-top:8px;">去<a href="browse.html" style="color:var(--accent-cyan);">分类浏览</a>发现有趣的生物吧！</p>
            </div>
        `;
        return;
    }

    // 获取所有生物，筛选出收藏的
    const res = await apiGet('/creatures/all');
    if (res.code === 200 && res.data) {
        const favCreatures = res.data.filter(c => favIds.includes(c.id));
        if (favCreatures.length > 0) {
            grid.innerHTML = favCreatures.map(createCreatureCard).join('');
        } else {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column:1/-1;">
                    <div class="icon">⭐</div>
                    <p>收藏的生物数据加载失败</p>
                </div>
            `;
        }
    }
}
