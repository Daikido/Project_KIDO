# Project_KIDO
DAAN school project run by Dakido

## library documentation
### 元件模型
- 請求一個元件模型
``` js
var myComponent = new Component(COMPONENT_NAME);
```
- 元件載入完畢事件
``` js
myComponent.onload(function(component){ ... });
```
- 建造一個元件
``` js
var myComponentElement = myComponent.build(settings);
```
### 拖拉工具
- 註冊拖拉開始位置
``` js
Drag.start(ELEMENT, function(){
  // on drag
  return new DragData(DATA, DISPLAY_INFO);
}, function(){
  // on drop success
}, function(){
  // on drop failed
});
```
- 註冊拖拉結束位置
``` js
Drag.end(ELEMENT, function(data){
  // on drop
}, function(data){
  // on hover in
}, function(data){
  // on hover out
});
