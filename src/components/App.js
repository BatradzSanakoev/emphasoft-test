import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import * as Auth from './Auth';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Page from './Page';
import UnCheckImg from '../images/uncheck.png';

export default function App() {

    const history = useHistory();
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [isInfoToolOpen, setIsInfoToolOpen] = React.useState(false);
    const [forInfoTool, setForInfoTool] = React.useState({});

    React.useEffect(() => {
        checkToken();
    }, []);

    const checkToken = () => {
        let token = localStorage.getItem('token');
        let username = localStorage.getItem('username');

        if (token && username) {
            setUsername(username);
            setLoggedIn(true);
            history.push('/');
        } else {
            setForInfoTool({ message: 'Необходимо авторизоваться.', icon: UnCheckImg });
            openInfoTooltip();
        }
    };

    const handleLogin = (username, password) => {
        Auth.authorize(username, password)
            .then(() => {
                localStorage.setItem('username', username);
                setUsername(username);
                setLoggedIn(true);
                history.push('/');
            })
            .catch((err) => {
                setForInfoTool({ message: `Неверные логин или пароль. Повторите ввод. (${err})`, icon: UnCheckImg });
                openInfoTooltip();
            });
    };

    const sigOut = () => {
        setLoggedIn(false);
        setUsername('');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        history.push('/');
    };

    function openInfoTooltip() {
        setIsInfoToolOpen(true);
    }

    function closeInfoTooltip() {
        setIsInfoToolOpen(false);
        setForInfoTool({});
    }

    return (
        <Switch>
            <ProtectedRoute exact path='/' loggedIn={loggedIn} component={Page} headerUser={username} signOut={sigOut} />
            <div className='page'>
                <Route path='/sign-in'>
                    <Login handleLogin={handleLogin} isInfoToolOpen={isInfoToolOpen} onClose={closeInfoTooltip} forInfoTool={forInfoTool} />
                </Route>
                <Route>
                    <Redirect to={`${loggedIn ? '/' : '/sign-in'}`} />
                </Route>
            </div>
        </Switch>
    )
}