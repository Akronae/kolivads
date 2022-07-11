import { DefaultProps, getNodeText } from '@/utils/ReactUtils';
import { useState } from 'react';
import styled from 'styled-components';
import { Div } from '@/app/components/Div';

interface Props extends DefaultProps {
  limit?: number;
}

export function Text(p: Props) {
  const [show, setShow] = useState(false);

  const limit = p.limit || Infinity;
  const childrenStr = getNodeText(p.children);
  const isTextTruncated = childrenStr.length > limit && !show;
  const toShow = isTextTruncated
    ? childrenStr.substring(0, limit) + '...'
    : childrenStr;

  return (
    <Div {...p}>
      {toShow}
      {childrenStr.length > limit ? (
        <TextButton onClick={() => setShow(!show)}>
          read {isTextTruncated ? 'more' : 'less'}
        </TextButton>
      ) : null}
    </Div>
  );
}

const TextButton = styled.button`
  background: transparent;
  color: inherit;
  border: none;
  font-size: 0.9em;
  cursor: pointer;
  opacity: 0.6;
  font-weight: bold;
`;
