const $siteList = $(".siteList")
const $lastLi = $siteList.find("li.last")
const x = localStorage.getItem("x")
const xObject = JSON.parse(x)
const hashMap = xObject || [
  {logo: "A", url: "https://www.acfun.cn"},
  {logo: "B", url: "https://bilibili.com"},
]
const $time = $('.headTime')[0]


const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "")
}

const render = () => {
  $siteList.find("li:not(.last)").remove()
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
            <div class="site">
              <div class="logo">${node.logo}</div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </div>
            </div>
        </li>
       `).insertBefore($lastLi)
    $li.on("click", () => {
      window.open(node.url)
    })
    $(".close").on("click", (e) => {
      console.log("111")
      e.stopPropagation()
      hashMap.splice(index, 1)
      render()
    })
  })
}

render()

$(".addButton").on("click", () => {
  let url = window.prompt("请问您要添加的网址是：")
  console.log(url)
  if (url.indexOf("http") !== 0) {
    url = "https://" + url
  }
  console.log(url)
  hashMap.push({logo: simplifyUrl(url)[0], url: url})
  render()
})

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem("x", string)
}

// $(document).on("keypress", (e) => {
//   const {key} = e
//   for (let i = 0; i < hashMap.length; i++) {
//     if (hashMap[i].logo.toLowerCase() === key) {
//       window.open(hashMap[i].url)
//     }
//   }
// })

const vpW = $(window).width()
const vpH = $(window).height()

window.onresize = function () {
  location.reload()
}


//显示时间
let hh = 0
let mm = 0
const addZero = (number) => {
  return number < 10 ? '0' + number : number
}
let now = new Date()
hh = addZero(now.getHours())
mm = addZero(now.getMinutes())
$time.innerHTML = `${hh}:${mm}`
setInterval(() => {
  now = new Date()
  hh = addZero(now.getHours())
  mm = addZero(now.getMinutes())
  $time.innerHTML = `${hh}:${mm}`
}, 1000)

//实现搜索
const $searchText = $('#searchText')
const $btnSearch = $('.btnSearch')

$btnSearch.on('click', () => {
  search()
})

$searchText.on('keypress', (e) => {
  const {key} = e
  if (key === 'Enter') {
    search()
  }
})

const search = () => {
  const searchContent = $searchText.val()
  window.open(`https://www.baidu.com/s?wd=${searchContent}`)
}

//实现聚焦效果
const $searchBox = $('.searchBox')
const $searchBoxIcon = $('.icon')
const $bgImg = $('.bgImg')
const $bgShade = $('.bgShade')
$searchBox.on('click', () => {
  $searchBoxIcon.addClass('active')
  $searchBox.addClass('focused')
  $bgImg.addClass('focused')
  $('body').addClass('focused')
  $('.weather').removeClass('hidden')
})
$bgShade.on('click', () => {
  $searchBoxIcon.removeClass('active')
  $searchBox.removeClass('focused')
  $bgImg.removeClass('focused')
  $('.weather').addClass('hidden')
})


//weather
const topNavFontColor = "ffffff"
WIDGET = {
  "CONFIG": {
    "modules": "01234",
    "background": "5",
    "tmpColor": topNavFontColor,
    "tmpSize": "16",
    "cityColor": topNavFontColor,
    "citySize": "16",
    "aqiColor": topNavFontColor,
    "aqiSize": "16",
    "weatherIconSize": "24",
    "alertIconSize": "18",
    "padding": "10px 10px 10px 10px",
    "shadow": "0",
    "language": "auto",
    "fixed": "false",
    "vertical": "top",
    "horizontal": "left",
    "key": "bc8690592c1f49fe952797f3ceeebfa3"
  }
}