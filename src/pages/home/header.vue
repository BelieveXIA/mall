<template>
    <me-navbar class='header' title="" v-show="visible">
        <i class="iconfont icon-saoyisao" slot='left'></i>
        <me-search-box slot="center" placeholder="春节过年送大礼"></me-search-box>
        <i class="iconfont icon-xiaoxi" slot='right'></i>
    </me-navbar>
</template>
<script>
    import MeNavbar from 'base/navbar/';
    import MeSearchBox from 'base/searchbox';

    export default{
        name: 'HomeHeader',
        components: {
            MeNavbar,
            MeSearchBox
        },
        data() {
            return {
                visible: true
            };
        },
        methods: {
            show() {
                this.visible = true;
            },
            hide() {
                this.visible = false;
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";

.header{
    &.mine-navbar{
        background-color: transparent;
        transition: background-color 0.5s;
    }
    &.header-translate {
        background-color: $header-bgc-translucent;
    }
    .iconfont{
        color: $icon-color-default;
        font-size: $icon-font-size;
    }
}
</style>
