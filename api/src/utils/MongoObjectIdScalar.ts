import { GraphQLScalarType, Kind } from 'graphql';
import { ObjectId } from 'mongodb';

export const MongoObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo object id scalar type',
  parseValue(value: string) {
    console.log('=====', value);
    return new ObjectId(value);
  },
  serialize(value: ObjectId) {
    console.log('àààà))', value);
    return value.toHexString();
  },
  parseLiteral(ast) {
    console.log('!!!!', ast);
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value); // value from the client query
    }
    return null;
  },
});
