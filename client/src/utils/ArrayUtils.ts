export default class ArrayUtils {
  public static isNotEmpty(array: any[] | undefined): boolean {
    return Array.isArray(array) && array.length > 0;
  }
  public static isEmpty(array: any[] | undefined): boolean {
    return !this.isNotEmpty(array);
  }
}
