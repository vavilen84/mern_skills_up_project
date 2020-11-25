import React from "react";
import Holder from "../holder/Holder";
import "./style.scss";
import LinkedinIcon from '../../../static/img/icons/linkedin.svg'
import GithubIcon from '../../../static/img/github.png'

function Footer() {
    return (
        <div className={'footer'}>
            <Holder>
                <a className={'icon'} target={'_blank'} href={'https://www.linkedin.com/in/vladimir-teplov-5b8b936a/'}>
                    <img src={LinkedinIcon} alt={''}/>
                </a>
                <a className={'icon'} target={'_blank'} href={'https://github.com/vavilen84'}>
                    <img src={GithubIcon} alt={''}/>
                </a>
                <div className={'fl-left text-block'}>
                    <div className={'text'}>E-mail: vladimir.teplov@gmail.com</div>
                    <div className={'text'}>Skype: vavilen1984</div>
                </div>
                <div className={'clear'}/>
            </Holder>
        </div>
    );
}

export default Footer;
