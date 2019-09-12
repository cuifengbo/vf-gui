/** 容器扩展类，后续便于做延时渲染 */
export default class ContainerBase extends PIXI.Container{
    public constructor(){
        super();
    }

    public isEmitRender = false;

    public render(renderer: PIXI.Renderer): void{
        super.render(renderer);
        if(this.isEmitRender){
            this.emit("render",renderer);
        }
    }
}