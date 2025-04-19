import './DayCard.scss'
import { IWeatherDaily } from "../types/api";
import { getDayStr, getMonthAndDate } from '../utils/time';
import { tempCovert } from '../utils/common';

interface IProps {
  day: IWeatherDaily
}
const DayCard = (props: IProps) => {
  const {day} = props;
  const {temp} = day;
  const {icon, description} = day.weather[0];
  return <div className="day-card">
    <span>{getDayStr(day.dt)}</span>
    <span>{getMonthAndDate(day.dt)}</span>
    <img style={{width: '50px', height: '50px'}} src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
    <span>{description}</span>
    <span>{tempCovert(temp.min)}°C ~ {tempCovert(temp.max)}°C</span>
  </div>
} 

export default DayCard;
