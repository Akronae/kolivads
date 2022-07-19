import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Config } from '@/config';
import { useHistory } from 'react-router-dom';
import { Text } from './Text';
import { ThemeManager, lightTheme, darkTheme, ZIndex } from '@/styles/theme';
import { devices } from '@/utils/deviceUtils';
import { Div } from './Div';

interface Props extends DefaultProps {}

export function NavBar({ className, children }: Props) {
  const history = useHistory();
  const isLightTheme = ThemeManager.current.name === lightTheme.name;

  return (
    <NavBarWrapper className={className}>
      <Logo className="logo" onClick={() => history.push('/')}>
        <span className="first-letter">
          {Config.projectName.substring(0, 1)}
        </span>
        {Config.projectName.substring(1)}
      </Logo>
      <div className="items">
        <Div onClick={() => history.push('/')}>Properties</Div>
        <Div onClick={() => history.push('/clients')}>Clients</Div>
        {children}
      </div>
      <SwitchThemeButton
        onClick={() =>
          (ThemeManager.current = isLightTheme ? darkTheme : lightTheme)
        }
        tooltip={
          isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'
        }
      >
        {isLightTheme ? '🌑' : '🌞'}
      </SwitchThemeButton>
    </NavBarWrapper>
  );
}

const NavBarWrapper = styled.div`
  width: 100%;
  height: ${p => p.theme.navBarHeight};
  box-shadow: ${p => p.theme.boxShadowSoft};
  background-color: ${p => p.theme.contentBackgroundColor};
  display: flex;
  align-items: center;
  padding: 0.7em calc(${p => p.theme.appPadding} + 1em);
  position: fixed;
  z-index: ${ZIndex.NavBar};

  .logo {
    margin-right: 1em;

    @media ${devices.tablet} {
      margin-right: 2em;
    }
  }

  .items {
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      margin-right: 1em;
    }
  }
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  letter-spacing: 0.03em;
  color: ${p => p.theme.textColorDark};
  cursor: pointer;

  .first-letter {
    margin-right: 0.02em;
    color: ${p => p.theme.accentColor};
  }
`;

const SwitchThemeButton = styled(Text)`
  cursor: pointer;
  font-size: 1.5em;
  margin-left: auto;
`;
