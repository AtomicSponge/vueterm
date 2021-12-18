<!--
    Web Terminal Interface

    Filename:  WebTermOutput.vue
    By:  Matthew Evans
    See LICENSE.md for copyright information.

    Output component for storing history/dispay pairs.
-->

<template>
    <div class="term-output">
        <template v-for="item in outputHistory">
            <WebTermHistory :key="item.history" v-bind:history="item.history" v-bind:userip="userip"></WebTermHistory>
            <WebTermDisplay :key="item.display" v-bind:display="item.display"></WebTermDisplay>
        </template>
    </div>
</template>

<script>
import WebTermHistory from './WebTermHistory'
import WebTermDisplay from './WebTermDisplay'

export default {
    name: 'WebTermOutput',
    components: {
        WebTermHistory,
        WebTermDisplay
    },
    props: {
        output: {
            history: String,    //  Receive command history
            display: String     //  Receive display HTML
        },
        userip: String          //  User's IP address
    },
    data() {
        return {
            outputHistory: []   //  Array to store each output display
        }
    },
    watch: {
        //  Wait for display data and add to the history array
        output: function(newValue) {
            if(newValue.display === "clear") {
                this.outputHistory = []
                return
            }
            this.outputHistory.push(newValue)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../css/WebTerm.scss';

.term-output { @include termstyle(); }

</style>
