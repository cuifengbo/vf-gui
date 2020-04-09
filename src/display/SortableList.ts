// import {Container} from "./Container";
// import {DisplayObject} from "../core/DisplayObject";
// import * as tween from "./tween/index";

// /**
//  * UI 可以排序的容器
//  */
// export class SortableList extends Container{
//     public constructor(){
//         super();
//     }
//     /** 
//      * 是否按降序排序
//      * @private false
//      */
//     public desc = false;
//     /**
//      * 是否开启排序动画，默认不开启
//      * @default 0
//      */
//     public tweenTime = 0;
//     public tweenEase = tween.Easing.Sinusoidal.In;
//     public items: DisplayObject[] = [];
//     private _sortTimeout = -1;

//     /**
//      * 添加显示列表，通过参数函数进行排序
//      * @param UIObject UI显示对象   
//      * @param fnValue 前置条件
//      * @param fnThenBy 后置条件
//      */
//     public addChild(UIObject: DisplayObject,fnValue?: Function, fnThenBy?: Function){
//         super.addChild(UIObject);
//         if (this.items.indexOf(UIObject) === -1) {
//             this.items.push(UIObject);
//         }
//         if (fnValue)
//             UIObject.attach._sortListValue = fnValue;
    
//         if (fnThenBy)
//             UIObject.attach._sortListThenByValue = fnThenBy;
    
//         if (!UIObject.attach._sortListRnd)
//             UIObject.attach._sortListRnd = Math.random();  

//         this.sort();
//         return UIObject;
//     }
//     public removeChild(UIObject: DisplayObject) {
//         super.removeChild(UIObject);
//         const index = this.items.indexOf(UIObject);
//         if (index != -1) {
//             this.items.splice(index, 1);
//         }   
//         this.sort();
//     }

//     public sort(instant?: boolean) {
//         clearTimeout(this._sortTimeout);
    
//         if (instant) {
//             this._sort();
//             return;
//         }

//         this._sortTimeout = window.setTimeout( () => { this._sort(); }, 0);
//     }

//     _sort() {
//         const self = this;
//         const desc = this.desc;
//         let y = 0;
//         let alt = true;
    
//         this.items.sort( (a, b) => {
//             const aFnValue = a.attach._sortListValue as Function;
//             const bFnValue = b.attach._sortListValue as Function;
//             const aFnThenBy = a.attach._sortListThenByValue as Function;
//             const bFnThenBy = a.attach._sortListThenByValue as Function;
//             let res = aFnValue() < bFnValue() ? desc ? 1 : -1 :aFnValue() > bFnValue() ? desc ? -1 : 1 : 0;
    
//             if (res === 0 && aFnThenBy && bFnThenBy) {
//                 res = aFnThenBy() < bFnThenBy() ? desc ? 1 : -1 :aFnThenBy() > bFnThenBy() ? desc ? -1 : 1 : 0;
//             }
//             if (res === 0) {
//                 res = a.attach._sortListRnd > b.attach._sortListRnd ? 1 :
//                     a.attach._sortListRnd < b.attach._sortListRnd ? -1 : 0;
//             }
//             return res;
//         });
    
//         for (let i = 0; i < this.items.length; i++) {
//             const item = this.items[i];
    
//             alt = !alt;
    
//             if (this.tweenTime > 0) {            
//                 tween.Tween.fromTo(item, { x: 0, y: y },this.tweenTime).easing(this.tweenEase).start();
//             }
//             else {
//                 item.x = 0;
//                 item.y = y;
//             }
//             y += item.height;
//             const itemany = item as any;//设置单独项目的背景或
//             if (typeof itemany.altering === "function")
//                 itemany.altering(alt);
//         }
    
//         //force it to update parents when sort animation is done (prevent scrolling container bug)
//         if (this.tweenTime > 0) {
//             setTimeout(function () {
//                 self.updatesettings(false, true);
//             }, this.tweenTime * 1000);
//         }
//     }
    
// }
