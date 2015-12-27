import path from 'path';
import home from 'user-home';
import DataStore from './DataStore';

let src = process.env.SHTORE_HOME || path.join(home, '.config/shtore');
let store = new DataStore(src);

module.exports = store;
