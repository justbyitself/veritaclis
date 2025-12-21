# Introduction

Veritaclis is a testing framework for defining and validating command-line interface (CLI) behaviors. 

**Test definition files** specify commands, inputs, environment, and expected outputs or side effects.

**Attributes** describe command details and verification conditions. Extended attributes act as shortcuts, simplifying test writing by mapping to standard attributes.

**Context** provides helpers and runtime info during tests, such as file reading, path resolution, and command results (stdout, stderr, exit code, success). This makes tests more dynamic and expressive.


# Test Definition File

A test definition file is the core unit in Veritaclis that specifies the command to run along with its expected conditions and validations.

Veritaclis supports writing test definition files in multiple formats to provide flexibility and power:

- **YAML**: A simple and concise format ideal for straightforward tests. YAML files define the command, inputs, and expected outputs declaratively.
- **JavaScript (JS)**: Allows writing tests with full programming capabilities, including dynamic checks, functions, and imports of external libraries.
- **Hybrid YAML + JS**: You can combine YAML structure with embedded JavaScript expressions or functions for more complex validations while keeping the test definition readable.

This flexibility enables users to choose the most suitable format depending on the complexity and requirements of their CLI tests.

Examples:

- YAML test: `echo.veritaclis.yaml`
- JavaScript test: `echo.veritaclis.js`
- Hybrid approach: YAML file with inline JS functions (`.veritaclis.yaml` and `.veritaclis.js`)

Using JavaScript test files unlocks advanced features such as dynamic imports, custom logic, and reusable helpers, leveraging the full power of the JavaScript ecosystem.

# Attributes

## Standard attributes

- **description**: Human-readable test description ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/file/cat.veritaclis.js))
- **pre**: Pre-conditions to verify before running the command ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/pre/echo.veritaclis.js))
- **run**: Defines the command execution details ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/file/cat.veritaclis.js))
- **post**: Post-conditions to verify after command execution ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/tmpDir/mkdir.veritaclis.js))

## Extended attributes

The extended attributes serve as convenient shortcuts or abbreviations that internally translate into the corresponding standard attributes. This means that when you use extended attributes, Veritaclis maps them to the appropriate standard attributes (`pre`, `run`, `post`, etc.) behind the scenes.

To clarify their roles, extended attributes can be grouped into two categories:

### Run-related extended attributes

These attributes define the command execution details:

- **command**: The CLI command to execute ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/basic/echo.veritaclis.js))
- **args**: Arguments passed to the command ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/basic/echo.veritaclis.js))
- **stdin**: Input passed to the command via standard input ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/stdin/cat.veritaclis.js))
- **env**: Environment variables for the command ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/env/printev.veritaclis.js))
- **cwd**: Current working directory for the command ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/cwd/pwd.veritaclis.js))

### Post-related extended attributes

These attributes specify the expected results and validations after command execution. They can be written as functions, regular expressions, or simple values to provide flexible and concise checks:

- **stdout**: Expected standard output ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/basic/echo.veritaclis.js))
- **stderr**: Expected standard error output ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/stderr/cp.veritaclis.js))
- **exitCode**: Expected exit code (add example if available)
- **success**: Boolean indicating if the command succeeded ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/basic/echo.veritaclis.js))

# Context

In Veritaclis, **context** refers to the set of helper variables and objects available during the execution of tests. It provides access to useful utilities and runtime information that can be used within test definitions to perform validations, read files, resolve paths, or inspect command outputs.

Context includes:

- **General helpers**:
  - **file**: Helper to read file contents easily ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/file/cat.veritaclis.js))
  - **path**: Helper to resolve file system paths ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/cwd/pwd.veritaclis.js))
  - **tempDir**: Path to a temporary directory created for the test ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/tmpDir/mkdir.veritaclis.js))

- **Command execution results**:
  - **stdout**: Captured standard output from the command ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/basic/echo.veritaclis.js))
  - **stderr**: Captured standard error output ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/stderr/cp.veritaclis.js))
  - **exitCode**: Exit code returned by the command ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/cwd/pwd.veritaclis.js))
  - **success**: Boolean indicating if the command succeeded ([example](https://github.com/justbyitself/veritaclis/blob/main/examples/basic/echo.veritaclis.js))

This makes tests more dynamic and expressive by providing runtime information and utilities.


