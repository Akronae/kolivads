import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';

interface Props extends DefaultProps {}

/**
 * This component is very handy, it passes all the
 * `DOMAttributes<HTMLElement>` (such as `onClick`; `className`) from its parent to its children.
 * It also handles custom made attributes (like `showIf`) for every children.
 * In an OOP paradigm, this would be the base class for all components.
 * Every component should 'extend' it, in this way:
 * ```
 * export function MyComponent(p: DefaultProps) {
 *   return <Div {...p}>
 *    {}
 *   </Div>;
 * }
 * ```
 */
export function Div(p: Props) {
  const { appearIff, children, showIf, model, ...passedProps } = p;

  if (showIf === false) return null;
  if (appearIff === false) passedProps.className += ' opacity-0';
  if (p.onClick) passedProps.className += ' clickable';

  return (
    <DivWrapper {...passedProps} title={p.tooltip}>
      {children}
    </DivWrapper>
  );
}

const DivWrapper = styled.div`
  &.opacity-0 {
    opacity: 0;
  }

  &.clickable {
    cursor: pointer;
  }
`;
