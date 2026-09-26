'use strict';

(() => {
  const scene = document.querySelector('#lighthouse-scene');
  const trigger = document.querySelector('#schedule-trigger');
  const thumbnail = document.querySelector('#schedule-thumbnail');
  const dialog = document.querySelector('#schedule-dialog');
  const fullImage = document.querySelector('#full-schedule');
  const closeButton = document.querySelector('#close-dialog');
  const zoomButton = document.querySelector('#zoom-button');
  const content = document.querySelector('#dialog-content');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  // The image link remains usable in browsers without the native dialog API.
  if (!scene || !trigger || !dialog || typeof dialog.showModal !== 'function') return;

  let hoverTimer;
  let closing = false;
  let suppressHover = false;
  let previousFocus;
  let imageAnimation;

  if (!reducedMotion.matches) {
    scene.classList.add('is-enhanced');
    window.setTimeout(() => scene.classList.add('is-lit'), 120);
    window.setTimeout(() => scene.classList.add('is-revealed'), 1150);
  }

  const resetZoom = () => {
    dialog.classList.remove('is-zoomed');
    zoomButton.setAttribute('aria-pressed', 'false');
    zoomButton.textContent = 'Крупнее';
    content.scrollTop = 0;
  };

  const thumbnailTransform = () => {
    const from = thumbnail.getBoundingClientRect();
    const to = fullImage.getBoundingClientRect();
    if (!to.width || !to.height || !from.width || !from.height) return 'none';
    const x = from.left + from.width / 2 - (to.left + to.width / 2);
    const y = from.top + from.height / 2 - (to.top + to.height / 2);
    return `translate(${x}px, ${y}px) scale(${from.width / to.width}, ${from.height / to.height})`;
  };

  const animateImage = (opening) => {
    if (reducedMotion.matches || typeof fullImage.animate !== 'function') return Promise.resolve();
    imageAnimation?.cancel();
    const small = thumbnailTransform();
    imageAnimation = fullImage.animate(
      opening ? [{ transform: small }, { transform: 'none' }] : [{ transform: 'none' }, { transform: small }],
      { duration: opening ? 720 : 380, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'none' }
    );
    return imageAnimation.finished.catch(() => {});
  };

  const openSchedule = () => {
    window.clearTimeout(hoverTimer);
    if (dialog.open || closing) return;
    previousFocus = document.activeElement;
    resetZoom();
    dialog.showModal();
    document.body.classList.add('dialog-open');
    closeButton.focus({ preventScroll: true });
    animateImage(true);
  };

  const closeSchedule = async () => {
    if (!dialog.open || closing) return;
    closing = true;
    suppressHover = true;
    const wasZoomed = dialog.classList.contains('is-zoomed');
    imageAnimation?.cancel();
    if (!wasZoomed) await animateImage(false);
    dialog.close();
  };

  trigger.addEventListener('pointerenter', (event) => {
    if (!hoverPointer.matches || event.pointerType !== 'mouse' || suppressHover || dialog.open) return;
    hoverTimer = window.setTimeout(openSchedule, 420);
  });
  trigger.addEventListener('pointerleave', () => {
    window.clearTimeout(hoverTimer);
    suppressHover = false;
  });
  trigger.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openSchedule();
  });
  closeButton.addEventListener('click', closeSchedule);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeSchedule();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === content || event.target === dialog) closeSchedule();
  });
  dialog.addEventListener('close', () => {
    window.clearTimeout(hoverTimer);
    imageAnimation?.cancel();
    document.body.classList.remove('dialog-open');
    resetZoom();
    closing = false;
    const focusTarget = previousFocus instanceof HTMLElement && previousFocus !== document.body ? previousFocus : trigger;
    focusTarget.focus({ preventScroll: true });
  });
  zoomButton.addEventListener('click', () => {
    imageAnimation?.cancel();
    const zoomed = dialog.classList.toggle('is-zoomed');
    zoomButton.setAttribute('aria-pressed', String(zoomed));
    zoomButton.textContent = zoomed ? 'Целиком' : 'Крупнее';
    content.scrollTop = 0;
  });
})();
