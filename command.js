export async function run({ command, args = [], cwd }) {
  const cmd = new Deno.Command(command, {
    args,
    cwd,
    stdout: "piped",
    stderr: "piped",
  })

  const child = cmd.spawn()
  const output = await child.output()
  const decode = text => new TextDecoder().decode(text)
  const status = await child.status

  return {
    stdout: decode(output.stdout),
    stderr: decode(output.stderr),
    exitCode: status.code,
    success: status.success,
  }
}
