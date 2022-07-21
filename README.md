# Kolivads
> ## 🏡 A technical project to manage real estate ads and clients  

<img src="https://i.imgur.com/wzJ2wKb.png" />

# Installation
## Docker
#### Requires [`docker`](https://docs.docker.com/engine/install/#server) and [docker-compose](https://docs.docker.com/compose/install/compose-plugin/)

```bash
git clone https://www.github.com/Akronae/kolivads
cd kolivads
docker-compose up -d
```
✨ The projet is running at http://localhost:3000

## Manual
Requires [Node.js](https://github.com/nvm-sh/nvm) and an instance of [MongoDB](https://www.mongodb.com/docs/manual/installation/) running ([MongoDB Atlas](https://www.mongodb.com/atlas/database) is recommended).

Clone the project:
```bash
git clone https://www.github.com/Akronae/kolivads
cd kolivads
npm i -g yarn
```
```bash
cd ./api
```
Edit `.env` according to your MongoDB instance
```bash
cp ./env.example ./env
./env
```
Run the API
```bash
npm install --legacy-peer-deps
npm run start
```
In another terminal, run the client
```bash
cd ./client
npm install --legacy-peer-deps
npm run start
```

✨ The projet is running at http://localhost:3000

## Technical Specifications
### **Server**
Database tables stick to the codebase implementation with [typegoose](https://typegoose.github.io/typegoose/docs/guides/quick-start-guide)
> `api/src/entities/Client.ts`
```ts
@plugin(AutoIncrementID)
@ObjectType()
export class Client {
  // default MongoDB ID field, cannot be changed.
  @prop()
  readonly _id!: number;

  // publicly available ID field.
  @Field()
  get id(): number {
    return this._id;
  }

  @prop()
  @Field()
  @IsPhoneNumber('FR')
  phone!: string;

  ...
```
Handling GraphQL queries is easy and clean with [type-graphql](https://typegraphql.com/)
> `api/src/modules/property/resolver.ts`
```ts
@Service()
@Resolver((of) => Property)
export default class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Query((returns) => [Property])
  async getProperties(
    @Arg("filter", { nullable: true }) filter: PropertyFilterInput
  ) {
    return await this.propertyService.get(filter);
  }

  @Mutation((returns) => [Property])
  async createProperties(
    @Arg("data", type => [PropertyCreateInput]) data: PropertyCreateInput[]
  ): Promise<Property[]> {
    return await this.propertyService.add(data);
  }

  ...
```
### **Client**  
GraphQL queries are built with a custom query builder which uses identifier names instead of litterals, making use of auto completion, linting and safe refactoring.
> `client/src/app/components/PropertyCard.tsx`
```tsx
export function PropertyCard() {
  ...
  const landlordsQuery = useSingleQuery(
    new GqlBuilder<Property>(PropertyOperation.Get)
      .addArgument(
        'filter',
        new GqlVariable('filter', nameof<PropertyFilterInput>()),
      )
      .select(p => p.landlord),
  );

  ...

  <Stat
    model={modelOf(nameof.full<Property>(p => p.landlord))}
    type="text"
    label="landlord"
    suggestions={landlordsQuery.data?.map(p => p.landlord)}
  />

  ...
}
```
Data binding is achieved through a `model` property (just like Vue.js does) enabling biderectional state syncing. Gives a much more readable code.
> `client/src/app/pages/HomePage/index.tsx`
```tsx
export function HomePage() {
  ...
  const searchText = useState('');
  ...

  return (
  ...
        <SearchBar model={searchText} />
  ...   
        <SearchInfo appearIf={searchText.state.length > 0}>
          Results for « {searchText.state} »
        </SearchInfo>
  ...
}
```
> `client/src/app/components/Input.tsx`
```tsx
interface Props extends DefaultProps {
  model?: ReactiveState<string>;
  value?: any;
}
export function Input(this: any, p: Props) {
  ...
  const inputValue = useStateIfDefined(model, value || '');
  ...
  return (
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          onChange={e => inputValue.state = e.target.value}
          value={inputValue.state}
        ></input>
      )
}
```
> `client/src/app/utils/ReactUtils.ts`
```tsx
/**
 * Extension of the value type returned by React.useState().
 */
export class ReactiveState<T> extends Array<T | Dispatch<SetStateAction<T>>> {
  0: T;
  1: Dispatch<SetStateAction<T>>;

  constructor(getter: T, setter: Dispatch<SetStateAction<T>>) {
    super();
    this[0] = getter;
    this[1] = setter;
  }

  get state(): T {
    return this[0];
  }
  set state(state: T) {
    if (this.state === state) return;
    this[1](state);
  }
}
```