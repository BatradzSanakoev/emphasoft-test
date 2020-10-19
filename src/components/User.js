import React from 'react';

function User({ id, username, onEditPopup }) {

    const editOpen = () => {
        onEditPopup(id);
    };

    return (
        <div className="user">
            <div className='user__container'>
                <div className='user__info'>
                    <p className='user__id'>ID: {id}</p>
                    <p className='user__name'>User: {username}</p>
                </div>
                <div className='user__buttons'>
                    <button className='user__button user__button_edit' onClick={editOpen}>Изменить</button>
                </div>
            </div>
        </div>
    )
}

export default User;