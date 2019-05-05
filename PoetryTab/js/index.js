// for Poetry Js @Fizz

// 封装一个chrome专用ajax
function ajax(config) {
  const xhr = new XMLHttpRequest()
  xhr.open(config.methods, config.url, config.data)
  if(config.methods === 'POST') {
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  }
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      config.successCb(xhr.responseText)
    } else {
      console.log('xhr error', xhr.responseText)
    }
  }
}

let sendData = {
  url: 'http://115.159.52.223:3000/base/getPorjectInfo',
  methods: 'GET',
  data: {
    as: 12
  },
  successCb: function (res) {
    console.log(res)
  }
}
ajax(sendData)

console.log(11111)
document.getElementById('poetry-title').innerText = '1111111111'