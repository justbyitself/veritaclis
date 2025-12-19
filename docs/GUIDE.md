# Concepts
- **Test definition file**: A file that defines the command to run along with its expected conditions and checks.
- **Attributes**: Properties used to specify command details, environment, inputs, and expected outputs.
- **Checks**: Functions or patterns used to validate the results of the command execution.

# Attributes

## Standard attributes

- **description**: Human-readable test description ([examples/basic/echo.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/basic/echo.veritaclis.js))
- **pre**: Pre-conditions to verify before running the command ([examples/pre/echo.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/pre/echo.veritaclis.js))
- **run**: Defines the command execution details ([examples/file/cat.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/file/cat.veritaclis.js))
- **post**: Post-conditions to verify after command execution ([examples/tmpDir/mkdir.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/tmpDir/mkdir.veritaclis.js))

## Extended attributes

- **command**: The CLI command to execute ([examples/basic/echo.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/basic/echo.veritaclis.js))
- **args**: Arguments passed to the command ([examples/basic/echo.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/basic/echo.veritaclis.js))
- **stdin**: Input passed to the command via standard input ([examples/stdin/cat.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/stdin/cat.veritaclis.js))
- **env**: Environment variables for the command ([examples/env/printev.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/env/printev.veritaclis.js))
- **cwd**: Current working directory for the command ([examples/cwd/pwd.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/cwd/pwd.veritaclis.js))
- **stdout**: Expected standard output (string, regex, or function) ([examples/basic/echo.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/basic/echo.veritaclis.js))
- **stderr**: Expected standard error output ([examples/stderr/cp.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/stderr/cp.veritaclis.js))
- **exitCode**: Expected exit code (if available, add example here)
- **success**: Boolean indicating if the command succeeded ([examples/basic/echo.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/basic/echo.veritaclis.js))

# Checks
- **string**: Checks can be strings, regular expressions, or functions used to validate outputs like stdout, stderr, exit code, or other conditions ([examples/pre/echo.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/pre/echo.veritaclis.js))

# Context

## General
- **file**: Helper to read file contents ([examples/file/cat.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/file/cat.veritaclis.js))
- **path**: Helper to resolve paths ([examples/tmpDir/mkdir.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/tmpDir/mkdir.veritaclis.js))
- **tempDir**: Temporary directory path for tests ([examples/tmpDir/mkdir.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/tmpDir/mkdir.veritaclis.js))

## Command
- **stdout**: Captured standard output from the command ([examples/basic/echo.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/basic/echo.veritaclis.js))
- **stderr**: Captured standard error output ([examples/stderr/cp.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/stderr/cp.veritaclis.js))
- **exitCode**: Exit code returned by the command ([examples/cwd/pwd.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/cwd/pwd.veritaclis.js))
- **success**: Boolean indicating if the command succeeded ([examples/basic/echo.veritaclis.js](https://github.com/your_user/veritaclis/blob/main/examples/basic/echo.veritaclis.js))
