//先定义好数组内容，获取类型，针对类型筛选数组数据对应的渲染好的列表中
/*window.addEventListener("load",function(){
    let taskList = [
        {
            id: 1,  content:"竹杖芒鞋轻胜马",  time:"2019/6/6",  status:false
        },
        {
            id: 2,  content:"谁怕",  time:"2019/6/7",  status:false
        },
        {
            id: 3,  content:"一蓑烟雨任平生",  time:"2019/6/8",  status:true
        },
        {
            id: 4,  content:"定风波",  time:"2019/6/9",  status:false
        }
    ];

    // header头部标签获取
    let forms = document.forms[0];
    let text = forms.elements["content"];
    let submit = forms.elements["upload"];

    //提交按钮的点击事件，点击事件进行提交并进行渲染
    submit.onclick = function(e){
        e.preventDefault();
        let obj = creatObj();
        taskList.push(obj);
        render(filterType(type));
        saveData();
    }

    //全部完成与未完成li点击事件
    let lis = document.querySelectorAll("ul > li");
    let content = document.querySelector(".content");
    let prev = 0;
    let type = "all";
    for (let i = 0; i < lis.length; i++){
        lis[i].onclick = function(){
            lis[prev].classList.remove("hot");
            lis[i].classList.add("hot");
            prev = i;
            type = this.getAttribute("type");
            render(filterType(type));
        }
    }
    lis[0].onclick();//默认第一个有点击事件

    /!* *
    * 数据 ——> 视图、视图 ——> 数据
    * li ——> 数组元素
    * 复选框 ——> 数组元素状态  状态改变给li设置ID  （li ——> id）
    * *!/

    let check = document.querySelectorAll("input[type = checkbox]");
        // 备忘录中列表点击事件

    //事件委派1.
    //        2.
    content.onclick = function(e){
        let target = e.target;
        let id = target.parentNode.id;
        //input点击事件
        if (target.nodeName == "INPUT"){
            /!*find
            *findIndex
            * filter
            * *!/
            // let state = taskList.find(ele=>ele.id == id);
            // state.status = !state.status;
            // let stateIndex = taskList.findIndex(ele=>ele.id == id);
            // taskList[stateIndex].status = !taskList[stateIndex].status;
            let state = taskList.filter(ele=>ele.id == id)[0];
            state.status = target.checked;

        }else if(target.nodeName =="DEL"){
            /!*通过splice方法删除，逆推找下标index，用findIndex找到对应下标
            * 或者通过filter
            * *!/
            let index = taskList.findIndex(ele=>ele.id == id);
            taskList.splice(index,1);
        }
        render(filterType(type));
        saveData();
    }

    function filterType(type){
            let arr = [];
            switch (type) {
                case "all":
                    arr = taskList;
                    break;
                case "done":
                    // arr = taskList.filter(ele=>ele.status);
                    arr = taskList.filter(function(ele){
                        return ele.status;
                    });
                    break;
                case "doing":
                    // arr = taskList.filter(ele=>!ele.status);
                    arr = taskList.filter(function(ele){
                        return !ele.status;
                    });
                    break;
            }
            return arr;
        }

    //创建数组对象
    function creatObj(){
        // let id = taskList[taskList.length - 1].id + 1;
        let id = taskList.length + 1;
        let content = text.value;
        let time = new Date().toLocaleDateString();
        let status = false;
        return {id,content,time,status};
    }

    //头部点击添加，添加内容，通过本地存储
    let str = localStorage.getItem("taskList");
    if (!str){
        saveData();
        str = loaclStorage.getItem("taskList");
    }taskList = JSON.parse(str);

    function saveData(){
        localStorage.setItem("taskList",JSON.stringify(taskList));
    }

    //渲染
    function render(arr){
        let html = ``;
        arr.forEach(function(ele,index){
            if (ele.status) {
                html += `
                    <li id="${ele.id}">
                        <input type="checkbox" checked> <p>${ele.content}</p> <del>×</del> <time>${ele.time}</time>
                    </li>
            `
            }else{
                html += `
                    <li id="${ele.id}">
                        <input type="checkbox"> <p>${ele.content}</p> <del>×</del> <time>${ele.time}</time>
                    </li>
            `
            }
        });
        content.innerHTML = html;
        }

})*/

$(function(){
    let taskList = [
        {
            id: 1,  content:"竹杖芒鞋轻胜马",  time:"2019/6/6",  status:false
        },
        {
            id: 2,  content:"谁怕",  time:"2019/6/7",  status:false
        },
        {
            id: 3,  content:"一蓑烟雨任平生",  time:"2019/6/8",  status:true
        },
        {
            id: 4,  content:"定风波",  time:"2019/6/9",  status:false
        }
    ];

    let lis = $("ul > li");
    let content = $(".content");
    let text = $(":text");
    let submit = $(":submit");
    let type = "all";
    lis.on("click",function(){
        let This = $(this);
        This.addClass("hot").siblings("li").removeClass("hot");
        //给This添加hot类，并通过siblings的方法获取this的同辈元素并移除同辈元素的hot类
        type = This.attr("type");//返回This的属性值
        render(filterType(type));
    })
    lis.triggerHandler("click");//触发事件中第一个元素的事件处理函数

    content.on("click","input",function(){
        let This = $(this);
        //找父元素li的下标 This.parent     This.closest
        let parent = This.parent("li")[0];
        let id = parent.id;
        let state = taskList.filter(ele=>ele.id == id)[0];
        state.status = !state.status;
        render(filterType(type));
        saveData();
    })

    content.on("click","del",function(){
        let This = $(this);
        //找父元素li的下标 This.parent     This.closest
        let parent = This.parent("li")[0];
        let id = parent.id;
        let index = taskList.findIndex(ele=>ele.id == id);
        taskList.splice(index,1);
        render(filterType(type));
        saveData();
    })

    submit.on("click" , function(e){
        e.preventDefault();
        let obj = creatObj();
        taskList.push(obj);
        render(filterType(type));
        saveData();
    })

    function filterType(type){
        let arr = [];
        switch (type) {
            case "all":
                arr = taskList;
                break;
            case "done":
                arr = taskList.filter(ele=>ele.status);
                /*arr = taskList.filter(function(ele){
                    return ele.status;
                });*/
                break;
            case "doing":
                arr = taskList.filter(ele=>!ele.status);
                /*arr = taskList.filter(function(ele){
                    return !ele.status;
                });*/
                break;
        }
        return arr;
    }

    let str = localStorage.getItem("taskList");
    if (!str){
        saveData();
        str = loaclStorage.getItem("taskList");
    }taskList = JSON.parse(str);

    function saveData(){
        localStorage.setItem("taskList",JSON.stringify(taskList));
    }

    //创建数组对象
    function creatObj(){
        // let id = taskList[taskList.length - 1].id + 1;
        let id = taskList.length + 1;
        let content = text.val();
        let time = new Date().toLocaleDateString();
        let status = false;
        return {id,content,time,status};
    }
    //渲染
    function render(arr){
        let html = ``;
        arr.forEach(function(ele,index){
            if (ele.status) {
                html += `
                    <li id="${ele.id}">
                        <input type="checkbox" checked> <p>${ele.content}</p> <del>×</del> <time>${ele.time}</time>
                    </li>
            `
            }else{
                html += `
                    <li id="${ele.id}">
                        <input type="checkbox"> <p>${ele.content}</p> <del>×</del> <time>${ele.time}</time>
                    </li>
            `
            }
        });
        content.html(html);
    }

})



