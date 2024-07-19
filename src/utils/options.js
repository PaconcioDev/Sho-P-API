import { config } from '../config/config.js';

// TODO: Delete localhost from whiteList
const whiteList = ['http://localhost:5173', 'https://paconciodev.github.io', config.myFrontend];
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
