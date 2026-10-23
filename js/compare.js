// ========== 生物对比页JS ==========

let allCreatures = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadAllCreatures();
    populateSelectors();

    // 检查URL参数是否预选了生物
    const params = new URLSearchParams(window.location.search);
    const a = params.get('a');
    const b = params.get('b');
    if (a) document.getElementById('creature1').value = a;
    if (b) document.getElementById('creature2').value = b;
    if (a || b) updateCompare();
});

// 加载所有生物
async function loadAllCreatures() {
    const res = await apiGet('/creatures/all');
    if (res.code === 200 && res.data) {
        allCreatures = res.data;
    }
}

// 填充选择器
function populateSelectors() {
    const sel1 = document.getElementById('creature1');
    const sel2 = document.getElementById('creature2');
    allCreatures.forEach(c => {
        const opt1 = document.createElement('option');
        opt1.value = c.id;
        opt1.textContent = c.nameCn;
        sel1.appendChild(opt1);

        const opt2 = document.createElement('option');
        opt2.value = c.id;
        opt2.textContent = c.nameCn;
        sel2.appendChild(opt2);
    });
}

// 更新对比
function updateCompare() {
    const id1 = document.getElementById('creature1').value;
    const id2 = document.getElementById('creature2').value;
    const result = document.getElementById('compareResult');

    if (!id1 || !id2) {
        result.innerHTML = `
            <div class="empty-state">
                <div class="icon">🔬</div>
                <p>请选择两种生物进行对比</p>
            </div>
        `;
        return;
    }

    if (id1 === id2) {
        result.innerHTML = `
            <div class="empty-state">
                <div class="icon">⚠️</div>
                <p>请选择两种不同的生物</p>
            </div>
        `;
        return;
    }

    const c1 = allCreatures.find(c => c.id == id1);
    const c2 = allCreatures.find(c => c.id == id2);

    if (!c1 || !c2) return;

    result.innerHTML = `
        <table class="compare-table">
            <tr>
                <th>图片</th>
                <td><img src="images/${c1.image1}" class="compare-image" alt="${c1.nameCn}"></td>
                <td><img src="images/${c2.image1}" class="compare-image" alt="${c2.nameCn}"></td>
            </tr>
            <tr>
                <th>中文名</th>
                <td><strong>${c1.nameCn}</strong></td>
                <td><strong>${c2.nameCn}</strong></td>
            </tr>
            <tr>
                <th>学名</th>
                <td><em style="color:var(--accent-cyan);">${c1.scientificName}</em></td>
                <td><em style="color:var(--accent-cyan);">${c2.scientificName}</em></td>
            </tr>
            <tr>
                <th>英文名</th>
                <td>${c1.nameEn}</td>
                <td>${c2.nameEn}</td>
            </tr>
            <tr>
                <th>栖息深度</th>
                <td>${c1.minDepth} - ${c1.maxDepth} 米 ${compareDepth(c1, c2)}</td>
                <td>${c2.minDepth} - ${c2.maxDepth} 米</td>
            </tr>
            <tr>
                <th>体型</th>
                <td>${c1.size}</td>
                <td>${c2.size}</td>
            </tr>
            <tr>
                <th>发现年份</th>
                <td>${c1.discoveryYear}年</td>
                <td>${c2.discoveryYear}年</td>
            </tr>
            <tr>
                <th>栖息地</th>
                <td>${c1.habitat}</td>
                <td>${c2.habitat}</td>
            </tr>
            <tr>
                <th>外形特征</th>
                <td style="font-size:0.9rem;color:var(--text-secondary);">${c1.features}</td>
                <td style="font-size:0.9rem;color:var(--text-secondary);">${c2.features}</td>
            </tr>
            <tr>
                <th>特殊能力</th>
                <td style="font-size:0.9rem;color:var(--text-secondary);">${c1.specialAbility}</td>
                <td style="font-size:0.9rem;color:var(--text-secondary);">${c2.specialAbility}</td>
            </tr>
            <tr>
                <th>操作</th>
                <td><a href="detail.html?id=${c1.id}" class="btn btn-outline" style="font-size:0.85rem;padding:6px 16px;">查看详情</a></td>
                <td><a href="detail.html?id=${c2.id}" class="btn btn-outline" style="font-size:0.85rem;padding:6px 16px;">查看详情</a></td>
            </tr>
        </table>
    `;
}

// 深度对比标记
function compareDepth(c1, c2) {
    const avg1 = (c1.minDepth + c1.maxDepth) / 2;
    const avg2 = (c2.minDepth + c2.maxDepth) / 2;
    if (avg1 > avg2) return '<span style="color:var(--accent-orange);">⬇ 更深</span>';
    if (avg1 < avg2) return '<span style="color:var(--accent-green);">⬆ 更浅</span>';
    return '';
}
