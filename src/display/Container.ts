import {DisplayObject} from "../core/DisplayObject";

/**
 * 基础容器
 * 
 * 设置checkGroup后，进行分组。 分组后，可理解为复选框。
 * 
 * @example let container = new vf.gui.Container();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestContainer
 */
export class Container extends DisplayObject{
    public constructor(){
        super();
        this.isContainer = true;
    }

    /**
     * 确定指定显示对象是 DisplayObjectContainer 实例的子项或该实例本身。搜索包括整个显示列表（其中包括此 DisplayObjectContainer 实例）。
     * 孙项、曾孙项等，每项都返回 true。
     * @param child 要测试的子对象。
     * @returns 如果 child 对象是 DisplayObjectContainer 的子项或容器本身，则为 true；否则为 false。
     */
    public contains(child: DisplayObject){
        while (child) {
            if (child == this) {
                return true;
            }
            if(child.parent instanceof DisplayObject){
                child = child.parent;
            }
            return false;
            
        }
        return false;
    }

}