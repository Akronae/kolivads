import { DOMAttributes, ReactNode, SetStateAction } from 'react';
import {
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
} from '@apollo/client';
import GqlBuilder from './GqlBuilder';

export interface DefaultProps extends DOMAttributes<HTMLElement> {
  appearIff?: boolean;
  showIf?: boolean;
  className?: string;
  // appears on hover, will be assigned to "title" attribute.
  // for ease of use and code readability "title" is reserved for custom props.
  tooltip?: string;
  children?: ReactNode;
  // syncs the state of the component "exposed value" with the parent component.
  // see: @/app/components/Input.tsx
  // see: https://vuejs.org/guide/essentials/forms.html
  model?: (value: SetStateAction<string>) => void;
}

export function getNodeText(node: ReactNode): string {
  if (!node) return '';
  if (['string', 'number'].includes(typeof node)) return node.toString();
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (typeof node === 'object' && node)
    return getNodeText(node['props'].children);
  return node.toString();
}

export function useSingleQuery<
  TData extends object,
  TVariables = OperationVariables,
>(
  queryFn: (
    query: TypedDocumentNode<TData>,
    options?: QueryHookOptions<TData, TVariables>,
  ) => QueryResult<TData, TVariables>,
  build: GqlBuilder<TData>,
  options?: QueryHookOptions<TData, TVariables>,
): { data: TData[] | undefined; loading: boolean; error: Error | undefined } {
  const q = queryFn(build.build(), options);
  return {
    data: q.data ? Object.values(q.data)[0] : q.data,
    loading: q.loading,
    error: q.error,
  };
}
