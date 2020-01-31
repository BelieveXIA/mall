<template>
	<div class="home">
		<header class="g-header-container">
            <home-header :class="{'header-translate': isHeaderTransition}" ref="header"></home-header>
        </header>
        <me-scroll pullDown pullUp :data="recommends" @pull-down="pullToRefresh" @pull-up="pullToLoadMore" @scroll-end="scrollEnd" @scroll="scroll" @pull-down-transition-end="pullDownTransitionEnd" ref="scroll">
            <home-slider ref="slider"></home-slider>
            <home-nav></home-nav>
            <home-recommend @loaded="getRecommends" ref="recommend"></home-recommend>
        </me-scroll>
        <div class="g-backtop-container">
            <me-backtop :visible="isBackTopVisible" @backtop="backToTop"></me-backtop>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import HomeHeader from './header.vue';
    import HomeSlider from './slider.vue';
    import MeScroll from 'base/scroll/';
    import HomeNav from './nav.vue';
    import HomeRecommend from './recommend.vue';
    import MeBacktop from 'base/backtop';
    import {HEADER_TRANSITION_HEIGHT} from './config.js';

    export default{
        name: 'Home',
        components: {
            HomeHeader,
            HomeSlider,
            MeScroll,
            HomeNav,
            HomeRecommend,
            MeBacktop
        },
        data() {
            return {
                recommends: [],
                isBackTopVisible: false,
                isHeaderTransition: false
            };
        },
        methods: {
            updateScroll() {

            },
            getRecommends(recommends) {
                this.recommends = recommends;
            },
            pullToRefresh(end) {
                this.$refs.slider.update().then(end);
                // setTimeout(() => {
                //     console.log('下拉刷新');
                //     end();
                // },1000);
            },
            pullToLoadMore(end) {
                this.$refs.recommend.update().then(end).catch(err => {
                    if (err) {
                        console.log(err);
                    }
                    end();
                });
                // setTimeout(() => {
                //     console.log('上拉加载');
                // },1000);
            },
            scrollEnd(translate, scroll, pulling) {
                if (!pulling) {
                    this.changeHeaderStatus(translate);
                }
                this.isBackTopVisible = translate < 0 && -translate > scroll.height;
            },
            scroll(translate) {
                this.changeHeaderStatus(translate);
            },
            pullDownTransitionEnd() {
                this.$refs.header.show();
            },
            backToTop() {
                this.$refs.scroll && this.$refs.scroll.scrollToTop();
            },
            changeHeaderStatus(translate) {
                if (translate > 0) {
                    this.$refs.header.hide();
                    return;
                }
                this.$refs.header.show();
                this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT;
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";

.home{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: $bgc-theme;
}
</style>
