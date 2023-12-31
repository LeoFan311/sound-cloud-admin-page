import axios from '../ultils/axios_customize';

export const callRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', {
        fullName,
        email,
        password,
        phone,
    });
};

export const callLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', {
        username,
        password,
    });
};

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account');
};

export const callFetchAllUsers = () => {
    return axios.get('/api/v1/users/all');
};

export const callFetchListUser = (query) => {
    return axios.get(`/api/v1/user?${query}`);
};

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout');
};

export const callCreateUser = (fullName, password, email, phone) => {
    return axios.post('/api/v1/user', {
        fullName,
        password,
        email,
        phone,
    });
};

export const callBulkCreateUser = (data) => {
    return axios.post('/api/v1/user/bulk-create', data);
};

export const callUpdateUser = (_id, fullName, phone) => {
    console.log('Check callUpdateUser res: ', _id, fullName, phone);
    return axios.put('/api/v1/user', { _id, fullName, phone });
};

export const callUpdateUserInfo = (_id, phone, fullName, avatar) => {
    return axios.put('/api/v1/user', { _id, phone, fullName, avatar });
};

export const callChangeUserPassword = (email, oldpass, newpass) => {
    return axios.post('/api/v1/user/change-password', {
        email,
        oldpass,
        newpass,
    });
};

export const callDeleteUser = (userId) => {
    return axios.delete(`/api/v1/user/${userId}`);
};


