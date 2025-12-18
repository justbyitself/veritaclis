<img src="./logo.svg" alt="Veritaclis Logo" style="width: 100%;" />

# Description

Veritaclis is a test runner for CLI commands. It takes as input a module that declares command invocation along with pre- and post-conditions. 

Here is an example:
```javascript
export default {
  command: 'echo',
  args: ['hello'],
  stdout: /hello/,
  success: true
}
```

This is equivalent to the more verbose form:

```javascript
export default {
  run: () => {
    command: 'echo',
    args: ['hello']
  },
  post: [
    {
      description: 'stdout check',
      check: ({stdout}) => /hello/.test(stdout)
    },
    {
      description: 'exit successfully',
      check: ({success}) => success === true
    }
  ]
}
```

# Deno and Dynamic Imports

Veritaclis is built with Deno, which allows dynamic imports of npm/jsr packages directly inside your test modules. This enables powerful and flexible test scenarios using external libraries without extra setup.

For example, you can import the `dir-compare` package from npm to compare directory structures:

```javascript
import { compareSync } from "npm:dir-compare"

export default {
  description: "Test mkdir p reates nested directories matching expected structure",
  run: ({ tempDir }) =>({
    command: "mkdir",
    args: ["-p", "a/b/c"],
    cwd: tempDir
  }),
  post: [
    {
      description: 'Compare directories',
      check: ({ tempDir, path }) => compareSync(tempDir, path('expectedDir')).same
    }
  ]
}
```

This feature leverages Deno's native support for npm/jsr modules and dynamic imports, making Veritaclis highly extensible.

# Usage

Veritaclis accepts either a single module file or a directory containing multiple *.veritaclis.js modules. Running Veritaclis on a directory will execute all tests in all *.veritaclis.js files found.

When running Veritaclis with a module as a parameter, the output will look like this:

```
examples/echo.veritaclis.js
  POST: status check ... OK
  POST: exit successfully ... OK

Summary: 1 / 1 tests passed.
```

# Installation

For now, you can download and use the precompiled binary for Linux:

```bash
# Download the binary
curl -L -O "https://github.com/justbyitself/veritaclis/releases/download/v0.1.0/veritaclis"

# make it executable
chmd +x veritaclis 

# run it
./veritaclis [module or directory]
```
# Requirements

- Currently, Veritaclis supports *Linux* only.
- No additional prerequisites or dependencies are required to run the precompiled binary.
- Support for *Windows * and *MacOS" is planned for future releases.

# Examples

The repository includes an [examples](https://github.com/USER/REPO/tree/main/examples) directory with multiple sample modules demonstrating how to use Veritaclis. These examples cover different commands and test scenarios to help you get started quickly.

# Status

This is version 0.1, a working MVP. While the core functionality is in place, there is still much to improve and add.

# TODO

- Enhance documentation
- Add automated tests for Veritaclis itself 
- Add support for more complex test scenarios  
- Improve CLI options and usability 
- Provide installation instructions for other platforms 
