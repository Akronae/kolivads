export function matchesMedia(mediaQuery: string): boolean {
  return window.matchMedia(mediaQuery).matches;
}

export function matchesMinWidth(minWidth: number): boolean {
  return matchesMedia(`(min-width: ${minWidth}px)`);
}

export function isDarkTheme(): boolean {
  return matchesMedia('(prefers-color-scheme: dark)');
}

export const screenSizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobile: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '1760px',
  desktopL: '2080px',
};

export const devices = {
  mobileS: `(min-width: ${screenSizes.mobileS})`,
  mobileM: `(min-width: ${screenSizes.mobileM})`,
  mobile: `(min-width: ${screenSizes.mobile})`,
  tablet: `(min-width: ${screenSizes.tablet})`,
  laptop: `(min-width: ${screenSizes.laptop})`,
  laptopL: `(min-width: ${screenSizes.laptopL})`,
  desktop: `(min-width: ${screenSizes.desktop})`,
  desktopL: `(min-width: ${screenSizes.desktopL})`,
};

export enum DeviceType {
  MobileS = 'mobile-s',
  MobileM = 'mobile-m',
  Mobile = 'mobile',
  Tablet = 'tablet',
  Laptop = 'laptop',
  Desktop = 'desktop',
  DesktopL = 'desktop-l',
}

export function getDeviceType() {
  if (matchesMedia(devices.desktop)) return DeviceType.Desktop;
  if (matchesMedia(devices.laptop)) return DeviceType.Laptop;
  if (matchesMedia(devices.tablet)) return DeviceType.Tablet;
  if (matchesMedia(devices.mobile)) return DeviceType.Mobile;
  if (matchesMedia(devices.mobileM)) return DeviceType.MobileM;
  return DeviceType.MobileS;
}
