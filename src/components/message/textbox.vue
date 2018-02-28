<template>
  <div class="textbox">
    <textarea ref="mytextarea" v-model="inputmodel" @focus="textFocus" @blur="textBlur"></textarea>
    <div class="btnbox">
      <x-button class="textbtn" type="primary" @click.native="changecount">
        发送
      </x-button>
    </div>
  </div>
</template>
<script>
import { XButton } from "vux";
export default {
  components: {
    XButton
  },
  data() {
    return {
      inputmodel: ""
    };
  },
  methods: {
    changecount() {
      if (this.inputmodel.trim() != "") {
        this.$emit("sendText", this.inputmodel);
        this.inputmodel = "";
      }
    },
    textFocus() {
      this.$emit("textFocus");
    },
    textBlur() {
      this.$emit("textBlur");
    },
    getFocus() {
      // setTimeout(() => {
      //   this.$refs.mytextarea.focus();
      // }, 1000);
    }
  }
};
</script>

