export const getCurrentPosition = () => new Promise<GeolocationPosition>((resolve, reject) => {
  if (!("geolocation" in navigator)) {
    return reject('您的浏览器不支持地理定位');
  }
  // console.log('定位中')
  // 浏览器支持地理定位
  navigator.geolocation.getCurrentPosition(
    resolve,
    (error) => {
      // 获取位置失败: User denied Geolocation
      console.error("获取位置失败:", error.message);
      reject('请开启浏览器定位权限');
    },
    {
      enableHighAccuracy: false, // 关闭高精度
      maximumAge: 5 * 60 * 1000, // 接受5分钟内的缓存
      timeout: 5000 // 5秒超时
    }
  );
})
