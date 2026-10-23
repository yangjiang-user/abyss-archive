// ========== 详情页JS ==========

let currentCreature = null;

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
        await loadDetail(id);
    } else {
        document.getElementById('detailContent').innerHTML = 
            '<div class="empty-state"><p>未指定生物ID</p><a href="browse.html" class="btn btn-primary">返回浏览</a></div>';
    }
});

// 加载生物详情
async function loadDetail(id) {
    const res = await apiGet('/creatures/' + id);
    const container = document.getElementById('detailContent');

    if (res.code !== 200 || !res.data) {
        container.innerHTML = '<div class="empty-state"><p>未找到该生物</p><a href="browse.html" class="btn btn-primary">返回浏览</a></div>';
        return;
    }

    currentCreature = res.data;
    const c = res.data;
    const favClass = isFavorited(c.id) ? 'favorited' : '';
    const favText = isFavorited(c.id) ? '★ 已收藏' : '☆ 收藏';

    // 深度位置百分比
    const maxKnownDepth = 11000;
    const depthPercent = ((c.minDepth + c.maxDepth) / 2 / maxKnownDepth * 100).toFixed(1);

    container.innerHTML = `
        <div class="detail-header">
            <div class="detail-gallery">
                <img src="images/${c.image1}" alt="${c.nameCn}" class="detail-main-image" id="mainImage">
                <div class="detail-thumbs">
                    <img src="images/${c.image1}" alt="${c.nameCn}" class="detail-thumb active" onclick="switchImage('images/${c.image1}',this)">
                    ${c.image2 ? `<img src="images/${c.image2}" alt="${c.nameCn}" class="detail-thumb" onclick="switchImage('images/${c.image2}',this)">` : ''}
                </div>
            </div>
            <div class="detail-info">
                <h1>${c.nameCn}</h1>
                <div class="detail-scientific">${c.scientificName}</div>
                <p style="color:var(--text-secondary);margin-bottom:16px;">${c.nameEn}</p>
                <div style="margin-bottom:20px;">
                    <button class="fav-btn ${favClass}" id="favBtn" onclick="toggleFavorite(${c.id},this)">${favText}</button>
                    <a href="compare.html?a=${c.id}" class="btn btn-outline" style="margin-left:12px;">⚖️ 对比</a>
                </div>
                <div class="detail-facts">
                    <div class="fact-item">
                        <div class="fact-label">栖息深度</div>
                        <div class="fact-value">${c.minDepth} - ${c.maxDepth} 米</div>
                    </div>
                    <div class="fact-item">
                        <div class="fact-label">体型</div>
                        <div class="fact-value">${c.size}</div>
                    </div>
                    <div class="fact-item">
                        <div class="fact-label">发现年份</div>
                        <div class="fact-value">${c.discoveryYear}年</div>
                    </div>
                    <div class="fact-item">
                        <div class="fact-label">栖息地</div>
                        <div class="fact-value">${c.habitat}</div>
                    </div>
                </div>
                <!-- 深度位置标注 -->
                <div class="depth-bar">
                    <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--text-secondary);">
                        <span>海平面 0m</span>
                        <span>马里亚纳海沟 11000m</span>
                    </div>
                    <div class="depth-track">
                        <div class="depth-marker" style="left:${depthPercent}%"></div>
                    </div>
                    <div style="text-align:center;font-size:0.85rem;color:var(--accent-orange);">
                        📍 该生物栖息于约 ${((c.minDepth + c.maxDepth) / 2).toFixed(0)} 米深度
                    </div>
                </div>
            </div>
        </div>

        <div class="detail-section">
            <h3>🐟 外形特征</h3>
            <p>${c.features}</p>
        </div>

        <div class="detail-section">
            <h3>✨ 特殊能力</h3>
            <p>${c.specialAbility}</p>
        </div>

        <div class="detail-section">
            <h3>📖 详细介绍</h3>
            <p>${c.description}</p>
        </div>

        <div style="text-align:center;margin-top:30px;">
            <a href="browse.html" class="btn btn-outline">← 返回列表</a>
            <button class="btn btn-primary" style="margin-left:12px;" onclick="randomExplore()">🎲 随机探索</button>
        </div>
    `;
}

// 切换图片
function switchImage(src, thumb) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.detail-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

// 随机探索（从详情页）
async function randomExplore() {
    const res = await apiGet('/creatures/random');
    if (res.code === 200 && res.data) {
        location.href = 'detail.html?id=' + res.data.id;
    }
}
