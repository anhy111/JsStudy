
var v_gulTbl = "gesiTB";
var v_memTbl = "memTB";

var request = {};

// Get방식 읽기, 지우기
request.getParameter = function(p_name){  //name을 넘기면 value를 리턴해줌
    if (location.href.indexOf("?") == -1) return null;
    var v_queryString = location.href.split("?")[1];
    var v_nvSsang = v_queryString.split("&");
    for(var i=0; i<v_nvSsang.length; i++){
        var nv = v_nvSsang[i].split("=");
        if(nv[0] == p_name){
            return decodeURIComponent(nv[1]).replaceAll("+"," ");
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
            v_values.push(decodeURIComponent(nv[1]).replaceAll("+"," "));
        }
    }
    if(v_values.length == 0){
        return null;    // 못찾으면 null반환
    }
    return v_values;    
}

request.deleteParameter = function(p_pid){

    var v_dataArr = JSON.parse(localStorage.getItem(v_gulTbl));

    for(var i=0; i<v_dataArr.length; i++) {
        if(v_dataArr[i].pid == p_pid){
            v_dataArr.splice(i, 1); // i 부터 1개 지움
            break;
        }
    }
    localStorage.setItem(v_gulTbl, JSON.stringify(v_dataArr));
}

// 날짜형식 출력(String)
request.getDateToString = function(){
    var today = new Date();
    var month = today.getMonth()>10 ? today.getMonth() : "0"+today.getMonth();
    var date = today.getDate()>10 ? today.getDate() : "0"+today.getDate();
    var hours = today.getHours()>10 ? today.getHours() : "0"+today.getHours();
    var minutes = today.getMinutes()>10 ? today.getMinutes() : "0"+today.getMinutes();
    return today.getFullYear() + "/"
            + month + "/"
            + date + " "
            + hours + ":"
            + minutes;
}

// 게시글 CRUD
request.getGul = function(p_gid){
    var v_dataArr = JSON.parse(localStorage.getItem(v_gulTbl));
    for(var i=0; i<v_dataArr.length; i++){
        if(v_dataArr[i].gid == p_gid){
            return v_dataArr[i];
        }
    }
    return null;
}

request.updateGul = function(p_gul){
    var v_tbl = JSON.parse(localStorage.getItem(v_gulTbl));

    for(var i=0; v_tbl.length; i++){

        if(v_tbl[i].gid == p_gul.gid){
            p_gul.date = this.getDateToString();
            v_tbl[i] = p_gul;
            localStorage.setItem(v_gulTbl,JSON.stringify(v_tbl));
            return 1;
        }
    }
    return 0;
}

request.deleteGul = function(p_gid){
    var v_tbl = JSON.parse(localStorage.getItem(v_gulTbl));
    for(var i=0; v_tbl.length; i++){

        if(v_tbl[i].gid == p_gid){
            v_tbl.splice(i,1);
            localStorage.setItem(v_gulTbl,JSON.stringify(v_tbl));
            return 1;
        }
    }
    return 0;
}

request.deleteGuls = function(v_arr){
    for(var i=0; i<v_arr.length; i++){
        this.deleteGul(v_arr[i]);
    }
}

request.insertGul = function(p_gul){
    var v_tbl;
    if(this.isEmptyGul()){
        v_tbl = [];
        p_gul.gid = 1;
    } else{
        v_tbl = JSON.parse(localStorage.getItem(v_gulTbl));
        p_gul.gid = v_tbl[v_tbl.length-1].gid + 1
    }
    p_gul.date = this.getDateToString();
    v_tbl.push(p_gul);
    localStorage.setItem(v_gulTbl,JSON.stringify(v_tbl));

}

request.getAllGul = function(){
    if(this.isEmptyGul()){
        return null;
    }
    return JSON.parse(localStorage.getItem(v_gulTbl));
}

request.isEmptyGul = function(){
    var v_tbl = JSON.parse(localStorage.getItem(v_gulTbl));

    if(!v_tbl || v_tbl.length == 0){
        return 1;
    }
    return 0;
}

// 회원 CRUD
request.insertMember = function(p_mem){
    var v_tbl;
    if(this.isEmptyMem()){
        v_tbl = [];
    } else{
        v_tbl = JSON.parse(localStorage.getItem(v_memTbl));
    }
    v_tbl.push(p_mem);
    localStorage.setItem(v_memTbl,JSON.stringify(v_tbl));
}

request.getMember = function(p_id){
    if(this.isEmptyMem()){
        return null;
    }
    var v_dataArr = JSON.parse(localStorage.getItem(v_memTbl));
    for(var i=0; i<v_dataArr.length; i++){
        if(v_dataArr[i].id == p_id){
            return v_dataArr[i];
        }
    }
    return null;
}

request.getAllMem = function(){
    if(this.isEmptyMem()){
        return null;
    }
    return JSON.parse(localStorage.getItem(v_memTbl));
}

request.isEmptyMem = function(){
    var v_tbl = JSON.parse(localStorage.getItem(v_memTbl));

    if(!v_tbl || v_tbl.length == 0){
        return 1;
    }
    return 0;
}

request.ExistsMemName = function(p_name){
    var v_mems = this.getAllMem();

    if(!v_mems || v_mems.length == 0){
        return 0;
    }

    for(var i=0; i<v_mems.length; i++){
        if(v_mems[i].name == p_name){
            return 1;
        }
    }
    return 0;
}

// 로그인
request.loginModalOpen = function(){
    var v_login = document.querySelector(".login");
    v_login.style.display = "flex";
}

request.loginModalClose = function(){
    var v_login = document.querySelector(".login");
    v_login.style.display = "none";
}

request.login = function(){
    var v_id = document.querySelector("#id_loginID").value;
    var v_pw = document.querySelector("#id_loginPW").value;
    v_mem = this.getMember(v_id);
    if(!v_mem && v_mem.pw == v_pw){
        swal('로그인 성공','목록으로 이동합니다.','success')
            .then(function(){
                
            });
    } else{
        swal('로그인 실패','ID 또는 PW가 다릅니다.','error')
            .then(function(){
                return;
            });
    }

    this.loginModalClose();
}

// 회원가입
request.signupOpen = function(){
    var v_modal = document.querySelector(".signup");
    v_modal.style.display = "flex";
    
}

request.signupClose = function(){
    var v_modal = document.querySelector(".signup");
    v_modal.style.display = "none";
}

request.signup = function(){
    var v_id = document.querySelector("#id_signID");
    var v_pw = document.querySelector("#id_signPW");
    var v_name = document.querySelector("#id_signName");

    if(!v_id.value){ 
        swal("ID를 입력해주세요.");
        return;
    } else if(!v_pw.value){
        swal("PW를 입력해주세요.");
        return;
    } else if(!v_name.value){
        swal("닉네임을 입력해주세요.");
        return;
    }

    if(this.getMember(v_id.value) != null){
        // 멤버 존재
        swal("중복된 id가 존재합니다");
        return;
    } else if(this.ExistsMemName(v_name.value)){
        swal("중복된 닉네임이 존재합니다");
        return;
    }
    v_mem = {};
    v_mem.id = v_id.value;
    v_mem.pw = v_pw.value;
    v_mem.name = v_name.value;
    this.insertMember(v_mem);
    swal('회원가입 성공','환영합니다.','success')
        .then(function(){
            request.signupClose();        
        });
}


//더미
request.dummy = function(){
    for(var i=1; i<=105; i++){
        var v_gul={};
        v_gul.title = "제목" + i;
        v_gul.writer = "작성자" + i;
        v_gul.content = "내용" + i;
        this.insertGul(v_gul);
    }
    location.reload();
}

