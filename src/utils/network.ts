import axios from 'axios';

axios.interceptors.request.use((config) => {
  if(true){
    config.url = `/arkshare-app${config.url}`
  }

  let data = config.data
  data = Object.assign({},data,{
    pageNum: 1,
    pageSize: 20,
    userId: (<any>window).localStorage.getItem('userInfoShare')?JSON.parse((<any>window).localStorage.getItem('userInfoShare')).id:null,
  })
  config.data = data
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

// 当post请求content-Type: application/x-www-form-urlencoded时，需要将JSON参赛转换成如下函数输入的形式。
// export const urlSearchParams = (any:data) => {
//   const params = new URLSearchParams();
//   Object.keys(data).forEach((key) => {
//     const dataType = Object.prototype.toString.call(data[key]);
//     if (dataType === '[object Object]' || dataType === '[object Array]') {
//       data[key] = JSON.stringify(data[key]);
//     }
//     params.append(key, data[key]);
//   });
//   return params;
// };

export default axios;
