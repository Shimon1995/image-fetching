export const actions = {
    async fetchAlbum({commit}: any, name: string): Promise<void> {
        await commit('fetchAlbum', name);
    },

    async fetchAbumNames({commit}: any): Promise<void> {
        await commit('getAlbumNames');
    },
};
