import { DeviceType, getDeviceType, isDarkTheme } from '@/utils/deviceUtils';
import React from 'react';

export class ThemeProperties {
  public name: string = '';
  public dominant: string = '';
  public accentColor: string = '';
  public backgroundColor: string = '';
  public contentBackgroundColor: string = '';
  public textColor: string = '';
  public textColorDark: string = '';
  public textColorLighter: string = '';
  public textColorLight: string = '';
  public textColorExtraLight: string = '';
  public backgroundTextColor: string = '';
  public backgroundTextColorSoft: string = '';
  public backgroundTextColorHeavy: string = '';
  public backgroundTextColorExtraLight: string = '';
  public searchBarGrayBackground: string = '';
  public invert: string = '';
  public backgroundImageFilter: string = '';
  public borderColor: string = '';
  public borderColorStrong: string = '';
  public borderColorExtraStrong: string = '';
  public borderColorLight: string = '';
  public borderColorExtraLight: string = '';
  public borderColorMegaLight: string = '';
  public borderColorHyperLight: string = '';
  public statusBarBackgroundColor: string = '';
  public boxShadowSharp: string = '';
  public boxShadowSoft: string = '';
  public boxShadowSharpDiffuse: string = '';
  public boxShadowDiffuse: string = '';
  public boxShadowIcon: string = '';
  public textShadow: string =
    '0px 1px 1px rgba(0, 0, 0, 0.6), 1px 0px 1px rgba(0, 0, 0, 0.3)';

  public get navBarHeight(): string {
    const device = getDeviceType();
    if (device === DeviceType.Desktop) return '4.5em';
    return '3.5em';
  }
  public get appPadding(): string {
    const device = getDeviceType();
    if (device === DeviceType.Desktop) return '10em';
    return '1em';
  }
  get selectionColor(): string {
    return this.accentColor + '40';
  }
}

export const lightTheme = new ThemeProperties();
lightTheme.name = 'light';
lightTheme.dominant = 'white';
lightTheme.accentColor = '#5C64EE';
lightTheme.backgroundColor = '#F2F3F7';
lightTheme.contentBackgroundColor = 'white';
lightTheme.textColor = '#212030';
lightTheme.textColorDark = 'black';
lightTheme.textColorLighter = '#383838';
lightTheme.textColorLight = '#686a6d';
lightTheme.textColorExtraLight = '#a7a6b3';
lightTheme.backgroundTextColor = '#00000026';
lightTheme.backgroundTextColorSoft = '#0000001a';
lightTheme.backgroundTextColorHeavy = '#0000004d';
lightTheme.backgroundTextColorExtraLight = 'rgba(255, 255, 255, 0.8)';
lightTheme.searchBarGrayBackground = 'rgba(212, 212, 212, .30)';
lightTheme.invert = 'invert(0)';
lightTheme.backgroundImageFilter = 'grayscale(1)';
lightTheme.borderColor = '#e8e9ed';
lightTheme.borderColorStrong = '#e0e0e1';
lightTheme.borderColorExtraStrong = '#d3d3d3';
lightTheme.borderColorLight = '#EAEBEF';
lightTheme.borderColorExtraLight = '#EBEDF2';
lightTheme.borderColorMegaLight = '#F7F7F7';
lightTheme.borderColorHyperLight = '#fbfbfb';
lightTheme.statusBarBackgroundColor = 'rgba(0,0,0,0.05)';
lightTheme.boxShadowSharp =
  '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
lightTheme.boxShadowSoft = '0px 1px 1px rgba(0, 0, 0, 0.06)';
lightTheme.boxShadowSharpDiffuse =
  '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06), 0px -12px 20px 0px #0000000d';
lightTheme.boxShadowDiffuse = '2px 4px 10px #00000022';
lightTheme.boxShadowIcon = '2px 4px 6px #00000020';

export const darkTheme = new ThemeProperties();
darkTheme.name = 'dark';
darkTheme.dominant = 'black';
darkTheme.accentColor = '#684FA3';
darkTheme.backgroundColor = '#222222';
darkTheme.contentBackgroundColor = '#272727';
darkTheme.textColor = '#b8b8b8';
darkTheme.textColorLight = '#a3a3a3';
darkTheme.textColorLighter = '#8d8d8d';
darkTheme.textColorExtraLight = '#707070';
darkTheme.textColorDark = '#e0e0e0';
darkTheme.backgroundTextColor = '#ffffff26';
darkTheme.backgroundTextColorSoft = '#ffffff1a';
darkTheme.backgroundTextColorHeavy = '#ffffff4d';
darkTheme.backgroundTextColorExtraLight = 'rgba(0, 0, 0, 0.1)';
darkTheme.searchBarGrayBackground = 'rgba(43, 43, 43, .30)';
darkTheme.invert = 'invert(0.82)';
darkTheme.backgroundImageFilter = 'grayscale(1)';
darkTheme.borderColor = '#383838';
darkTheme.borderColorStrong = '#e0e0e157';
darkTheme.borderColorExtraStrong = '#636363';
darkTheme.borderColorLight = '#9696960d';
darkTheme.borderColorExtraLight = '#ffffff08';
darkTheme.borderColorMegaLight = '#6d6d6d06';
darkTheme.borderColorHyperLight = '#303030';
darkTheme.statusBarBackgroundColor = 'rgba(0,0,0,0.1)';
darkTheme.boxShadowSharp =
  '0 1px 3px 0 rgba(255, 255, 255, 0.03), 0 1px 2px 0 rgba(255, 255, 255, 0.06)';
darkTheme.boxShadowSoft = '0px 1px 1px rgba(255, 255, 255, 0.04)';
darkTheme.boxShadowSharpDiffuse =
  '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06), 0px -12px 20px 0px #FFFFFF0d';
darkTheme.boxShadowDiffuse = '1px 2px 10px #ffffff1a';
darkTheme.boxShadowIcon = '2px 4px 6px #000000aa';

export class ThemeManager {
  static setTheme?: React.Dispatch<React.SetStateAction<ThemeProperties>>;

  static get auto(): ThemeProperties {
    return isDarkTheme() ? darkTheme : lightTheme;
  }

  private static _current: ThemeProperties = ThemeManager.auto;
  static get current(): ThemeProperties {
    return this._current;
  }
  static set current(value) {
    console.log('setting theme to', value.name);
    this._current = value;
    if (this.setTheme) this.setTheme(value);
  }
}
