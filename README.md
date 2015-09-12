tstore
======
A tiny module to store and retrieve arbitrary JSON data. Data is stored in `~/.config/tstore` by default. You may set the `TSTORE_HOME` environment variable to override this.

If used without a tty (piped e.g.) the output will not be prettified (printed in a single line)

API
---

	var tstore = require('tstore');

### .set(path, data)
Saves the data at the given path.

### .get(path)
Returns the data for a path as a javascript object (or string etc.)

CLI
---
### tstore set <path> <json>
Set data for a given path.

### tstore get <path>
Get data for a path. Prints it in json format to stdout.

Path access
-----------
A path is a dot delimited string. Use it like you would for any normal property access:

	tstore set colors.red '"red"'
