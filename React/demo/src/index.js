// Libraries
import React from 'react'; // creation logic

import ReactDOM from 'react-dom'; // render logic or display

// App is a component we have imported
import MyComp from './MyComp';

ReactDOM.render(
  
    <div>
      <MyComp />
      <MyComp />
      <MyComp />
      <MyComp />
      <MyComp />
    </div> ,  // ek component
  document.getElementById('root') // jagah jha us component ko us ekrte h
);

