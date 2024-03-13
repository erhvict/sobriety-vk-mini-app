import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определение типа данных пользователя
interface User {
  id?: number;
  first_name: string;
  last_name: string;
}

// Начальное состояние для slice
const initialState: User | null = {
  id: undefined,
  last_name: '',
  first_name: '',
};

// Создание slice для хранения информации о пользователе
const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.id = action.payload.id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
    },
  },
});

// Экспорт экшенов
export const { setUser } = userReducer.actions;

// Редюсер
export default userReducer.reducer;
