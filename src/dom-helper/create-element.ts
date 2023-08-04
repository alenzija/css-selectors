function createElement<T extends HTMLElement>(tag: string, className?: string): T {
  const element = document.createElement(tag) as T;
  if (className) element.className = className;
  return element;
}

export default createElement;
