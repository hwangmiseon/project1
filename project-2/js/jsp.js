/*
    서버 프로그램 없이 마치 서버프로그램이 동작하는 것처럼 현재 사기를 치고 있음
    그것이 가능한 이유 : 요청 내용이 주소표시줄에 남아있는 것을 이용함, 결국 get 방식으로만 가능하다
*/

// 쿼리스트링에서 원하는 값 찾기 일반화
var request = {};  // 빈 객체 생성
// 1개만 리턴
request.getParameter = function(p_schName) {  // 사용자 메소드 추가, 찾는값 매개변수로 받음
    var v_urlStr = location.href;
    if(v_urlStr.indexOf("?") != -1) { // ? 가 있는지 확인
        var v_queryString = v_urlStr.split("?")[1];     // ? 의 오른쪽 문자열 저장
        var v_params = v_queryString.split("&");        // & 를 기준으로 자른 문자열을 배열로 저장
        for(var i = 0; i < v_params.length; i++) {
            var v_name = v_params[i].split("=")[0];     // = 를 기준으로 왼쪽 아이디값 저장
            var v_value = v_params[i].split("=")[1];    // = 를 기준으로 오른쪽 value값 저장
            if(v_name == p_schName) {
                return decodeURIComponent(v_value).replaceAll("+"," "); // nm_id 의 값을 받아서 값이 있는지 확인
            }
        }
    }
    // 쿼리스트링이 없거나 내가 찾는값을 잘못 보냈거나 
    return null;    // 이런 거 정하는 것임
}

// 그룹으로 넘어간 값 배열로 리턴
request.getParameterValues = function(p_schName) {
    var v_urlStr = location.href;
    var v_rsltArr = [];
    if(v_urlStr.indexOf("?") != -1) { 
        var v_queryString = v_urlStr.split("?")[1];
        var v_params = v_queryString.split("&");
        for(var i = 0; i < v_params.length; i++) {
            var v_name = v_params[i].split("=")[0];
            var v_value = v_params[i].split("=")[1];
            
            if(v_name == p_schName) {
                v_rsltArr.push(decodeURIComponent(v_value).replaceAll("+"," ")); // nm_id 의 값을 받아서 값이 있는지 확인
            }
        }
    }
    if(!v_rsltArr.length) {
        return null; 
    }
    return v_rsltArr;
}
