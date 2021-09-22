const $siteList = $(".siteList")
//找到siteList,可以console.log($siteList)一下
const $lastLi = $siteList.find("li.last")
//在siteList里找li下面的.last
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

//如果xObject存在就用,不存在就用我默认的下面这个
const hashMap = xObject || [
    { logo: "A", url: "https://www.acfun.cn" },
    { logo: "B", url: "https://www.bilibili.com" }
]
//搞一个哈希表放那些网站

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    //把siteList里面所有li都找到,但是唯独不找最后一个li
    hashMap.forEach((node, index) => {
        //index拿到下标方便做删除
        console.log(index)
        const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>  
                </div>
            </li>
        `).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        //用window.open来代替我们去掉的a标签跳转
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            console.log(hashMap)
            hashMap.splice(index, 1)
            //数组删除,从index这里删除一个
            //虽然删了,但没有重新渲染,要重新render一下
            render()
        })
        //阻止close的冒泡,这样点击X就不会跳转页面
    })
};
//${}插值法,JS语法
render()

$(".addButton")
    .on("click", () => {
        let url = window.prompt('请问你要添加的网址是啥?')
        if (url.indexOf('http') !== 0) {
            url = "https://" + url;
        }
        console.log(url);
        hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url });
        render()
    });
//.toUpperCase()变成大写

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    window.localStorage.setItem('x', string)
}
//localStorage全局变量,window.可省略.接受2个值,key和value
//意思就是在本地的存储里设置一个X它的值就是string
//f12里Application里localStorage可以看目前的值

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const { key } = e
    //const key = e.key的简写,变量名和属性名一样的话,可以简写
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})