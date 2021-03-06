export const BASE_URL = 'https://emphasoft-test-assignment.herokuapp.com';

export const authorize = (username, password) => {
    return fetch(`${BASE_URL}/api-token-auth/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then((res) => {
            if (res.ok) return res.json();
            else return Promise.reject(res.statusText);
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            }
        });
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            if (res.ok) return res.json();
            else return Promise.reject(res.status);
        })
        .then((data) => data);
};