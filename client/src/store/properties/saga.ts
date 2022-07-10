import { call, takeLatest, delay } from 'redux-saga/effects';
import { request } from '@/utils/request';
import { actions } from '.';
import { Property } from '@/types/Property';
import { KolivadsApiUrl } from '@/utils/api';

export function* getProperties() {
  yield delay(500);
  const properties: Property[] = yield call(request, KolivadsApiUrl);
  actions.propertiesLoaded(properties);
}

export function* propertiesSaga() {
  // Watches for loadProperties actions and calls getProperties when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadProperties.type, getProperties);
}
