function createAnalyzeButton(): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = '🔍 Analyze Price';
  btn.id = 'priceradar-analyze-btn';
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '999999',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #0891b2, #0d9488)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    boxShadow: '0 4px 20px rgba(8, 145, 178, 0.4)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  });

  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-2px) scale(1.05)';
    btn.style.boxShadow = '0 6px 25px rgba(8, 145, 178, 0.6)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0) scale(1)';
    btn.style.boxShadow = '0 4px 20px rgba(8, 145, 178, 0.4)';
  });

  btn.addEventListener('click', () => {
    const title = document.querySelector(
      '#productTitle, h1[data-testid="product-title"], .product-title, h1.x-item-title__mainTitle, h1'
    )?.textContent?.trim() || '';

    if (title) {
      chrome.runtime.sendMessage({ action: 'openSidePanel' });
    }
  });

  return btn;
}

function init() {
  if (document.getElementById('priceradar-analyze-btn')) return;
  const btn = createAnalyzeButton();
  document.body.appendChild(btn);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
