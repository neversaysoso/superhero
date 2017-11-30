<template>
  <div class="th-message" :style="{marginTop:`-${topPadding}px`}">
    <scroller class="messagebox" lock-x v-model="status" :height="bottomheight" :use-pulldown="usePulldown" ref="scrollerEvent" @click.native="hideBox" @on-pulldown-loading="pulldown" @on-scroll="onscroll">
      <div ref="scrollbox" :style="{paddingTop:`${topPadding}px`}">
        <div class="message-item" :class="{'people-item':i.type==1,'doc-item':i.type==2,'msg-item':i.type==3,'default-item':i.type==4,'isimg':i.isimg}" v-for="i in messageData">
          <img class="headimg" :src="i.headImg||i.type==1?selfFace||people:otherFace||doc" @click="e=>{faceclick(i,e)}">
          <div class="mtext" v-html="i.text" @click="e=>{msgclick(i,e)}"></div>
        </div>
        <x-button v-if="typeof bigBtn=='string'&&bigBtn!=''" class="pbtn" type="primary" @click.native="btnCall">{{bigBtn}}</x-button>
      </div>
      <div v-if="usePulldown" slot="pulldown" class="th-pulldown" style="position: absolute; top:100px;" :style="{top:`${parseInt(topPadding||0)-60}px`}">
        <span v-show="status.pulldownStatus === 'default'" v-html="`${pulldownConfig.default||'下拉刷新'}`"></span>
        <span v-show="status.pulldownStatus === 'down'" v-html="`${pulldownConfig.down||'下拉刷新'}`"></span>
        <span v-show="status.pulldownStatus === 'up'" v-html="`${pulldownConfig.up||'松开刷新'}`"></span>
        <span v-show="status.pulldownStatus === 'loading'" v-html="`${pulldownConfig.loading||'加载中...'}`"></span>
      </div>
    </scroller>
    <div ref="thMessageInput" class="inputbox" v-if="showInput!=false">
      <i class="icon-add" @click="openfunc"></i>
      <i class="icon-face" @click="openface"></i>
      <input ref="thMessageInputF" class="messageinput" v-model="inputmodel" type="text" @focus="onfocus" @blur="onblur"/>
      <x-button class="sendbtn" :type="inputmodel.trim()==''?'default':'primary'" :disabled="inputmodel.trim()==''" @click.native="changecount">发送</x-button>
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
  props: [
    "topPadding",
    "messageData",
    "funcList",
    "bigBtn",
    "showInput",
    "selfFace",
    "otherFace",
    "usePulldown",
    "pulldownConfig"
  ],
  components: {
    Scroller,
    XButton,
    facebox,
    funcbox
  },
  watch: {
    messageData: function() {
      this.$nextTick(() => {
        if (
          this.status.pulldownStatus == "default" ||
          this.status.pulldownStatus == "down"
        ) {
          this.messageReset();
        } else {
          this.$refs.scrollerEvent.reset();
        }
      });
    },
    showInput: function(e) {
      if (!e) {
        this.defaultresize = 40;
        this.$nextTick(() => {
          this.hideBox();
        });
      }
    },
    funcList: function() {
      this.funclist = this.funclist.filter(e => {
        return this.funcList.indexOf(e.type) != -1;
      });
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
      isFocus: false,
      status: {
        pulldownStatus: "default"
      },
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
    window.onresize = () => {
      let h2 =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      this.screamHeight = h2;
      this.$refs.scrollerEvent.getStyles();
      this.messageReset();
    };
    this.$nextTick(() => {
      const imgs = document.querySelectorAll(".mtext>img");
      if (imgs.length == 0) {
        this.messageReset();
      } else {
        imgs.forEach(e => {
          e.addEventListener(
            "load",
            () => {
              this.messageReset();
            },
            false
          );
        });
      }
      setTimeout(() => {
        this.messageReset();
      }, 1000);
    });
  },
  methods: {
    onfocus() {
      this.hideBox();
      const input = this.$refs.thMessageInput;
      setTimeout(() => {
        // input.UpdateLayout()
        const ua = navigator.userAgent,
          iOS11 = /OS 11_0_1|OS 11_0_2|OS 11_0_3|OS 11_1/.test(ua),
          micro = /MicroMessenger\/6.5.2/.test(ua),
          safari = /Safari/.test(ua),
          wxwork = /wxwork/.test(ua);
        if (iOS11 && (micro || safari) && !wxwork) {
          return;
        }
        input.scrollIntoView();
        setTimeout(() => {
          input.scrollIntoView();
          this.isFocus = true;
        }, 300);
      }, 300);
    },
    onblur() {
      this.isFocus = false;
    },
    onscroll() {
      if (this.isFocus) {
        this.$refs.thMessageInputF.blur();
        this.hideBox();
      }
    },
    messageReset() {
      let mh = this.faceShow || this.funcShow ? 275 : this.defaultresize;
      this.bottomheight = `-${mh - 40}`;
      if (this.$refs.scrollbox.clientHeight > this.screamHeight - mh) {
        this.$refs.scrollerEvent.reset({
          top: this.$refs.scrollbox.clientHeight - this.screamHeight + mh
        });
      }
    },
    changecount() {
      if (this.inputmodel.trim() != "") {
        let html = this.inputmodel;
        this.$nextTick(() => {
          this.messageReset();
          this.inputmodel = "";
          this.$emit("sendOut", html);
        });
      }
    },
    faceclick(d, e) {
      e.stopPropagation();
      this.$emit("faceClick", d);
    },
    msgclick(d, e) {
      e.stopPropagation();
      this.$emit("msgClick", d);
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
          this.messageReset();
          this.$nextTick(() => {
            this.$refs.facebox.$refs.faceScroll.reset({ top: 0 });
          });
        }, 300);
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
          this.messageReset();
        }, 300);
      }
    },
    hideBox() {
      this.funcShow = false;
      this.faceShow = false;
      this.messageReset();
    },
    pulldown() {
      this.$emit("pulldownCall");
    },
    resetpulldown() {
      this.status.pulldownStatus = "default";
    }
  }
};
</script>
