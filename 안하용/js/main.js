
window.onload = function() {

    var v_list = document.querySelector('#id_list');
    var v_dataArr = request.getAllGul();
    
    
    var v_pDsu = 10;    // 페이지당 10개 보여줌
    var v_pageNum = request.getParameter('pageNum');
    if(!v_pageNum){
        v_pageNum = 1;
    }
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
    var v_sNum = (v_pageNum - 1) * v_pDsu;  
    var v_eNum = v_sNum + v_pDsu;
    
    if(v_eNum > (v_totalG)){
        v_eNum = v_totalG; 
    }
    
    var v_tblStr = "<table class='table table-sm' style='text-align:center'>";
    v_tblStr += "<tr><th>순번</th><th>제목</th><th>글쓴이</th>";
    v_tblStr += "<th>날짜</th><th>삭제</th></tr>";
    for(var i=v_sNum; i<v_eNum; i++){
        var v_ggul = v_dataArr[i];
        v_tblStr += "<tr>";
        v_tblStr += "<td>" + (i+1) + "</td>";
        v_tblStr += "<td><a href=read.html?g_num=" + v_ggul.gid +">" + v_ggul.title + "</a></td>";
        v_tblStr += "<td>" + v_ggul.writer + "</td>";
        v_tblStr += "<td>" + v_ggul.date + "</td>";
        v_tblStr += "<td><input type=checkbox name='nm_del' value="+ v_ggul.gid +"></td>";
        v_tblStr += "</tr>";
    }
    v_tblStr += "</table>";
    v_tblStr += "<div class='pNum'>";
    v_tblStr += "<a class=active href='main.html?pageNum='"+ --v_pageNum +"><</a>";
    for(var i=1; i<=v_pageCount; i++){
        if(i == v_pageNum) {
            v_tblStr += "<a class=active href='main.html?pageNum="+i+"'>" + i + "</a>";
        } else{
            v_tblStr += "<a class=active href='main.html?pageNum="+i+"'>" + i + "</a>";
        }
    }
    v_tblStr += "<a class=active href='main.html?pageNum='"+ ++v_pageNum+">></a>";
    v_tblStr += "</div>";
    v_list.innerHTML = v_tblStr;
}

function f_dels(){
    var v_checks = document.querySelectorAll("input[type=checkbox]");
    var v_checkeds = [];
    for(var i=0; i<v_checks.length; i++){
        if(v_checks[i].checked){
            v_checkeds.push(v_checks[i].value);
        }
    }
    request.deleteGuls(v_checkeds);

    location.reload();
}