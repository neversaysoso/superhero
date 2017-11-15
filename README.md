# thor

> We are superhero

## THOR-X 业务级组件库

使用
npm i thor-x --save

## 聊天组件 th-message

<th-message 
    :messageData="messageData" 
    :funcList="funclist" 
    @sendOut="senRequest"
    @galleryCall="gallery"
    @cameraCall="camera"
    @quickCall="quick">
</th-message>

参数：

messageData:聊天记录  
4种形式 type=1 右侧泡泡 type=2 左侧泡泡 type=3 消息提示 type=4 系统消息 
text html信息（支持html标签）

funcList：功能列表 （数组形式 可传["gallery","camera", "quick"]）

方法：

sendOut：点击发送时调用方法
galleryCall：点击相册时调用方法
cameraCall：点击拍照时调用方法
quickCall：点击快捷回复时调用方法