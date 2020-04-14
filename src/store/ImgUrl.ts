import { ImgUrl as ImgUrlInter } from './state.interface';

export default class ImgUrl implements ImgUrlInter {
    public key: number;
    constructor(public url: string) {
        this.key = Math.random();
    }
}
