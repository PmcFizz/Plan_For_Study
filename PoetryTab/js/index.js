// for Poetry Js @Fizz

// 封装一个chrome专用ajax
function ajax(config) {
  const xhr = new XMLHttpRequest()
  xhr.open(config.methods, config.url, config.data)
  if(config.methods === 'POST') {
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  }
  if(config.methods === 'GET') {
    // for config.data
  }
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      config.successCb(xhr.responseText)
    } else {
      // console.log('xhr error', xhr.responseText)
    }
  }
}

// 请求诗数据
function loadPoetry () {
  let sendData = {
    url: 'http://115.159.52.223:3000/base/getPorjectInfo',
    methods: 'GET',
    successCb: function (res) {
      console.log(res)
    }
   }
   ajax(sendData)
}

loadPoetry()

// console.log(11111)
// document.getElementById('poetry-title').innerText = '1111111111'