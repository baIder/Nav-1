const $siteList = $(".siteList")
const $lastLi = $siteList.find("li.last")
const x = localStorage.getItem("x")
const xObject = JSON.parse(x)
// const hashMap = [
//   {logo: "B", url: "https://www.bootcdn.cn/"},
//   {logo: "G", url: "https://github.com/baIder"},
//   {logo: "I", url: "https://www.iconfont.cn/"},
//   {logo: "M", url: "https://gitee.com/"},
//   {logo: "P", url: "https://pixso.cn/"},
//   {logo: "W", url: "https://bald3r.wang/"},
// ]
const hashMap = xObject || [
  {logo: "B", url: "https://www.bootcdn.cn/"},
  {logo: "G", url: "https://github.com/baIder"},
  {logo: "I", url: "https://www.iconfont.cn/"},
  {logo: "M", url: "https://gitee.com/"},
  {logo: "P", url: "https://pixso.cn/"},
  {logo: "W", url: "https://bald3r.wang/"},
]
const $time = $('.headTime')


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
              <div class="close">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-cuo"></use>
                </svg>
              </div>
            </div>
        </li>
       `).insertBefore($lastLi)
    $li.on("click", (e) => {
      e.stopPropagation()
      window.open(node.url)
    })
    $li.find('div').find('div:last').on("click", (e) => {
      e.stopPropagation()
      hashMap.splice(index, 1)
      render()
    })
  })
}

render()

$(".addButton").on("click", (e) => {
  e.stopPropagation()
  let url = window.prompt("请问您要添加的网址是：")
  if (!url) {
    return
  }
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
$time[0].innerHTML = `${hh}:${mm}`
setInterval(() => {
  now = new Date()
  hh = addZero(now.getHours())
  mm = addZero(now.getMinutes())
  $time[0].innerHTML = `${hh}:${mm}`
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

//收藏网站
const $app = $('.app')
const $search = $('.search')
const $siteWrapper = $('.siteWrapper')
const showSite = () => {
  $searchBox.addClass('hidden')
  $time.addClass(('hidden'))
  $bgImg.addClass('focused')
  $('.weather').addClass('hidden')
  $('body').addClass('focused')
  $siteWrapper.removeClass('hidden')
  $app.addClass('hidden')
  $search.removeClass('hidden')
}
const showSearch = () => {
  $siteWrapper.addClass('hidden')
  $searchBox.removeClass('hidden')
  $time.removeClass(('hidden'))
  $bgImg.removeClass('focused')
  $('body').removeClass('focused')
  $app.removeClass('hidden')
  $search.addClass('hidden')
}
$app.on('click', () => {
  showSite()
})

$search.on('click', () => {
  showSearch()
})

$siteWrapper.on('click', () => {
  showSearch()
})