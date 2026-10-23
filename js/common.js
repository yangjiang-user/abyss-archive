// ========== 深渊档案 - 公共JS函数（静态版） ==========
// 静态版本：所有数据从 data.js 全局变量读取，无需后端API

// ========== 静态数据模拟层 ==========
// 模拟后端API，根据URL路径返回对应数据，格式与原API一致
async function apiGet(url) {
    return new Promise((resolve) => {
        // 解析URL路径和查询参数
        const [path, queryStr] = url.split('?');
        const params = new URLSearchParams(queryStr || '');

        // 所有生物列表：/api/creatures/all
        if (path === '/creatures/all') {
            resolve({ code: 200, data: window.STATIC_CREATURES });
            return;
        }

        // 生物列表：/api/creatures?page=1&size=12&categoryId=1&depthZoneId=1&habitat=xxx&keyword=xxx
        if (path === '/creatures') {
            let list = [...window.STATIC_CREATURES];
            // 分类筛选
            const categoryId = params.get('categoryId');
            if (categoryId) list = list.filter(c => c.categoryId == categoryId);
            // 深度带筛选
            const depthZoneId = params.get('depthZoneId');
            if (depthZoneId) list = list.filter(c => c.depthZoneId == depthZoneId);
            // 栖息地筛选
            const habitat = params.get('habitat');
            if (habitat) list = list.filter(c => c.habitat && c.habitat.includes(habitat));
            // 关键词搜索
            const keyword = params.get('keyword');
            if (keyword) {
                const kw = keyword.toLowerCase();
                list = list.filter(c =>
                    (c.nameCn && c.nameCn.includes(keyword)) ||
                    (c.nameEn && c.nameEn.toLowerCase().includes(kw)) ||
                    (c.scientificName && c.scientificName.toLowerCase().includes(kw)) ||
                    (c.keywords && c.keywords.includes(keyword)) ||
                    (c.features && c.features.includes(keyword))
                );
            }
            // 分页
            const page = parseInt(params.get('page') || '1');
            const size = parseInt(params.get('size') || '12');
            const total = list.length;
            const start = (page - 1) * size;
            const records = list.slice(start, start + size);
            resolve({
                code: 200,
                data: records,
                total: total,
                page: page,
                size: size,
                pages: Math.ceil(total / size)
            });
            return;
        }

        // 生物详情：/api/creatures/{id}
        const creatureMatch = path.match(/^\/creatures\/(\d+)$/);
        if (creatureMatch) {
            const id = parseInt(creatureMatch[1]);
            const creature = window.STATIC_CREATURES.find(c => c.id === id);
            resolve({ code: creature ? 200 : 404, data: creature || null });
            return;
        }

        // 随机生物：/api/creatures/random
        if (path === '/creatures/random') {
            const idx = Math.floor(Math.random() * window.STATIC_CREATURES.length);
            resolve({ code: 200, data: window.STATIC_CREATURES[idx] });
            return;
        }

        // 统计数据：/api/creatures/statistics
        if (path === '/creatures/statistics') {
            resolve({ code: 200, data: window.STATIC_STATISTICS });
            return;
        }

        // 按深度查询生物：/api/creatures/depth/{depth}
        const depthMatch = path.match(/^\/creatures\/depth\/(\d+)$/);
        if (depthMatch) {
            const depth = parseInt(depthMatch[1]);
            const list = window.STATIC_CREATURES.filter(c =>
                c.minDepth <= depth && c.maxDepth >= depth
            );
            resolve({ code: 200, data: list });
            return;
        }

        // 分类列表：/api/categories
        if (path === '/categories') {
            resolve({ code: 200, data: window.STATIC_CATEGORIES });
            return;
        }

        // 深度带列表：/api/depth-zones
        if (path === '/depth-zones') {
            resolve({ code: 200, data: window.STATIC_DEPTH_ZONES });
            return;
        }

        // 时间线：/api/timeline
        if (path === '/timeline') {
            resolve({ code: 200, data: window.STATIC_TIMELINE });
            return;
        }

        // 默认返回空
        resolve({ code: 404, data: null, message: '接口不存在' });
    });
}

// POST/PUT/DELETE 静态版不支持（仅查询）
async function apiPost(url, body) {
    return { code: 501, message: '静态版本不支持此操作' };
}
async function apiPut(url, body) {
    return { code: 501, message: '静态版本不支持此操作' };
}
async function apiDelete(url) {
    return { code: 501, message: '静态版本不支持此操作' };
}

// ========== 深海冷知识列表 ==========
const DEEP_SEA_FACTS = [
    { text: '深海占地球表面积的65%，但人类探索过的海底不到5%。', source: 'NOAA' },
    { text: '马里亚纳海沟最深处的压力约为1086个大气压，相当于一头大象站在你的拇指上。', source: '海洋生物学' },
    { text: '深海热泉的水温可高达400°C，但周围却生活着大量生物。', source: 'MBARI' },
    { text: '大王乌贼的眼睛直径可达25厘米，是动物界最大的眼睛。', source: '史密森尼学会' },
    { text: '许多深海生物能自己发光（生物发光），用于捕食、求偶和躲避天敌。', source: '海洋研究所' },
    { text: '巨型等足虫可以绝食数年存活，是深海中最耐饿的生物之一。', source: '深海生态学' },
    { text: '水滴鱼在深海中看起来像普通鱼，被捞出水面后因压力变化才变成"忧伤"的样子。', source: '澳大利亚博物馆' },
    { text: '幽灵蛸（吸血鬼乌贼）其实不吸血，它以海洋雪（死亡有机物）为食。', source: 'MBARI' },
    { text: '桶眼鱼的头部完全透明，可以直接看到里面的大脑和眼睛。', source: 'MBARI' },
    { text: '鮟鱇鱼的雄性会寄生在雌性身上，永久融合共享血液系统。', source: '伍兹霍尔海洋研究所' },
    { text: '深海龙鱼是少数能产生红色生物光的生物，红光对大多数深海动物不可见。', source: '自然历史博物馆' },
    { text: '皱鳃鲨的怀孕期长达3.5年，是所有脊椎动物中最长的。', source: '鲨鱼研究所' }
];

// 移动端菜单切换
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
}

// ========== 收藏功能（localStorage实现，不依赖后端） ==========
function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem('abyss_favorites') || '[]');
    } catch {
        return [];
    }
}
function addFavorite(id) {
    const favs = getFavorites();
    if (!favs.includes(id)) {
        favs.push(id);
        localStorage.setItem('abyss_favorites', JSON.stringify(favs));
    }
}
function removeFavorite(id) {
    let favs = getFavorites();
    favs = favs.filter(f => f !== id);
    localStorage.setItem('abyss_favorites', JSON.stringify(favs));
}
function isFavorited(id) {
    return getFavorites().includes(id);
}
function toggleFavorite(id, btn) {
    if (isFavorited(id)) {
        removeFavorite(id);
        if (btn) {
            btn.classList.remove('favorited');
            btn.innerHTML = '☆ 收藏';
        }
    } else {
        addFavorite(id);
        if (btn) {
            btn.classList.add('favorited');
            btn.innerHTML = '★ 已收藏';
        }
    }
}

// 生成生物卡片HTML
function createCreatureCard(creature) {
    const favClass = isFavorited(creature.id) ? 'favorited' : '';
    const favText = isFavorited(creature.id) ? '★ 已收藏' : '☆ 收藏';
    return `
        <div class="creature-card" onclick="location.href='detail.html?id=${creature.id}'">
            <img src="images/${creature.image1}" alt="${creature.nameCn}" class="card-image"
                 onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22280%22 height=%22200%22><rect fill=%22%23162032%22 width=%22280%22 height=%22200%22/><text fill=%22%238fa3b8%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22>深海生物</text></svg>'">
            <div class="card-body">
                <div class="card-title">${creature.nameCn}</div>
                <div class="card-scientific">${creature.scientificName}</div>
                <div class="card-meta">
                    <span>🌊 ${creature.minDepth}-${creature.maxDepth}m</span>
                    <span>📏 ${creature.size}</span>
                </div>
                <div style="margin-top:12px;">
                    <button class="fav-btn ${favClass}" onclick="event.stopPropagation();toggleFavorite(${creature.id},this)">${favText}</button>
                </div>
            </div>
        </div>
    `;
}

// 冷知识轮播
let factIndex = 0;
function rotateFacts() {
    const factEl = document.getElementById('factText');
    const sourceEl = document.getElementById('factSource');
    if (factEl && sourceEl) {
        factEl.style.opacity = 0;
        setTimeout(() => {
            const fact = DEEP_SEA_FACTS[factIndex % DEEP_SEA_FACTS.length];
            factEl.textContent = fact.text;
            sourceEl.textContent = '— ' + fact.source;
            factEl.style.opacity = 1;
            factIndex++;
        }, 500);
    }
}

// ========== 登录状态管理（localStorage模拟） ==========
// 页面加载时预置admin账号（如果不存在）
(function initAdmin() {
    const users = JSON.parse(localStorage.getItem('abyss_users') || '[]');
    if (!users.find(u => u.username === 'admin')) {
        users.push({ id: 1, username: 'admin', password: 'admin123', role: 'admin' });
        localStorage.setItem('abyss_users', JSON.stringify(users));
    }
})();

// 获取当前登录用户
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('abyss_login_user') || 'null');
    } catch { return null; }
}
// 保存登录状态
function setLogin(user) {
    localStorage.setItem('abyss_login_user', JSON.stringify(user));
}
// 清除登录状态
function clearLogin() {
    localStorage.removeItem('abyss_login_user');
}
// 判断是否已登录
function isLoggedIn() {
    return !!getCurrentUser();
}
// 判断是否为管理员
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}
// 退出登录
function logout() {
    clearLogin();
    location.href = 'index.html';
}

// ========== 导航栏登录状态渲染 ==========
function renderNavAuth() {
    const authArea = document.getElementById('navAuth');
    if (!authArea) return;
    if (isLoggedIn()) {
        const user = getCurrentUser();
        let html = `<span class="nav-username">👤 ${user.username}</span>`;
        if (isAdmin()) {
            html += `<a href="admin.html" class="nav-link" style="color:#00e5ff;">⚙ 后台管理</a>`;
        }
        html += `<a href="javascript:logout()" class="nav-link">退出</a>`;
        authArea.innerHTML = html;
    } else {
        authArea.innerHTML = `
            <a href="login.html" class="nav-link">登录</a>
            <a href="register.html" class="nav-link nav-register-btn">注册</a>
        `;
    }
}
document.addEventListener('DOMContentLoaded', renderNavAuth);
