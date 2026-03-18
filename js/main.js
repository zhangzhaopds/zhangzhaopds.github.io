// 使用jsdelivr CDN加载GitHub仓库中的数据
const kHost = "https://cdn.jsdelivr.net/gh/zhangzhaopds/zhangzhaopds.github.io@master/";
const kDataUrl = kHost + "wallpapersweb.json";
const kImageHost = "https://liusepai.oss-cn-beijing.aliyuncs.com/";

let wallpapers = [];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadWallpapers();
});

function loadWallpapers() {
    fetch(kDataUrl)
        .then(response => response.json())
        .then(data => {
            if (data.wallpapers && data.wallpapers.length > 0) {
                // 拼接完整图片URL
                wallpapers = data.wallpapers.map(w => ({
                    ...w,
                    thumb: kImageHost + w.thumb,
                    image: kImageHost + w.phone
                }));
                renderWallpapers(document.getElementById('wallpaperGrid'), wallpapers);
            } else {
                document.getElementById('wallpaperGrid').innerHTML = '<div class="loading">暂无壁纸</div>';
            }
        })
        .catch(error => {
            console.error('加载失败:', error);
            document.getElementById('wallpaperGrid').innerHTML = '<div class="loading">加载失败</div>';
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
    img.src = wallpaper.thumb;
    img.alt = '壁纸预览';
    img.loading = 'lazy';

    div.appendChild(img);

    return div;
}

// 查看详情
function viewDetail(wallpaper) {
    const data = encodeURIComponent(JSON.stringify(wallpaper));
    window.location.href = `detail.html?data=${data}`;
}
