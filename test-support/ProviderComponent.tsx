import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import State from '../src/types/State';

export interface ProviderComponentProps<P> {
  childComponent: React.ComponentType<P>;
  childProps: P;
  store: Store<State>;
}

/**
 * This component allows you to change the OwnProps fo the child component once
 * it has been mounted using
 * `ReactWrapper.setProps`.
 *
 * `setProps` has a limitation whereby it can only be called on the root node.
 * When we wrap a component in `<Provider/>`
 * we are no longer able to `setProps` on the child.
 *
 * Using this component it is possible to `setProps` on the child, using the following syntax:
 *
 * <pre>
 *   interface ComponentUnderTestProps {
 *     oneProp: true;
 *     twoProp: 'abc';
 *   }
 *
 *   const ComponentUnderTest = (props: ComponentUnderTestProps) => (
 *     <span>
 *       {props.oneProp} {props.twoProp}
 *     </span>
 *   );
 *
 *   const component = mount<ProviderComponentProps<ComponentUnderTestProps>>(
 *     <ProviderComponent
 *       childComponent={ComponentUnderTest}
 *       childProps={someProps}
 *       store={MockStoreFactory.sample()}
 *     />,
 *   );
 *
 *   // Assert some expectation
 *
 *   component.setProps({
 *     childProps: {
 *       ...component.prop('childProps'),
 *       twoProp: 'def',
 *     },
 *   });
 *
 *   // Assert some other expectation
 * </pre>
 *
 * @param props
 * @constructor
 */
export const ProviderComponent = <P extends {}>({
  store,
  childComponent,
  childProps,
}: ProviderComponentProps<P>) => (
  <Provider store={store}>
    {React.createElement(childComponent, childProps)}
  </Provider>
);
