function showShareModal(text) {
    
  Swal.fire({
    title: '🎉 Final de Jogo, você conseguiu!!',
    html: `
      <p>${text}</p>
      <p>Compartilhe:</p>
      <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
        <button id="share-x" class="swal2-confirm swal2-styled" style="background: #000;">
          𝕏 Xwitter
        </button>
        <button id="share-bluesky" class="swal2-confirm swal2-styled" style="background: #0085ff;">
          🦋 Bluesky
        </button>
        <button id="share-threads" class="swal2-confirm swal2-styled" style="background: #000;">
          📱 Threads
        </button>
      </div>
    `,
    showConfirmButton: false,
    showCloseButton: true,
    onRender: () => {
      document.getElementById('share-x').addEventListener('click', () => {
        shareToX(text);
      });
      document.getElementById('share-bluesky').addEventListener('click', () => {
        shareToBluesky(text);
      });
      document.getElementById('share-threads').addEventListener('click', () => {
        shareToThreads(text);
      });
    }
  });
}

function shareToX(text) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
  window.open(url, '_blank', 'width=600,height=400');
}

function shareToBluesky(text) {
  const fullText = `${text} ${window.location.href}`;
  const url = `https://bsky.app/intent/compose?text=${encodeURIComponent(fullText)}`;
  window.open(url, '_blank', 'width=600,height=400');
}

function shareToThreads(text) {
  const fullText = `${text} ${window.location.href}`;
  const url = `https://threads.net/intent/post?text=${encodeURIComponent(fullText)}`;
  window.open(url, '_blank', 'width=600,height=400');
}