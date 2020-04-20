// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestMouseCursor {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        // 支持说明
        // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor  

        const help = this.getContainer();
        help.x = 100;
        help.y = 100;
        help.interactive = true; //激活交互 
        help.style.cursor = "help"; //鼠标状态
        uiStage.addChild(help);

        const wait = this.getContainer();
        wait.x = 220;
        wait.y = 100;
        wait.interactive = true; //激活交互 
        wait.style.cursor = "wait"; //鼠标状态
        uiStage.addChild(wait);

        const crosshair = this.getContainer();
        crosshair.x = 340;
        crosshair.y = 100;
        crosshair.interactive = true; //激活交互 
        crosshair.style.cursor = "crosshair"; //鼠标状态
        uiStage.addChild(crosshair);

        const notAllowed = this.getContainer();
        notAllowed.x = 100;
        notAllowed.y = 220;
        notAllowed.interactive = true; //激活交互 
        notAllowed.style.cursor = "not-allowed"; //鼠标状态
        uiStage.addChild(notAllowed);

        const zoomIn = this.getContainer();
        zoomIn.x = 220;
        zoomIn.y = 220;
        zoomIn.interactive = true; //激活交互 
        zoomIn.style.cursor = "zoom-in"; //鼠标状态
        uiStage.addChild(zoomIn);

        const grab = this.getContainer();
        grab.x = 340;
        grab.y = 220;
        grab.interactive = true; //激活交互 
        grab.style.cursor = "grab"; //鼠标状态
        uiStage.addChild(grab);

        const img = this.getContainer();
        img.x = 100;
        img.y = 340;
        img.interactive = true; //激活交互 
        img.style.cursor = "url(assets/pc.png), pointer"; //鼠标状态
        uiStage.addChild(img);
    }

    private getContainer() {
        const container = new vf.gui.Container();
        container.width = 100;
        container.height = 100;
        container.style.backgroundColor = 100;
        return container
    }
}
