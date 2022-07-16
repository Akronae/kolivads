import { DOMAttributes, ReactNode, SetStateAction, Dispatch } from 'react';
import { OperationVariables, QueryHookOptions, useQuery } from '@apollo/client';
import GqlBuilder from './GqlBuilder';
import ObjectUtils from './ObjectUtils';

export interface DefaultProps extends DOMAttributes<HTMLElement> {
  appearIff?: boolean;
  showIf?: boolean;
  className?: string;
  // appears on hover, will be assigned to "title" attribute.
  // for ease of use and code readability "title" is reserved for custom props.
  tooltip?: string;
  children?: ReactNode | ReactNode[];
  // syncs the state of the component "exposed value" with the parent component.
  // see: @/app/components/Input.tsx
  // see: https://vuejs.org/guide/essentials/forms.html
  model?: [any, (value: SetStateAction<any>) => void];
}

export function getNodeText(node: ReactNode | ReactNode[]): string {
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
>(build: GqlBuilder<TData>, options?: QueryHookOptions<TData, TVariables>) {
  const q = useQuery(build.build(), options);
  var data = q.data ? Object.values(q.data)[0] : q.data;
  // if (data) data = JSON.parse(JSON.stringify(data));
  return {
    data,
    observable: q.observable,
    refetch: q.refetch,
    loading: q.loading,
    error: q.error,
  };
}

export function filterNonTextualNodes(
  node: ReactNode | ReactNode[],
): ReactNode[] {
  if (!Array.isArray(node)) node = [node];
  return (node as ReactNode[]).filter(n => !getNodeText(n));
}

export function takeSubState(
  key: string,
  obj: any,
  setter: Dispatch<SetStateAction<any>>,
): [any, (val: SetStateAction<any>) => any] {
  return [
    ObjectUtils.get(obj, key),
    (val: SetStateAction<any>) => {
      ObjectUtils.set(obj, key, val);
      setter({ ...obj });
    },
  ];
}
