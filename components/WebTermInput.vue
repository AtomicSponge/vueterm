<!--
    Web Terminal Interface

    Filename:  WebTermInput.vue
    By:  Matthew Evans
    See LICENSE.md for copyright information.

    Input box for capturing commands.
-->

<template>
    <div id="terminal-input">
        <WebTermInfo :key="infokey" v-bind:userip="userip"></WebTermInfo>
        <span id="input-area">
            <span class="prompt">$</span>&nbsp;
            <form @submit="onSubmit">
            <input type="text" name="input-box" id="input-box" v-model="userinput" @keyup.up="historyUp" @keyup.down="historyDown" autofocus/>
            </form>
        </span>
    </div>
</template>

<script>
import WebTermInfo from './WebTermInfo'

export default {
    name: 'WebTermInput',
    components: {
        WebTermInfo
    },
    props: {
        userip: String     //  User's IP address
    },
    data() {
        return {
            userinput: '',      //  Store input from form
            infokey: 0,         //  Key for forcing info display update
            history: [],        //  Array of previously ran commands
            historyindex: -1    //  Index for browsing previous commands
        }
    },
    methods: {
        //  Run when the input form is submitted
        onSubmit(e) {
            e.preventDefault()
            if (!this.userinput) return  //  no input, don't process
            this.$emit('user-input', this.userinput)  //  send the input
            //  add the entered command to the start of the history
            this.history.unshift(this.userinput)
            //  only keep the most recent entered commands
            if(this.history.length > 20)
                this.history = this.history.slice(0, 19)
            this.historyindex = -1  //  reset history index
            this.userinput = ''  //  reset user input
            this.infokey += 1  //  force update info display
            if(this.infokey == Number.MAX_SAFE_INTEGER) this.infokey = 0
        },

        //  Up arrow event
        historyUp() {
            if(this.history.length > 0) {  //  Make sure there's history
                //  Iterate only if we're not at the end
                if(this.historyindex < this.history.length - 1) {
                    this.historyindex += 1
                    this.userinput = this.history[this.historyindex]
                }
            }
        },

        //  Down arrow event
        historyDown() {
            //  Iterate only if we're not at the start
            if(this.historyindex > 0) {
                this.historyindex -= 1
                this.userinput = this.history[this.historyindex]
            } else {
                //  Otherwise clear history
                this.historyindex = -1
                this.userinput = ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../css/WebTerm.scss';

#terminal-input {
    @include termstyle();
    display: flex;
    flex-direction: column;
}

#input-area {
    @include termstyle();
    display: flex;
    flex-direction: row;
}

.prompt { @include prompt(); }

input[type=text] {
    @include termstyle();
    width: 95vw;
    border: 0 none;
    padding: 0px;
    outline: none;
    caret-color: $term_cr_color;
}
</style>
