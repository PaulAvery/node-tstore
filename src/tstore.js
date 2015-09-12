'use strict';

import path from 'path';
import home from 'user-home';
import DataStore from './DataStore';

let src = process.env.TSTORE_HOME || path.join(home, '.config/tstore');
let store = new DataStore(src);

module.exports = store;
