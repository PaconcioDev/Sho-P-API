const whiteList = [
  process.env.CORS_OPTION_ONE,
  process.env.CORS_OPTION_TWO,
  process.env.CORS_OPTION_THREE
];
const options = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed'));
    }
  }
};

export { options };
