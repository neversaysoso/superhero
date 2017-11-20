<template>
  <div>
    <th-doctortitlebar
      canopen
      :name="doctorbar.name"
      :position="doctorbar.position"
      :star="doctorbar.star"
      :btn="doctorbar.btn"
      :btnType="doctorbar.btntype"
      :btnCanClick="doctorbar.btncanlick"
      @btnCall="topbtncall">
      自定义内容
      <div v-for="i in count">{{i}}</div>
    </th-doctortitlebar>
    <th-message 
      :topPadding="120"
      :messageData="messageData" 
      :funcList="funclist" 
      :bigBtn="bigbtn"
      :showInput="showinput"
      @sendOut="senRequest"
      @galleryCall="gallery"
      @cameraCall="camera"
      @quickCall="quick"
      @bigBtnCall="btncall">
    </th-message>
    <th-dialog :isShow.sync="showdialog" :show-from="dialogfrom" :closeOnClickshadow="false" @onHide="hidedialog">
    </th-dialog>
  </div>
</template>

<script>
import ThMessage from "./message";
import ThDoctortitlebar from "./doctortitlebar";
import ThDialog from "./dialog";

import { messageData } from "@/assets/testdata.js";

export default {
  name: "",
  components: {
    ThMessage,
    ThDoctortitlebar,
    ThDialog
  },
  data() {
    return {
      messageData: messageData,
      bigbtn: "",
      showinput: true,
      funclist: ["gallery", "camera", "quick"],
      doctorbar: {
        name: "李成才",
        position: "主治医师",
        star: 5,
        btn: "结束咨询",
        btncanlick: true,
        btntype: "primary"
      },
      count: 10,
      showdialog: false,
      dialogfrom: "bottom"
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

    btncall() {
      alert("前往评价了");
      this.doctorbar.btn = "已评价";
      this.doctorbar.btntype = "default";
    },
    topbtncall() {
      this.messageData.push({
        type: 4,
        text: "您已完成咨询，请前往评价"
      });
      this.bigbtn = "前往评价";
      this.showinput = false;
      this.doctorbar.btncanlick = false;
    },
    quick() {
      this.showdialog = true;
    },
    hidedialog() {
      this.showdialog = false;
    }
  }
};
</script>
