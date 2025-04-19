 export const getDayStr = (ts: number) => {
  if(`${ts}`.length <= 10) {
    ts *= 1000; // 以毫秒为单位
  }

  const now = new Date();
  const inputDate = new Date(ts);
  
  // 重置时间为 00:00:00 以便比较日期
  const today = new Date(now.setHours(0, 0, 0, 0));
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  // 比较日期
  if (inputDate >= today && inputDate < tomorrow) {
    return "今天";
  } else if (inputDate >= tomorrow && inputDate < new Date(tomorrow.setDate(tomorrow.getDate() + 1))) {
    return "明天";
  } else {
    // 获取星期几（0-6 对应 日-六）
    const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weekdays[inputDate.getDay()];
  }
}


export const getMonthAndDate =(ts: number,)  =>{
  if(`${ts}`.length <= 10) {
    ts *= 1000; // 以毫秒为单位
  }
  const date = new Date(ts);
  
  // 获取当前日期（去掉时分秒）
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  // 返回月份和日期（中文格式）
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}
