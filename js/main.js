// 使用jsdelivr CDN加载GitHub仓库中的数据
const kHost = "https://cdn.jsdelivr.net/gh/zhangzhaopds/zhangzhaopds.github.io@master/";
let wallpapers = [];
let currentPage = 0;
let loadedIndices = [];
let isLoading = false;
let hasMore = true;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadHotWallpapers();
    loadFirstPage();
    setupSearch();
    setupLoadMore();
});

// 加载热门壁纸
function loadHotWallpapers() {
    const hotUrl = kHost + 'wallpapershot.json';

    fetch(hotUrl)
        .then(response => response.json())
        .then(data => {
            const hotContainer = document.getElementById('hotWallpapers');
            if (data.wallpapers && data.wallpapers.length > 0) {
                // 取前6张热门
                const hotWallpapers = data.wallpapers.slice(0, 6);
                renderWallpapers(hotContainer, hotWallpapers);
            } else {
                hotContainer.innerHTML = '<div class="loading">暂无热门壁纸</div>';
            }
        })
        .catch(error => {
            console.error('加载热门壁纸失败:', error);
            document.getElementById('hotWallpapers').innerHTML = '<div class="loading">加载失败</div>';
        });
}

// 加载第一页
function loadFirstPage() {
    // 加载 index=0
    fetchPageData(0);
    // 加载 index=2 (跳过 index=1 美女)
    fetchPageData(2);
}

// 加载指定页
function fetchPageData(index) {
    if (isLoading || loadedIndices.includes(index)) {
        return Promise.resolve();
    }

    isLoading = true;
    const jsonUrl = kHost + 'wallpapers' + index + '.json';

    return fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            if (data.wallpapers && data.wallpapers.length > 0) {
                wallpapers = wallpapers.concat(data.wallpapers);
                loadedIndices.push(index);
                currentPage = index;

                if (data.next !== undefined && data.next >= 0) {
                    hasMore = true;
                    currentPage = data.next;
                } else {
                    hasMore = false;
                }

                renderWallpapers(document.getElementById('wallpaperGrid'), data.wallpapers);
            } else {
                hasMore = false;
                if (wallpapers.length === 0) {
                    document.getElementById('wallpaperGrid').innerHTML = '<div class="loading">暂无壁纸</div>';
                }
            }
        })
        .catch(error => {
            console.error('加载失败:', error);
            isLoading = false;
        })
        .finally(() => {
            isLoading = false;
        });
}

// 渲染壁纸
function renderWallpapers(container, items) {
    if (!container || !items || items.length === 0) return;

    // 移除加载提示
    const loading = container.querySelector('.loading');
    if (loading) {
        loading.remove();
    }

    items.forEach(wallpaper => {
        const item = createWallpaperItem(wallpaper);
        container.appendChild(item);
    });
}

// 创建壁纸项
function createWallpaperItem(wallpaper) {
    const div = document.createElement('div');
    div.className = 'wallpaper-item';
    div.onclick = () => viewDetail(wallpaper);

    const img = document.createElement('img');
    img.src = wallpaper.thumb || wallpaper.image;
    img.alt = '壁纸预览';
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'wallpaper-overlay';

    const title = document.createElement('div');
    title.className = 'wallpaper-title';
    title.textContent = wallpaper.id || '壁纸';

    const size = document.createElement('div');
    size.className = 'wallpaper-size';
    size.textContent = wallpaper.width ? `${wallpaper.width}x${wallpaper.height}` : '';

    overlay.appendChild(title);
    overlay.appendChild(size);
    div.appendChild(img);
    div.appendChild(overlay);

    return div;
}

// 查看详情
function viewDetail(wallpaper) {
    const data = encodeURIComponent(JSON.stringify(wallpaper));
    window.location.href = `detail.html?data=${data}`;
}

// 搜索功能
function setupSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!keyword) return;

    const container = document.getElementById('wallpaperGrid');
    container.innerHTML = '<div class="loading">搜索中...</div>';

    // 过滤本地数据
    const filtered = wallpapers.filter(w => {
        const id = (w.id || '').toLowerCase();
        const tags = (w.tags || []).join(' ').toLowerCase();
        return id.includes(keyword) || tags.includes(keyword);
    });

    if (filtered.length > 0) {
        renderWallpapers(container, filtered);
    } else {
        container.innerHTML = '<div class="loading">未找到相关壁纸</div>';
    }
}

// 加载更多
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            if (hasMore && !isLoading) {
                fetchPageData(currentPage);
            }
        });
    }
}
