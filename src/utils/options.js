const whiteList = ['https://sho-p-web.vercel.app', 'http://localhost:5173', 'http://localhost:4173'];
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
