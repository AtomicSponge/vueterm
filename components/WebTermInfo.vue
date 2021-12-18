<!--
    Web Terminal Interface

    Filename:  WebTermInfo.vue
    By:  Matthew Evans
    See LICENSE.md for copyright information.

    Info bar above terminal input.
-->

<template>
    <div class="term-info">
         <span class="time">{{ currentTime }}</span><span class="user">{{ userip }}</span><span class="site"><a href="https://www.wtfsystems.net" style="color: inherit; text-decoration: none;">www.wtfsystems.net</a></span>
    </div>
</template>

<script>
export default {
    name: 'WebTermInfo',
    props: {
        userip: String     //  User's IP address
    },
    computed: {
        //  Return current time in 24hr HH:MM:SS format
        currentTime() {
            const options = {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
            return new Date().toLocaleTimeString("en-US", options)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../css/WebTerm.scss';

.term-info {
    @include termstyle();
    display: inline;
    margin-bottom: 6px;
}

.time { @include infobar($time_bg_color, $time_fg_color); }

.user { @include infobar($user_bg_color, $user_fg_color); }

.site { @include infobar($site_bg_color, $site_fg_color); }
</style>
