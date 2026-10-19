/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('react-native-safe-area-context', () => {
  const ReactNative = require('react-native');
  const ReactModule = require('react');
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) =>
      ReactModule.createElement(ReactNative.View, null, children),
    SafeAreaView: ({ children }: { children: React.ReactNode }) =>
      ReactModule.createElement(ReactNative.View, null, children),
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(async () => null),
    setItem: jest.fn(async () => undefined),
  },
}));

jest.mock('@react-navigation/native', () => {
  const ReactModule = require('react');
  return {
    NavigationContainer: ({ children }: { children: React.ReactNode }) =>
      ReactModule.createElement(ReactModule.Fragment, null, children),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  const ReactModule = require('react');
  const navigation = { navigate: jest.fn(), goBack: jest.fn() };
  const renderInitialScreen = ({ children }: { children: React.ReactNode }) => {
    const screen = ReactModule.Children.toArray(children)[0];
    return screen?.props?.component
      ? ReactModule.createElement(screen.props.component, {
          navigation,
          route: { params: {} },
        })
      : null;
  };
  return {
    createBottomTabNavigator: () => ({
      Navigator: renderInitialScreen,
      Screen: () => null,
    }),
  };
});

jest.mock('@react-navigation/native-stack', () => {
  const ReactModule = require('react');
  const navigation = { navigate: jest.fn(), goBack: jest.fn() };
  const renderInitialScreen = ({ children }: { children: React.ReactNode }) => {
    const screen = ReactModule.Children.toArray(children)[0];
    return screen?.props?.component
      ? ReactModule.createElement(screen.props.component, {
          navigation,
          route: { params: {} },
        })
      : null;
  };
  return {
    createNativeStackNavigator: () => ({
      Navigator: renderInitialScreen,
      Screen: () => null,
    }),
  };
});

import App from '../App';

test('renders correctly', async () => {
  let app: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(async () => {
    app = ReactTestRenderer.create(<App />);
  });

  const rendered = JSON.stringify(app!.toJSON());
  expect(rendered).toContain('SV20240128');
  expect(rendered).toContain('Môn học của bạn');
  expect(rendered).toContain('Bài tập sắp đến hạn');
});
