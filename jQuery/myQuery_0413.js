(function () {    // 즉각 실행함수
    var $ = function (p_sel) {    // new 없애기
        return new mydom(p_sel); // 선택자이므로, 매개변수가 있어야 함
    }

    var mydom = function (p_sel) {
        // 실제 jQuery는 querySelectorAll 메소드가 없을 때 만들어져서 이 부분이 아주 복잡
        
        var v_elems = document.querySelectorAll(p_sel);
        /* ------최초 값들을 저장 (최초 선택된 객체들로 돌아가고파 end 메소드)----- */
        this.preSel = p_sel;
        /* ------------------------------------------------------------------ */
        this.length = v_elems.length;
        for (var i = 0; i < v_elems.length; i++) {
            this[i] = v_elems[i];   // this는 새로 생성되는 객체를 가리킴
        }
        return this;    // 이것이 있는 거나 마찬가지, 명시적으로 적었음
    }
    window.$ = $;   // 참조방식(함수)
    // 지역함수 $를 밖에서 접근할 수 있게 전역 변수 $로 참조
    $.fn = mydom.prototype;
    // mydom에 메소드 추가로 밖에서 할 수 있도록 전역변수 $.fn으로 참조
})();

/* ************************************************************************************* */

// eq, index 번호로 선택
$.fn.eq = function(p_inx) {
    this["0"] = this[p_inx];
    // return this[p_inx]; // 특정요소 하나만 return해서 안됨.
    for(var i = 1; i < this.length; i++) {
        // if(i != p_inx) {
            delete this[i]; // index 번호랑 틀린 거 지워버림
        // }
    }
    this.length = 1;
    return this;    // p_inx를 가진 한개만, 
}

/* ************************************************************************************* */

// 최초 선택된 객체들로 돌아가고파 end 메소드
$.fn.end = function() {
    return $(this.preSel);
}

/* ************************************************************************************* */

// style 편하게 제어하는 메소드
$.fn.css = function(p_arg1, p_arg2) {
    if(typeof(p_arg1) == "string" && !p_arg2) {
        // return this[0].style[p_arg1]; // inline에 있는것만 읽어옴
        return window.getComputedStyle(this[0])[p_arg1];
    }

    if(typeof(p_arg1) == "object" && !p_arg2) {
        for(var i = 0; i < this.length; i++) {
            for(var v_style in p_arg1) {
                this[i].style[v_style] = p_arg1[v_style];
            }
        }
        return this;
    }

    if(typeof(p_arg1) == "string" && typeof(p_arg2) == "string") {
        for(var i = 0; i < this.length; i++) {
            this[i].style[p_arg1] = p_arg2;
        }
        return this;
    }
    /* .css( propertyNames )
        propertyNames
        Type: Array
        An array of one or more CSS properties. */

    if(typeof(p_arg1) == "string" && typeof(p_arg2) == "function") {
        for(var i = 0; i<this.length; i++) {
            this[i].style[p_arg1] = p_arg2(i, this[i].style[p_arg1]);      
        }
        return this;
    }
}


/* ******************************************************************** */
// value를 편하게 제어하는 메소드
$.fn.val = function(p_arg) {
    if(!p_arg) {
        return this[0].value;
    }

    if(typeof(p_arg) == "string") {
        for(var i = 0; i < this.length; i++) {
            this[i].value = p_arg;
        }
        return this;
    }

    if(typeof(p_arg) == "function") {
        for(var i = 0; i < this.length; i++) {
            this[i].value = p_arg(i, this[i].value);
        }
        return this;
    }
    return null;
}

/* ******************************************************************** */
$.fn.on = function(p_evt, p_cb) {
    for(var i = 0; i < this.length; i++) {
        this[i].addEventListener(p_evt, p_cb.bind(this[i]));
        // call 이나 apply를 쓰면 함수가 실행되어버려서 안됨
    }
    return this;
}

/* ******************************************************************** */
// ajax
var $ = {};
$.ajax = function(p_setting){
    var v_ajax = new XMLHttpRequest();
    v_ajax.open(p_setting.type, p_setting.url, true);
    v_ajax.onreadystatechange = function() {
        if(v_ajax.readyState == 4 && v_ajax.status == 200) {
            p_setting.success(v_ajax.responseText);
        }
    }
    v_ajax.send();
}