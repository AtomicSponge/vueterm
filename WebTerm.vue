<!--
    Web Terminal Interface

    Filename:  WebTerm.vue
    By:  Matthew Evans
    See LICENSE.md for copyright information.

    Main Vue App component.
-->

<template>
    <div id="term-window">
        <WebTermOutput v-bind:output="output" v-bind:userip="getIP"></WebTermOutput>
        <WebTermInput @user-input="processInput" v-bind:userip="getIP"></WebTermInput>
        <span ref="bottom"></span>
    </div>
</template>

<script>
import axios from 'axios'

import WebTermOutput from './components/WebTermOutput'
import WebTermInput from './components/WebTermInput'

import cmdProcessor from './modules/TermProcessor.mjs'

export default {
    name: 'WebTerm',
    components: {
        WebTermOutput,
        WebTermInput
    },
    data() {
        return {
            output: {
                //  Data to send to Output component's props
                history: String,    //  Store command input
                display: String     //  Store HTML output
            }
        }
    },
    methods: {
        //  Get data from input component
        processInput(inData) {
            let data = new Object()
            let displayData = this.resolveCommand(inData)
            data.history = inData
            data.display = displayData
            this.output = data
            this.$nextTick(() => { this.$refs.bottom.scrollIntoView() })
        },

        //  Process the received command
        resolveCommand(cmd) {
            cmd = cmd.split(" ")
            if(String(cmd[0]).toLowerCase() === "clear") return "clear"  //  Special case for clearing console
            return cmdProcessor.processCommand(cmd)
        }
    },
    asyncComputed: {
        //  Get user's IP address
        async getIP() {
            try {
                const res = await axios.get("https://www.cloudflare.com/cdn-cgi/trace")
                const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
                if(res.data.match(ipRegex)[0] !== undefined) return res.data.match(ipRegex)[0]
            } catch(err) {
                return "127.0.0.1"
            }
            return "127.0.0.1"
        }
    },
    //  Display on page load
    mounted: function() {
        let data = new Object()
        data.history = null
        data.display = cmdProcessor.processCommand(["motd"])
        this.output = data
    }
}
</script>

<style lang="scss" scoped>
@import './css/WebTerm.scss';

#term-window {
    @include termstyle();
    display: flex;
    flex-direction: column;
    width: 99vw;
    height: 100vh;
    padding: 6px;
}

</style>
