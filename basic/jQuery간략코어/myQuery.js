(function(){
    // new 키워드를 없애고 싶었음
    $ = function(p_sel){
        return new myDom(p_sel);
    }
    var myDom = function(p_sel){
        var v_elems = document.querySelectorAll(p_sel);
        this.length = v_elems.length;
        for(var i=0; i<v_elems.length; i++){   
            this[i] = v_elems[i];
        }
        return this;    // 이것으로 myDom 함수는 class라는 걸 명시적으로 알려줌
    }


    window.$ = $;
    $.fn = myDom.prototype; // prototype속성을 fn속성으로 밖으로 꺼냄
})();

//메서드
$.fn.eq = function(p_index){
    // return this[p_index];
    // 안 바쁜 사람은 여기를 어떻게 바꾸면 실제 jQuery의 eq처럼
    // 메서드 체이닝 되게 만들 수 있는지
    return this;
}

// innerHTML속성을 컨트롤하는 메서드, 필수 메서드
$.fn.html = function(p_arg){
    if(!p_arg){ // 매개변수 값 없이 불려졌을떄, 읽기를 위함
        // jQuery개발팀은 그냥 첫번째 선택된 것의 innerHTML을 리턴하기로 함
        return this[0].innerHTML;
    }

    if(typeof(p_arg) == "string"){      // 쓰기
        for(var i=0; i<this.length; i++){
            this[i].innerHTML = p_arg;
        }
    }

    if(typeof(p_arg) == "function"){        // 유연하게쓰기
        console.log("선언:",this);
        for(var i=0; i<this.length; i++){
            this[i].innerHTML = p_arg.call(this[i],i,this[i].innerHTML);
        }
    }
    return this;
}
// 필수 메서드 태그의 속성을 제어하는 메서드, set/getAttribute
$.fn.attr = function(p_arg1, p_arg2){   // 읽기
    if(typeof(p_arg1) == "string" && !p_arg2){
        return this[0][p_arg1]; //첫 번째 요소의 해당속성값만 리턴
    }

    if(typeof(p_arg1) == "string" && typeof(p_arg2) == "string"){   //쓰기
        for(var i=0; i<this.length; i++){
            this[i][p_arg1] = p_arg2;
        }
        return this;    // 메서드 체이닝 구현
    }

    if(typeof(p_arg1) == "object" && !p_arg2){
        for(var i=0; i<this.length; i++){
            for(var v_attr in p_arg1){      // 객체 속성 loop -> for in문
                this[i][v_attr] = p_arg1[v_attr];
            }
        }
        return this;     // 메서드 체이닝 구현
    }
    
    if(typeof(p_arg1) == "string" && typeof(p_arg2) == "function"){   // 플렉서블 쓰기
        for(var i=0; i<this.length; i++){
            this[i][p_arg1] = p_arg2.call(this[i],i,this[i][p_arg1]);
        }
        return this;     // 메서드 체이닝 구현
    } 
}   
// jQuery val() 메서드처럼 동작하도록 만들어보기.
// html() 메서드 참고하고 이해하면서
// val() 메서드는 value속성을 편하게 취급하기 위한 메서드
$.fn.val = function(p_arg){
    if(!p_arg){                     // 읽기
        return this[0].value;
    }

    if(typeof(p_arg) == "string"){
        for(var i=0; i<this.length; i++){      // 쓰기
            this[i].value = p_arg;
        }
    }

    if(typeof(p_arg) == "function"){        // 함수로 쓰기
        for(var i=0; i<this.length; i++){
            // call은 함수넘겨줄 때 this를 사용할 수 있도록 선언함
            this[i].value = p_arg.call(this[i],i,this[i].value);
        }
    }

    return this;
}

$.fn.click = function(p_arg){
    for(var i=0; i<this.length; i++){
        this[i].onclick = p_arg;
    }
    return this;
}

$.fn.on = function(p_str, p_cb){
    for(var i=0; i<this.length; i++){
        this[i].addEventListener(p_str,p_cb);
    }
    return this;
}

$.fn.empty = function(){
    for(var i=0; i< this.length; i++){
        this[i].innerHTML = "";
    }
    return this;    // 메서드 체이닝
}