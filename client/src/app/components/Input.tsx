import ArrayUtils from '@/utils/ArrayUtils';
import {
  DefaultProps,
  useClickOutsideAlerter,
  useState,
  useStateIfDefined,
} from '@/utils/ReactUtils';
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
  suggestions?: string[];
}

function onInputChange(e: React.ChangeEvent<HTMLInputElement>, props: Props) {
  let val: any = e.target.value;
  if (props.type === 'number') val = parseFloat(val);
  if (props.model) props.model.state = val;
}

export function Input(this: any, p: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLInputElement>(null);
  const showSuggestions = useState(false);
  const {
    type,
    placeholder,
    icon,
    label,
    value,
    model,
    children,
    suggestions,
    ...passedProps
  } = p;
  const inputValue = useStateIfDefined(model, value || '');

  if (
    !showSuggestions.state &&
    document.activeElement === inputRef.current &&
    ArrayUtils.isNotEmpty(suggestions) &&
    !suggestions?.includes(inputValue.state)
  ) {
    showSuggestions.state = true;
  }

  const displayedSuggestions: string[] = [];
  if (showSuggestions.state) {
    displayedSuggestions.push(
      ...suggestions!.filter(
        s =>
          !inputValue.state ||
          (s &&
            s !== inputValue.state &&
            s.toLowerCase().includes(inputValue.state.toLowerCase())),
      ),
    );
  }

  const onSuggestionClicked = (suggestion: string) => {
    showSuggestions.state = false;
    inputValue.state = suggestion;
  };
  const onInputBlur = () => {
    if (
      !Array.from(document.querySelectorAll(':hover')).includes(
        suggestionsRef.current!,
      )
    ) {
      showSuggestions.state = false;
    }
  };

  passedProps.className += ' row';

  return (
    <InputWrapper
      {...passedProps}
      onClick={() => inputRef.current?.focus()}
      onBlur={onInputBlur}
    >
      <Div className="icon" showIf={!!icon}>
        {icon}
      </Div>
      <Div className="label" showIf={!!label}>
        {label}
      </Div>
      <NameSeparator showIf={!!label} direction={Direction.Vertical} />
      <div>
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          onChange={e => onInputChange(e, p)}
          value={inputValue.state}
        ></input>
        {displayedSuggestions.length > 0 && showSuggestions.state && (
          <div className="suggestions" ref={suggestionsRef}>
            {displayedSuggestions.map(s => (
              <div
                className="item"
                key={s}
                onClick={() => onSuggestionClicked(s)}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
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

  .suggestions {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: ${p => p.theme.contentBackgroundColor};
    border-radius: 10px;
    min-width: 10em;
    box-shadow: ${p => p.theme.boxShadowSharp};

    .item {
      padding: 1em;
      border-top: 1px solid ${p => p.theme.borderColor};

      &:hover {
        background-color: ${p => p.theme.borderColorLight};
      }
    }
  }
`;
