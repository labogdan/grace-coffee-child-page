import React from 'react';
import './App.css';

import ChildPage from './pages/ChildPage';

function App(props) {

  return (
    <ChildPage beneficiary_id={props.beneficiary_id} first_name={props.first_name} last_name={props.last_name} />
  );
}

export default App;
