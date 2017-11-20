<template>
  <div class="th-dialog" :class="{'th-active':isAcitve,'th-fromtop':showFrom=='top'}" v-if="isShow">
    <div class="th-dialog-bk" @click="close"></div>
    <div class="th-dialog-dialogbox">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import "@/assets/sass/components/dialog.scss";
import { Scroller } from "vux";

export default {
  name: "ThDialog",
  components: {
    Scroller
  },
  props: ["isShow", "showFrom", "closeOnClickshadow"],
  watch: {
    isShow: function(d) {
      setTimeout(() => {
        this.isAcitve = d;
      });
    }
  },
  data() {
    return {
      isAcitve: false
    };
  },
  mounted() {
    console.log();
  },
  methods: {
    close() {
      if (this.closeOnClickshadow) {
        this.isAcitve = false;
        setTimeout(() => {
          this.$emit("onHide");
        }, 400);
      }
    }
  }
};
</script>
