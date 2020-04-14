import axios from 'axios';
import fileDownload from 'js-file-download';

import ImgUrl from './ImgUrl';
import { State } from './state.interface';

export const mutations = {
  download: (state: State) => {
    state.img_urls.forEach(({url}) =>
    axios({
      url,
      method: 'GET',
      responseType: 'blob',
    })
    .then(({ data }) => {
      if ((data.type === 'image/jpeg'
        || data.type === 'image/jpg'
        || data.type === 'image/png')
        && data.size >= 250) {
        fileDownload(data, 'image.png');
      }
      }),
     );
  },
  add_image: (state: State, url: string) => {
    const imgurl = new ImgUrl(url);
    state.img_urls.push(imgurl);
  },
};
