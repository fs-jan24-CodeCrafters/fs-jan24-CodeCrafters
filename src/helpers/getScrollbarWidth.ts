export function getScrollbarWidth(): number {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (outer.style as any).msOverflowStyle = 'scrollbar';

  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode!.removeChild(outer);
  return scrollbarWidth;
}
