import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  loc: {lat: number; lon: number} | null;
  cityName: string;
}

const initialState: CounterState = {
  loc: null,
  cityName: ''
};

export const counterSlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCityName: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    setLoc: (state, action: PayloadAction<{lat: number; lon: number} | null>) => {
      state.loc = action.payload;
    },
  },
});

export const { setCityName, setLoc } = counterSlice.actions;
export default counterSlice.reducer;
