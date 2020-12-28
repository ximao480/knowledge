import network from './network';

// console.log(network);

export const getTasks = (path:string,postObj?:Object) => network.post(path,postObj);  //获取待办，动态，知识库

export const checkZenTao = (postObj?:Object,path='/p/cs/zenDaoCookie') => network.get(path,postObj);  //获取待办，动态，知识库
// export const getORK = (postObj?:Object,path='/p/cs/ark_share/okr_query') => network.get(path,postObj);  //获取待办，动态，知识库
// export const getcalendar = (postObj:Object,path='/p/cs/queryMySimpleSchedule') => network.get(path,postObj);  //获取待办，动态，知识库



