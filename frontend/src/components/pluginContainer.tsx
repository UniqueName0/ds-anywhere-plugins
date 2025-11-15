import "./pluginContainer.css";

import Noclip from "../plugins/noclip/main";

export default function PluginContainer(): any {
  return (
    <>
      <div id="plugin-container">
        <Noclip />
      </div>

      <script src="static/plugins-loaded.js"></script>
    </>
  );
}
