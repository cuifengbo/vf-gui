// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestTextInput {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app,uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        /** 单行输入 TextInput(false) */
        const textInput = new vf.gui.TextInput(false);
        textInput.style.left = 15;
        textInput.style.top = 100;
        textInput.style.width = 300;
        textInput.style.height = 30;
        textInput.style.fontSize = 24;//"32px"
        textInput.style.fontFamily = "微软雅黑";
        textInput.style.color = 0x00ffcc;
        textInput.placeholder = "单行输入文本...";
        textInput.maxLength = 15;
        textInput.restrict = new RegExp('\\w+') ;//由数字、26个英文字母或者下划线组成的字符串
        textInput.up = "assets/skin/TextInput/up.png";
        textInput.down = "assets/skin/TextInput/down.png";
        textInput.move = "assets/skin/TextInput/down.png";
        textInput.disabled = "assets/skin/TextInput/disabled.png";
        //textInput.props.enabled = false;
        uiStage.addChild(textInput);

        /** 多行输入 TextInput(true) */
        const multilineInput = new vf.gui.TextInput(true);
        multilineInput.style.top = 200;
        multilineInput.style.left = 15;
        multilineInput.style.width = 300;
        multilineInput.style.height = 150;
        multilineInput.style.fontSize = 24;//"32px"
        multilineInput.style.fontFamily = "微软雅黑";
        multilineInput.style.color = 0xffffff;
        multilineInput.placeholder = "多行输入文本...";
        multilineInput.up = "assets/skin/TextInput/up.png";
        multilineInput.down = "assets/skin/TextInput/down.png";
        multilineInput.move = "assets/skin/TextInput/down.png";
        uiStage.addChild(multilineInput);

    }
}

