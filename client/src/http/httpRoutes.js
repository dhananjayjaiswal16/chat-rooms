import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,//when we have to send cookie  
    headers: {
        'Content-type': 'application/json'
    }
})

export const sendOtp = (data) => api.post('/api/send-otp', data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data);
export const activate = (data) => api.post('/api/activate', data);


//Axios Interceptors
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalReq = error.config;

        if (error.response.status === 401 && originalReq && !originalReq.isRetry) {
            originalReq.isRetry = true;

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`,
                    { withCredentials: true }
                )

                return api.request(originalReq);

            } catch (err) {
                console.log(err);
            }
        }
        throw error;
    }
)

export default api;