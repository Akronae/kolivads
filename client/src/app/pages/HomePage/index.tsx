import Theme from '@/styles/theme';
import { Property, PropertyOperation } from '@/types/Property';
import GqlBuilder from '@/utils/GqlBuilder';
import {
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery,
} from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { PropertyCard } from '@/app/components/PropertyCard';
import { Config } from '@/config';
import { NavBar } from '@/app/components/NavBar';

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
        <meta name="description" content={`${Config.projectName} dashboard`} />
      </Helmet>
      <NavBar />
      <ProperiesWrapper className="row">
        {data.map(p => {
          return <PropertyCard key={p.id} property={p} />;
        })}
      </ProperiesWrapper>
    </>
  );
}

const ProperiesWrapper = styled.div`
  flex-flow: wrap;
  justify-content: space-evenly;
  margin: 2em 10em;
`;
