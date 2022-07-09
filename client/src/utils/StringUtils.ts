export default class StringUtils {
  public static isAlpha(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
  }

  public static isNumeric(str: string): boolean {
    return /^[0-9]+$/.test(str);
  }

  public static isAlphaNumeric(str: string): boolean {
    return this.isAlpha(str) && this.isNumeric(str);
  }

  public static isIdentifier(str: string): boolean {
    return /[a-zA-Z_$][0-9a-zA-Z_$]*/.test(str);
  }

  public static trimFn(
    str: string,
    shouldTrimChar: (char: string) => boolean,
  ): string {
    while (shouldTrimChar(str[0])) {
      str = str.substring(1);
    }
    while (shouldTrimChar(str[str.length - 1])) {
      str = str.substring(0, str.length - 1);
    }
    return str;
  }
}
