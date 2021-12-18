/*
 * Web Terminal Interface
 *
 * Filename:  PrimeWheel.mjs
 * By:  Matthew Evans
 * See LICENSE.md for copyright information.
 * 
 * Prime Wheel Effect command.
 */

import termRenderer from './TermRenderer.mjs'
import { Command } from './Command.mjs'

export class PrimeWheel extends Command {
    /*
     * Initialize PrimeWheel.
     */
    constructor(options) {
        super()

        var options = options || {}

        if(options.canvas_name === undefined)
            throw new Error("PrimeWheel error: canvas_name undefined.")
        this.canvas_name = options.canvas_name
        if(options.font_color === undefined)
            throw new Error("PrimeWheel error: font_color undefined.")
        this.font_color = options.font_color
        if(options.font_size === undefined)
            throw new Error("PrimeWheel error: font_size undefined.")
        this.font_size = options.font_size
        if(options.font_face === undefined)
            throw new Error("PrimeWheel error: font_face undefined.")
        this.font_face = options.font_face

        this.scale = options.scale || 4
        this.interval = options.interval || 1
        this.use_random_offset = options.use_random_offset || true
        this.spam = options.spam || false
        this.debug = options.debug || false
        this.x_offset = options.x_offset || 0
        this.y_offset = options.y_offset || 0

        this.canvas = document.getElementById(this.canvas_name)
        this.ctx = this.canvas.getContext("2d")

        this.canvas.width = this.canvas.clientWidth * this.scale
        this.canvas.height = this.canvas.clientHeight * this.scale
        this.width = this.ctx.canvas.width
        this.height = this.ctx.canvas.height
        this.center_x = this.width / 2
        this.center_y = this.height / 2

        this.last_prime = 2
        this.animate_proc = false

        //  Regex tests for hex and rgb(a)/hsl(a)
        this.testHex = (str) => { return /^#[0-9a-f]{3,4}([0-9a-f]{3,4})?$/i.test(str) }
        this.testRgb = (str) => { return /^(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\)$/i.test(str) }
    }

    /*
     * Process command.
     */
    exec(args) {
        if(String(args[0]).toLowerCase() === "start") {
            if(this.prime_wheel_start()) return "Prime wheel started."
            return "Error starting prime wheel effect."
        }
        if(String(args[0]).toLowerCase() === "stop") {
            this.prime_wheel_stop()
            return "Prime wheel stopped."
        }
        if(String(args[0]).toLowerCase() === "reset") {
            this.prime_wheel_reset()
            return "Prime wheel reset."
        }
        if(String(args[0]).toLowerCase() === "color") {
            if(this.testHex(args[1]) || this.testRgb(args[1])) {
                this.font_color = args[1]
                return "Color set."
            }
            return "Incorrect color code."
        }
        return `
            <span style=\"font-weight: bold;\">Usage:</span> primewheel <em>start</em>|<em>stop</em>|<em>reset</em>|<em>color</em>
            <br/><br/>
            Inspired by: <a href="https://www.youtube.com/watch?v=EK32jo7i5LQ">3blue1brown</a>
        `
    }

    /*
     * Function to check if a number is prime.
     */
    is_prime(num) {
        for(var i = 2; i < num; i++) {
            if(num % i == 0) return false
        }
        return true
    }

    /*
     * Generate a random x,y offset for drawing the wheel.
     */
    set_offset() {
        this.x_offset = Math.floor(Math.random() * (this.center_x * 2 / 3) + 1)
        this.x_offset = this.x_offset * (Math.random() < 0.5 ? -1 : 1)
        this.y_offset = Math.floor(Math.random() * (this.center_y * 2 / 3) + 1)
        this.y_offset = this.y_offset * (Math.random() < 0.5 ? -1 : 1)
    }

    /*
     * Resets the effect.
     */
    prime_wheel_reset() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.last_prime = 2
        if(this.use_random_offset) this.set_offset()
        if(this.debug) console.log("Prime wheel reset")
    }

    /*
     * Start the prime wheel.
     */
    prime_wheel_start() {
        if(this.animate_proc !== false) this.prime_wheel_stop()
        else this.prime_wheel_reset()

        this.animate_proc = setInterval(() => {
            //  Prime number found, draw it using cartesian coordinates
            if(this.is_prime(this.last_prime)) {
                if(this.spam) console.log("Found prime: " + this.last_prime)
                this.ctx.font = this.font_size + " " + this.font_face
                this.ctx.fillStyle = this.font_color
                this.ctx.fillText(this.last_prime,
                    (this.center_x + this.x_offset) + (this.last_prime * Math.cos(this.last_prime)),
                    (this.center_y + this.y_offset) - (this.last_prime * Math.sin(this.last_prime))
                )
            }

            this.last_prime++  //  Increment counter to check for next prime

            //  Once the wheel reaches (1400 * scale) then reset
            if(this.last_prime > 1400 * this.scale) {
                if(this.debug) console.log("Auto resetting prime wheel effect")
                this.prime_wheel_reset()
            }
        }, this.interval)

        if(this.animate_proc === false) {
            if(this.debug) console.log("Error starting prime wheel effect")
            return false
        }
        if(this.debug) console.log("Prime wheel started")
        return true
    }

    /*
     * Stop the prime wheel.
     */
    prime_wheel_stop() {
        this.prime_wheel_reset()
        clearInterval(this.animate_proc)
        this.animate_proc = false
        if(this.debug) console.log("Prime wheel stopped")
    }

    /*
     * PrimeWheel parameters.
     */
    command = "primewheel"
    description = "Prime Wheel Effect"
}
