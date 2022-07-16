export default class ObjectUtils {
  public static getValuesPathes(obj: object): { [key: string]: any } {
    if (!obj) return [];

    const pathes = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (typeof value === 'object' && value) {
        Object.assign(
          pathes,
          Object.fromEntries(
            Object.entries(this.getValuesPathes(value)).map(([k, v]) => [
              `${key}.${k}`,
              v,
            ]),
          ),
        );
      } else {
        pathes[key] = value;
      }
    });
    return pathes;
  }

  public static set(obj: object, path: string, value: any) {
    let i: number;
    const pathParts = path.split('.');
    for (i = 0; i < pathParts.length - 1; i++) {
      obj[pathParts[i]] = obj[pathParts[i]] || {};
      obj = obj[pathParts[i]];
    }

    obj[pathParts[i]] = value;
  }

  public static get<T>(obj: object, ...pathes: string[]): T | null {
    const path = pathes.join('.');
    if (!obj) return null;
    var i;
    const pathSplit = path.split('.');
    for (i = 0; i < pathSplit.length - 1; i++) {
      obj[pathSplit[i]] = obj[pathSplit[i]] || {};
      obj = obj[pathSplit[i]];
    }

    return obj[pathSplit[i]];
  }

  public static buildObjectFromPathes<T>(pathes: string[]): T {
    const obj = {};
    Object.entries(pathes).forEach(([key, value]) => this.set(obj, key, value));
    return obj as T;
  }

  public static clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Taken from https://stackoverflow.com/a/65443215/6331372
   */
  public static toStringWithoutKeyQuotes(obj: object): string {
    if (!obj) return obj;
    var cleaned = JSON.stringify(obj, null, 2);

    return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, function (match) {
      return match.replace(/"/g, '');
    });
  }
}
