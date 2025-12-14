export async function run({ command, args = [], cwd, stdin }) {
  const cmd = new Deno.Command(command, {
    args,
    cwd,
    stdin: stdin ? "piped" : "null",
    stdout: "piped",
    stderr: "piped"
  })

  const child = cmd.spawn()

  if (stdin) {
    const writer = child.stdin.getWriter()
    const encoder = new TextEncoder()
    await writer.write(encoder.encode(stdin))
    await writer.close()
  }

  const output = await child.output()
  const status = await child.status

  const decoder = new TextDecoder()

  return {
    stdout: decoder.decode(output.stdout),
    stderr: decoder.decode(output.stderr),
    exitCode: status.code,
    success: status.success
  }
}
