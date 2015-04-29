#!/usr/bin/env node
'use strict';

import path from 'path';
import pkg from '../package.json';
import mustache from 'mustache';
import app from 'commander';
import DataStore from './DataStore';

var home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
var src = process.env.TSTORE_HOME || path.join(home, '.config/tstore');

var store = new DataStore(src);

app.version(pkg.version);

app.command('get <key>')
	.description('Print data directly to stdout')
	.action(key => {
		var data = store.get(key);

		console.log(JSON.stringify(data, 0, 2));
	});

app.command('set <key> <json>')
	.description('Set data from json string')
	.action((key, json) => {
		store.set(key, json);
	});

app.command('template <key> <template>')
	.description('Compile data into provided handlebars template')
	.action((key, template) => {
		var data = store.get(key);
		console.log(mustache.render(template, data));
	});

app.parse(process.argv);
