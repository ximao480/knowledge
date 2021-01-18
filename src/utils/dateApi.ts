/**
 * 时间类-->创建时间，格式化时间
 * @param date
 * @param fmt
 */
export default class DateUtil {
  private date:Date;
  private fmt:string
  public constructor(date:Date, fmt:string) {
      this.date = date ? date : new Date()
      this.fmt = fmt ? fmt : 'yyyy-MM-dd hh:mm:ss'
  }
  public getDate():Date {
      return this.date;
  }
  public setDate(date:Date):void {
      this.date = date
  }
  public getFmt():string {
      return this.fmt;
  }
  public setFmt(fmt:string):void {
      this.fmt = fmt
  }
  public format = ():string => {
      let _date = this.getDate()
      let fmt = this.getFmt()
      let o:any = {
          "M+" : _date.getMonth()+1,                 //月份
          "d+" : _date.getDate(),                    //日
          "h+" : _date.getHours(),                   //小时
          "m+" : _date.getMinutes(),                 //分
          "s+" : _date.getSeconds(),                 //秒
          "q+" : Math.floor((_date.getMonth()+3)/3), //季度
          "S"  : _date.getMilliseconds()             //毫秒
        };

      if(/(y+)/.test(fmt)) {
          fmt=fmt.replace(RegExp.$1, (_date.getFullYear()+"").substr(4 - RegExp.$1.length));
      }
      for(let k in o) {
          if(new RegExp("("+ k +")").test(fmt)){
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
      }
      return fmt;
  }

  public toLocaleDateString = ():string => {
    let date = this.format().split(' ')[0].split('-');
    let time = this.format().split(' ')[1].split(':');

    return `${date[1]}月${date[2]}日 ${time[0]}:${time[1]}`;
  }

  public getDateDiff = () => {
      var publishTime = this.getDateTimeStamp() / 1000,
      d_seconds,
      d_minutes,
      d_hours,
      d_days,
      timeNow = (new Date().getTime() / 1000),
      d,

      date = new Date(publishTime * 1000),
      Y = Number(date.getFullYear()),
      M = String(date.getMonth() + 1),
      D = String(date.getDate()),
      H = String(date.getHours()),
      m = String(date.getMinutes()),
      s = String(date.getSeconds());
      //小于10的在前面补0
      if (Number(M) < 10) {
              M = '0' + M;
      }
      if (Number(D) < 10) {
              D = '0' + D;
      }
      if (Number(H) < 10) {
              H = '0' + H;
      }
      if (Number(m) < 10) {
              m = '0' + m;
      }
      if (Number(s) < 10) {
              s = '0' + s;
      }

      d = timeNow - publishTime;
      d_days = parseInt(String(d / 86400));
      d_hours = parseInt(String(d / 3600));
      d_minutes = parseInt(String(d / 60));
      d_seconds = parseInt(String(d));

      if (d_days > 0 && d_days < 30) {
              return d_days + '天前';
      } else if (d_days <= 0 && d_hours > 0) {
              return d_hours + '小时前';
      } else if (d_hours <= 0 && d_minutes > 0) {
              return d_minutes + '分钟前';
      } else if (d_seconds < 60) {
              if (d_seconds <= 0) {
                      return '刚刚';
              } else {
                      return d_seconds + '秒前';
              }
      } else if (d_days >= 30) {
              return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
      }
  }

  public getDateTimeStamp = () => {
    // 如果时间格式为2020/07/09 21:43:19.000  需要去掉.000 不然ios和firefox会有问题
    return Date.parse(this.format());
  }　
}
