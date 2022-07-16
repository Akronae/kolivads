export default class ArrayUtils {
  public static isNotEmpty(array: any[] | undefined): boolean {
    return Array.isArray(array) && array.length > 0;
  }
}
