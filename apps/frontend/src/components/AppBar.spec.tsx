import { render } from '@testing-library/react-native'
import { AppBar } from './AppBar'
import React from "react";
import { NativeBaseProvider } from 'native-base';


test('Validate Title',()=>{
  const { queryByTestId,toJSON } = render(
    <NativeBaseProvider>
  <AppBar title='TESTING' />
    </NativeBaseProvider>
  );
  expect(toJSON()).toMatchSnapshot()
})