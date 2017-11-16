THOR雷神UI 
===

We are SuperHero!

## THOR-X 业务级组件库

### 使用

1.安装组件库

> 
    npm i thor-x --save

2.配置main.js

> 
    import thor from 'thor-x'
    import 'thor-x/dist/index.css'
    Vue.use(thor)

注：也可以不在main.js里引入，在具体页面按需引入相关组件

## 聊天组件 th-message

>
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

## Props

#### topPadding: 顶部间距

若顶部有其他功能块，可以设置顶部间距，数值为该功能块高度，只支持正整数

#### messageData: 聊天记录 

* type: 4种形式 type=1 右侧泡泡 type=2 左侧泡泡 type=3 消息提示 type=4 系统消息 
* text: html信息（支持html标签）
* headImg: 头像图片，若不传则显示默认图片

#### funcList：功能列表

数组形式 可传["gallery","camera", "quick"]，传几个显示几个

#### bigBtn: 底部显示大按钮

应用场景比如前往评价之类的，必须传string类型，传入文字既按钮显示文字

#### showInput: 是否显示聊天输入框

默认true，传入false则输入框不显示

## Events

#### sendOut

点击发送时调用方法

#### galleryCall

点击相册时调用方法，funcList参数里有"gallery"时生效

#### cameraCall

点击拍照时调用方法，同上

#### quickCall

点击快捷回复时调用方法，同上

#### bigBtnCall

点击底部大按钮时调用方法，传bigBtn参数时生效，绑定按钮点击方法


## 人物信息组件 th-doctortitlebar

>
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
    </th-doctortitlebar>

## Props

#### canopen: 是否显示展开收起按钮

是否显示展开收起按钮

#### name: 姓名字段

姓名字段

#### position: 职称字段

职称字段

#### star: 星级字段（1~5）

星级字段（1~5），传int

#### btn: 是否显示右侧按钮

是否显示右侧按钮，默认不显示，传布尔值

#### btnType: 按钮类型

按钮类型，可选值为 default,primary,warn，传字符串

#### btnCanClick: 按钮是否能点击

按钮是否能点击，默认可以点击，传布尔值

## Events

#### btnCall

点击按钮时调用方法