import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { MagnifierIcon } from '@/app/components/icons';
import { Input } from '@/app/components/Input';
import { devices, matchesMedia } from '@/utils/deviceUtils';

interface Props extends DefaultProps {}

export function SearchBar(p: Props) {
  const { model, ...passedProps } = p;

  return (
    <SearchBarWrapper
      type="text"
      placeholder={
        matchesMedia(devices.tablet) ? 'Search a property' : 'Search'
      }
      model={model}
      icon={<MagnifierIcon />}
      {...passedProps}
    />
  );
}

const SearchBarWrapper = styled(Input)`
  padding: 0.6em 0.9em;
  height: fit-content;
  width: 9em;

  @media ${devices.tablet} {
    width: revert;
  }
`;
