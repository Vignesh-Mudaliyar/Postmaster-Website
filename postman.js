console.log('post man app');

/* we took the id of 'parameter 1' whole div and humne use gayab kar diya...because jab page refresh hota
 hai tab json already checked hai so...sirf json ka request hi dikhna chahiye so isiiye humne isko hide kar diya*/
let param = document.getElementById('param');
param.style.display = "none";

// we took the id of 'json request' whole div
let jsonrqst = document.getElementById('jsonrqst');

//  addevent listener(click) on json radio button in which we display the 'jsonrqst' and hide the 'parameter 1'(param)
let jso = document.getElementById('jsoon');
jso.addEventListener('click', () => {
    param.style.display = 'none';
    jsonrqst.style.display = 'block';
})


//  addevent listener(click) on 'custom parameter' radio button in which we hide the 'jsonrqst' and display the 'parameter 1'(param)
let CustomPara = document.getElementById('CustomPara');
CustomPara.addEventListener('click', () => {
    param.style.display = "block";
    jsonrqst.style.display = "none";

})

let plusbtn = document.getElementById('plusbtn');
var index = 0;
var j = 0;
plusbtn.addEventListener('click', (e) => {

    p = `<div class="row g-3" id="minusbtn${index + 2}abc">
    <legend class="col-form-label col-sm-2 pt-0">Parameter ${index + 2} :</legend>
    <div class="col-md-6" style="width: 300px;">
        <input type="text" class="form-control" id="key${index + 2}" placeholder="Enter Key Parameter">
    </div>
    <div class="col-md-6" style="width: 300px;">
        <input type="text" class="form-control" id="value${index + 2}" placeholder="Enter value Parameter">
    </div>
    <div class="col-md-6" style="width: 20px;">
        <button id="minusbtn${index + 2}" onclick="removeparam(this.id+'abc')" type="button" class="btn btn-primary" style="margin-bottom: 7px"> - </button>
    </div>
        </div>`;
    let a = document.createElement('div');
    a.setAttribute('id', `para${index + 2}`);
    a.innerHTML = p;
    param.append(a);
    index++;

})

function removeparam(params) {
    document.getElementById(params).remove();
    j++;
    if (j == index) {
        index = 0;
        j = 0;
    }
}

let submit = document.getElementById('submit');

submit.addEventListener('click', () => {

    var url = document.getElementById('url').value;
    var response = document.getElementById('response');
    let type;
    let get = document.getElementById('GET');
    let post = document.getElementById('POST');

    if (post.checked) {
        type = post.value;
        // console.log(type);
    }
    else {
        type = get.value;
        // console.log(type);
    }
    if (type == 'GET') {
        // response.innerHTML = 'fetching Response......Please Wait';
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            //    console.log(data);
            let getresult = JSON.stringify(data);
            response.innerHTML = getresult;
        })
    }
    else if (type == 'POST') {
        // let url = "http://dummy.restapiexample.com/api/v1/create";
        // let data = `{"name":"viyutt524","salary":"123","age":"23"}`;
        let fg =document.getElementById('jsoon');
        if (fg.checked) {
            var data = document.getElementById('jrequest').value;
        }
        else {
            data = {};
            let i=0;
            while (i<index+1) {
                    if(document.getElementById(`key${i + 1}`) != undefined)
                    {
                        let key = document.getElementById(`key${i + 1}`).value;
                        let value = document.getElementById(`value${i + 1}`).value;
                        data[key] = value;
                        i++;
                    }
            }
           data = JSON.stringify(data);
            console.log(data);
        }

        let params = {
            method: "post",
            headers: {
                // "Containt-Tpye": "application/json"
                "Containt-type": "application/json; charset=UTF-8"
            },
            body: data
        }
        fetch(url, params).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            let postresult = JSON.stringify(data);
            response.innerHTML = postresult;
        })
    }

})