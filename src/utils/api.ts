import network from './network';

export const getDirectory = (postObj?:Object,path='/p/cs/r3/list') => network.post(path,postObj);  //获取文档目录

export const getDocumentation = (postObj?:Object,path='/p/cs/r3/documentation') => network.post(path,postObj);  //获取文档内容

export const queryList = (postObj?:Object,path='/p/cs/queryList') => network.post(path,postObj);  //文档模糊搜索

export const getComment = (postObj?:Object,path='/p/cs/r3/comment') => network.post(path,postObj);  //获取文档评论

export const addComment = (postObj?:Object,path='/p/cs/r3/add/comment') => network.post(path,postObj);  //新增文档评论

export const zenDaoList = (postObj?:Object,path='/p/cs/project_list?domain=http://project.burgeononline.com:9090&projectName=') => network.post(path,postObj);  //获取禅道地址

export const zenDaoCookie = (postObj?:Object,path='/p/cs/zenDaoCookie') => network.get(path,postObj);  //设置禅道Cookie

export const zenDaoCheck = (path:string,postObj?:Object) => network.get(path,postObj);  //设置禅道Cookie
