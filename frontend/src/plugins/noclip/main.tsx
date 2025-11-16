import "./main.css";

import { useState } from "preact/hooks";
import {
  KeyboardBinder,
  useKeyBindings,
  KeyBindingConfig,
  KeyBinding,
} from "../common/KeyboardBinder";

type noclipWasm = {
  get_x: Function;
  get_y: Function;
  set_x: Function;
  set_y: Function;
  init_emu: Function;
  perFrame: Function;
};

declare global {
  var Noclip: (obj: { wasmMemory: any }) => Promise<noclipWasm>;
  var wasmMemory: any;
  var WebMelon: any;
  var plugins: [any];
}

export default function NoclipComp(): any {
  (async () => {
    while (!window.hasOwnProperty("Noclip"))
      //wait for wasm to load
      await new Promise((resolve) => setTimeout(resolve, 1000));

    var plug = await Noclip({ wasmMemory: wasmMemory });
    plug.init_emu(window.WebMelon._internal.emulator.getEmuPtr());

    plug.perFrame = () => {
      const posElem = document.querySelector("#pos");
      if (posElem != null)
        posElem.textContent = `(${plug.get_x()}, ${plug.get_y()})`;
    };

    window.plugins.push(plug);
    return plug;
  })().then((self) => {
    const [bindings, setBindings] = useState<KeyBinding[]>([]);

    useKeyBindings(bindings);

    const bindingConfigs: KeyBindingConfig[] = [
      { id: "move-up", action: "Move Up", defaultKey: "I" },
      { id: "move-right", action: "Move Right", defaultKey: "L" },
      { id: "move-left", action: "Move Left", defaultKey: "J" },
      { id: "move-down", action: "Move DOwn", defaultKey: "K" },
    ];

    useState(() => {
      const handleKeyAction = (event: CustomEvent) => {
        const { bindingId } = event.detail;

        const x = self.get_x();
        const y = self.get_y();

        switch (bindingId) {
          case "move-up":
            self.set_y(y - 100);
            break;
          case "move-down":
            self.set_y(y + 100);
            break;
          case "move-left":
            self.set_x(x - 100);
            break;
          case "move-right":
            self.set_x(x + 100);
            break;
        }
      };

      window.addEventListener(
        "keyBindingTriggered",
        handleKeyAction as EventListener,
      );
      return () =>
        window.removeEventListener(
          "keyBindingTriggered",
          handleKeyAction as EventListener,
        );
    });

    return (
      <>
        <div id="noclip">
          <h1>test plugin</h1>
          <h3>player pos</h3>
          <h3 id="pos"></h3>
          <KeyboardBinder bindings={bindingConfigs} onChange={setBindings} />
        </div>
        <script src="static/test.js"></script>
        <script src="static/load_noclip_plugin.js"></script>
      </>
    );
  });
}
