import React, {
  DOMAttributes,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
  RefAttributes,
  CSSProperties,
} from 'react';
import { OperationVariables, QueryHookOptions, useQuery } from '@apollo/client';
import GqlBuilder from './GqlBuilder';
import ObjectUtils from './ObjectUtils';

/**
 * Extension of the value type returned by React.useState().
 */
export class ReactiveState<T> extends Array<T | Dispatch<SetStateAction<T>>> {
  0: T;
  1: Dispatch<SetStateAction<T>>;

  constructor(getter: T, setter: Dispatch<SetStateAction<T>>) {
    super();
    this[0] = getter;
    this[1] = setter;
  }

  get state(): T {
    return this[0];
  }
  set state(state: T) {
    this[1](state);
  }
}

export interface DefaultProps
  extends DOMAttributes<HTMLElement>,
    RefAttributes<any> {
  showIf?: boolean;
  appearIf?: boolean;
  appearOnParentHover?: boolean;
  className?: string;
  style?: CSSProperties | undefined;

  // The text inside the tooltip that appears on element hovered, will be assigned to "title" attribute.
  // for ease of use and code readability "title" is reserved to custom props.
  tooltip?: string;
  children?: ReactNode | ReactNode[];

  // syncs the state of the component "exposed value" with the parent component.
  // see: @/app/components/Input.tsx
  // see: https://vuejs.org/guide/essentials/forms.html
  model?: ReactiveState<any>;
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
>(
  build: GqlBuilder<TData>,
  options?: QueryHookOptions<TData, TVariables>,
): {
  data: TData[] | undefined;
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
} {
  const q = useQuery(build.build(), options);
  var data = q.data ? Object.values(q.data)[0] : q.data;
  return {
    data,
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

/**
 * useState() wrapper that returns a ReactiveState object.
 */
export function useState<T>(data: T) {
  return new ReactiveState(...React.useState(data));
}

/**
 * Creates a reactive state based on a child of an object.
 * i.e. turns `setState({...state, key: value})` into `setKeyState(value)`.
 */
export function takeSubState(
  key: string,
  obj: any,
  setter: Dispatch<SetStateAction<any>>,
): ReactiveState<any> {
  return new ReactiveState(
    ObjectUtils.get(obj, key),
    (val: SetStateAction<any>) => {
      ObjectUtils.set(obj, key, val);
      setter({ ...obj });
    },
  );
}

/**
 * Returns a new reactive state based on `fallbackValue` if the passed reactive state is not defined.
 * Useful for optional models. (Reactive state from parent passed to child as props, to control its behavior, but that may remain optional.)
 */
export function useStateIfDefined<T>(
  model: ReactiveState<T> | undefined,
  fallbackValue: T,
): ReactiveState<T> {
  const fallbackReactiveState = useState(fallbackValue);
  return model || fallbackReactiveState;
}

export function useOnUnmount(fn: () => void) {
  useEffect(() => {
    return () => {
      fn();
    };
  }, [fn]);
}
