<template>
  <scroller lock-x height="175px" ref="faceScroll">
    <div class="facebox">
      <div v-for="item in facelist" class="faceitem">
        <emotion is-gif @click.native="faceclick(item)">{{item}}</emotion>
      </div>
      <div v-for="item in spacelist" class="faceitem">
        <div class="vux-emotion"></div>
      </div>
    </div>
  </scroller>  
</template>

<script>
import { Scroller, WechatEmotion as Emotion } from "vux";

export default {
  components: {
    Emotion,
    Scroller
  },
  data() {
    return {
      count: 0,
      spacelist: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      let w =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      this.count =
        parseInt((w - 20) / 34) -
        this.facelist.length % parseInt((w - 20) / 34);
      for (let i = 0; i < this.count; i++) {
        this.spacelist.push("");
      }
    });
  },
  methods: {
    faceclick(item) {
      this.$emit("itemClick", item);
    }
  },
  props: ["facelist"]
};
</script>