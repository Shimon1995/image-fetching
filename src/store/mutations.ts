import axios from 'axios';

import { State } from './store.interface';

export const mutations = {
  async fetchAlbum(state: State, albumName: string): Promise<void> {
    const { data } = await axios.get(`${state.hostname}/api/${albumName}`);
    const result = [];
    for (const img of data) {
      result.push(state.hostname + img);
    }
    state.data.length = 0;
    state.data.push(...result);
  },

  async getAlbumNames(state: State): Promise<void> {
    const { data } = await axios.get(`${state.hostname}/api/album_list`);
    state.albumList.length = 0;
    state.albumList.push(...data);
  },

  getHost(state: State, hostname: string): void {
    state.hostname = hostname;
  },

  start() {
    const a = document.querySelector('.a') as HTMLElement | null;
    if (a !== null) {
      setTimeout(() => {
        a.click();
      }, 1000);
    }
  },
};
