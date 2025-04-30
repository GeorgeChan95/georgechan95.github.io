document.addEventListener('DOMContentLoaded', function () {
  // 找到所有 <img> 标签
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src && src.startsWith('https://raw.githubusercontent.com')) {
      // 清空原始 src，防止浏览器直接加载
      img.removeAttribute('src');
      // 使用 fetch 加载图片
      fetch(src, {
        headers: {
          // 显式设置为空或自定义值，覆盖浏览器的默认 Accept-Language
          'Accept-Language': ''
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load image: ${response.status}`);
          }
          return response.blob();
        })
        .then(blob => {
          // 将图片 blob 设置为 img 的 src
          img.src = URL.createObjectURL(blob);
        })
        .catch(error => {
          console.error(`Error loading image ${src}:`, error);
          // 可选：设置备用图片
          img.src = '/path/to/fallback-image.png';
        });
    }
  });
});