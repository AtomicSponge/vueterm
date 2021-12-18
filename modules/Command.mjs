/*
 * Web Terminal Interface
 *
 * Filename:  Command.mjs
 * By:  Matthew Evans
 * See LICENSE.md for copyright information.
 * 
 * Command interface class.
 * Used to create a new command module to load into the TermCommands.
 */

export class Command {
    /*
     * Restrict creating instances of this class.
     */
    constructor() {
        if(this.constructor === Command) {
            throw new Error("Command class is abstract.")
        }
    }

    /*
     * Exec function to define what the command runs.
     * Override this.
     */
    exec(args) {
        throw new Error("Method 'exec()' must be implemented.")
    }

    /*
     * Command & description parameters.
     * These need to be changed in the extending class.
     */
    command = "error"
    description = "error"
}
