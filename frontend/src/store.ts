import { makeAutoObservable, runInAction } from 'mobx';
import type { User } from './types';
import axios from 'axios';

class Store {
  user: User | null = null;
  error: string = '';
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async register(form: { email: string; password: string; name: string }) {
    try {
      const res = await axios.post<User>('http://localhost:3001/api/auth/register', form);
      runInAction(() => {
        this.user = res.data;
        this.loading = false;
      });
      return true;
    } catch (e: any) {
      runInAction(() => {
        this.error = e?.message || 'Ошибка запроса';
        this.loading = false;
      });
      return false;
    }
  }

  async login(form: { email: string; password: string }) {
    this.loading = true;
    this.error = '';
    try {
      const res = await axios.post<{ user: User }>('http://localhost:3001/api/auth/login', form);
      runInAction(() => {
        this.user = res.data.user;
        this.loading = false;
      });
      return true;
    } catch (e: any) {
      runInAction(() => {
        this.error = e?.message || 'Ошибка запроса';
        this.loading = false;
      });

      return false;
    }
  }

  async fetchUser() {
    this.loading = true;
    this.error = '';
    try {
      const res = await axios.get<User>('http://localhost:3001/api/auth/me');
      runInAction(() => {
        this.user = res.data;
        this.loading = false;
      });
      return true;
    } catch (e: any) {
      runInAction(() => {
        this.error = e?.message || 'Ошибка запроса';
        this.loading = false;
      });

      return false;
    }
  }

  async logOut() {
    try {
      await axios.post('http://localhost:3001/api/auth/logout');
      runInAction(() => {
        this.user = null;
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

const store = new Store();

export default store;
