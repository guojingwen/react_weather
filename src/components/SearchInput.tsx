import { useState, useRef } from 'react'
import {  Select  } from 'antd';
import { debounce } from '../utils/common';
import { fetchCitiesByName } from '../api';
import { useGetState } from '../utils/hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setCityName, setLoc } from '../store/cityReducer';
import './SearchInput.scss'

interface ICityInfo {
  value: string;
  label: string
  lat: number,
  lon: number
}
const SearchInput = () => {
    const [cities, setCities] = useState<ICityInfo[]>([]);
    const [value, setValue, getValue] = useGetState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    

    const handleSearch = useRef(debounce(// 搜索进行防抖处理，防止频繁请求
      () => {
        const name = getValue();
        setCities([]);
        if(!name.trim()) return;
        fetchCitiesByName(name)
          .then(res => res.filter(it => it.country === 'CN'))
          .then(cities => {
            const newCities: ICityInfo[] = cities.map(it => ({
              value: it.name,
              label: it.local_names?.zh || it.name,
              lat: it.lat,
              lon: it.lon
            }))
            setCities(newCities);
          });
      }, 500));

    const onInputKeyDown = useRef(debounce(// 防抖 避免重复渲染
      (event: KeyboardEvent) => {
        const inputEle = event.target as HTMLInputElement;
        setValue(inputEle.value);
      }, 50));

    const onSelect = (newValue: string, option: ICityInfo) => {
      setValue(newValue);
      dispatch(setCityName(option.label))
      dispatch(setLoc({
        lat: option.lat,
        lon: option.lon
      }));
    };

    return (
      <Select
        className='search-input'
        showSearch
        loading
        value={value || undefined}
        placeholder={'请输入城市名'}
        defaultActiveFirstOption={false}
        suffixIcon={null}
        filterOption={false}
        onInputKeyDown={onInputKeyDown.current}
        onSearch={handleSearch.current}
        onSelect={onSelect}
        notFoundContent={null}
        options={cities}
      />
    );
};
export default SearchInput;
