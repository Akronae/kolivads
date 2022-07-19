import {
  DefaultProps,
  filterNonTextualNodes,
  getNodeText,
} from '@/utils/ReactUtils';
import { useState, ReactNode } from 'react';
import styled from 'styled-components';
import { Div } from '@/app/components/Div';

interface Props extends DefaultProps {
  limit?: number;
  leftIcon?: ReactNode;
  center?: { vertical?: boolean; horizontal?: boolean };
}

export function Text(p: Props) {
  const [show, setShow] = useState(false);

  var { limit, leftIcon, children, center, ...passedProps } = p;
  passedProps.className += ' Text';
  if (center?.horizontal) passedProps.className += ' center-horizontal';
  if (center?.vertical) passedProps.className += ' center-vertical';

  limit = limit || Infinity;
  const childrenStr = getNodeText(children);
  const isTextTruncated = childrenStr.length > limit && !show;
  const toShow = isTextTruncated
    ? childrenStr.substring(0, limit) + '...'
    : childrenStr;

  return (
    <TextWrapper {...passedProps}>
      {leftIcon}
      {toShow}
      {childrenStr.length > limit ? (
        <TextButton onClick={() => setShow(!show)}>
          read {isTextTruncated ? 'more' : 'less'}
        </TextButton>
      ) : null}
      {filterNonTextualNodes(children)}
    </TextWrapper>
  );
}

const TextWrapper = styled(Div)`
  .content {
    display: flex;
    flex-direction: column;

    &.center-horizontal {
      align-items: center;
    }
    &.center-vertical {
      justify-content: center;
    }
  }

  svg {
    width: 1em;
    height: 1em;
    margin-right: 0.3em;
  }
`;

const TextButton = styled.div`
  background: transparent;
  color: inherit;
  border: none;
  font-size: 0.9em;
  cursor: pointer;
  opacity: 0.6;
  font-weight: bold;
  text-align: left;
`;
