import { DefaultProps, getNodeText } from '@/utils/ReactUtils';
import { useState } from 'react';
import styled from 'styled-components';

interface Props extends DefaultProps {
  limit?: number;
}

export function Text({ limit = 100, children }: Props) {
  const [show, setShow] = useState(false);

  const childrenStr = getNodeText(children);
  const isTextTruncated = childrenStr.length > limit && !show;
  const toShow = isTextTruncated
    ? childrenStr.substring(0, limit) + '...'
    : childrenStr;
  return (
    <div>
      {toShow}
      {childrenStr.length > limit ? (
        <TextButton onClick={() => setShow(!show)}>
          read {isTextTruncated ? 'more' : 'less'}
        </TextButton>
      ) : null}
    </div>
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
