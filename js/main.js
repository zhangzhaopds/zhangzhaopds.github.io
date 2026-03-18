// 使用jsdelivr CDN加载GitHub仓库中的数据
const kHost = "https://cdn.jsdelivr.net/gh/zhangzhaopds/zhangzhaopds.github.io@master/";

let wallpapers = [];
let nextIndex = 0;  // 下一请求的索引
let isLoading = false;
let hasMore = true;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadFirstPage();
    setupLoadMore();
});

// 加载第一页
function loadFirstPage() {
    fetchPageData(0);
}

// 加载指定页
function fetchPageData(index) {
    if (isLoading || !hasMore) {
        return Promise.resolve();
    }

    isLoading = true;
    const jsonUrl = kHost + 'wallpapers' + index + '.json';

    return fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            if (data.wallpapers && data.wallpapers.length > 0) {
                wallpapers = wallpapers.concat(data.wallpapers);

                // 获取next索引
                let next = data.next;

                // 如果next是1或9999，需要先请求获取其next
                if (next === 1 || next === 9999) {
                    // 暂时设置为-1标记为正在处理
                    // 发起请求获取真正的next
                    return fetch(kHost + 'wallpapers' + next + '.json')
                        .then(res => res.json())
                        .then(vipData => {
                            // 使用VIP页面返回的next作为真正的下一页
                            next = vipData.next || -1;

                            // 渲染当前页数据
                            renderWallpapers(document.getElementById('wallpaperGrid'), data.wallpapers);

                            // 更新next索引
                            nextIndex = next;
                            hasMore = next >= 0;

                            if (!hasMore) {
                                document.getElementById('noMore').style.display = 'block';
                                document.getElementById('loadMoreBtn').style.display = 'none';
                            }
                        });
                }

                // 正常处理
                nextIndex = next;
                hasMore = next >= 0;

                renderWallpapers(document.getElementById('wallpaperGrid'), data.wallpapers);

                if (!hasMore) {
                    document.getElementById('noMore').style.display = 'block';
                    document.getElementById('loadMoreBtn').style.display = 'none';
                }
            } else {
                hasMore = false;
                if (wallpapers.length === 0) {
                    document.getElementById('wallpaperGrid').innerHTML = '<div class="loading">暂无壁纸</div>';
                }
            }
        })
        .catch(error => {
            console.error('加载失败:', error);
            document.getElementById('wallpaperGrid').innerHTML = '<div class="loading">加载失败</div>';
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
    title.textContent = wallpaper.tags && wallpaper.tags[0] ? wallpaper.tags[0] : '壁纸';

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

// 加载更多
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            if (hasMore && !isLoading) {
                fetchPageData(nextIndex);
            }
        });
    }
}
