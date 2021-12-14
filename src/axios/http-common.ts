import axios from "axios";

const Axios = axios.create({
    baseURL: "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com",
    headers: {
        "Content-type": "application/json"
    }
});

Axios.interceptors.response.use(res => res.data);

export default Axios;
