/*
 * Web Terminal Interface
 *
 * Filename:  TermProcessor.mjs
 * By:  Matthew Evans
 * See LICENSE.md for copyright information.
 * 
 * Object to render various terminal command results.
 * The WebTerm VueJS app calls this.
 * It's basically used to render the website.
 */

import { Command } from './Command.mjs'

class TermProcessor {

    /*
     * Fill the commands array with default commands.
     * Each command is created in its own scope.
     * 
     * Additional commands can be added with the addModule(obj) member.
     * 
     * Format of the command object:
     * command - input text for command, all lowercase.
     * description - Description of command, displayed in help.
     * exec - Lambda expression that the command will execute.
     *        This should have the cmd array passed to it.
     */
    constructor() {
        this.commands = []

        /*
         * motd command
         */
        {let temp = new Object()
        temp.command = "motd"
        temp.description = "Message of the day"
        temp.exec = (cmd) => {
            return this.render.motd()
        }
        this.commands.push(temp)}

        /*
         * about command
         */
        {let temp = new Object()
        temp.command = "about"
        temp.description = "Display website information"
        temp.exec = (cmd) => {
            return this.render.about()
        }
        this.commands.push(temp)}

        /*
         * jabbascript command
         */
        {let temp = new Object()
        temp.command = "jabbascript"
        temp.description = "Modern development"
        temp.exec = (cmd) => {
            return this.render.jabbascript()
        }
        this.commands.push(temp)}

        /*
         * extra command
         */
        /*{let temp = new Object()
        temp.command = ""
        temp.description = ""
        temp.function = (cmd) => {
            return cmd
        }
        this.commands.push(temp)}*/
    }

    /*
     * Process a command.
     * Returns a string with the result.
     */
    processCommand(cmd) {
        if(String(cmd[0]).toLowerCase() === "help") return this.render.help(this.commands)
        const res = this.commands.find(elm => elm.command === String(cmd[0]).toLowerCase())
        if(res === undefined)
            return "<span style=\"font-weight: bold;\">command not found:</span> " + cmd[0]
        return res.exec(cmd.splice(1, cmd.length))
    }

    /*
     * Load a command module into the command array.
     * Must be an instance of the Command abstract class.
     */
    addModule(obj) {
        if(!(obj instanceof Command))
            throw new Error("'addModule()' Error: Not an instance of Command.")
        if(obj.command === "error" || obj.description === "error")
            throw new Error("'addModule()' Error: Command or description parameters not defined.")
        for(let i = 0; i < this.commands.length; i++) {
            if(this.commands[i].command === obj.command)
                throw new Error(`'addModule()' Error: Command '${obj.command}' already exists.`)
        }
        this.commands.push(obj)
    }

    /*
     * Return reference to a loaded module.
     * Search by its command name.
     */
    getModule(cmd) {
        const res = this.commands.find(elm => elm.command === cmd)
        if(res === undefined)
            throw new Error(`'getModule()' Error: Module '${cmd}' not found!`)
        return res
    }

    /* ************************************** */
    /* ********** RENDER FUNCTIONS ********** */
    /* ************************************** */

    //  Used to render the various command results.
    //  These should all return a string.

    render = {
        /*
         * help render function
         */
        help(commands) {
            var help = "<table style=\"border: 0px;\">"
            help += "<tr><th style=\"text-align: left;\">Command</th>"
            help += "<th>&nbsp;&nbsp;&nbsp;</th><th>Description</th></tr>"
            for(let i = 0; i < commands.length; i++) {
                help += "<tr>"
                help += "<td><span style=\"font-weight: bold;\">" + commands[i].command + "</span></td>"
                help += "<td>&nbsp;&nbsp;&nbsp;</td>"
                help += "<td>" + commands[i].description + "</td>"
                help += "</tr>"
            }
            help += "<tr><td><span style=\"font-weight: bold;\">clear</span></td>"
            help += "<td>&nbsp;&nbsp;&nbsp;</td>"
            help += "<td>Clear the screen</td></tr></table>"
            return help
        },

        /*
         * motd render function
         */
        motd() {
            return `
            <h3>Welcome to my website!</h3>
            <span style=\"display: flex; flex-direction: row\">
                <span>
                    <img style=\"border-radius: 50%; width: 160px;\" src=\"assets/img/me.png\"/>
                </span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span style=\"display: flex; flex-direction: column; line-height: 2;\">
                    Matthew Evans
                    <br/>
                    <a href=\"mailto:contact@wtfsystems.net\">contact@wtfsystems.net</a>
                    <br/>
                    <a href=\"https://github.com/wtfsystems\">GitHub</a>
                </span>
            </span>
            <br/><br/>
            This site emulates a basic terminal.  Type a command below and press enter.<br/>
            For a list of available commands, enter <span style=\"font-weight: bold;\">help</span>
            `
        },

        /*
         * about render funciton
         */
        about() {
            return `
            <span style=\"font-weight: bold;\">Created with:</span><br/><br/>
            <span>
                <a href=\"https://vuejs.org\"><img src=\"assets/img/512px-Vue.js_Logo_2.svg.png\" style=\"max-height: 65px;\"/></a>
                <a href=\"https://prismjs.com\"><img src=\"assets/img/prism.svg\" style=\"max-height: 65px;\"/></a>
                <a href=\"https://jekyllrb.com\"><img src=\"assets/img/jekyll-logo-dark-transparent.png\" style=\"max-height: 65px;\"/></a>
                <a href=\"https://pages.github.com\"><img src=\"assets/img/octocat.png\" style=\"max-height: 65px;\"/></a>
                <br/>
                <a href=\"https://axios-http.com/\"><img src=\"assets/img/axios.svg\" style=\"max-height: 50px;\"/></a>
                &nbsp;
                <a href=\"http://showdownjs.com/\"><img src=\"assets/img/showdown.png\" style=\"max-height: 40px;\"/></a>
            </span>
            <br/><br/>
            <table style=\"border: 0px;\">
                <tr>
                <td><span style=\"font-weight: bold;\">Boilerplate:</span></td>
                <td><a href=\"https://github.com/Splode/jekyll-vue-template\">jekyll-vue-template</a></td>
                </tr>
                <tr>
                <td><span style=\"font-weight: bold;\">Source code:</span></td>
                <td><a href=\"https://github.com/wtfsystems/wtfsystems.github.io\">GitHub</a></td>
                </tr>
                <tr>
                <td><span style=\"font-weight: bold;\">License:</span></td>
                <td><a href=\"https://github.com/wtfsystems/wtfsystems.github.io/blob/master/LICENSE.md\">MIT</a></td>
                </tr>
            </table>
            `
        },

        /*
         * jabbascript render function
         */
        jabbascript() {
            return `
            <a href=\"https://devhumor.com/media/bloated-jabbascript-frameworks\">
            <img style=\"width: 90vw; max-width: 420px;\" src=\"assets/img/bloated-jabba.jpg\"/>
            </a>
            `
        }
    }
}

export default new TermProcessor()
