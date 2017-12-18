<template>
  <div class="marquee-box">
    <div class="marquee-content" ref="out">
      <p :class="run?speed:''">
        <span ref="in">{{content}}</span>
        <span v-if="run">{{content}}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ThMarquee",
  data() {
    return {
      run: false,
      pWidth: ""
    };
  },
  props: {
    content: {
      default: "暂无内容",
      type: String
    },
    speed: {
      default: "middle",
      type: String
    }
  },
  mounted() {
    this.$nextTick(() => {
      let out = this.$refs.out.clientWidth;
      let _in = this.$refs.in.clientWidth;
      this.run = _in > out ? true : false;
    });
  }
};
</script>
<style scoped>
.marquee-box {
  height: 50px;
  line-height: 50px;
  color: #000;
  font-size: 24px;
  background-size: 24px 24px;
}
.marquee-content {
  overflow: hidden;
  width: 100%;
}
.marquee-content p {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  font-size: 0;
}
.marquee-content span {
  display: inline-block;
  white-space: nowrap;
  padding-right: 40px;
  font-size: 24px;
}
.quick {
  -webkit-animation: marquee 5s linear infinite;
  animation: marquee 5s linear infinite;
}
.middle {
  -webkit-animation: marquee 8s linear infinite;
  animation: marquee 8s linear infinite;
}
.slow {
  -webkit-animation: marquee 25s linear infinite;
  animation: marquee 25s linear infinite;
}
@-webkit-keyframes marquee {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(-50%, 0, 0);
  }
}
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>