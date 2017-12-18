import ThMarquee from './marquee.vue';

ThMarquee.install = function (Vue) {
  Vue.component(ThMarquee.name, ThMarquee);
};

export default ThMarquee;
