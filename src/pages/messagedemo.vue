<template>
  <div>
    <th-message 
      :topPadding="120"
      :messageData="messageData" 
      :funcList="funclist" 
      @sendOut="senRequest"
      @galleryCall="gallery"
      @cameraCall="camera"
      @quickCall="quick"
      @bigBtnCall="btncall">
    </th-message>
  </div>
</template>

<script>
import ThMessage from "./message";
import { messageData } from "@/assets/testdata.js";

export default {
  name: "",
  components: {
    ThMessage
  },
  data() {
    return {
      messageData: messageData,
      funclist: ["gallery", "camera", "quick"]
    };
  },
  mounted() {
    console.log();
  },
  methods: {
    senRequest(h) {
      console.log(h);
    },
    gallery() {
      console.warn("调起了自定义组件");
      this.messageData.push({
        type: 3,
        text: "调起了自定义相册组件"
      });
    },
    camera() {
      this.messageData.push({
        type: 3,
        text: "调起了自定义拍照组件"
      });
    },
    quick() {
      this.messageData.push({
        type: 4,
        text: "调起了自定义快捷回复组件调起了自定义快捷回复组件"
      });
    },
    btncall() {
      alert("前往评价了");
    }
  }
};
</script>
