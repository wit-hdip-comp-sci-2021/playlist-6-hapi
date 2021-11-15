export const playlistAnalytics = {
  getShortestSong: function (playlist) {
    let shortestSong = null;
    if (playlist.songs && playlist.songs.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      shortestSong = playlist.songs[0];
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i < playlist.songs.length; i++) {
        if (playlist.songs[i].duration < shortestSong.duration) {
          shortestSong = playlist.songs[i];
        }
      }
    }
    return shortestSong;
  },

  getPlaylistDuration(playlist) {
    let playlistDuration = 0;
    if (playlist.songs) {
      for (let i = 0; i < playlist.songs.length; i++) {
        const song = playlist.songs[i];
        playlistDuration += song.duration;
      }
    }
    return playlistDuration;
  },
};
