import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
import GqlBuilder from 'utils/GqlBuilder';
import { Property, PropertyOperation } from 'types/Property';

export function HomePage() {
  const { data } = useQuery<Property[]>(
    new GqlBuilder<Property>(PropertyOperation.Get)
      .select(s => s.id)
      .select(s => s.title)
      .select(s => s.description)
      .select(s => s.address.city)
      .select(s => s.address.street)
      .build(),
  );

  return (
    <>
      ,
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Kolivads dashboard" />
      </Helmet>
      <span>My HomePage</span>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
