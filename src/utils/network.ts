import axios from 'axios';
const CancelToken = axios.CancelToken;
(<any>window).cancle = null;

axios.interceptors.request.use((config) => {
  if(!process.env.VUE_APP_PERMISSION){
    config.url = `/community-app${config.url}`
  }

  config.cancelToken = new axios.CancelToken(cancel => {
    (<any>window).cancle = cancel;
  })
  return config;
});

axios.interceptors.response.use((response) => {
  if (response.data.code === -1) {
    // alert(response.data.message);
    (<any>window).vm.$Modal.fcError({
      title: '错误',
      content: response.data.message,
      mask:true
    });
  }
  return response;
}, (error) => {
  Promise.reject(error);
});



export default axios;
