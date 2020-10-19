export const BASE_URL = 'https://emphasoft-test-assignment.herokuapp.com';

export const loadUsersList = () => {
    return fetch(`${BASE_URL}/api/v1/users/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Token ${localStorage.token}`
        }
    })
        .then((res) => {
            if (res.ok) return res.json();
            else return Promise.reject(res.status);
        })
        .then((res) => {
            return res;
        });
};

export const loadUserInfo = (id) => {
    return fetch(`${BASE_URL}/api/v1/users/${id}/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Token ${localStorage.token}`
        }
    })
        .then((res) => {
            if (res.ok) return res.json();
            else return Promise.reject(res.status);
        })
        .then((res) => {
            return res;
        });
};

export const editUserInfo = (id, username, first_name, last_name, is_active) => {
    return fetch(`${BASE_URL}/api/v1/users/${id}/`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Token ${localStorage.token}`
        },
        body: JSON.stringify({
            username: username,
            first_name: first_name,
            last_name: last_name,
            is_active: is_active
        })
    })
        .then((res) => {
            if (res.ok) return res.json();
            else return Promise.reject(res.status);
        });
};

export const addUser = (username, first_name, last_name, password, is_active) => {
    return fetch(`${BASE_URL}/api/v1/users/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Token ${localStorage.token}`
        },
        body: JSON.stringify({
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: password,
            is_active: is_active
        })
    })
        .then((res) => {
            if (res.ok) return res.json();
            else return Promise.reject(res.status);
        });
};