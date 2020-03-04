import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarberweb',
      storage,
      whitelist: ['auth', 'user'], //nome dos reducers que vamos armazenar os dados
    },
    reducers
  );

  return persistedReducer;
};
