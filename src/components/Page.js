import React from 'react'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import * as Api from './Api';
import EditPopup from './EditPopup';
import AddPopup from './AddPopup';

export default function Page({ loggedIn, headerUser, signOut }) {
    const [users, setUsers] = React.useState([]);
    const [ID, setId] = React.useState('');
    const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);
    const [isAddPopupOpen, setIsAddPopupOpen] = React.useState(false);

    React.useEffect(() => {
        Api.loadUsersList()
            .then((users) => {
                setUsers(users);
            })
            .catch((err) => console.log({ message: err }));
    }, []);

    const closeAllPopups = () => {
        setIsEditPopupOpen(false);
        setIsAddPopupOpen(false);
    };

    const onEditPopup = (id) => {
        setIsEditPopupOpen(true);
        setId(id);
    };

    const onAddPopup = () => {
        setIsAddPopupOpen(true);
    };

    const editUser = (id, username, first_name, last_name, is_active) => {
        Api.editUserInfo(id, username, first_name, last_name, is_active)
            .then((user) => {
                const newUsers = users.map((u) => u.id === user.id ? user : u);
                setUsers(newUsers);
            })
            .catch((err) => console.log({ message: err }));
        closeAllPopups();
    };

    const addUser = (username, first_name, last_name, password, is_active) => {
        Api.addUser(username, first_name, last_name, password, is_active)
            .then((newUser) => setUsers([...users, newUser]))
            .catch((err) => console.log({ message: err }));
        closeAllPopups();
    };

    return (
        <>
            <EditPopup isOpen={isEditPopupOpen} onClose={closeAllPopups} ID={ID} onUpdateUser={editUser} />
            <AddPopup isOpen={isAddPopupOpen} onClose={closeAllPopups} onAddUser={addUser} />
            <div className='page'>
                <Header headerUser={headerUser} loggedIn={loggedIn} signOut={signOut} />
                <Main users={users} onEditPopup={onEditPopup} onAddPopup={onAddPopup} />
                <Footer />
            </div>
        </>
    )
}