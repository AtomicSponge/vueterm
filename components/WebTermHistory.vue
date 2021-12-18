<!--
    Web Terminal Interface

    Filename:  WebTermHistory.vue
    By:  Matthew Evans
    See LICENSE.md for copyright information.

    Displays the command history.
-->

<template>
    <div class="term-history" v-if="history">
         <WebTermInfo v-bind:userip="userip"></WebTermInfo>
         <span><span class="prompt">$</span> {{ history }}</span>
         <span><br/></span>
    </div>
</template>

<script>
import WebTermInfo from './WebTermInfo'

export default {
    name: 'WebTermHistory',
    components: {
        WebTermInfo
    },
    props: {
        history: String,     //  Previously ran command
        userip: String       //  User's IP address
    }
}
</script>

<style lang="scss" scoped>
@import '../css/WebTerm.scss';

.term-history {
    @include termstyle();
    display: flex;
    flex-direction: column;
}

.prompt { @include prompt(); }
</style>
