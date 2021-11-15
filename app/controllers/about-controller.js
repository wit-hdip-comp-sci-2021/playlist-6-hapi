export const aboutController = {
  async index(request, response) {
    const viewData = {
      title: "About Playlist 6",
    };
    return response.view("about-view", viewData);
  },
};
