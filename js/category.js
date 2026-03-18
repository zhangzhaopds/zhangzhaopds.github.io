const kHost = "https://cdn.jsdelivr.net/gh/zhangzhaopds/zhangzhaopds.github.io@master/";

document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
});

function loadCategories() {
    const categoriesUrl = kHost + 'categories.json';
    const container = document.getElementById('categoryGrid');

    fetch(categoriesUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                renderCategories(container, data.items);
            } else {
                container.innerHTML = '<div class="loading">暂无分类</div>';
            }
        })
        .catch(error => {
            console.error('加载分类失败:', error);
            container.innerHTML = '<div class="loading">加载失败</div>';
        });
}

function renderCategories(container, categories) {
    // 移除加载提示
    const loading = container.querySelector('.loading');
    if (loading) {
        loading.remove();
    }

    categories.forEach(cat => {
        const item = createCategoryItem(cat);
        container.appendChild(item);
    });
}

function createCategoryItem(category) {
    const div = document.createElement('div');
    div.className = 'category-item';
    div.onclick = () => viewCategory(category);

    const img = document.createElement('img');
    img.src = category.cover || 'https://via.placeholder.com/400x200';
    img.alt = category.title;
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'category-overlay';

    const name = document.createElement('div');
    name.className = 'category-name';
    name.textContent = category.title || category.name || '分类';

    overlay.appendChild(name);
    div.appendChild(img);
    div.appendChild(overlay);

    return div;
}

function viewCategory(category) {
    // 跳转到首页并传递分类参数
    const params = encodeURIComponent(JSON.stringify(category));
    window.location.href = `index.html?category=${params}`;
}
