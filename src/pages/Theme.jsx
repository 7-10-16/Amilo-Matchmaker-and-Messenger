import React from 'react';
import ColorPicker from '../components/ColorPicker';

const Theme = (props) => {
  const { currentTheme, setCurrentTheme } = props;

  function handleThemeChange(event) {
    setCurrentTheme(event.target.value);
  }

  return (
    <div className='home'>
      <div className="container">
        <ColorPicker currentTheme={currentTheme} onThemeChange={handleThemeChange} />        
      </div>
    </div>
  )
}

export default Theme;