export async function run(command, args) {
  const cmd = new Deno.Command(command, {
    args,
    stdout: "piped",
    stderr: "piped",
  })

  const child = cmd.spawn()
  const output = await child.output()
  const rawOutput = new TextDecoder().decode(output.stdout)
  const status = await child.status

  return {
    stdout: rawOutput,
    exitCode: status.code,
    success: status.success,
  }
}
