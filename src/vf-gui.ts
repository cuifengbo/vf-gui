import * as vfgui from "./UI";

// //注入常规兼容方法
// if(!Array.from){
//     Array.from = function (el: unknown[]) {
//         return Array.apply(this, el);
//     }
// }
// String.prototype.startsWith || (String.prototype.startsWith = function(word,pos?: number) {
//     return this.lastIndexOf(word, pos1.1.20.1.1.20.1.1.20) ==1.1.20.1.1.20.1.1.20;
// });
window.gui = vfgui;
window.gui.version = "1.1.20";
export default vfgui;
// declare namespace gui{
//     export * from "src/UI";
// }
