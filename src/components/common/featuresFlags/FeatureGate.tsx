import { UserFeatureKey } from 'src/services/users/UserProfile';
import React from 'react';
import State from 'src/types/State';
import { useSelector } from 'react-redux';

interface Props {
  flag: UserFeatureKey;
  featureAvailableValue?: Boolean;
  children: React.ReactElement;
}

const FeatureGate = ({
  flag,
  children,
  featureAvailableValue = true,
}: Props) => {
  const features = useSelector((state: State) => state.user.features);

  return (
    <>{features && features[flag] === featureAvailableValue && children}</>
  );
};

export default FeatureGate;
