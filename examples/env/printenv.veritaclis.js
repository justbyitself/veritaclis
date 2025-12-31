export default {
  stdout: out => out.includes("FOO_VAR=Veritaclis") && out.includes("BAR_VAR=Veritaclis")
}
