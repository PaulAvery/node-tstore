'use strict';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

export default class DataStore {
	constructor(src) {
		this.src = src;
		try {
			mkdirp.sync(this.src);
		} catch(e) {
			console.log(e);
		}
	}

	get(pth) {
		var steps = pth.split('.');
		var namescape = steps.shift();
		var file = path.join(this.src, namescape + '.json');
		var json = fs.readFileSync(file, 'utf8');
		var data = JSON.parse(json);

		for(let step in steps) {
			data = data[step];
		}

		return data;
	}

	set(pth, json) {
		var steps = pth.split('.');
		var namescape = steps.shift();
		var last = steps.pop();
		var file = path.join(this.src, namescape + '.json');
		var repl, data;

		try {
			data = repl = this.get(namescape);
		} catch(e) {
			data = repl = {};
		}

		if(last) {
			for(let step in steps) {
				repl = repl[step];
			}

			repl[last] = JSON.parse(json);
		}

		fs.writeFileSync(file, JSON.stringify(data, 0, 2));
	}
}
