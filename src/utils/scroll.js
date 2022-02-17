/* eslint-disable */
"use strict";
/**
 *
 * @param {*} options {
 *    box: 盒子dom对象
 *    content: 内容dom对象
 *    ctrlsVisible: 进度条是否显示控制按钮
 *    style: {
 *      bar: {[key]: [value]}  进度条样式
 *      barBox: {[key]: [value]}   进度条背景样式
 *      ctrls: {[key]: [value]}   控制按钮样式
 *    }
 * }
 */
function Scroll(
    options = {
    }
) {
    if (Object.prototype.toString.call(options) !== "[object Object]") {
        throw new Error("scroll options is Object !!!!");
    }
    if (
        Object.prototype.toString.call(options.box) !== "[object HTMLDivElement]"
    ) {
        throw new Error("scroll box is HTMLDivElement !!!!");
    }
    // 滚动区域窗口
    this._box = options.box;
    // 滚动区域内容
    if (
        Object.prototype.toString.call(options.content) ===
        "[object HTMLDivElement]"
    ) {
        this._content = options.content;
    } else if (options.box.children.length === 1) {
        this._content = options.box.children[0];
    } else if (options.box.children.length > 1) {
        this._content = document.createElement("div");
        for (let i = options.box.children.length - 1; i >= 0; i--) {
            this._content.prepend(options.box.children[i]);
        }
        options.box.append(this._content);
    } else {
        return;
    }
    // 记录参数
    this.options = options;
    // 滚动条边框
    this._barBox = document.createElement("div");
    // 滚动条
    this._bar = document.createElement("div");
    // 滚动区域高度
    this.height = 0;
    // 滚动内容高度
    this.contentHeight = 0;
    // 滚动内容当前滚动坐标
    this.contentCurrentHeight = 0;
    // 滚动内容最大可滚动距离
    this.contentMaxTop = 0;
    // 滚动条区域长度
    this.barBoxHeight = 0;
    // 滚动条长度
    this.barHeight = 0;
    // 滚动条当前滚动坐标
    this.barCurrentHeight = 0;
    // 滚动条最大可滚动距离
    this.barMaxTop = 0;
    this._initDom();
    this._initScroll();
}
Scroll.prototype = {
    constructor: Scroll,
};
/**
 * 初始化dom、样式
 */
Scroll.prototype._initDom = function () {
    // 初始化滚动区域
    this._box.style.display = "block";
    this._box.style.position = "relative";
    this._box.style.overflow = "hidden";
    // 初始化滚动内容
    this._content.style.display = "block";
    this._content.style.position = "absolute";
    // 初始化滚动条边框
    this._barBox.style.position = "absolute";
    this._barBox.style.right = "0px";
    this._barBox.style.top = "0px";
    this._barBox.style.height = "100%";
    this._barBox.style.width = "20px";
    this._barBox.style.backgroundColor = "#e68181";
    // 滚动条边框内容清空
    this._barBox.innerHTML = "";
    this._barBox.onmousedown = function () {
        return null;
    };
    this._box.appendChild(this._barBox);
    // 初始化滚动条
    this._bar.style.position = "absolute";
    this._bar.style.top = "0px";
    this._bar.style.width = "20px";
    this._bar.style.backgroundColor = "black";
    this._barBox.appendChild(this._bar);
    if (this.options.ctrlsVisible) {
        // 初始化滚动条操作按钮
        var btnUp = document.createElement("div");
        btnUp.style.position = "absolute";
        btnUp.style.top = "0px";
        btnUp.style.width = "20px";
        btnUp.style.height = "20px";
        btnUp.style.backgroundColor = "red";
        var btnDown = document.createElement("div");
        btnDown.style.position = "absolute";
        btnDown.style.bottom = "0px";
        btnDown.style.width = "20px";
        btnDown.style.height = "20px";
        btnDown.style.backgroundColor = "red";
        this._barBtnUp = btnUp;
        this._barBtnDown = btnDown;
        this._barBox.appendChild(this._barBtnUp);
        this._barBox.appendChild(this._barBtnDown);
    }
    // 初始化样式
    this._setStyle();
};
/**
 * 初始化滚动方法、事件监听
 */
Scroll.prototype._initScroll = function () {
    var _this = this;
    // 绑定滚轮监听事件
    function mousewheelEvent(ev) {
        _this._mousewheelEvent(ev);
    }
    if (this._browser() === "Firefox") {
        // 火狐浏览器使用event监听
        this._box.addEventListener("DOMMouseScroll", mousewheelEvent);
    }
    this._box.onmousewheel = mousewheelEvent;
    // 绑定滚动条拖动事件
    function barDragEvent(ev) {
        _this._barDragEvent(ev);
    }
    this._bar.onmousedown = barDragEvent;
    // 绑定滚动条按钮点击事件
    if (this.options.ctrlsVisible) {
        function barBtnUpEvent(ev) {
            _this._barBtnUpEvent(ev);
        }
        this._barBtnUp.onclick = barBtnUpEvent;
        function barBtnDownEvent(ev) {
            _this._barBtnDownEvent(ev);
        }
        this._barBtnDown.onclick = barBtnDownEvent;
    }
    // 更新滚动条
    this.setScroll();
};
/**
 * 样式参数设置
 * @param {*} scrollTop
 */
Scroll.prototype._setStyle = function () {
    if (this.options && this.options.style && this.options.style.bar) {
        for (const key in this.options.style.bar) {
            if (Object.hasOwnProperty.call(this.options.style.bar, key)) {
                this._bar.style[key] = this.options.style.bar[key];
            }
        }
    }
    if (this.options && this.options.style && this.options.style.barBox) {
        for (const key in this.options.style.barBox) {
            if (Object.hasOwnProperty.call(this.options.style.barBox, key)) {
                this._barBox.style[key] = this.options.style.barBox[key];
            }
        }
    }
    if (
        this._barBtnUp &&
        this.options &&
        this.options.style &&
        this.options.style.ctrls
    ) {
        this._barBtnUp.style += this.options.style.ctrls;
        for (const key in this.options.style.ctrls) {
            if (Object.hasOwnProperty.call(this.options.style.ctrls, key)) {
                this._barBtnUp.style[key] = this.options.style.ctrls[key];
            }
        }
    }
    if (
        this._barBtnDown &&
        this.options &&
        this.options.style &&
        this.options.style.ctrls
    ) {
        this._barBtnDown.style += this.options.style.ctrls;
        for (const key in this.options.style.ctrls) {
            if (Object.hasOwnProperty.call(this.options.style.ctrls, key)) {
                this._barBtnDown.style[key] = this.options.style.ctrls[key];
            }
        }
    }
};
/**
 * 设置参数，换算滚动条长度，滚动视窗大小变化时调用
 * @param {*} scrollTop 滚动至顶部
 */
Scroll.prototype.setScroll = function (scrollTop = false) {
    // 滚动区域高度
    this.height = this._box.clientHeight;
    // 内容高度
    this.contentHeight = this._content.clientHeight;
    // 内容最大滚动距离
    this.contentMaxTop = this.contentHeight - this.height;
    // 滚动条区域长度(判断是否有按钮存在)
    this.barBoxHeight = this.options.ctrlsVisible
        ? this.height - this._barBtnUp.clientHeight - this._barBtnDown.clientHeight
        : this.height;
    // 滚动条长度
    this.barHeight = (this.height / this.contentHeight) * this.barBoxHeight;
    this._bar.style.height = this.barHeight + "px";
    // 滚动条最大滚动距离
    this.barMaxTop = this.barBoxHeight - this.barHeight;
    // 是否滚动至顶端
    if (scrollTop) {
        this.barCurrentHeight = this.contentCurrentHeight = 0 + "px";
    }
    // 比例换算后滚动条长度超出
    if (this.barHeight >= this.height) {
        this._barBox.style.display = "none";
        this._content.style.top = 0 + "px";
        this._box.onmousewheel = null;
    } else {
        this._barBox.style.display = "block";
        this._scroll();
    }
};
/**
 * 设置新的配置参数
 */
Scroll.prototype.resetOptions = function (options, scrollTop = false) {
    this.options = options;
    this._initDom();
    this.setScroll(scrollTop);
};
/**
 * 坐标计算
 * @param {*} direction 转换方向，ctb: 内容坐标变化导致的进度条变化；btc：进度条坐标变化导致的内容变化
 */
Scroll.prototype._positionCalculation = function (direction) {
    direction = direction || "ctb";
    switch (direction) {
        case "ctb":
            // 滚动位置超出判断
            if (this.contentCurrentHeight <= 0) this.contentCurrentHeight = 0;
            if (this.contentCurrentHeight >= this.contentMaxTop)
                this.contentCurrentHeight = this.contentMaxTop;
            // 计算滚动条对应位置
            this.barCurrentHeight =
                (this.contentCurrentHeight / this.contentMaxTop) * this.barMaxTop;
            break;
        case "btc":
            // 位置超出判断
            if (this.barCurrentHeight <= 0) this.barCurrentHeight = 0;
            if (this.barCurrentHeight >= this.barMaxTop)
                this.barCurrentHeight = this.barMaxTop;
            // 计算内容对应位置
            this.contentCurrentHeight =
                (this.barCurrentHeight / this.barMaxTop) * this.contentMaxTop;
            break;
    }
};
/**
 * 处理滚动后dom位置
 */
Scroll.prototype._scroll = function () {
    this._content.style.top = -this.contentCurrentHeight + "px";
    // 滚动条位置（需要考虑按钮）
    this._bar.style.top =
        (this.options.ctrlsVisible
            ? this.barCurrentHeight + this._barBtnUp.clientHeight
            : this.barCurrentHeight) + "px";
};
/**
 * 滚轮监听回调处理函数
 * @param {*} event
 * @returns
 */
Scroll.prototype._mousewheelEvent = function (event) {
    var delta = 0;
    if (!event) event = window.event;
    // 判断滚动方向滚动20px
    if (event.wheelDelta) {
        //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta; //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
    } else if (event.detail) {
        //FF浏览器使用的是detail,其值为“正负3”
        delta = -event.detail / 3;
    }
    // 内容位置变化
    delta < 0
        ? (this.contentCurrentHeight += 20)
        : (this.contentCurrentHeight -= 20);
    // 根据内容位置变化计算其他参数
    this._positionCalculation("ctb");
    // dom滚动至参数位置
    this._scroll();
    if (event.preventDefault) event.preventDefault();
    return false;
};
/**
 * 滚动条拖动回调处理函数
 * @param {*} event
 * @returns
 */
Scroll.prototype._barDragEvent = function (event) {
    if (!event) event = window.event;
    var disY = event.clientY - this.barCurrentHeight;
    var _this = this;
    document.onmousemove = function (ev) {
        if (!ev) ev = window.event;
        // 滚动条位置变化
        _this.barCurrentHeight = ev.clientY - disY;
        // 根据滚动条位置变化计算其他参数
        _this._positionCalculation("btc");
        // dom滚动至参数位置
        _this._scroll();
    };
    document.onmouseup = function () {
        document.onmouseup = document.onmousemove = null;
    };
    if (event.preventDefault) event.preventDefault();
    return false;
};
/**
 * 向上滚动按钮回调处理
 */
Scroll.prototype._barBtnUpEvent = function () {
    this.barCurrentHeight -= 20;
    // 根据滚动条位置变化计算其他参数
    this._positionCalculation("btc");
    // dom滚动至参数位置
    this._scroll();
};
/**
 * 向下滚动按钮回调处理
 */
Scroll.prototype._barBtnDownEvent = function () {
    this.barCurrentHeight += 20;
    // 根据滚动条位置变化计算其他参数
    this._positionCalculation("btc");
    // dom滚动至参数位置
    this._scroll();
};
/**
 * 浏览器版本判断
 * @returns IE | Firefox | Chrome | Safari | Opera
 */
Scroll.prototype._browser = function () {
    //取得浏览器的userAgent字符串
    var userAgent = window.navigator.userAgent;
    var isIE_11 =
        window.ActiveXObject != undefined &&
        userAgent.indexOf("compatible") > -1 &&
        userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isIE11 =
        userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isIE = isIE_11 || isIE11;
    //判断是否IE浏览器
    if (isIE) {
        return "IE";
    }
    //判断是否Firefox浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
    }
    //判断是否Chrome浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    //判断是否Safari浏览器
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    }
    //判断是否Opera浏览器
    if (userAgent.indexOf("Opera") > -1) {
        return "Opera";
    }
};
export default Scroll;