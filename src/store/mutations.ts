import axios from 'axios';

import { State } from './store.interface';

export const mutations = {

  async fetchAlbum(state: State, albumName: string): Promise<void> {
    const { data } = await axios.get(`http://192.168.1.117:3000/api/${albumName}`);
    state.data.length = 0;
    state.data.push(...data);
  },

  async getAlbumNames(state: State): Promise<void> {
    const { data } = await axios.get('http://192.168.1.117:3000/api/album_list');
    state.albumList.length = 0;
    state.albumList.push(...data);
  },

  start() {
    const a = document.querySelector('.a') as HTMLElement | null;
    if (a !== null) {
      setTimeout(() => {
        a.click();
      }, 100);
    }
  },
};
