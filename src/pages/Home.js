import React from 'react';
import background from "../assets/home.png"
import { Label } from '@fluentui/react-components';

function Home() {
  return (
    <home>
        <img src={background} alt="Background" className="background" style={{width:"440px"}}/>
        <Label weight="semibold">INFINITE INVESTMENT</Label>
    </home>
  );
}

export default Home;