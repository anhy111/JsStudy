
window.onload = function(){

    var v_form = document.querySelector("#id_rform");
    var v_gnum = request.getParameter("g_num");
    
    var v_gul = request.getGul(v_gnum);
    
    v_form.g_num.value = v_gul.gid;
    v_form.nm_title.value = v_gul.title;
    v_form.nm_writer.value = v_gul.writer;
    v_form.nm_content.value = v_gul.content;
}

