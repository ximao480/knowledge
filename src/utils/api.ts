import network from './network';

export const getDirectory = (postObj?:Object,path='/p/cs/r3/list') => network.post(path,postObj);  //获取文档目录

export const getDocumentation = (postObj?:Object,path='/p/cs/r3/documentation') => network.post(path,postObj);  //获取文档内容

export const queryList = (postObj?:Object,path='/p/cs/queryList') => network.post(path,postObj);  //文档模糊搜索


