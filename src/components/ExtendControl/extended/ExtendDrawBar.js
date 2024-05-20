

class ExtendDrawBar {

    constructor(opts) {
        const that = this;
        that.draw = opts.draw;
        that.buttons = opts.buttons;
        that.onAddOrig = opts.draw.onAdd;
        that.onRemoveOrig = opts.draw.onRemove;
    }

    onAdd(map) {
        const that = this;
        that.map = map;
        that.elContainer = that.onAddOrig(map)
        that.buttons.forEach(btn => {
            that.addButton(btn)
        })

        return that.elContainer;
    }

    onRemove(map) {
        const that = this;
        that.buttons.forEach(btn => {
            that.removeButton(btn)
        })

        that.onRemoveOrig(map)
    }

    addButton(opts) {
        const that = this;
        const elButton = document.createElement('button');
        elButton.className = 'mapbox-gl-draw_ctrl-draw-btn'
        if (opts.classes instanceof Array) {
            opts.classes.forEach(cls => {
                elButton.classList.add(cls)
            })
        }
        elButton.addEventListener(opts.on, opts.action);
        that.elContainer.appendChild(elButton);
        opts.elButton = elButton;
    }

    removeButton(opts) {
        opts.elButton.removeEventListener(opts.on, opts.action);
        opts.elButton.remove();
    }
}


export default ExtendDrawBar;
