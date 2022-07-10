import { PayloadAction } from '@reduxjs/toolkit';
import { Property } from '@/types/Property';
import { createSlice } from '@/utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from '@/utils/redux-injectors';
import { propertiesSaga } from './saga';
import { PropertiesState } from './types';

export const initialState: PropertiesState = {
  isLoading: false,
  properties: [],
};

const slice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    loadProperties(state) {
      state.isLoading = true;
      state.properties = [];
    },
    propertiesLoaded(state, action: PayloadAction<Property[]>) {
      state.properties = action.payload;
    },
  },
});

export const { actions, reducer } = slice;

export const usePropertiesFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: propertiesSaga });
  return { actions: slice.actions };
};
