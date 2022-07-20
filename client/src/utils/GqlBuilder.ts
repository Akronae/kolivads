import { gql, TypedDocumentNode } from '@apollo/client';
import ObjectUtils from './ObjectUtils';
import StringUtils from './StringUtils';

export class GqlVariable {
  public name: string;
  constructor(name: string, public type: string) {
    this.name = '$' + name;
  }
}

export enum RequestType {
  Query = 'query',
  Mutation = 'mutation',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class GqlBuilder<T extends object, TVar = any> {
  private selectFields: string[] = [];
  private arguments: { [index: string]: any } = {};
  private variables: GqlVariable[] = [];

  constructor(
    public operation: string,
    public requestType: RequestType = RequestType.Query,
  ) {}

  /**
   * Takes a lambda and extracts its identifier name.
   * i.e. select(t => t.name) -> name
   */
  public getLambdaIdentifierName(lambda: (args: any) => any): string {
    var selected = lambda.toString();

    if (selected.includes('=== void 0 ? void 0 :'))
      throw new Error(
        'please do not use optional chaining operator (?.) use instead non-null assertion operator (!.) in order to avoid property name from changing',
      );

    selected = selected.substring(selected.indexOf('.') + 1);
    selected = StringUtils.trimFn(
      selected,
      char => !StringUtils.isIdentifier(char),
    );
    return selected;
  }

  /**
   * Add a field that the query should return.
   */
  public select(selector: (obj: T) => any): this {
    this.selectFields.push(this.getLambdaIdentifierName(selector));
    return this;
  }

  /**
   * Add an argument to the query.
   */
  public addArgument(name: string, value: any | GqlVariable): this {
    var valueStr = ObjectUtils.toStringWithoutKeyQuotes(value);
    if (value instanceof GqlVariable) {
      this.variables.push(value);
      valueStr = value.name;
    }
    this.arguments[name] = valueStr;
    return this;
  }

  /**
   * Transforms ['a', 'b.c', 'b.d'] to { a: null, b: { c: null, d: null } }
   */
  private buildFieldMap(): object {
    this.selectFields = this.selectFields.sort();
    const fieldMap = {};

    this.selectFields.forEach(field => {
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
    const entries = Object.entries(obj);
    if (entries.length === 0) return '';

    const strFields = entries
      .map(
        ([key, value]) =>
          `${'\t'.repeat(identation)}` +
          `${key} ${this.mapToStr(value, identation + 1)}`,
      )
      .join(', ');
    // .replaceAll('{\n\n}', '');

    return `{${strFields}}`;
  }

  private argsToStr(args: object): string {
    const entries = Object.entries(args);
    if (entries.length === 0) return '';
    return `(${entries.map(([key, value]) => `${key}: ${value}`).join(', ')})`;
  }

  private variablesToStr(variables: GqlVariable[]): string {
    if (variables.length === 0) return '';
    return `(${variables.map(v => `${v.name}: ${v.type}`).join(', ')})`;
  }

  public build(): TypedDocumentNode<T> {
    const map = this.buildFieldMap();
    var queryStr = `
      ${this.requestType} ${this.operation} ${this.variablesToStr(
      this.variables,
    )} {
          ${this.operation} ${this.argsToStr(this.arguments)} ${this.mapToStr(
      map,
    )}
      }
    `;
    const query = gql(queryStr);

    return query;
  }
}
