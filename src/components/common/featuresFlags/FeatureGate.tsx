import { UserFeatureKey } from 'src/services/users/UserProfile';
import React from 'react';
import State from 'src/types/State';
import { useSelector } from 'react-redux';

interface Props {
  flag: UserFeatureKey;
  children: React.ReactElement;
}

const FeatureGate = ({ flag, children }: Props) => {
  const features = useSelector((state: State) => state.user.features);

  return <>{features && features[flag] && children}</>;
};

export default FeatureGate;
