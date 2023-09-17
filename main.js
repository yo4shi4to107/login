

var api_url = 'https://script.google.com/macros/s/AKfycby1_EZVUPbjG5S99zFxOn7BdT3hxBqC73yYauUsSOKTjTCQ_eKxQ_tWYM1xk852FSbz/exec';

function check(){

  var userName = document.getElementById('userName');
  var passWord = document.getElementById('passWord');
  var sentText = document.getElementById('sentText');
  var sentUrl = document.getElementById('sentUrl');

  let loginCheck = false;


  fetch(api_url)
  .then(function (fetch_data) {
    return fetch_data.json();
  })
  .then(function (json) {
    for (var i in json) {

      if(userName.value == json[i].image){

        if(passWord.value == json[i].name){
          loginCheck = true;
          sentText.innerText = json[i].price;
          sentUrl.setAttribute('href', json[i].url);
          sentUrl.innerText = json[i].url;
          break;

        }
      }
    }
  });

  if(loginCheck == false){
    sentText.innerText = "ユーザーネームまたはパスワードが間違っています。"
  }


}


function registration() {


  let registName = document.getElementById("registName").value;
  let registPassword = document.getElementById("registPassword").value;
  let registText = document.getElementById("registText").value;
  let registUrl = document.getElementById("registUrl").value;
  let programmerCheck = document.getElementById("programmerCheck").value;

  var registcheck = document.getElementById('registcheck');
  let PCPW = false;
  let operation = true;

  //var PCPW = string(programmerCheck);













  fetch(api_url)
  .then(function (fetch_data) {
    return fetch_data.json();
  })
  .then(function (json) {
    for (var i in json) {
      if(programmerCheck == json[i].pcpw){
        PCPW = true;
        regist();
        break;
      }
    }
  });



  if(PCPW == false){
    registcheck.innerText = "正しいPCPWを入力してください。"
  }











  function regist(){
    fetch(api_url)
    .then(function (fetch_data) {
      return fetch_data.json();
    })
    .then(function (json) {
      for (var i in json) {
        if(registName == json[i].image){
          operation = false;
          registcheck.innerText = "このユーザーネームは既に登録されています。登録をキャンセルしました。"
          break;
        }
      }
    });

    if(operation == true){
      const Http = new XMLHttpRequest();
      const url = api_url+'?registchecker=ok&q='+registName+'&pass='+registPassword+"&text="+registText+"&url="+registUrl+"&checkpcpw="+programmerCheck;
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
      }
      registcheck.innerText = "登録されました。"
    }
  }
}
