<template>
  <div class="th-doctitlebar" id="th-doctitlebar">
    <img class="th-headimg" :src="doc" />
    <div>
      <div class="th-name">{{name}}</div>
      <div class="th-position">{{position}}</div>
      <div class="th-stars">
        <i v-for="i in star" class="icon-star"></i>
      </div>
      <x-button v-if="!!btn" class="th-btn" mini :type="btnType||'primary'" :disabled="!btnCanClick" @click.native="btnclick">{{btn}}</x-button>
      <div class="th-open" v-if="canopen==''" @click="open=!open">
        {{`${open?'收起':'展开'}`}}
        <i class="icon-down" :class="{'isopen':open}"></i>
      </div>
    </div>
    <div class="th-openbox" v-show="open">
      <scroller lock-x height="140px" :bounce="false" :scrollbarY="true">
        <div>
          <slot></slot>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import "@/assets/sass/components/doctitlebar.scss";
import doc from "@/assets/images/doc.png";
import { Scroller, XButton } from "vux";

export default {
  name: "ThDoctortitlebar",
  components: {
    Scroller,
    XButton
  },
  props: [
    "name",
    "position",
    "star",
    "btn",
    "canopen",
    "btnCanClick",
    "btnType"
  ],
  data() {
    return {
      doc: doc,
      open: false
    };
  },
  mounted() {
    console.log();
  },
  methods: {
    btnclick() {
      this.$emit("btnCall");
    }
  }
};
</script>
