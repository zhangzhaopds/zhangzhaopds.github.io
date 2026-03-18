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
    // 显示图片
    const img = document.getElementById('wallpaperImage');
    img.src = wallpaper.image || wallpaper.thumb;
    img.alt = '壁纸预览';

    // 显示标题
    const title = document.getElementById('wallpaperTitle');
    title.textContent = wallpaper.id || '壁纸预览';

    // 显示尺寸
    const size = document.getElementById('wallpaperSize');
    size.textContent = `尺寸: ${wallpaper.width || '?'} x ${wallpaper.height || '?'}`;

    // 显示分辨率
    const resolution = document.getElementById('wallpaperResolution');
    const resolutionText = getResolutionText(wallpaper.width, wallpaper.height);
    resolution.textContent = `分辨率: ${resolutionText}`;

    // 下载按钮
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.onclick = () => downloadWallpaper(wallpaper);

    // 设为桌面按钮
    const setWallpaperBtn = document.getElementById('setWallpaperBtn');
    setWallpaperBtn.onclick = () => setAsWallpaper(wallpaper);
}

function getResolutionText(width, height) {
    if (!width || !height) return '未知';

    if (width >= 3840 || height >= 3840) return '8K超清';
    if (width >= 2560 || height >= 2560) return '2K超清';
    if (width >= 1920 || height >= 1920) return '全高清';
    if (width >= 1280 || height >= 1280) return '高清';
    return '标准';
}

function downloadWallpaper(wallpaper) {
    const url = wallpaper.image || wallpaper.thumb;
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

function setAsWallpaper(wallpaper) {
    alert('设为桌面功能需要在浏览器中右键图片，选择"设为桌面背景"或"另存为桌面"');
    // 实际应用中可以使用一些浏览器API，但兼容性有限
    // 这里引导用户手动设置
}

function showError(message) {
    document.querySelector('.detail-container').innerHTML = `
        <div class="loading">${message}</div>
        <a href="index.html" class="btn btn-primary">返回首页</a>
    `;
}
