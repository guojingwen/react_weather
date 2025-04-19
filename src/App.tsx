import React, { useState, useEffect } from 'react';
import './App.scss';
import { AimOutlined } from '@ant-design/icons'
import SearchInput from './components/SearchInput';
import { Button } from 'antd';
import { getCurrentPosition } from './utils/geo';
import { getCityInfoByLoc, getCityWeather } from './api';
import { IWeatherDaily } from './types/api';
import DayCard from './components/DayCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { setCityName, setLoc } from './store/cityReducer';
import { useGetState } from './utils/hooks';


const App: React.FC = () => {
  const cityName = useSelector((state: RootState) => state.city.cityName);
  const loc = useSelector((state: RootState) => state.city.loc);
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState, getState] = useGetState<'loading' | 'done' | 'error'>('loading');
  const [days, setDays] = useState<Array<IWeatherDaily>>([]);

  // 初次加载定位
  useEffect(() => {
    onLocate();
  }, []);

  // 根据经纬度获取天气信息
  useEffect(() => {
    if(!loc) return;
    setDays([]); // 清除天气
    // 请求天气
    getCityWeather(loc.lat, loc.lon)
      .then(({daily}) => {
        setDays(daily);
      })
  }, [loc])

  const onLocate = () => {
    const state = getState();
    if(state === 'loading') return;
    setState('loading')
    getCurrentPosition()
    .catch(() => {
      setState('error');
      return Promise.reject('请开启定位');
    })
    .then(({coords}) =>  {
      setState('done');
      return getCityInfoByLoc(coords.latitude, coords.longitude)
    })
    .then(([city]) => {
      dispatch(setCityName(city.local_names?.zh || city.name));
      const loc = {
        lat: city.lat,
        lon: city.lon
      }
      dispatch(setLoc(loc));
      return loc
    })
    // .catch TODO 异常处理
  }
  return (
    <div className="app">
      <header className="app__header">
        <h1>未来七天天气预报</h1>
      </header> 
      <div className='app__loc'>
          <span>当前城市:&emsp;{cityName}</span> 
          <Button shape="round" icon={<AimOutlined />} onClick={onLocate}
            className={`app__loc-${state}`}>
            {state=== 'error' ? '请开启定位' : '重新定位'}
          </Button>
      </div>
      <div className='app__search'>
        <span className='app__search_label'>切换城市:</span> 
        <SearchInput></SearchInput>
      </div>
      {/* todo 48小时天气 */}
      {/* 最近8天 天气 */}
      {days.length ? <>
        <div className='app__cards-title'>最近7天天气</div>
        <div className='app__cards'>
          { 
            days.map((day) =><DayCard day={day}  key={day.dt}/>)
          }
        </div>
      </> : ''}
    </div>
  );
};

export default App;


