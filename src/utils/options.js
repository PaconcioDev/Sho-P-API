const whiteList = ['https://sho-p-web.vercel.app'];
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
