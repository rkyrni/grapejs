import React, { useEffect } from "react";
import grapesjs from "grapesjs";

const TextSection = () => {
  useEffect(() => {
    const editor = grapesjs.init({
      container: "#text-section",
      fromElement: true,
      width: "auto",
      height: "100vh",
      storageManager: false,
      plugins: [],
      pluginsOpts: {},
    });

    editor.BlockManager.add("text-section-block", {
      label: "Text Section",
      category: "Basic",
      content: {
        type: "text-section-component",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    });

    editor.Components.addType("text-section-component", {
      model: {
        defaults: {
          tagName: "div",
          draggable: true,
          droppable: false,
          attributes: { class: "text-section-component" },
          style: { width: "100%", padding: "20px", backgroundColor: "#ffffff" },
          traits: [
            {
              type: "text",
              label: "Content",
              name: "content",
            },
            {
              type: "checkbox",
              label: "Draggable",
              name: "draggable",
            },
            {
              type: "color",
              label: "Background Color",
              name: "backgroundColor",
            },
          ],
        },
        init() {
          this.on("change:content change:draggable change:backgroundColor", () => {
            const content = this.getTrait("content").value ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
            const draggable = this.getTrait("draggable").value;
            const backgroundColor = this.getTrait("backgroundColor").value || "#ffffff";

            this.setAttributes({
              style: { backgroundColor: backgroundColor },
            });

            if (draggable) {
              this.setDraggable(true);
            } else {
              this.setDraggable(false);
            }

            this.components(content);
          });
        },
      },
    });

    return () => {
      editor.destroy();
    };
  }, []);

  return <div id="text-section"></div>;
};

export default TextSection;
