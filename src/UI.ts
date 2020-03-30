/** 工具类 */
import * as Utils from "./utils/Utils";
/** UI舞台，最顶级的层 展示所有UI组件 */
import { Stage } from "./core/Stage";
/** UI基础显示对象，一般不会直接使用，只作为类型推断 */
import { DisplayObject } from "./core/DisplayObject";
/** 心跳，需要在初始化完成后，启动心跳更新 */
import { shared as TickerShared } from "./core/Ticker";
/** 滤镜的基础类 */
import { Filter } from './core/Filter';
/**
 * 基础容器
 * 
 * 设置checkGroup后，进行分组。 分组后，可理解为复选框。
 * 
 * @example let container = new gui.Container();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestContainer
 */
import { Container } from "./display/Container";
/**
 * 滚动容器
 * 
 * @example let scrollingContainer = new gui.ScrollingContainer();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestRect
 */
import { ScrollingContainer } from "./display/ScrollingContainer";
/**
 * 图片
 * 
 * @example let image = new gui.Image();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestImage
 */
import { Image } from "./display/Image";
/**
 * 序列图动画
 * 
 * 支持使用texturepacker导出以及处理轴点
 * 
 * @example let spriteAnimated = new gui.SpriteAnimated();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestSpriteAnimated
 */
import { SpriteAnimated } from "./display/SpriteAnimated";
/**
 * 文本
 * 
 * 中文换行特殊处理 xxxx.style.breakWords = true;
 * 
 * 文本没有宽高，自适应
 * 
 * @example let label = new gui.Label();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestLabel
 */
import { Label } from "./display/Label";
/**
 * 文本输入
 * 
 * @example let textInput = new gui.TextInput(true|false);//单行或多行
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTextInput
 */
import { TextInput } from "./display/TextInput";
/**
 * 滑动条/进度条
 * 
 * @example let slider = new gui.Slider();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestSlider
 */
import { Slider } from "./display/Slider";
/**
 * 按钮
 * 
 * @example let button = new gui.Button();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestButton
 */
import { Button } from "./display/Button";

/**
 * 单选\复选框
 * 
 * 设置checkGroup后，进行分组。 分组后，可理解为复选框。
 * 
 * @example let checkBox = new gui.CheckBox();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestCheckBox
 */
import { CheckBox } from "./display/CheckBox";
/**
 * 绘制矩形或圆角矩形
 * 
 * @example let rect = new gui.Rect();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestRect
 */
import { Rect } from "./display/Rect";
/**
 * 绘制矩形或圆角矩形
 * 
 * @example let rect = new gui.Circle();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestCircle
 */
import { Circle } from "./display/Circle";
/**
 * 矢量绘制
 * 
 * @example let graphics = new gui.Graphics();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTimeLine
 */
import { Graphics } from "./display/Graphics";
/**
 * 跟随划线（鼠标或触摸按下时）
 * 
 * @example let graphics = new gui.FollowLine();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTimeLine
 */
import { FollowLine } from "./display/FollowLine";
/**
 * 连线组件
 * 
 * 
 * @example let connectLine = new gui.ConnectLine();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestConnectLine
 */
import { ConnectLine } from "./display/ConnectLine";
/**
 * 音频播放组件
 * 
 * @example let sound = new gui.Sound();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestSound
 */
import { Sound } from "./display/Sound";
/**
 * 完整的缓动曲线列表
 * 
 * @example gui.Easing.Linear.None;
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTween
 */
import { Easing } from "./tween/Easing";
/**
 * 缓动动画
 * 
 * @example let tween = new gui.Tween(myObject).to({width:'300px'}, 2000).start()
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTween
 */
import { Tween } from "./tween/Tween";
/**
 * 基于帧的时间轴控制类
 * 
 * @example let timeline = new gui.Timeline();
 * 
 * @namespace gui
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTimeLine
 */
import { Timeline } from "./tween/Timeline";

/**
 * 事件绑定类，非继承于inputbase的组件是没有任何交互事件，需单独绑定
 */
import * as Interaction from "./interaction/Index";
/**
 * 事件名
 */
import * as Event from "./event/Index";

/**
 * 枚举
 */
import * as Enum from './enum/Index';

import { Scheduler } from './core/Scheduler';

export declare type Application = PIXI.Application;

/** 请不要在编写UI组件内部使用本类 */
export {
    Filter, Utils, Stage, Container, ScrollingContainer, Slider,
    Label, TextInput, Button, CheckBox, Rect, Circle, Graphics, FollowLine, ConnectLine, Interaction,
    DisplayObject, TickerShared, Tween, Timeline, Easing, Image, SpriteAnimated, Sound, Event, Enum, Scheduler
};