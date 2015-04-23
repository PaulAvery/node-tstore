#!/usr/bin/env node
'use strict';

import path from 'path';
import pkg from '../package.json';
import hogan from 'hogan.js';
import app from 'commander';
import DataStore from './DataStore';

var store = new DataStore(process.env.TSTORE_HOME || path.join(process.env.HOME, '.config/tstore'));

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
		var template = hogan.compile(template);

		console.log(template.render(data));
	});

app.parse(process.argv);
