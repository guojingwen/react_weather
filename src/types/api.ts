export interface ICityInfo {
  country: string;
  name: string;
  lat: number;
  lon: number;
  state: string;
  local_names?: {
    [key: string]: string
  }
}

export interface IWeatherTemp {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}
export interface IWeatherCurrent {
  dt: number;
  clouds: number;
  temp: number;
  weather: Array<{
    description: string;
    icon: string;
    id: number;
    main: string;
  }>
}
/** enhance ide tip */
type MyRecord<T extends object> = {
  [P in keyof T]: T[P]
}
export type IWeatherDaily  = MyRecord<Omit<IWeatherCurrent, 'temp'> & {temp: IWeatherTemp}>

export interface IWeatherInfo {
  current: IWeatherCurrent,
  daily: Array<IWeatherDaily>,
  hourly: Array<IWeatherCurrent>
  minutely: Array<{
    /** 时间戳 */
    dt: number;
    precipitation: number;
  }>
}
