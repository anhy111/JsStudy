
var v_lgStatus = document.querySelector("#id_loginStatus");
var v_headTitle = document.querySelector("#id_headTitle"); 
var v_checkLogin = document.querySelector("#id_newGul");
var v_login = document.querySelector(".login");
var v_signup = document.querySelector(".signup");
var v_loginContent = document.querySelector(".loginContent");
var v_signupContent = document.querySelector(".signupContent");
var v_loginMouseover = false;
var v_signupMouseover = false;


if(request.getSessionName() != null){
    v_lgStatus.innerHTML = "로그아웃";
    v_lgStatus.onclick = request.logout;
}

v_loginContent.onmouseover = function(){
    v_loginMouseover = true;
}
v_loginContent.onmouseout = function(){
    v_loginMouseover = false;
}

v_signupContent.onmouseover = function() {
    v_signupMouseover = true;
}

v_signupContent.onmouseout = function() {
    v_signupMouseover = false;
}
v_login.addEventListener("mousedown", function(){
    if(!v_loginMouseover && (v_signup.style.display == "none" || !v_signup.style.display)){
        v_login.style.display = "none";
    }
})

v_signup.addEventListener("mousedown", function(){
    if(!v_signupMouseover){
        v_signup.style.display = "none";
    }
})


function f_check(){
    if(request.getSessionName() == null){
            request.loginModalOpen();
    } else{
        location.href = "./write.html";
    }
}

function f_check2(){
    if(request.getSessionName() == null){
        event.preventDefault();
        request.loginModalOpen();
    } else{
        location.href = "./read.html";
    }
}

function f_check3(){
    if(request.getSessionName() == null){
        request.loginModalOpen();
    } else{
        f_dels();
    }
}

function myGul(){
    if(request.getSessionName() == null){
        request.loginModalOpen();
        return;
    }
    request.registerSchWriter(request.getSessionName());
    location.reload();
}

function allGul(){
    request.deleteSchWriter();
    location.reload();
}

function f_dels(){
    var v_checks = document.querySelectorAll("input[type=checkbox]");
    var v_session = request.getSessionName();
    var v_checkeds = [];
    var v_writer;
    for(var i=0; i<v_checks.length; i++){
        v_writer = v_checks[i].parentElement.parentElement.children[2].innerHTML
        if(v_checks[i].checked && v_writer == v_session){
            v_checkeds.push(v_checks[i].value);
        }
    }
    swal({
        title: "글을 일괄삭제합니다",
        text: "글을 삭제하시면 다시 불러올 수 없습니다.\n 자신의 글만 삭제가 가능합니다.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                request.deleteGuls(v_checkeds);
                swal("글을 일괄삭제합니다.", {
                icon: "success",
                });
                location.reload();
            } else {
                swal("삭제를 취소합니다");
            }
        });
}



window.onload = function() {

    var v_list = document.querySelector('#id_list');
    var v_dataArr; 

    if(request.getSchWriter()){
        v_dataArr = request.schGulsForWriter();
    } else{
        v_dataArr = request.getAllGul();
    }
    
    
    var v_pDsu = 10;    // 페이지당 10개 보여줌
    var v_pageNum = request.getParameter('pageNum');
    var v_pgNum = "";
    
    if(!v_pageNum){
        v_pgNum = 1;
    } else if(v_pageNum.indexOf('#') != -1){
        for(var i=0; i<v_pageNum.indexOf('#'); i++){
            v_pgNum += v_pageNum[i];
        }
    } else{
        v_pgNum = v_pageNum;
    }
    v_pgNum *= 1; // Number로 변환

    if(!v_dataArr){
        var v_tblStr = "<table class='table' style='text-align:center'>";
        v_tblStr += "<tr><th>순번</th><th>제목</th><th>글쓴이</th>";
        v_tblStr += "<th>날짜</th><th>삭제</th></tr>";
        v_tblStr += "<tr>";
        v_tblStr += "<td colspan=5>글이 존재하지 않습니다.</td>";
        v_tblStr += "</tr>";
        v_tblStr += "</table><br><br>";
        v_list.innerHTML = v_tblStr;
        return;
    }

    var v_totalG = v_dataArr.length; 
    var v_pageCount = Math.ceil(v_totalG/v_pDsu); 
    // 페이지 시작, 끝 번호필요
    // 0~9, 10~19 ...
    var v_sNum = (v_pgNum - 1) * v_pDsu;  
    var v_eNum = v_sNum + v_pDsu;
    
    if(v_eNum > (v_totalG-1)){
        v_eNum = v_totalG; 
    }
    

    if(request.getSchWriter()){
        v_headTitle.innerHTML = "나의 글";
    } else{
        v_headTitle.innerHTML = "전체 글";
    }
    var v_tblStr = "<table class='table table-sm' style='text-align:center'>";
    v_tblStr += "<tr><th>No</th><th>제목</th><th>글쓴이</th>";
    v_tblStr += "<th>날짜</th><th>삭제</th></tr>";
    for(var i=v_sNum; i<v_eNum; i++){
        var v_ggul = v_dataArr[i];
        v_tblStr += "<tr class='tabletr'>";
        v_tblStr += "<td class='tableNo'>" + (i+1) + "</td>";
        v_tblStr += "<td class='tableTitle'><a href=read.html?g_num=" + v_ggul.gid +" onclick='f_check2()'>" + v_ggul.title + "</a></td>";
        v_tblStr += "<td class='tableWriter'>" + v_ggul.writer + "</td>";
        v_tblStr += "<td class='tableDate'>" + v_ggul.date + "</td>";
        v_tblStr += "<td class='tableDelete'><input type=checkbox name='nm_del' value="+ v_ggul.gid +"></td>";
        v_tblStr += "</tr>";
    }
    v_tblStr += "</table>";
    v_tblStr += "<div class='pNum'>";
    v_tblStr += "<a href='main.html?pageNum="+ (v_pgNum > 1 ? v_pgNum-1 : v_pageCount) +"'><</a>";
    for(var i=1; i<=v_pageCount; i++){
        if(i == v_pgNum) {
            v_tblStr += "<a id='id_active' href='main.html?pageNum="+i+"'>" + i + "</a>";
        } else{
            v_tblStr += "<a href='main.html?pageNum="+i+"'>" + i + "</a>";
        }
    }
    v_tblStr += "<a href='main.html?pageNum="+ (v_pgNum < v_pageCount? v_pgNum+1 : 1)+"'>></a>";
    v_tblStr += "</div>";
    v_list.innerHTML = v_tblStr;
}
