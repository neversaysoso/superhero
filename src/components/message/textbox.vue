<template>
  <div class="textbox">
    <textarea v-model="inputmodel"></textarea>
    <div class="btnbox">
      <x-button 
        class="textbtn"
        type="primary"  
        @click.native="changecount">
        完成
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
    }
  }
};
</script>

