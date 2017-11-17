<template>
  <div class="th-message" :style="{marginTop:`-${topPadding}px`}">
    <scroller class="messagebox" lock-x :height="bottomheight" ref="scrollerEvent">
      <div ref="scrollbox" :style="{paddingTop:`${topPadding}px`}">
        <div class="message-item" :class="{'people-item':i.type==1,'doc-item':i.type==2,'msg-item':i.type==3,'default-item':i.type==4}" v-for="i in messageData">
          <img class="headimg" :src="i.headImg||i.type==1?people:doc">
          <div class="mtext" v-html="i.text"></div>
        </div>
        <x-button v-if="typeof bigBtn=='string'&&bigBtn!=''" class="pbtn" type="primary" @click.native="btnCall">{{bigBtn}}</x-button>
      </div>
    </scroller>
    <div ref="thMessageInput" class="inputbox" v-if="showInput!=false">
      <i class="icon-add" @click="openfunc"></i>
      <i class="icon-face" @click="openface"></i>
      <input class="messageinput" v-model="inputmodel" type="text" @focus="onfocus" @change="onfocus"/>
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
  props: ["topPadding", "messageData", "funcList", "bigBtn", "showInput"],
  components: {
    Scroller,
    XButton,
    facebox,
    funcbox
  },
  watch: {
    messageData: function() {
      this.$nextTick(() => {
        this.messageReset(
          this.faceShow || this.funcShow ? 275 : this.defaultresize
        );
      });
    },
    showInput: function(e) {
      if (!e) {
        this.defaultresize = 40;
        this.faceShow = false;
        this.funcShow = false;
      }
    }
  },
  data() {
    return {
      bottomheight: "-60",
      defaultresize: 100,
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
    if (this.showInput == false) {
      this.defaultresize = 40;
    }
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
      }, 100);
    });
  },
  methods: {
    onfocus() {
      this.faceShow = false;
      this.funcShow = false;
      this.messageReset();
      const input = this.$refs.thMessageInput;
      setTimeout(() => {
        // input.UpdateLayout()
        input.scrollIntoView(false);
      }, 400);
    },
    messageReset(h) {
      let mh = h || this.defaultresize;
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
          this.messageReset(
            this.faceShow || this.funcShow ? 275 : this.defaultresize
          );
          this.inputmodel = "";
          this.$emit("sendOut", html);
        });
      }
    },
    btnCall() {
      this.$emit("bigBtnCall");
    },
    openface() {
      this.funcShow = false;
      if (this.faceShow) {
        this.faceShow = false;
        this.messageReset();
      } else {
        this.faceShow = true;
        setTimeout(() => {
          this.messageReset(275);
          this.$nextTick(() => {
            this.$refs.facebox.$refs.faceScroll.reset({ top: 0 });
          });
        }, 400);
      }
    },
    faceItemClick(i) {
      this.inputmodel += `[${i}]`;
    },
    openfunc() {
      this.faceShow = false;
      if (this.funcShow) {
        this.funcShow = false;
        this.messageReset();
      } else {
        this.funcShow = true;
        setTimeout(() => {
          this.messageReset(275);
        }, 400);
      }
    }
  }
};
</script>
