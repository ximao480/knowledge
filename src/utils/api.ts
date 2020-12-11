import network from './network';

export const getTasks = (path:string,postObj?:Object) => network.post(path,postObj);  //获取待办，动态，知识库

export const checkZenTao = (postObj?:Object,path='/p/cs/zenDaoCookie') => network.get(path,postObj);  //获取待办，动态，知识库

