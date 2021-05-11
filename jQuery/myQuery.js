// jQuery의 이해 
// 함수 호출법 -> 함수이름(), new 함수이름() -> new 가 붙으면 function 키워드가 자바의 class처럼 동작
// new 가 붙었을 경우의 함수를 constructor(생성자)라고 부름

// function aaa() {    // 함수안에 넣어주면 mydom은 지역변수가 되어 영향을 안받음

(function () {    // 즉각 실행함수
    var $ = function (p_sel) {    // new 없애기
        return new mydom(p_sel); // 선택자이므로, 매개변수가 있어야 함
    }

    var mydom = function (p_sel) {
        // 실제 jQuery는 querySelectorAll 메소드가 없을 때 만들어져서 이 부분이 아주 복잡
        alert("p_sel : " +p_sel);
        var v_elems = document.querySelectorAll(p_sel);
        /* ------최초 값들을 저장 (최초 선택된 객체들로 돌아가고파 end 메소드)----- */
        this.preSel = p_sel;
        /* -------------------------- */
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

// var sib = $("뭔가 선택자");

// mydom = "노르웨이 숲"; // mydom 이 함수가 아니라 문자열을 가르킴, 존재하는데 참조할 방법이 없음
// --> memory leak(메모리 누수) (자바는 자동으로 garbage collector에서 가르키지 않는 것 지움)

// function aaa() {    // 함수안에 넣어주면 mydom은 지역변수가 되어 영향을 안받음

/* ************************************************************************************* */

//메소드 추가 (플러그인 추가) --> jQuery 플러그인 : 메소드를 자유롭게 추가, open source

//attr 속성을 다루는 메소드
$.fn.attr = function(p_attr, p_val) {
    // 값을 리턴해야 하기 때문에, 
    // return this[0].getAttribute(p_attr); // 읽기
    for(var i = 0; i < this.length; i++) {
        this[i].setAttribute(p_attr, p_val);
    }
    return this;    //이것은 메소드 체이닝을 위한 것
}


/* ************************************************************************************* */
// 최초 선택된 객체들로 돌아가고파 end 메소드
$.fn.end = function() {
    return $(this.preSel);
}


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

// html -> innerHTML 속성을 컨트롤 하는 메소드
$.fn.html = function (p_arg) {
    if (!p_arg) {                       //읽기
        return this[0].innerHTML;
    } else if (typeof (p_arg) == "string") {    // 쓰기
        for (var i = 0; i < this.length; i++) {
            this[i].innerHTML = p_arg;
        }
        return this;
    } else if (typeof (p_arg) == "function") {  // 특별한 제어
        for (var i = 0; i < this.length; i++) {
            this[i].innerHTML = p_arg(i, this[i].innerHTML)
        }
        return this;
    } else {
        alert("저리 강 나도 몰랑 화가 나넹, 문서 좀 보고 왕");
    }
}
    // alert($("div").html());

