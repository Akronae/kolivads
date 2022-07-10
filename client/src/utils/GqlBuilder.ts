import { gql, TypedDocumentNode } from '@apollo/client';
import StringUtils from './StringUtils';

export default class GqlBuilder<T extends object> {
  private fields: string[] = [];

  constructor(public operation: string) {}

  /**
   * Takes a lambda and extracts its field name.
   * i.e. select(t => t.name) -> name
   */
  public select(selector: (obj: T) => any): GqlBuilder<T> {
    var selected = selector.toString();
    selected = selected.substring(selected.indexOf('.') + 1);
    selected = StringUtils.trimFn(
      selected,
      char => !StringUtils.isIdentifier(char),
    );
    this.fields.push(selected);

    return this;
  }

  /**
   * Transforms ['a', 'b.c', 'b.d'] to { a: null, b: { c: null, d: null } }
   */
  private buildFieldMap(): object {
    this.fields = this.fields.sort();
    const fieldMap = {};

    this.fields.forEach(field => {
      var target = fieldMap;
      while (field.includes('.')) {
        var key = field.substring(0, field.indexOf('.'));
        field = field.substring(field.indexOf('.') + 1);
        if (!target[key]) target[key] = {};
        target = target[key];
      }
      target[field] = null;
    });

    return fieldMap;
  }

  /**
   * Transforms { a: null, b: { c: null, d: null } } to 'a, b { c, d }'
   */
  private mapToStr(obj: object, identation: number = 0): string {
    if (obj === null) return '';

    return Object.entries(obj)
      .map(
        ([key, value]) =>
          `${'\t'.repeat(identation)}` +
          `${key} {\n${this.mapToStr(value, identation + 1)}\n}`,
      )
      .join('\n')
      .replaceAll('{\n\n}', '');
  }

  public build(): TypedDocumentNode<T> {
    const map = this.buildFieldMap();

    const query = gql`
            query {
                ${this.operation} {
                    ${this.mapToStr(map)}
                }
            }
        `;

    return query;
  }
}
