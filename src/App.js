import React from 'react';

import logo from './logo.svg';
import './App.css';

import backgrounds from './backgrounds'

function Selector({options, onSelect}) {
  return (
    <select name='select-bg' id='select-bg' onChange={(event) => onSelect(event.target.value)}>
      {options}
    </select>
  )
}

function Background({name, type, isActive}) {
  const filename = `${process.env.PUBLIC_URL}/${name}.${type}`;

  if (type === 'mp4') {
    return (
      <video controls loop muted autoPlay className='isActive' src={filename} type='video/mp4'></video>
    )
  } else if (type === 'jpg') {
    return (
      <img className='isActive' src={filename} alt='' />
    )
  }
  
  // Other filetypes can be defined later on, although there's probably an automatic way to go about matching files and their appropriate tags and MIME types.
}

function App() {
  const options = backgrounds.map(({name}) => <option key={name} value={name}>{name}</option>);

  // I have it set to the first background by default. If that isn't desired behavior, it can be set to null by default with an empty option added to the Selector component.
  const [current, setCurrent] = React.useState(backgrounds[0].name)

  let selectionMap = {};

  for (let {name, type} of backgrounds) {
    selectionMap[name] = <Background name={name} type={type} />
  }

  return (
    <div className="App-header">
        {selectionMap[current]}
      <img src={logo} alt="logo" />
      {/* Making the selector it's own component makes it a little easier to come back and modify in the future should you want to have a version without the big box in the middle of the screen. */}
      <Selector options={options} onSelect={setCurrent} />
    </div>
  );
}

export default App;
