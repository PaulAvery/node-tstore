#!/usr/bin/env node
'use strict';

import path from 'path';
import pkg from '../package.json';
import app from 'commander';
import home from 'user-home';
import DataStore from './DataStore';

var src = process.env.TSTORE_HOME || path.join(home, '.config/tstore');
var store = new DataStore(src);

app.version(pkg.version);

app.command('get <key>')
	.description('Print data directly to stdout')
	.action(key => {
		var data = store.get(key);

		/* Log in single line if used to pipe stuff */
		console.log(JSON.stringify(data, 0, process.stdout.isTTY ? 2 : 0));
	});

app.command('set <key> <json>')
	.description('Set data from json string')
	.action((key, json) => {
		store.set(key, json);
	});

app.parse(process.argv);
