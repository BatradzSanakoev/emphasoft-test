import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ loggedIn, headerUser, signOut }) {
    return (
        <header className='header'>
            <h1 className='header__title'>Emphasoft Test</h1>
            <div className={`${loggedIn ? 'header__info' : 'header__status'}`}>
                <p className='header__user'>{headerUser}</p>
                <p className='header__out' onClick={signOut}>Выйти</p>
            </div> 
        </header>
    )
}