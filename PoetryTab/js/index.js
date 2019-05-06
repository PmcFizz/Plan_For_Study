// for Poetry Js @Fizz

// 封装一个chrome专用ajax
function ajax(config) {
  let xhr = new XMLHttpRequest()
  xhr.open(config.methods, config.url)
  if (config.methods === 'POST') {
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  }
  if (config.methods === 'GET') {
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    // for config.data
  }
  xhr.send()
  xhr.onreadystatechange = function () {
    console.log(xhr.responseText)
    if (xhr.readyState === 4 && xhr.status === 200) {
      config.successCb(xhr.responseText)
    } else {
      // console.log('xhr error', xhr.responseText)
    }
  }
}

// 请求诗数据
function loadPoetry() {
  let sendData = {
    url: 'http://115.159.52.223:3000/poetry/getOnePoetry',
    methods: 'GET',
    successCb: function (res) {
      let poetryData = JSON.parse(res).data
      document.querySelector("#poetry-title").innerText = poetryData.title
      let contentHtml = []
      for (let i = 0; i < poetryData.content.length; i++) {
        let item = poetryData.content[i]
        contentHtml.push(`<p class="poetry-content">${item}</p>`)
      }
      document.querySelector("#poetry-content-wrap").innerHTML = contentHtml.join('')
    }
  }
  ajax(sendData)
}
loadPoetry()