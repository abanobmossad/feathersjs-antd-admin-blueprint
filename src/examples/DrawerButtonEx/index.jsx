import React from 'react';
import Form from './Form';
import DrawerButton from '../../components/DrawerButton';

const AddButtonEx = (props) => (
  <DrawerButton
    // path="/add-order"
    buttonTitle="ADD NEW ORDER"
    content={(closeEvent) => <Form onDrawerClose={closeEvent} />}
  />
);

export default AddButtonEx;
