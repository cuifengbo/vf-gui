import { DisplayObject } from "../DisplayObject";
import { DragEvent, DragDropController, InteractionEvent, ComponentEvent } from "../../interaction/Index";
import { TouchMouseEventEnum } from "../../interaction/TouchMouseEventEnum";
import { DisplayObjectAbstract } from "../DisplayObjectAbstract";
import { Stage } from "../Stage";
import { getDisplayObject, debug } from "../../utils/Utils";


/**
 *  组件的拖拽操作
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestDrop
 */
export class UIBaseDrag implements Lifecycle {
    /**
     * 构造函数
     */
    public constructor(target: DisplayObject) {
        this.target = target;
        this.target.plugs.set(UIBaseDrag.key, this);
    }

    public static key = "UIBaseDrag";

    private target: DisplayObject | undefined;
    public $targetParent: DisplayObject | Stage | undefined;
    /** 
     * 可拖动初始化
     *  @default
     */
    private dragInitialized = false;
    /** 
     * 可被掉落初始化
     * @default
    */
    private dropInitialized = false;
    /** 
     * 拖动控制类 
     */
    private drag: DragEvent | undefined;
    /** 
     * 位置 
     * 
     */
    private _dragPosition = new vf.Point();
    /**
     * 开始位置
     */
    private _containerStart: vf.Point | undefined;

    /** 
     * 是否拖动中
     * @default
     */
    public dragging = false;
    /** 
     * 当前拖动组件的事件ID，用于处理DragDropController中多组件的选定 
     */
    public get dragDropEventId(): number | undefined {
        if (this.target) {
            return this.target.attach.dragDropEventId as number;
        }
    }

    /**
     * 是否开启拖动
     * @default false
     */
    public set draggable(value: boolean) {
        if (value)
            this.initDraggable();
        else
            this.clearDraggable();
    }

    /**
     * 是否设置边界
     * @default false
     */
    public dragBoundary = false;
    /**
     * 是否启用回弹，在移动到非接收方时，回弹到原始位置
     */
    public dragBounces = false;

    /**
     * 限制拖动抽,XY,X抽或Y抽
     */
    private _dragRestrictAxis?: "x" | "y";
    public get dragRestrictAxis() {
        return this._dragRestrictAxis;
    }
    public set dragRestrictAxis(value) {
        this._dragRestrictAxis = value;
        if (this.drag) {
            this.drag.dragRestrictAxis = this._dragRestrictAxis;
        }
    }

    /** 
     * 拖动分组
     */
    public get dragGroup(): string {
        if (this.target) {
            return this.target.attach.dragGroup as string;
        }
        return "";
    }
    public set dragGroup(value: string) {
        if (this.target)
            this.target.attach.dragGroup = value;
    }

    /**
     * 拖动时，物体临时的存放容器，设置后，请注意事件流
     */
    private _dragContainer: DisplayObjectAbstract | undefined;
    public get dragContainer() {
        return this._dragContainer;
    }
    public set dragContainer(value) {
        this._dragContainer = getDisplayObject(value, this.target);
    }

    /**
     * 是否开启拖动掉落接收
     */
    public set droppable(value: boolean | undefined) {
        if (value)
            this.initDroppable();
        else
            this.clearDroppable();
    }

    /**
     * 接收掉落的新容器
     */
    private _droppableReparent: DisplayObject | undefined;
    public get droppableReparent() {
        return this._droppableReparent;
    }
    public set droppableReparent(value) {
        this._droppableReparent = getDisplayObject(value, this.target);
    }
    /**
     * 接收拖动掉落的分组名
     */
    public dropGroup: string | undefined;


    protected clearDraggable() {
        if (this.dragInitialized) {
            this.dragInitialized = false;
            this.drag && this.drag.stopEvent();
        }
    }

    protected initDraggable() {
        if (this.target == undefined) {
            return;
        }
        if (!this.dragInitialized) {

            this.dragInitialized = true;
            const containerStart = new vf.Point();
            const stageOffset = new vf.Point();
            this._containerStart = containerStart;
            this._dragPosition.set(0, 0);

            this.drag = new DragEvent(this.target);
            this.drag.dragRestrictAxis = this._dragRestrictAxis;

            this.drag.onDragStart = (e: InteractionEvent) => {
                if (this.target == undefined) {
                    return;
                }
                const target = this.target;
                this.$targetParent = target.parent;

                if (this._dragContainer == undefined && !this.dragBoundary) {
                    this._dragContainer = this.target.stage;
                }

                const added = DragDropController.add(target, e);
                if (!this.dragging && added) {
                    target.emit(ComponentEvent.DRAG_START_BEFORE, target, e);
                    this.dragging = true;
                    target.interactive = false;
                    containerStart.copyFrom(target.container.position);
                    if (this._dragContainer) {
                        let c: DisplayObjectAbstract | undefined;
                        if (this._dragContainer instanceof DisplayObjectAbstract) {
                            c = this._dragContainer;
                        }
                        if (c && target.parent) {
                            //_this.container._recursivePostUpdateTransform();
                            stageOffset.set(c.container.worldTransform.tx - target.parent.container.worldTransform.tx, c.container.worldTransform.ty - target.parent.container.worldTransform.ty);
                            c.addChild(target);
                            stageOffset.set(stageOffset.x / target.parent.scaleX, stageOffset.y / target.parent.scaleY);
                        }
                    } else {
                        stageOffset.set(0);
                    }
                    if (debug) { //debug 模式下，日志信息
                        const stage = target.stage;
                        if (stage) {
                            stage.inputLog({
                                code: ComponentEvent.DRAG_START,
                                level: 'info', target: target,
                                data: [target.parent, containerStart.x - stageOffset.x, containerStart.y - stageOffset.y],
                                action: e.type,
                                message: 'parent,start,offset pos',
                            });
                        }

                    }
                    target.emit(ComponentEvent.DRAG_START, target, e);
                }
            };


            this.drag.onDragMove = (e: InteractionEvent, offset: vf.Point) => {
                if (this.target == undefined) {
                    return;
                }
                const target = this.target;
                if (this.dragging && target.stage) {
                    const x = containerStart.x + (offset.x / target.stage.scaleX) - stageOffset.x;
                    const y = containerStart.y + (offset.y / target.stage.scaleY) - stageOffset.y;
                    const dragPosition = this._dragPosition;
                    if (this.dragRestrictAxis == "x") {
                        dragPosition.set(x, containerStart.y - stageOffset.y);
                    } else if (this.dragRestrictAxis == "y") {
                        dragPosition.set(containerStart.x - stageOffset.x, y);
                    } else {
                        this._dragPosition.set(x, y);
                    }
                    if (this.dragBoundary && target.parent) {
                        dragPosition.x = Math.max(0, dragPosition.x);
                        dragPosition.x = Math.min(dragPosition.x, target.parent.width - target.width);
                        dragPosition.y = Math.max(0, dragPosition.y);
                        dragPosition.y = Math.min(dragPosition.y, target.parent.height - target.height);
                    }
                    if (debug) {//debug 模式下，日志信息
                        const stage = target.stage;
                        if (stage) {
                            stage.inputLog({
                                code: ComponentEvent.DRAG_MOVE,
                                level: 'info',
                                target: target,
                                data: [target.parent, dragPosition.x, dragPosition.y],
                                action: e.type,
                                message: 'parent,move pos'
                            });
                        }

                    }
                    target.setPosition(this._dragPosition.x, this._dragPosition.y);
                    target.emit(ComponentEvent.DRAG_MOVE, target, e);
                }

            };

            this.drag.onDragEnd = (e: InteractionEvent) => {
                if (this.dragging) {
                    this.dragging = false;

                    //如果没有可被放置掉落的容器，0秒后返回原容器
                    setTimeout(() => {
                        if (this.target == undefined) {
                            return;
                        }

                        //dragBounces
                        const target = this.target;
                        const parent = this.$targetParent;
                        target.interactive = true;
                        const item = DragDropController.getItem(target);
                        target.emit(ComponentEvent.DRAG_END_BEFORE, target, e);
                        if (item && parent) {
                            if (target.parent !== parent && target.parent) {
                                parent.container.toLocal(target.container.position, target.container.parent, this._dragPosition);
                                parent.addChild(target);
                                target.x = this._dragPosition.x;
                                target.y = this._dragPosition.y;
                            }
                            if (this.dragBounces && this._containerStart) {
                                target.x = this._containerStart.x;
                                target.y = this._containerStart.y;
                            }
                        }
                        if (debug) {//debug 模式下，日志信息
                            const stage = target.stage;
                            if (stage) {
                                stage.inputLog({
                                    code: ComponentEvent.DRAG_END,
                                    level: 'info',
                                    target: target,
                                    data: [target.parent, target.x, target.y],
                                    action: e.type,
                                    message: 'parent,end pos'
                                });
                            }

                        }
                        target.emit(ComponentEvent.DRAG_END, target, e);


                    }, 0);
                }

            };
        }
    }

    protected clearDroppable() {
        if (this.target == undefined) {
            return;
        }
        const target = this.target;
        if (this.dropInitialized) {
            this.dropInitialized = false;
            target.container.off(TouchMouseEventEnum.mouseup, this.onDrop, this);
            target.container.off(TouchMouseEventEnum.touchend, this.onDrop, this);
        }
    }

    protected initDroppable() {
        if (this.target == undefined) {
            return;
        }
        const target = this.target;
        if (!this.dropInitialized) {
            this.dropInitialized = true;
            const container = target.container;
            //self = this;
            container.interactive = true;
            container.on(TouchMouseEventEnum.mouseup, this.onDrop, this);
            container.on(TouchMouseEventEnum.touchend, this.onDrop, this);

        }
    }

    private onDrop(e: InteractionEvent) {
        if (this.target == undefined) {
            return;
        }
        let target = this.target;
        const item = DragDropController.getEventItem(e, this.dropGroup);
        if (item && item.dragOption.dragging) {
            item.dragOption.dragging = false;
            item.interactive = true;
            const parent = item.dragOption.droppableReparent !== undefined ? item.dragOption.droppableReparent : target;
            if (parent) {
                parent.container.toLocal(item.container.position, item.container.parent, this._dragPosition);
                item.x = this._dragPosition.x;
                item.y = this._dragPosition.y;
                if (parent != item.parent) {
                    parent.addChild(item);
                    parent.emit(ComponentEvent.DROP_TARGET, parent, item, e);
                }
                item.dragOption.$targetParent = parent;
            }
            if (debug) {//debug 模式下，日志信息
                const stage = target.stage;
                if (stage) {
                    stage.inputLog({
                        code: ComponentEvent.DRAG_TARGET,
                        level: 'info',
                        target: item,
                        data: [target.parent, item.x, item.y],
                        action: e.type,
                        message: 'drag target,item pos'
                    });
                }

            }
            item.emit(ComponentEvent.DRAG_TARGET, item, e);
        }
    }

    load() {
        //
    }

    release() {

        this.clearDraggable();
        this.clearDroppable();

        if (this.target) {
            this.target.plugs.delete(UIBaseDrag.key);
            this.target = undefined;
            this.$targetParent = undefined;
            this.dragContainer = undefined;
        }
    }

}