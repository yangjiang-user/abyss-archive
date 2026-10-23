// ========== 分类浏览页JS ==========

let currentPage = 1;
const pageSize = 12;

document.addEventListener('DOMContentLoaded', async () => {
    await loadFilters();
    loadCreatures();
});

// 加载筛选选项
async function loadFilters() {
    // 加载分类
    const catRes = await apiGet('/categories');
    if (catRes.code === 200 && catRes.data) {
        const select = document.getElementById('categoryFilter');
        catRes.data.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.id;
            opt.textContent = cat.name;
            select.appendChild(opt);
        });
    }

    // 加载深度带
    const depthRes = await apiGet('/depth-zones');
    if (depthRes.code === 200 && depthRes.data) {
        const select = document.getElementById('depthFilter');
        depthRes.data.forEach(zone => {
            const opt = document.createElement('option');
            opt.value = zone.id;
            opt.textContent = `${zone.name} (${zone.minDepth}-${zone.maxDepth}m)`;
            select.appendChild(opt);
        });
    }

    // 加载栖息地选项
    const statsRes = await apiGet('/creatures/statistics');
    if (statsRes.code === 200 && statsRes.data && statsRes.data.habitats) {
        const select = document.getElementById('habitatFilter');
        statsRes.data.habitats.forEach(h => {
            if (h) {
                const opt = document.createElement('option');
                opt.value = h;
                opt.textContent = h;
                select.appendChild(opt);
            }
        });
    }
}

// 搜索处理（回车触发）
function handleSearch(e) {
    if (e.key === 'Enter') {
        currentPage = 1;
        loadCreatures();
    }
}

// 加载生物列表
async function loadCreatures() {
    const categoryId = document.getElementById('categoryFilter').value;
    const depthZoneId = document.getElementById('depthFilter').value;
    const habitat = document.getElementById('habitatFilter').value;
    const keyword = document.getElementById('searchInput').value.trim();

    let url = `/creatures?page=${currentPage}&size=${pageSize}`;
    if (categoryId) url += `&categoryId=${categoryId}`;
    if (depthZoneId) url += `&depthZoneId=${depthZoneId}`;
    if (habitat) url += `&habitat=${encodeURIComponent(habitat)}`;
    if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;

    const res = await apiGet(url);
    const grid = document.getElementById('creatureGrid');

    if (res.code === 200 && res.data && res.data.length > 0) {
        grid.innerHTML = res.data.map(createCreatureCard).join('');
    } else {
        grid.innerHTML = '<div class="empty-state"><div class="icon">🔍</div><p>没有找到匹配的深海生物</p></div>';
    }

    renderPagination(res.total || 0);
}

// 渲染分页
function renderPagination(total) {
    const totalPages = Math.ceil(total / pageSize);
    const pag = document.getElementById('pagination');
    if (totalPages <= 1) {
        pag.innerHTML = '';
        return;
    }

    let html = `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goPage(${currentPage - 1})">上一页</button>`;
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
    }
    html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goPage(${currentPage + 1})">下一页</button>`;
    pag.innerHTML = html;
}

// 跳转页码
function goPage(page) {
    currentPage = page;
    loadCreatures();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
