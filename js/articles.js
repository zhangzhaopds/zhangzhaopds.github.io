// 获取URL参数
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 加载文章列表
async function loadArticleList() {
    const container = document.getElementById('articleList');
    if (!container) return;

    try {
        const response = await fetch('data/articles.json');
        const data = await response.json();

        if (data.articles.length === 0) {
            container.innerHTML = '<p>暂无文章</p>';
            return;
        }

        // 按日期倒序排列
        const sortedArticles = [...data.articles].sort((a, b) => new Date(b.date) - new Date(a.date));

        let html = '<div class="article-grid">';
        sortedArticles.forEach(article => {
            html += `
                <a href="article.html?id=${article.id}" class="article-card">
                    <h3 class="article-card-title">${article.title}</h3>
                    <div class="article-card-meta">
                        <span>${article.date}</span>
                        <span>${article.category}</span>
                    </div>
                    <p class="article-card-excerpt">${article.excerpt}</p>
                </a>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = '<p>加载失败</p>';
    }
}

// 加载文章详情
async function loadArticleDetail() {
    const articleId = getQueryParam('id');
    if (!articleId) {
        window.location.href = 'articles.html';
        return;
    }

    try {
        const response = await fetch('data/articles.json');
        const data = await response.json();
        const article = data.articles.find(a => a.id === articleId);

        if (!article) {
            window.location.href = 'articles.html';
            return;
        }

        document.title = `${article.title} - 流色派`;
        document.querySelector('.article-title').textContent = article.title;
        document.querySelector('.article-date').textContent = article.date;
        document.querySelector('.article-category').textContent = article.category;
        document.querySelector('.article-content').innerHTML = article.content;
    } catch (error) {
        window.location.href = 'articles.html';
    }
}

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('articleList')) {
        loadArticleList();
    } else if (document.querySelector('.article-title')) {
        loadArticleDetail();
    }
});
