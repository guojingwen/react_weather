# project init
- cli create  npm create vite@latest react_weather -- --template react-ts


# 技术栈
- react react-redux typescript

# 预览
- [https://guojingwen.github.io/react_weather/](https://guojingwen.github.io/react_weather/)

# Weather API
- [query weather](https://openweathermap.org/)  register  and  get API_KEY
- request Weather
  - [document](https://openweathermap.org/api/one-call-3#how)
  - [根据城市拼音查天气](https://api.openweathermap.org/data/2.5/weather?q=HangZhou&lang=zh_cn&appid=61c7d9aef3c704b7f8b0fd8000fc1ac5)
  - [根据经纬度查天气](https://api.openweathermap.org/data/2.5/weather?lat=39.9075&lon=116.3972&lang=zh_cn&appid=61c7d9aef3c704b7f8b0fd8000fc1ac5)
  - [根据经纬度查天气 3.0](https://api.openweathermap.org/data/3.0/onecall?lat=39.9075&lon=116.3972&lang=zh_cn&appid=61c7d9aef3c704b7f8b0fd8000fc1ac5)
  - icon render  `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
- search city  by Chinese name
  - [示例](http://api.openweathermap.org/geo/1.0/direct?q=%E5%8E%BF&limit=5&lang=zh_cn&appid=61c7d9aef3c704b7f8b0fd8000fc1ac5)


# 其他参考
- https://zhuanlan.zhihu.com/p/645985593
