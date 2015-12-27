# shtore
A tiny module to store and retrieve arbitrary JSON data. Data is stored in `~/.config/shtore` by default. You may set the `SHTORE_HOME` environment variable to override this.

If used without a tty (piped e.g.) the output will not be prettified (printed in a single line)

## API

```js
var shtore = require('shtore');
```

### .set(path, data)
Saves the data at the given path.

### .get(path)
Returns the data for a path as a javascript object (or string etc.)

### .all()
Returns all available data as one big json object.

## CLI
### shtore set <path> <json>
Set data for a given path.

### shtore get <path>
Get data for a path. Prints it in json format to stdout.

### shtore all
Get all available data and output it as one json object.

### Path access
A path is a dot delimited string. Use it like you would for any normal property access:

```sh
shtore set colors.red '"red"'
```
