/*
 * Web Terminal Interface
 *
 * Filename:  TermRenderer.mjs
 * By:  Matthew Evans
 * See LICENSE.md for copyright information.
 * 
 * Renderer canvas for commands to draw to.
 * WIP
 */

class TermRenderer {

    canvas_name = "termrenderer_canvas"

    /*
     * Set up the TermRenderer
     */
    constructor() {
        //  Append canvas css styling
        let style = document.createElement("style")
        style.innerHTML = `
            #${this.canvas_name} {
                pointer-events: none;
                position: fixed;
                display: block;
                background-color: rgba(0, 0, 0, 0);
                width: 100%;
                height: 100%;
                margin: 0 auto;
            }`
        document.body.appendChild(style)

        //  Prepend canvas html
        let canvas = document.createElement("canvas")
        canvas.setAttribute("id", this.canvas_name)
        canvas.setAttribute("width", window.innerWidth)
        canvas.setAttribute("height", window.innerHeight)
        document.body.prepend(canvas)

        this.renderFunc = () => {}
        this.renderProc = undefined
        //this.resizeToWindow()
    }

    setRenderer = (func) => {
        if(!(func instanceof Function)) throw new Error('Not a function!')
        this.renderFunc = func
    }

    start = () => {
        window.cancelAnimationFrame(this.renderProc)
        this.renderProc = window.requestAnimationFrame(this.renderFunc)
    }

    stop = () => {
        window.cancelAnimationFrame(this.renderProc)
        this.renderProc = undefined
    }

    get isRunning() {
        if(this.renderProc === undefined) return false
        return true
    }

    get draw() { return document.getElementById(this.canvas_name).getContext("2d") }

    get width() { return document.getElementById(this.canvas_name).width }

    get height() { return document.getElementById(this.canvas_name).height }

    /*
     * Resize the renderer to fit the window
     */
    resizeToWindow = () => {
        //document.getElementById(this.canvas_name).width = window.innerWidth
        //document.getElementById(this.canvas_name).height = window.innerHeight
    }
}

export default new TermRenderer()
