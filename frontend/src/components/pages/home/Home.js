import React from "react";
import Me from '../../../static/img/me.jpeg'
import './style.scss'

const Home = () => (
    <div className={'home-page'}>
        <div className={'fl-left me col-6 col-lg-4'}>
            <img src={Me} alt={''}/>
        </div>
        <div className={'fl-left pl20p greeting col-sm-6 col-lg-8'}>
            Hi, my name is Vladimir, I am a software engineer. This is my personal website and I am glad
            to see you here. Here you can find some words about me & my experience.
        </div>
        <div className={'clear'}/>
    </div>
);

export default Home;