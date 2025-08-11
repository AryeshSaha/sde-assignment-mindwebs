const osmConfig = {
  maptiler: {
    url: "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=hPd7xXTkT9R7MrmGTx1R",
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  },
};
export default osmConfig;

export type OSMProvider = keyof typeof osmConfig;
