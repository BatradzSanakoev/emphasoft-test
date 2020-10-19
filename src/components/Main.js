import React from 'react';
import User from './User';
import Add from '../images/add.png';

export default function Main({ users, onEditPopup, onAddPopup }) {
    return (
        <main className='content'>
            <section className="profile">
                <div className="profile__add-part">
                    <button className="profile__add-button" onClick={onAddPopup}>
                        <img src={Add} alt="добавить" className="profile__add-icon" />
                    </button>
                </div>
            </section>
            <section className='users'>
                {users.map(({ id, ...props }) => <User key={id} id={id} onEditPopup={onEditPopup} {...props} />)}
            </section>
        </main>
    )
}