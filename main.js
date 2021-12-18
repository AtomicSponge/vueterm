/*
 * Web Terminal Interface
 *
 * Filename:  main.js
 * By:  Matthew Evans
 * See LICENSE.md for copyright information.
 * 
 * Main file to set stuff up.
 */

/*
 * Import necessary libraries.
 */
import 'regenerator-runtime/runtime.js'
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import Prism from 'prismjs'

Prism.manual = true  //  Disable PrismJS's auto highlighting.

/*
 * Set up the command processor and its modules.
 */
import cmdProcessor from './modules/TermProcessor.mjs'
import termRenderer from './modules/TermRenderer.mjs'
import { PostRenderer } from './modules/PostRenderer.mjs'
import { PrimeWheel } from './modules/PrimeWheel.mjs'
import { SetColor } from './modules/SetColor.mjs'

/*
 * Set up the terminal app.
 */
cmdProcessor.addModule(new PostRenderer('api/posts.json'))
cmdProcessor.addModule(new PrimeWheel({ 
	canvas_name: 'termrenderer_canvas',
	font_color: '#ff4500', font_size: '32px', font_face: 'Arial',
	spam: true, debug: true
}))
cmdProcessor.addModule(new SetColor())

//  Load posts.
cmdProcessor.getModule('posts').getPosts()

//  Function to resize renderer on window resize.
export function resizeRenderer() {
	termRenderer.resizeToWindow()
}
document.body.setAttribute("onresize", "Term.resizeRenderer()")

/*
 * Set up the Vue app.
 */
import WebTerm from './WebTerm'

Vue.use(AsyncComputed)
Vue.component('WebTerm', WebTerm)

new Vue({
	el: '#app'
})
