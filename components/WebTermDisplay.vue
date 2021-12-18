<!--
    Web Terminal Interface

    Filename:  WebTermDisplay.vue
    By:  Matthew Evans
    See LICENSE.md for copyright information.

    Displays the HTML result of running a command.
-->

<template>
    <div class="term-display">
        <div v-html="display"></div>
        <div>&nbsp;</div>
    </div>
</template>

<script>
export default {
    name: 'WebTermDisplay',
    props: {
        display: String     //  HTML output
    }
}
</script>

<style lang="scss" scoped>
@import '../css/WebTerm.scss';

.term-display {
    display: flex;
    flex-direction: column;
    @include termstyle();
}

.term-display::v-deep { @include termstyle(); }

</style>
