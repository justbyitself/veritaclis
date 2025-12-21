<img src="./logo.svg" alt="Veritaclis Logo" style="width: 100%;" />


## Description

Veritaclis is a test runner for CLI commands. It aims to simplify writing tests by making them more concise and less verbose, allowing developers to focus on the essential parts of their command-line interface testing without unnecessary boilerplate.

## Simple Test Example

Create a file named `echo.veritaclis.yaml` with the following content:

```yaml
shell: echo "hello world"
stdout: |
  hello world
success: true
```

This test runs the command echo "hello world", expects the output to be exactly "hello world" followed by a newline, and expects the command to succeed.

## Running the Test

Use the Veritaclis CLI to run the test:

```bash
veritaclis echo.veritaclis.yaml
```
When you run the command, you should see output similar to this:

```
echo.veritaclis.yaml
  POST: stdout check ... OK
  POST: success check ... OK

Summary: 1 / 1 tests passed.
```

## Installation

### Precompiled Binaries

You can [download](https://github.com/justbyitself/veritaclis/releases/latest) and use the precompiled binaries for Linux, macOS, and Windows from the latest GitHub releases.

For example, in Linux:

```bash
# Download the binary
curl -L -o veritaclis "https://github.com/justbyitself/veritaclis/releases/latest/download/veritaclis"

# Make it executable
chmod +x veritaclis

# Run it
./veritaclis [module or directory]
```
### Running with Deno

If you have [Deno](https://deno.com/) installed, you can run Veritaclis using the following methods:

```bash
# Option 1: Using deno run
deno run -A jsr:@justbyitself/veritaclis [module or directory]

# Option 2: Using deno x (Deno 2.6+)
deno x jsr:@justbyitself/veritaclis [module or directory]

# Option 3: Using dx shorthand (Deno 2.6+)
dx jsr:@justbyitself/veritaclis [module or directory]
```

## A More Advanced Example

You can write tests in JavaScript to take advantage of dynamic checks and more complex logic. For example:

```javascript
export default {
  shell: 'echo "hello world"',
  stdout: out => out.includes('hello world'),
  success: true
}
```

This example checks the behavior of echo, similarly to the previous YAML example, with the advantage that you have the full power of the JavaScript language (such as the includes function).

## Deno and Dynamic Imports

Veritaclis is built with Deno, which allows dynamic imports of npm/jsr packages directly inside your test modules. This enables powerful and flexible test scenarios using external libraries without extra setup.

For example, you can import the `dir-compare` package from npm to compare directory structures:

```javascript
import { compareSync } from "npm:dir-compare"

export default {
  description: "Test mkdir -p creates nested directories matching expected structure",
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

## Usage

Veritaclis accepts either a single module file or a directory containing multiple *.veritaclis.js or *.veritaclis.yaml modules. Running Veritaclis on a directory will execute all tests it finds.

```bash
# Run a single test module
veritaclis echo.veritaclis.yaml

# Run all example tests in the repository
veritaclis examples
```

## Examples

The repository includes an [examples](https://github.com/justbyitself/veritaclis/tree/main/examples) directory with multiple sample modules demonstrating how to use Veritaclis. These examples cover different commands and test scenarios to help you get started quickly.

