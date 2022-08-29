
window.onload = function() {
    var v_session = request.getSessionName();
    if(!v_session){
        request.loginModalOpen();
    } else{
        f_load();
    }
};


var v_form;
function f_load(){
    v_form = document.querySelector("#id_rform");
    var v_gnum = request.getParameter("g_num");

    // var v_titleText = v_form.nm_title;
    // var v_writerText = v_form.nm_writer;
    // var v_contentText = v_form.nm_content;

    
    var v_schGul = request.getGul(v_gnum);

    var v_tblStr = "";
    v_tblStr +=  "<input type='hidden' name='g_num' value=" + v_gnum + "></input>"
    
    v_tblStr += "<h3 style='margin:0px'>" + v_schGul.title + "</h3>";
    v_tblStr += "<br><h6>작성자: " + v_schGul.writer + "</h6>";
    v_tblStr += "<div class='date'>업데이트날짜: ";
    v_tblStr += v_schGul.date;
    v_tblStr += "</div>";
    v_tblStr += "<div class='readContent'>";
    v_tblStr += "<h5>" + v_schGul.content + "</h5>";
    v_tblStr += "</div>";

    v_tblStr += "<button class='button button5 btn1' type='submit'>수정</button>";
    v_tblStr += "<button id='id_del' class='button button5 btn1'>삭제</button>";
    v_form.innerHTML += v_tblStr;

    var v_delBtn = document.querySelector("#id_del");
    v_delBtn.addEventListener("click",f_del);
}

function f_del(){
    v_form.action="delete_action.html";
    v_form.submit();    // 폼 전송
}
























{/* <button class="button button5" type="submit">수정</button>
<button id="id_del" class="button button5" type="submit">삭제</button>

<a id="id_del" href="./delete_action.html" class="button button5">삭제</a> */}

