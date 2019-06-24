import React from 'react';
import MemoryGame from './MemoryGame';

const BSTest = () => {
  return (
    <div class='container'>
      <div class='row'>
        <div class='col-6'>
          <div class='center-block'><p> This text is a test 1</p></div>
        </div>
        <div class='col-6'>
        <div class='center-block'><p> This text is a test 2</p></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <MemoryGame />
      <BSTest />
    </>
  );
}

export default App;
