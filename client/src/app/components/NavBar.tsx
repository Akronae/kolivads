import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Config } from '@/config';
import { useHistory } from 'react-router-dom';
import { Text } from './Text';
import { ThemeManager, lightTheme, darkTheme } from '@/styles/theme';
import { devices } from '@/utils/deviceUtils';

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
      {children}
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
  backdrop-filter: blur(10px);

  .logo {
    margin-right: 1em;

    @media ${devices.tablet} {
      margin-right: 2em;
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
