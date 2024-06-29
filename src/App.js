import "./App.css";
import grapesjs from "grapesjs";
import { useEffect } from "react";
import TextSection from "./components/textSection";
import { text } from "./components/text";
import { twoColumn } from "./components/twoColumn";

function App() {
  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      fromElement: true,
      width: "auto",
      height: "100vh",
      storageManager: false,
      plugins: [],
      pluginsOpts: {},
    });

    // Simpel Text
    editor.BlockManager.add("custom-block", {
      label: "Simpel Text",
      category: "Basic",
      content: {
        type: "simpel-text",
      },
    });

    editor.Components.addType(
      "simpel-text",
      text({ attributesClass: "simpel-text" })
    );

    // Two column
    editor.BlockManager.add("two-column-block", {
      label: "Two Column",
      category: "Layout",
      content: {
        type: "two-column-component",
        leftWidth: "1",
        rightWidth: "2",
        gap: "20px",
      },
    });

    editor.Components.addType(
      "two-column-component",
      twoColumn(editor, { attributesClass: "two-column-component" })
    );

    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div className="App">
      <div id="editor"></div>
    </div>
  );
}

export default App;
