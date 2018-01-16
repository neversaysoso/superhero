<template>
  <div class="th-doctitlebar" id="th-doctitlebar">
    <img class="th-headimg" :src="headImg||doc" @click="headclick"/>
    <div>
      <div class="flexbox" :class="{nostar:!star}">
        <div class="th-name">{{name}} <span v-if="clock" class="th-position">{{position}}</span></div>
        <div v-if="!clock" class="th-position">{{position}}</div>
        <div v-if="star" class="th-stars">
          <i v-for="i in star" class="icon-star"></i>
        </div>
        <div v-if="clock" class="th-clock">
          <i class="icon-clock"></i>  <span v-html="clock"></span>
        </div>
      </div>
      <x-button v-if="!!btn" class="th-btn" mini :type="btnType||'primary'" :disabled="!btnCanClick" @click.native="btnclick">{{btn}}</x-button>
      <div class="th-open" v-if="canopen==''" @click="open=!open">
        {{`${open?opentext.close:opentext.open}`}}
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
  props: {
    name: {
      type: String
    },
    position: {
      type: String
    },
    star: {
      type: Number
    },
    btn: {
      type: String
    },
    canopen: {
      type: String
    },
    btnCanClick: {
      type: Boolean
    },
    btnType: {
      type: String
    },
    headImg: {
      type: String
    },
    openConfig: {
      type: Object
    },
    clock: {
      type: String
    },
    isopen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      doc: doc,
      open: this.isopen,
      opentext: {
        open: "展开",
        close: "收起"
      }
    };
  },
  mounted() {
    if (typeof this.openConfig != "undefined") {
      this.opentext = this.openConfig;
    }
  },
  methods: {
    btnclick() {
      this.$emit("btnCall");
    },
    headclick() {
      this.$emit("headClick");
    }
  }
};
</script>
