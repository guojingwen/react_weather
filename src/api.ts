import { ICityInfo, IWeatherInfo } from "./types/api";
import { APP_ID, BASE_URL, GEO_BASE_URL } from "./utils/const";


export const fetchCitiesByName = (cityName: string) => {
  return fetch(`${GEO_BASE_URL}direct?q=${encodeURIComponent(cityName)}&limit=10&lang=zh_cn&appid=${APP_ID}`)
      .then(response => response.json())
      .then((res: ICityInfo[]) =>  res.filter(it => it.country === 'CN'));
  // return new Promise<ICityInfo[]>(resolve => {
  //   setTimeout(() => {
  //     console.log('cityName', cityName)
  //     resolve([
  //       {
  //         "name": "Xian County",
  //         "local_names": {
  //           "en": "Xian County",
  //           "zh": "献县",
  //         },
  //         "lat": 38.1904931,
  //         "lon": 116.1191021,
  //         "country": "CN",
  //         "state": "Hebei"
  //       },
  //       {
  //         "name": "Xian",
  //         "local_names": {
  //           "en": "Xian",
  //           "zh": "西岸村"
  //         },
  //         "lat": 21.9178023,
  //         "lon": 110.8360019,
  //         "country": "CN",
  //         "state": "Guangdong Province"
  //       },
  //       {
  //         "name": "Xiancun",
  //         "local_names": {
  //           "en": "Xiancun",
  //           "zh": "贤村"
  //         },
  //         "lat": 30.1361287,
  //         "lon": 118.0157878,
  //         "country": "CN",
  //         "state": "Anhui"
  //       }
  //     ].slice(Math.floor(Math.random() * 3)));
  //   }, 200)
  // })
}

export const getCityInfoByLoc: (lat: number, lon: number) => Promise<ICityInfo[]>
  = (lat, lon) => {
  console.log('getCityInfoByLoc')
  return fetch(`${GEO_BASE_URL}reverse?lat=${lat}&lon=${lon}&lang=zh_cn&appid=${APP_ID}`)
    .then(response => response.json())
}

export const getCityWeather: (lat: number, lon: number) => Promise<IWeatherInfo>
  = (lat, lon) => {
  return fetch(`${BASE_URL}onecall?lat=${lat}&lon=${lon}&lang=zh_cn&appid=${APP_ID}`)
    .then(response => response.json())
}
