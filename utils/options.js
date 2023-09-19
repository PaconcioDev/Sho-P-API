const whiteList = ["http://localhost:5173", "https://paconciodev.github.io/Sho-P/"];
const options = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed"));
    }
  },
};

export { options };