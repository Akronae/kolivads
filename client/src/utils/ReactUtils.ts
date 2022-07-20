import React, {
  DOMAttributes,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
  RefAttributes,
  CSSProperties,
} from 'react';
import {
  DefaultContext,
  MutationHookOptions,
  OperationVariables,
  QueryHookOptions,
  useMutation,
  useQuery,
} from '@apollo/client';
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
    if (this.state === state) return;
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

export function useSingleMutation<
  TData extends object,
  TVariables = OperationVariables,
  TContext = DefaultContext,
>(
  build: GqlBuilder<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables, TContext>,
): (
  options?: MutationHookOptions<TData, TVariables, TContext>,
) => Promise<TData[]> {
  const [mut] = useMutation(build.build(), options);
  return async (
    options?: MutationHookOptions<TData, TVariables, TContext>,
  ): Promise<TData[]> => {
    const q = await mut(options);
    var data = q.data ? Object.values(q.data)[0] : q.data;
    q.data = data;
    return data;
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
export function takeSubState<T extends object>(
  key: string,
  reactState: ReactiveState<T>,
): ReactiveState<any> {
  return new ReactiveState(
    ObjectUtils.get(reactState.state, key),
    (val: SetStateAction<any>) => {
      ObjectUtils.set(reactState.state, key, val);
      reactState.state = { ...reactState.state };
    },
  );
}

/**
 * Returns a new reactive state based on `fallbackValue` if the passed reactive state is not defined.
 * Useful for optional models. (Reactive state from parent passed to child as props, to control its behavior, but that may remain optional.)
 */
export function useStateIfDefined<T>(
  model: ReactiveState<T> | T | undefined,
  fallbackValue: T,
): ReactiveState<T> {
  // if model is T instead of ReactiveState<T>
  if (model && model instanceof ReactiveState === false) {
    fallbackValue = model as T;
    model = undefined;
  }
  const fallbackReactiveState = useState(fallbackValue);
  return (model as ReactiveState<T>) || fallbackReactiveState;
}

export function useOnUnmount(fn: () => void) {
  useEffect(() => {
    return () => {
      fn();
    };
  }, [fn]);
}

/**
 * Hook that alerts clicks outside of the passed ref
 * taken from: https://stackoverflow.com/questions/52795241/how-to-detect-click-outside-of-react-component
 */
export function useClickOutsideAlerter(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
