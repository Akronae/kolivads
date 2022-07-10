import { ReactNode } from 'react';

export interface DefaultProps {
  className?: string;
  children?: ReactNode;
}

export function getNodeText(node: ReactNode): string {
  if (!node) return '';
  if (['string', 'number'].includes(typeof node)) return node.toString();
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (typeof node === 'object' && node) return getNodeText(node.props.children);
  return node.toString();
}
