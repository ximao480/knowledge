import axios from 'axios';

const axiosInstance = axios.create({
});
const CancelToken = axios.CancelToken;
(<any>window).cancle = null;

axiosInstance.interceptors.request.use((config) => {
  if(!process.env.VUE_APP_PERMISSION){
    config.url = `/community-app${config.url}`
  }

  config.cancelToken = new axios.CancelToken(cancel => {
    (<any>window).cancle = cancel;
  })
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  if (response.data.code === -1) {
    // alert(response.data.message);
    (<any>window).basevm.$Modal.fcError({
      title: '错误',
      content: response.data.message,
      mask:true
    });
  }
  return response;
}, (error) => {
  Promise.reject(error);
});



export default axiosInstance;
