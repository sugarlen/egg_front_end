if ($) {
    /**
     * @date 2021.11.06
     * @function passwordFaker
     */
    $.fn.extend({
        // 密码伪装者
        passwordFaker: function (options) {

            // 默认配置
            var defaults = {
                trigger: 'change keyup keydown keypress input propertychange click blur focus mousedown mouseup mousemove',
                fakerColor: 'black',
                placehelder: '',
                placehelderCSS: {},
                browser: '',
                interval: 600
            };

            options = $.extend({}, defaults, options);
            // 根据text本身的高度以及它的父元素，创建新的圆点元素，将内容遮挡
            // text本身的样式中，字体颜色设置为透明，不允许观察到

            // 每当遮挡的div超过input得长度，则自动停止遮挡

            // input本身得jquery对象
            var $that = this;
            // 其父元素的jquery对象
            var $parent = $that.parent();
            // 初始化清空密码框内容
            $that.val('');
            // 父元素的position状态
            // 当为非静态时，不管，静态则修改为relative
            var parentPosition = $parent.css('position');
            if (parentPosition === 'static' || parentPosition === '' || parentPosition === 'auto') {
                $parent.css('position', 'relative');
            }

            // 超级遮罩
            var $masker = $('<div onselect="return false" id ="masker">');
            $masker.on('click', function () {
                $that.focus();
            });

            $masker.appendTo($parent);

            //  给我遮住!
            $masker.css({
                position: 'absolute',
                background: 'transparent',
                width: '390px',
                top: '36px',
                cursor: 'text',
                "pointer-events":"none"
            });

            $masker.attr('unselectable', 'on')
                .css({
                    '-moz-user-select': '-moz-none',
                    '-moz-user-select': 'none',
                    '-o-user-select': 'none',
                    '-khtml-user-select': 'none', /* you could also put this in a class */
                    '-webkit-user-select': 'none',/* and add the CSS class here instead */
                    '-ms-user-select': 'none',
                    'user-select': 'none'
                });

            // 设置字体以及触发条件的事件
            $that.css('color', 'transparent');

            var paddingLeft = parseInt($that.css('padding-left').replace(/px/g, ''));
            var fontSize = parseInt($that.css('font-size').replace(/px/g, ''));
            
            // 添加清除按钮
            var $clearIcon = $('<img id="clearIcon" />');
            $clearIcon.attr('src', './styles/images/clear.png');
            $clearIcon.css({
                position: 'absolute',
                top: '12px',
                right: '14px',
                width: '14px',
                height: '14px',
                display: 'none',
                'z-index': '99',
                'pointer-events': 'auto',
                cursor: 'pointer'
            });
            $clearIcon.appendTo($masker);
            $that.on('input propertychange focus', function () {
                if ($that.val() === '') {
                    $clearIcon.hide();
                } else {
                    $clearIcon.show();
                };
            });
            // $that.blur(function () {
            //     $clearIcon.hide();
            // });
            $clearIcon.on('mousedown', function (e) {
                $that.val('');
                if($placehelder) $placehelder.show();
            });
            
            // 解决点击密码框 边框闪动问题
            if (options.browser !== 'IE' && options.browser !== 'IE11'){
                $that.on('blur input propertychange',function(){
                    if ($that.val() === '') {
                        $that.css('border-color','#f56c6c');
                    } else {
                        $that.css('border-color','#197DFF');
                    };
                });
            };
            
            // 在IE和Firefox下 添加$placehelder对象     
            if (options.browser === 'IE' || options.browser === 'IE11' || options.browser === 'Firefox') {

                var $placehelder = $('<div>');

                // 给塞进masker遮盖层
                $placehelder.appendTo($masker);

                // 给palcehelder设置样式
                $placehelder.css(options.placehelderCSS);

                var heightPlace = $that.css('height');
                var lineHeightPlace = $that.css('line-height');

                // 设置palcehelder的左偏移
                $placehelder.css({
                    position: 'absolute',
                    'padding-left': paddingLeft + 'px',
                    'height': heightPlace,
                    'line-height': lineHeightPlace,
                    'font-size': fontSize + 'px'
                });

                // 设置内容
                $placehelder.text(options.placehelder);
                // input获焦就隐藏placehelder
                // propertychange IE独有属性，兼容IE9 以下版本使用 与input一样的作用
                if (options.browser === 'Firefox'){
                    $that.on('input propertychange', function () {
                        if ($that.val() === '') {
                            $placehelder.show()
                        } else {
                            $placehelder.hide()
                        };
                    });
                } else {
                    // IE控制placehelder的显隐
                    $that.on('focus',function () {
                        $placehelder.hide();
                    });
                    $that.on('blur',function () {
                        if ($that.val() === '') {
                            $placehelder.show()
                        } else {
                            $placehelder.hide()
                        };
                    });
                };     
            };

            // 在Chrome、 Firefox下 进行光标伪装
            if (options.browser === 'Chrome' || options.browser === 'Firefox') {
                var $cursor = $('<div id="cursor">');
                $cursor.css({
                    width: '1px',
                    height: (fontSize + 2) + 'px',
                    'background-color': '#000',
                    position: 'absolute',
                    top: '46.5px',
                    left: paddingLeft,
                    display: 'none'
                });
                $masker.css("pointer-events","auto");
                var flag = true;
                var timer;
                $that.focus(function () {
                    if(timer !== null) clearInterval(timer);
                    $cursor.show();
                    timer = setInterval(function () {
                        if (flag) {
                            $cursor.show();
                            flag = false;
                        } else {
                            $cursor.hide()
                            flag = true;
                        };
                    }, options.interval)
                });
                $that.blur(function () {
                    $cursor.hide();
                    clearInterval(timer);
                });
                $cursor.appendTo($parent);
            };

            // 伪装者渲染器
            function faker() {
                var width = $that.outerWidth();
                var height = $that.outerHeight();

                // input相对自己父元素的上下坐标偏移 以及位置
                var offsetTop = $that[0].offsetTop;
                var offsetLeft = $that[0].offsetLeft;

                // 我特么遮爆
                $masker.css({
                    height: height + 'px',
                    'left': (offsetLeft + 1) + 'px'
                });
                // if (checkIEVersion(9)) { $masker.css('top', '46px') };
                if ($that.css('display') === 'block' || $parent.parent().css('display') === 'block') {
                    $masker.css({
                        'top': offsetTop + 'px',
                        width: width + 'px',
                    });
                };

                // value得长度检测
                var value = $that.val();
                var len = (value === '' || value === undefined || value === null) ? 0 : value.length;

                // 字体大小的二分之一
                var fontsize = parseInt($that.css('font-size').replace(/px/g, '') / 2) + 0.8;
                var borderLeftWidth = parseInt($that.css('border-left-width').replace(/px/g, ''));

                // input自己内容的左偏移
                var paddingLeft = parseInt($that.css('padding-left').replace(/px/g, ''));

                // 两种阻断检测
                // 长度相等的
                // 长度小于实际长度得，则删除多余的faker
                var $faker = $parent.find('.password-faker');
                if ($faker.length === len) { return; }
                if ($faker.length > len) {
                    var $remover = $();
                    $faker.each(function (i, v) {
                        if (i >= len) {
                            // 删除密码时 根据真实光标位置来设置伪造光标的位置
                            if ($cursor) { setCursorPos(getRealCursorPos($that[0])); };
                            $remover = $remover.add(v);
                        };
                    });
                    $remover.remove();
                    return;
                };

                // 设置伪造光标位置
                function setCursorPos(valLength) {
                    var inputWidth = parseInt($that.css('width').replace(/px/g, '')) - paddingLeft * 2;
                    var leftCursor = offsetLeft + paddingLeft + valLength * fontsize + borderLeftWidth;
                    if (leftCursor > inputWidth - (3* fontsize)) { leftCursor = inputWidth - (2* fontsize); }
                    $cursor.css({
                        top: (top - 4) + 'px',
                        left: leftCursor + 'px'
                    });
                };

                // 实际渲染的faker
                // 当value得实际长度大于faker得长度
                if ($faker.length < len) {
                    // 字体大小的二分之一
                    var fontsize = parseInt($that.css('font-size').replace(/px/g, '') / 2) + 0.8;
                    var borderLeftWidth = parseInt($that.css('border-left-width').replace(/px/g, ''));
                    // value字符串的长度和faker元素数量的差值
                    var dLength = Math.abs(len - $faker.length);

                    // input自己内容的左偏移
                    var paddingLeft = parseInt($that.css('padding-left').replace(/px/g, ''));
                    // input相对自己父元素的上下坐标偏移
                    var offsetTop = $that[0].offsetTop;
                    var offsetLeft = $that[0].offsetLeft;
                    var top = offsetTop + ((height - fontsize) / 2);
                    $masker.css('top', offsetTop + 'px');
                    $masker.css('left', (offsetLeft + 1) + 'px');

                    // 生成faker元素
                    var i = 0;
                    for (; i < dLength; i++) {
                        // 输入密码时 根据真实光标位置来设置伪造光标的位置
                        if ($cursor) { setCursorPos(getRealCursorPos($that[0])); };
                        $('<div class="password-faker">●</div>').appendTo($parent);
                    };

                    // 设置faker得样式
                    $faker = $parent.find('.password-faker');
                    $faker.css({
                        'z-index': '1',
                        width: fontsize + 'px',
                        height: fontsize + 'px',
                        color: options.fakerColor,
                        position: 'absolute',
                        cursor: 'text',
                        'line-height': fontsize + 'px',
                        'font-size': fontsize + 'px',
                        background: 'transparent',
                        'pointer-events': 'none'
                    });

                    if (options.browser === 'Chrome' || options.browser === 'Firefox') {
                        $faker.css("pointer-events","auto");
                    };

                    // 伪造光标控制
                    if ($cursor) {
                        var cursorPosIndex;
                        // 监听密码输入
                        $that.keyup(function (e) {
                            cursorPosIndex = getRealCursorPos($that[0]);
                            setCursorPos(cursorPosIndex);
                        });

                        $parent.on('click', function (e) {
                            var mouseIndex;
                            var left = $(e.target).css('left').replace(/px/g, '');
                            if (e.target.className === "password-faker") {
                                mouseIndex = parseInt(Number((left - offsetLeft - paddingLeft - borderLeftWidth).toFixed(2)) / fontsize);
                            } else {
                                mouseIndex = $that.val().length;
                            };
                            setCursorPos(mouseIndex);
                            setRealCursorPos($that[0], mouseIndex);
                        });

                        // 光标点击切换时重新开始计时器闪烁
                        $faker.on('mousedown', function(){
                            if(timer) {
                                clearInterval(timer);
                                timer = null;
                            };
                        });
                        $faker.on('mouseup',function(){
                            $that.focus();
                        });
                    };

                    // IE11 设置光标位置
                    // if (options.browser === 'IE11') {
                    //     $parent.on('mousedown', function (e) {
                    //         var mouseIndex;
                    //         var left = $(e.target).css('left').replace(/px/g, '');
                    //         if (e.target.className === "password-faker") {
                    //             mouseIndex = parseInt(Number((left - offsetLeft - paddingLeft - borderLeftWidth).toFixed(2)) / fontsize);
                    //         } else {
                    //             mouseIndex = $that.val().length;
                    //         };
                    //         setRealCursorPos($that[0], mouseIndex);
                    //     });
                    // };

                    // 设置faker的位置以及数量
                    $faker.each(function (i, v) {

                        // 超过输入框长度的faker直接删除
                        var allWidth = offsetLeft + paddingLeft * 2 + fontsize * i + fontsize + borderLeftWidth * 2;
                        if (allWidth >= width + offsetLeft - (3 * fontsize)) {
                            $(v).hide().remove();
                            return;
                        };

                        // 设置faker的left
                        var left = offsetLeft + paddingLeft + i * fontsize + borderLeftWidth;
                        $(v).css({
                            top: top + 'px',
                            left: left + 'px'
                        });

                    });

                    // 给faker焦点事件
                    $faker.off('click').on('click', function () {
                        $that.focus();
                    });

                    $faker.attr('unselectable', 'on')
                        .css({
                            '-moz-user-select': '-moz-none',
                            '-moz-user-select': 'none',
                            '-o-user-select': 'none',
                            '-khtml-user-select': 'none', /* you could also put this in a class */
                            '-webkit-user-select': 'none',/* and add the CSS class here instead */
                            '-ms-user-select': 'none',
                            'user-select': 'none'
                        });
                };
            };

            // function getSelRan(id) {
            //     if (document.activeElement == id) {
            //         var pos = getCursorPos(id);
            //         setCursorPos(id, pos);
            //     }
            // }

            // 获取真实光标位置
            function getRealCursorPos(ctrl) {
                var pos = 0;
                if (ctrl.selection) {  // IE Support
                    var Sel = ctrl.selection.createRange();
                    Sel.moveStart('character', -ctrl.value.length);
                    pos = Sel.text.length;
                }
                // Firefox support
                else if (ctrl.selectionStart || ctrl.selectionStart == '0')
                    pos = ctrl.selectionStart;
                return (pos);
            };

            //设置真实光标位置
            function setRealCursorPos(ctrl, pos) {
                if (ctrl.setSelectionRange) { // other
                    ctrl.setSelectionRange(pos, pos);
                }
                else if (ctrl.createTextRange) { // IE
                    var range = ctrl.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                };
            };

            faker();
            $that.on('select selectstart', function (e) { });
            // input输入框内容value映射到所有显示元素上
            $that.on(options.trigger, function (e) { faker(e); });

        }
    });
} else {
    throw new Error("jQuery is not exist, so $.fn.passwordFaker can'b installed.");
}