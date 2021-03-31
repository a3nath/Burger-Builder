import axios from "axios";

const instance = axios.create({
    baseURL: 'https://academindburger-default-rtdb.firebaseio.com/'
});

export default instance;

