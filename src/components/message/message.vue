<template>
  <div>
    <scroller class="messagebox" lock-x :height="bottomheight" ref="scrollerEvent">
      <div ref="scrollbox">
        <div class="message-item" :class="{'people-item':i.type==1,'doc-item':i.type==2,'msg-item':i.type==3,'default-item':i.type==4}" v-for="i in messageData">
          <img class="headimg" :src="i.headImg||i.type==1?people:doc">
          <div class="mtext" v-html="i.text"></div>
        </div>
      </div>
    </scroller>
    <div class="inputbox">
      <i class="icon-add" @click="openfunc"></i>
      <i class="icon-face" @click="openface"></i>
      <input class="messageinput" id="th-message-input" v-model="inputmodel" type="text" @focus="onfocus" @change="onfocus"/>
      <x-button class="sendbtn" type="primary" @click.native="changecount">发送</x-button>
    </div>
    <facebox v-show="faceShow" ref="facebox" :facelist="facelist" @itemClick="faceItemClick"></facebox>
    <funcbox v-show="funcShow" :funclist="funclist"></funcbox>
  </div>
</template>

<script>
import "@/assets/sass/components/message.scss";
import doc from "@/assets/images/doc.png";
import people from "@/assets/images/people.png";
import quick from "@/assets/images/quick.png";
import camera from "@/assets/images/camera.png";
import gallery from "@/assets/images/gallery.png";

import { Scroller, XButton } from "vux";
import { facelist } from "@/assets/testdata.js";

import facebox from "./facebox.vue";
import funcbox from "./funcbox.vue";

export default {
  name: "ThMessage",
  props: ["messageData", "funcList"],
  components: {
    Scroller,
    XButton,
    facebox,
    funcbox
  },
  watch: {
    messageData: function() {
      this.$nextTick(() => {
        this.messageReset(this.faceShow || this.funcShow ? 275 : 100);
      });
    }
  },
  data() {
    return {
      bottomheight: "-60",
      boxheight: "0px",
      scrollTop: 0,
      screamHeight: 0,
      count: 20,
      inputmodel: "",
      doc: doc,
      people: people,
      faceShow: false,
      facelist: facelist,
      funcShow: false,
      funclist: [
        {
          type: "gallery",
          text: "照片",
          img: gallery,
          click: () => {
            console.log("调用照片组件");
            this.$emit("galleryCall");
          }
        },
        {
          type: "camera",
          text: "拍摄",
          img: camera,
          click: () => {
            console.log("调用拍摄组件");
            this.$emit("cameraCall");
          }
        },
        {
          type: "quick",
          text: "快捷回复",
          img: quick,
          click: () => {
            console.log("调用快捷回复组件");
            this.$emit("quickCall");
          }
        }
      ]
    };
  },
  mounted() {
    let h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.screamHeight = h;
    this.funclist = this.funclist.filter(e => {
      return this.funcList.indexOf(e.type) != -1;
    });
    this.$nextTick(() => {
      this.messageReset();
      setTimeout(() => {
        this.messageReset();
      },100);
    });
  },
  methods: {
    onfocus() {
      this.faceShow = false;
      this.funcShow = false;
      this.messageReset();
      setTimeout(() => {
        // document.getElementById("th-message-input").scrollIntoViewIfNeeded();
        document.getElementById("th-message-input").scrollIntoView(true);
      }, 400);
    },
    messageReset(h) {
      let mh = h || 100;
      this.bottomheight = `-${mh - 40}`;
      if (this.$refs.scrollbox.clientHeight > this.screamHeight - mh) {
        this.$refs.scrollerEvent.reset({
          top: this.$refs.scrollbox.clientHeight - this.screamHeight + mh
        });
      }
    },
    replaceImg(word) {
      return word.replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, word => {
        let newWord = word.replace(/\[|\]/gi, "");
        let index = this.facelist.indexOf(newWord);
        return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`;
      });
    },
    changecount() {
      if (this.inputmodel.trim() != "") {
        let html = this.replaceImg(this.inputmodel);
        this.messageData.push({
          type: 1,
          text: html
        });
        this.$nextTick(() => {
          this.messageReset(this.faceShow || this.funcShow ? 275 : 100);
          this.inputmodel = "";
          this.$emit("sendOut", html);
        });
      }
    },
    openface() {
      this.funcShow = false;
      if (this.faceShow) {
        this.messageReset();
        this.faceShow = false;
      } else {
        this.messageReset(275);
        this.faceShow = true;
        this.$nextTick(() => {
          this.$refs.facebox.$refs.faceScroll.reset({ top: 0 });
        });
      }
    },
    faceItemClick(i) {
      this.inputmodel += `[${i}]`;
    },
    openfunc() {
      this.faceShow = false;
      if (this.funcShow) {
        this.messageReset();
        this.funcShow = false;
      } else {
        this.messageReset(275);
        this.funcShow = true;
      }
    }
  }
};
</script>
