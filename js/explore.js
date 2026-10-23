// ========== 深度探索器JS ==========

let allCreatures = [];
let depthZones = [];

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([loadAllCreatures(), loadDepthZones()]);
    renderDepthMarks();
    updateDepth(0);
});

// 加载所有生物
async function loadAllCreatures() {
    const res = await apiGet('/creatures/all');
    if (res.code === 200 && res.data) {
        allCreatures = res.data;
    }
}

// 加载深度带
async function loadDepthZones() {
    const res = await apiGet('/depth-zones');
    if (res.code === 200 && res.data) {
        depthZones = res.data;
    }
}

// 渲染深度标尺标记
function renderDepthMarks() {
    const marks = document.getElementById('depthMarks');
    const depths = [0, 200, 1000, 2000, 4000, 6000, 8000, 10000, 11000];
    const maxDepth = 11000;

    marks.innerHTML = depths.map(d => {
        const percent = (d / maxDepth * 100).toFixed(1);
        return `<div class="depth-mark" style="top:${percent}%" onclick="setDepth(${d})">${d}m</div>`;
    }).join('');
}

// 设置深度（点击标尺）
function setDepth(depth) {
    document.getElementById('depthSlider').value = depth;
    updateDepth(depth);
}

// 更新深度显示
function updateDepth(depth) {
    depth = parseInt(depth);
    document.getElementById('currentDepth').textContent = depth.toLocaleString() + ' 米';

    // 更新指示器位置
    const percent = (depth / 11000 * 100).toFixed(1);
    document.getElementById('depthIndicator').style.top = percent + '%';

    // 判断深度带
    let zoneName = '海洋表层';
    for (const zone of depthZones) {
        if (depth >= zone.minDepth && depth <= zone.maxDepth) {
            zoneName = zone.name;
            break;
        }
    }
    if (depth > 6000) zoneName = '超深渊带（海沟带）';
    document.getElementById('currentZone').textContent = zoneName;

    // 查找该深度的生物
    const creaturesAtDepth = allCreatures.filter(c =>
        depth >= c.minDepth && depth <= c.maxDepth
    );

    const container = document.getElementById('depthCreatures');
    if (creaturesAtDepth.length > 0) {
        container.innerHTML = creaturesAtDepth.map(c => `
            <div class="creature-card" onclick="location.href='detail.html?id=${c.id}'">
                <img src="images/${c.image1}" alt="${c.nameCn}" class="card-image" style="height:140px;">
                <div class="card-body">
                    <div class="card-title" style="font-size:0.95rem;">${c.nameCn}</div>
                    <div class="card-meta" style="font-size:0.75rem;">
                        <span>🌊 ${c.minDepth}-${c.maxDepth}m</span>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1;">
                <div class="icon">🌑</div>
                <p>在 ${depth} 米深度暂未收录生物</p>
                <p style="font-size:0.85rem;margin-top:8px;">这个深度可能是生命的禁区，或等待人类去发现</p>
            </div>
        `;
    }
}
