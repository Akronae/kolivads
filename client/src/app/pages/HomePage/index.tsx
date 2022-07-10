import Theme from '@/styles/theme';
import { Property, PropertyOperation } from '@/types/Property';
import GqlBuilder from '@/utils/GqlBuilder';
import { Text } from '@/app/components/Text';
import {
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery,
} from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

function singleQuery<TData extends object, TVariables = OperationVariables>(
  queryFn: (
    query: TypedDocumentNode<TData>,
    options?: QueryHookOptions<TData, TVariables>,
  ) => QueryResult<TData, TVariables>,
  build: GqlBuilder<TData>,
  options?: QueryHookOptions<TData, TVariables>,
): { data: TData[] | undefined; loading: boolean; error: Error | undefined } {
  const q = queryFn(build.build(), options);
  return {
    data: q.data ? Object.values(q.data)[0] : q.data,
    loading: q.loading,
    error: q.error,
  };
}

export function HomePage() {
  const { data } = singleQuery(
    useQuery,
    new GqlBuilder<Property>(PropertyOperation.Get)
      .select(s => s.id)
      .select(s => s.title)
      .select(s => s.description)
      .select(s => s.address.city)
      .select(s => s.address.street),
  );

  if (!data) return <div>loading..</div>;

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Kolivads dashboard" />
      </Helmet>
      <div className="row">
        {data.map(p => {
          return (
            <PropertyCard key={p.id}>
              <img
                src={`property-previews/${(p.id + 1) % 9}.jpg`}
                alt="property preview"
              />
              <div className="content">
                <div className="title">{p.title}</div>
                <Text className="description">{p.description.repeat(10)}</Text>
              </div>
            </PropertyCard>
          );
        })}
      </div>
    </>
  );
}

const PropertyCard = styled.div`
  margin: 1em;
  background-color: ${Theme.current.contentBackgroundColor};
  border-radius: 10px;
  box-shadow: ${Theme.current.boxShadowSharp};
  max-width: 26em;

  img {
    width: 100%;
    height: 16em;
    object-fit: cover;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .content {
    padding: 15px;
  }

  .title {
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 0.5em;
  }

  .description {
    margin-top: 0.5em;
  }
`;
