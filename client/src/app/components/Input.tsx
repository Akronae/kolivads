import ArrayUtils from '@/utils/ArrayUtils';
import { DefaultProps } from '@/utils/ReactUtils';
import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { Div } from './Div';
import { Direction, Separator } from './Separator';

interface Props extends DefaultProps {
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  label?: string;
  value?: any;
}

function onInputChange(e: React.ChangeEvent<HTMLInputElement>, props: Props) {
  let val: any = e.target.value;
  if (props.type === 'number') val = parseFloat(val);
  if (ArrayUtils.isNotEmpty(props.model)) props.model![1](val);
}

export function Input(this: any, p: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    type,
    placeholder,
    icon,
    label,
    value,
    model,
    children,
    ...passedProps
  } = p;

  passedProps.className += ' row';

  return (
    <InputWrapper {...passedProps} onClick={() => inputRef.current?.focus()}>
      <Div className="icon" showIf={!!icon}>
        {icon}
      </Div>
      <Div className="label" showIf={!!label}>
        {label}
      </Div>
      <NameSeparator showIf={!!label} direction={Direction.Vertical} />
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        onChange={e => onInputChange(e, p)}
        value={value || model?.[0]}
      ></input>
      {children}
    </InputWrapper>
  );
}

const NameSeparator = styled(Separator)`
  margin: 0em;
`;

const InputWrapper = styled(Div)`
  border-radius: 10px;
  background-color: ${p => p.theme.borderColor};
  color: ${p => p.theme.textColorLighter};
  padding: 0.3em 0.4em;
  border: 1px solid transparent;
  width: fit-content;
  align-items: center;
  cursor: text;

  &:focus-within {
    border-color: ${p => p.theme.accentColor};
  }

  .icon {
    margin-right: 0.5em;
    fill: ${p => p.theme.backgroundTextColor};
    width: 1.2em;
    height: auto;
  }

  .label {
    margin-right: 0.5em;
    margin-left: 0.3em;
  }

  input {
    border: none;
    background-color: transparent;
    color: inherit;
    width: 100%;
    height: 1.5em;

    &:focus {
      outline: none;
    }
  }
`;
