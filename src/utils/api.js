import axios from '../utils/network.ts'

export  const getQueryMySimpleScheduleDate = (params)=>axios.get (`/p/cs/queryMySimpleSchedule?flag=${params.flag}&queryTime=${params.queryTime}`)

// 获取okr
export  const getOKR = (data)=>axios({
    url:"/p/cs/ark_share/okr_query",
    method:"post",
    data:data
})
// 添加okr
export const SetOKR =(data)=>axios({
   url:"/p/cs/ark_share/save_okr",
   method:"post",
   data:data
})
// 删除okr
export const Delete = (data)=>axios({
   url:"/p/cs/ark_share/del_okr",
   method:"post",
   data:data
})

export  const getoPtions = ()=>axios.get('/p/cs/getScheduleDictionary')

export const addScheduleDate=(data)=>axios({
   url:"/p/cs/AddSchedule",
   method:"post",
   data:data
})
export const updateTimeById =(data)=>axios({
   url:"/p/cs/updateTimeById",
   method:"post",
   data:data
})




