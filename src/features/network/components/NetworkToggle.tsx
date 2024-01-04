import { SegmentedControl } from '@mantine/core';

import { setNetworkView } from '@slices/sessionSlice';
import { useAppDispatch } from '@state/store';

import { NetworkView } from '@datatypes/network';

interface NetworkToggleProps {
  view: NetworkView;
}

export const NetworkToggle = ({ view }: NetworkToggleProps) => {
  const dispatch = useAppDispatch();
  const onChange = (newView: string) => {
    dispatch(setNetworkView(NetworkView[newView as keyof typeof NetworkView]));
  };
  return <SegmentedControl value={view} onChange={onChange} data={Object.values(NetworkView)} />;
};
