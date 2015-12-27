#!/usr/bin/env node
'use strict';

import app from 'commander';
import pkg from '../package.json';
import store from './shtore.js';

app.version(pkg.version);

app.command('get <key>')
	.description('Print data directly to stdout')
	.action(key => {
		let data = store.get(key);

		/* Log in single line if used to pipe stuff */
		console.log(JSON.stringify(data, 0, process.stdout.isTTY ? 2 : 0));
	});

app.command('set <key> <json>')
	.description('Set data from json string')
	.action((key, json) => {
		store.set(key, JSON.parse(json));
	});

app.command('all')
	.description('Print all data')
	.action(() => {
		let data = store.all();

		/* Log in single line if used to pipe stuff */
		console.log(JSON.stringify(data, 0, process.stdout.isTTY ? 2 : 0));
	});

app.parse(process.argv);
