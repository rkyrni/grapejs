export const text = ({ attributesClass = "" }) => {
  return {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: true,
        attributes: { class: attributesClass },
        components: [
          {
            type: "text",
            content: "Hello world!",
            attributes: { class: "editable-text" },
          },
        ],
        style: { color: "red" },
        traits: [
          {
            type: "text", // Default type: text
            label: "Content",
            name: "content",
          },
          {
            type: "checkbox",
            label: "Bold",
            name: "bold",
          },
          {
            type: "color",
            label: "Color",
            name: "color",
          },
        ],
      },
      init() {
        this.on(
          "change:content change:bold change:color",
          this.handleTraitsChange
        );
      },
      handleTraitsChange() {
        const content = this.getTrait("content").get("value");
        const bold = this.getTrait("bold").get("value");
        const color = this.getTrait("color").get("value");

        // Update the child component (editable text)
        const textComponent = this.findType("text")[0];
        if (textComponent) {
          textComponent.addStyle({
            color: color,
            fontWeight: bold ? "bold" : "normal",
          });
          textComponent.set("content", content);
        }
      },
    },
    view: {
      onRender() {
        const textEl = this.el.querySelector(".editable-text");
        if (textEl) {
          textEl.setAttribute("contenteditable", "true");
          textEl.addEventListener("input", (e) => {
            const model = this.model.findType("text")[0];
            if (model) {
              const selection = window.getSelection();
              const range =
                selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
              const content = e.target.innerText;

              // Update model content without re-rendering
              //   model.set("content", content, { silent: true });

              // Restore cursor position
              if (range) {
                setTimeout(() => {
                  selection.removeAllRanges();
                  selection.addRange(range);
                }, 0);
              }
            }
          });
        }
      },
    },
  };
};
