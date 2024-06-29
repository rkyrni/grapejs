export const twoColumn = (editor, { attributesClass }) => {
  return {
    model: {
      defaults: {
        droppable: false,
        draggable: true,
        attributes: { class: attributesClass },
        traits: [
          {
            type: "number",
            label: "Lebar Kolom Kiri (fr)",
            name: "leftWidth",
            changeProp: 1,
          },
          {
            type: "number",
            label: "Lebar Kolom Kanan (fr)",
            name: "rightWidth",
            changeProp: 1,
          },
          {
            type: "number",
            label: "Jarak antar Kolom (px)",
            name: "gap",
            changeProp: 1,
          },
        ],
      },

      init() {
        this.listenTo(
          this,
          "change:leftWidth change:rightWidth change:gap",
          this.handleTraitsChange
        );
      },

      handleTraitsChange() {
        const leftWidth = this.get("leftWidth") || "1";
        const rightWidth = this.get("rightWidth") || "2";
        const gap = this.get("gap") || "20px";

        // Terapkan perubahan pada tampilan komponen
        this.view.el.style.gridTemplateColumns = `${leftWidth}fr ${rightWidth}fr`;
        this.view.el.style.columnGap = `${gap}`;
      },
    },
    view: {
      onRender({ el }) {
        const leftWidth = this.model.get("leftWidth") || 1;
        const rightWidth = this.model.get("rightWidth") || 2;
        const gap = this.model.get("gap") || "20px";

        el.style.display = "grid";
        el.style.gridTemplateColumns = `${leftWidth}fr ${rightWidth}fr`;
        el.style.columnGap = `${gap}`;
        el.style.width = "100%";
        el.style.height = "100%";

        // Optional: Custom styling for columns
        const leftColumn = document.createElement("div");
        leftColumn.className = "left-column";
        leftColumn.textContent = "Kolom Kiri";
        el.appendChild(leftColumn);

        const rightColumn = document.createElement("div");
        rightColumn.className = "right-column";
        rightColumn.textContent = "Kolom Kanan";
        el.appendChild(rightColumn);

        leftColumn.style.backgroundColor = "#f0f0f0";
        leftColumn.style.padding = "10px";

        rightColumn.style.backgroundColor = "#e0e0e0";
        rightColumn.style.padding = "10px";

        editor.on("component:update", (component) => {
          const target = component.target;
          if (target === leftColumn || target === rightColumn) {
            const newComponentType = target.getAttribute("text");
            if (newComponentType) {
              editor.DomComponents.addComponent({ type: newComponentType });
            }
          }
        });

        el.setAttribute("contenteditable", "true");
      },
    },
  };
};
