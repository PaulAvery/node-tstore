tstore
======
A tiny module to store arbitrary JSON data and retrieve them rendered into a template. Data is stored in `~/.config/tstore` by default. You may set the `TSTORE_HOME` environment variable to override this.

CLI
---
### tstore set <path> <json>
Set data for a given path.

### tstore get <path>
Get data for a path. Prints it in json format to stdout.

### tstore template <path> <template>
Get data and render it into a mustache template.

Path access
-----------
A path is a dot delimited string. Use it like you would for any normal property access:

	tstore set colors.red '"red"'

