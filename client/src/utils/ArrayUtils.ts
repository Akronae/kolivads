export default class ArrayUtils {
  public static isNotEmpty(array: any[] | undefined): boolean {
    return Array.isArray(array) && array.length > 0;
  }
  public static isEmpty(array: any[] | undefined): boolean {
    return !this.isNotEmpty(array);
  }

  public static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  public static filterDuplicates<T>(array: T[]): T[] {
    return array.filter((item, index) => array.indexOf(item) === index);
  }
}
