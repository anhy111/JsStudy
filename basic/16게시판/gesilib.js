
/*  
    인코딩 함수          디코딩 함수
    escape              unescape            옛날
    encodeURI           decodeURI           조금 옛날
    encodeURIComponent  decodeURIComponent  최근
    짝맞춰 사용하는 것이 중요함(일부 글자 인코딩이 서로 다름)
*/
var request = {};
request.getParameter = function(p_name){  //name을 넘기면 value를 리턴해줌
    if (location.href.indexOf("?") == -1) return null;
    var v_queryString = location.href.split("?")[1];
    var v_nvSsang = v_queryString.split("&");
    for(var i=0; i<v_nvSsang.length; i++){
        var nv = v_nvSsang[i].split("=");
        if(nv[0] == p_name){
            return decodeURIComponent(nv[1]);
        }
    }
    return null;    // 못찾으면 null반환
}
request.getParameterValues = function (p_name){  //name을 넘기면 value를 리턴해줌
    if (location.href.indexOf("?") == -1) return null;
    var v_queryString = location.href.split("?")[1];
    var v_nvSsang = v_queryString.split("&");
    var v_values = [];
    for(var i=0; i<v_nvSsang.length; i++){
        var nv = v_nvSsang[i].split("=");
        if(nv[0] == p_name){
            v_values[v_values.length] = decodeURIComponent(nv[1]);
        }
    }
    if(v_values.length == 0){
        return null;    // 못찾으면 null반환
    }
    return v_values;    
}
