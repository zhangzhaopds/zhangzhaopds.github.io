// 壁纸详情页
document.addEventListener('DOMContentLoaded', function() {
    loadWallpaperDetail();
});

function loadWallpaperDetail() {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');

    if (!dataParam) {
        showError('无法加载壁纸信息');
        return;
    }

    try {
        const wallpaper = JSON.parse(decodeURIComponent(dataParam));
        displayWallpaper(wallpaper);
    } catch (error) {
        console.error('解析壁纸数据失败:', error);
        showError('壁纸数据加载失败');
    }
}

function displayWallpaper(wallpaper) {
    // 显示图片 - 使用thumb字段
    const img = document.getElementById('wallpaperImage');
    img.src = wallpaper.thumb || wallpaper.image;
    img.alt = '壁纸预览';

    // 显示标题
    const title = document.getElementById('wallpaperTitle');
    title.textContent = wallpaper.tags && wallpaper.tags[0] ? wallpaper.tags[0] : '壁纸预览';

    // 下载按钮
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.onclick = () => downloadWallpaper(wallpaper);
}

function downloadWallpaper(wallpaper) {
    const url = wallpaper.thumb || wallpaper.image;
    if (!url) {
        alert('下载链接无效');
        return;
    }

    // 创建下载链接
    const a = document.createElement('a');
    a.href = url;
    a.download = (wallpaper.id || 'wallpaper') + '.jpg';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function showError(message) {
    document.querySelector('.detail-container').innerHTML = `
        <div class="loading">${message}</div>
        <a href="index.html" class="btn btn-primary">返回首页</a>
    `;
}
