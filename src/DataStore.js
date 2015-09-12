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
		let steps = pth.split('.');
		let namescape = steps.shift();
		let file = path.join(this.src, namescape + '.json');
		let json = fs.readFileSync(file, 'utf8');
		let data = JSON.parse(json);

		for(let step in steps) {
			data = data[steps[step]];
		}

		return data;
	}

	set(pth, input) {
		let steps = pth.split('.');
		let namescape = steps.shift();
		let last = steps.pop();
		let file = path.join(this.src, namescape + '.json');
		let repl, data;

		try {
			data = repl = this.get(namescape);
		} catch(e) {
			data = repl = {};
		}

		if(last) {
			for(let step in steps) {
				repl[steps[step]] = repl[steps[step]] || {};
				repl = repl[steps[step]];
			}

			repl[last] = input;
		}

		fs.writeFileSync(file, JSON.stringify(data, 0, 2));
	}
}
