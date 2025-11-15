import "./main.css";

export default function Noclip(): any {
  return (
    <>
      <div id="noclip">
        <h1>test</h1>
      </div>
      <script src="static/test.js"></script>
      <script>
        let plug = await Noclip({wasmMemory: wasmMemory});
        plug.init_emu(window.WebMelon._internal.emulator.getEmuPtr())
      </script>
    </>
  );
}
