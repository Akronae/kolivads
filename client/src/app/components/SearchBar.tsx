import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { MagnifierIcon } from '@/app/components/icons';
import { Input } from '@/app/components/Input';

interface Props extends DefaultProps {}

export function SearchBar(p: Props) {
  if (p.showIf === false) return null;
  if (p.appearIff === false) p.className += ' opacity-0';

  return (
    <SearchBarWrapper className="row search">
      <MagnifierIcon className="icon" />
      <Input type="text" placeholder="Search a property" model={p.model} />
    </SearchBarWrapper>
  );
}

const SearchBarWrapper = styled.div`
  border-radius: 10px;
  background-color: ${p => p.theme.backgroundTextColorSoft};
  color: ${p => p.theme.textColorLighter};
  padding: 0.6em 0.9em;
  height: fit-content;
  border: 1px solid transparent;

  &:focus-within {
    border-color: ${p => p.theme.borderColor};
  }

  .icon {
    margin-right: 0.5em;
    fill: ${p => p.theme.backgroundTextColor};
    width: 1.2em;
    height: auto;
  }

  input {
    border: none;
    background-color: transparent;
    color: inherit;

    &:focus {
      outline: none;
    }
  }
`;
