THOR雷神UI 
===

We are SuperHero!

## THOR-X

## DEMO

http://ly.apcan.cn

### 使用

1.安装组件库

```bash
npm i thor-x --save
```

2.配置main.js

```javascript
import thor from 'thor-x'
import 'thor-x/dist/index.css'
Vue.use(thor)
```

注：也可以不在main.js里引入，在具体页面按需引入相关组件

## 聊天组件 th-message

```html
<th-message 
  ref="messgebox"
  :useText="true"
  :usePulldown="true"
  :pulldownConfig="pulldownconfig"
  :topPadding="120"
  :messageData="messageData" 
  :funcList="funclist" 
  :bigBtn="bigbtn"
  :showInput="showinput"
  :selfFace="selfface" 
  :otherFace="otherface"
  :showEmoticon="true"
  @sendOut="senRequest"
  @galleryCall="gallery"
  @cameraCall="camera"
  @quickCall="quick"
  @bigBtnCall="btncall"
  @faceClick="faceclick"
  @msgClick="msgclick"
  @pulldownCall="pulldowncall">
</th-message>
```

### API

#### Props

|Prop|Required|Default Value|Description|
|:-|:-|:-|:-|
|`useText`|`false`|`false`|控制是否开启`textarea`输入提交模式|
|`topPadding`|`false`|`0`|顶部间距。若顶部有其他功能块，可以设置顶部间距，数值为该功能块高度，只支持正整数.|
|`messageData`|`true`|`{type:type,text:text,isimg:isimg}`|聊天记录。type: 4种形式 type=1 右侧泡泡 type=2 左侧泡泡 type=3 消息提示 type=4 系统消息;text: html信息（支持html标签）;isimg: 是否为图片信息 true/false，默认false.|
|`funcList`|`true`||功能列表。数组形式 可传["gallery","camera", "quick"]，传几个显示几个|
|`bigBtn`|`false`|`string`|底部显示大按钮。应用场景比如前往评价之类的，必须传string类型，传入文字既按钮显示文字|
|`showInput`|`false`|`true`|是否显示聊天输入框。默认true，传入false则输入框不显示|
|`selfFace`|`false`|`url`|发送方的头像，默认显示默认图|
|`otherFace`|`false`|`url`|接收方的头像，默认显示默认图|
|`usePulldown`|`false`|`false`|配置是否开启下拉刷新功能|
|`pulldownConfig`|`false`|`{default: html,up: html,down: html,loading: html}`|下拉刷新配置。可配置4个参数：default/up/down/loading，支持传入html|
|`showEmoticon`|`true`|`false`|配置是否使用表情包|
|`fromTop`|`false`|`false`|配置初始置顶|
|`textTitle`|`false`|`false`|text模式时标题显示字段|

#### Events

|Event|Required|Default Value|Description|
|:-|:-|:-|:-|
|`pulldownCall`|`false`|`function`|下拉刷新后调用的方法，发起请求更新数据，更新数据完毕调用resetpulldown方法|
|`sendOut`|`false`||点击发送时调用方法|
|`galleryCall`|`false`||点击相册时调用方法，funcList参数里有"gallery"时生效|
|`cameraCall`|`false`||点击拍照时调用方法，同上|
|`quickCall`|`false`||点击快捷回复时调用方法，同上|
|`bigBtnCall`|`false`||点击底部大按钮时调用方法，传bigBtn参数时生效，绑定按钮点击方法|
|`faceClick`|`false`||点击头像时触发事件|
|`msgClick`|`false`||点击信息时触发事件|

#### Methods

|Method|Required|Description|
|:-|:-|:-|
|`resetpulldown`|`false`|下拉刷新完成后重置状态|
|`messageReset`|`false`|手动刷新聊天容器（传输图片时使用）|
|`scrollToTop`|`false`|手动置顶|

## 人物信息组件 th-doctortitlebar

```html
<th-doctortitlebar
  canopen
  :name="doctorbar.name"
  :position="doctorbar.position"
  :star="doctorbar.star"
  :btn="doctorbar.btn"
  :btnType="doctorbar.btntype"
  :btnCanClick="doctorbar.btncanlick"
  :headImg="otherface"
  :clock="`48小时后截止`"
  :isopen="true"
  @btnCall="topbtncall"
  @headClick="headclick">
  自定义内容
</th-doctortitlebar>
```
### API

#### Props

|Prop|Required|Default Value|Description|
|:-|:-|:-|:-|
|`canopen`|`false`|`false`|是否显示展开收起按钮|
|`openConfig`|`false`|`{open: "展开",close: "收起"}`|展开功能参数配置。可配置2个参数：open/close|
|`name`|`true`||姓名字段|
|`position`|`true`||职称字段|
|`star`|`false`|`number`|星级字段（1~5）|
|`btn`|`false`|`false`|是否显示右侧按钮，默认不显示，传布尔值|
|`btnType`|`false`|`string`|按钮类型，可选值为 default,primary,warn|
|`btnCanClick`|`false`|`true`|按钮是否能点击，默认可以点击|
|`headImg`|`false`|`url`|头像图片，默认显示默认图|
|`clock`|`false`||时钟字段，内容自定义|
|`isopen`|`false`||控制展开收起面板默认打开或关闭|

#### Events

|Event|Required|Default Value|Description|
|:-|:-|:-|:-|
|`btnCall`|`false`|`function`|点击按钮时调用方法|
|`headClick`|`false`||点击头像调用方法|

## 弹出层 th-dialog

```html         
<th-dialog 
  :isShow.sync="showdialog" 
  :showFrom="dialogfrom" 
  :closeOnClickshadow="true" 
  @onHide="hidedialog">
</th-dialog>
```
### API

#### Props

|Prop|Required|Default Value|Description|
|:-|:-|:-|:-|
|`isShow`|`true`|`true`|控制是否显示|
|`showFrom`|`false`|`bottom`|控制出现方式:top/bottom|
|`closeOnClickshadow`|`false`|`false`|控制点击背景黑色是否关闭|

### Events

|Event|Required|Default Value|Description|
|:-|:-|:-|:-|
|`onHide`|`false`|`function`|关闭时调用的方法|

## 文本滚动 th-marquee

```html         
<div style="width: 100px;">
  <th-marquee 
    content="333333333"
    speed="middle">
  </th-marquee>
</div>
```
### API

#### Props

|Prop|Required|Default Value|Description|
|:-|:-|:-|:-|
|`content`|`false`|`暂无内容`|显示内容|
|`speed`|`false`|`middle`|控制滚动速度:`quick`/`middle`/`slow`|

说明：需要一个外部容器限制宽度，才能实现滚动效果。当宽度大于实际内容，不滚动。