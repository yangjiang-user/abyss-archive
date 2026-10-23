// ========== 探索时间线JS ==========

document.addEventListener('DOMContentLoaded', async () => {
    await loadTimeline();
});

// 加载时间线数据
async function loadTimeline() {
    const res = await apiGet('/timeline');
    const container = document.getElementById('timeline');

    if (res.code === 200 && res.data && res.data.length > 0) {
        container.innerHTML = res.data.map(event => `
            <div class="timeline-item">
                <div class="timeline-year">${event.year}</div>
                <div class="timeline-title">${event.title}</div>
                <div class="timeline-desc">${event.description}</div>
                <div class="timeline-meta">
                    ${event.country ? `<span>🌍 ${event.country}</span>` : ''}
                    ${event.vessel ? `<span>🚢 ${event.vessel}</span>` : ''}
                    ${event.depth ? `<span>🌊 深度 ${event.depth.toLocaleString()}m</span>` : ''}
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = '<div class="empty-state"><p>暂无时间线数据</p></div>';
    }
}
