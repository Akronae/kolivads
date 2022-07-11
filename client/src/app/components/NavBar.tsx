import Theme from '@/styles/theme';
import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '@/assets/img/magnifier.svg';
import { Config } from '@/config';

interface Props extends DefaultProps {}

export function NavBar({ className }: Props) {
  return (
    <NavBarWrapper className={className}>
      <Logo className="logo">
        <span className="first-letter">
          {Config.projectName.substring(0, 1)}
        </span>
        {Config.projectName.substring(1)}
      </Logo>
      <SearchInput className="row search">
        <SearchIcon className="icon" />
        <input type="text" placeholder="Search a property" />
      </SearchInput>
    </NavBarWrapper>
  );
}

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  letter-spacing: 0.03em;
  color: ${Theme.current.textColorDark};

  .first-letter {
    margin-right: 0.02em;
    color: ${Theme.current.accentColor};
  }
`;

const NavBarWrapper = styled.div`
  width: 100%;
  height: 4.5em;
  box-shadow: ${Theme.current.boxShadowSoft};
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 0.7em 12em;

  .logo {
    margin-right: 2em;
  }
  .search {
  }
`;

const SearchInput = styled.div`
  border-radius: 10px;
  background-color: ${Theme.current.contentBackgroundColor};
  color: ${Theme.current.textColorLighter};
  padding: 0.8em 1.3em;
  height: fit-content;
  border: 1px solid transparent;
  transition: border-color 0.1s ease;

  &:focus-within {
    border-color: ${Theme.current.borderColor};
  }

  .icon {
    margin-right: 0.5em;
    fill: ${Theme.current.backgroundTextColor};
    width: 1.2em;
    height: auto;
  }

  input {
    border: none;
    background-color: inherit;
    color: inherit;

    &:focus {
      outline: none;
    }
  }
`;
