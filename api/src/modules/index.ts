import PropertyResolver from "@/modules/property/resolver";
import ClientResolver from "@/modules/client/resolver";

export const resolvers: [Function, ...Function[]] = [
  PropertyResolver,
  ClientResolver,
];
