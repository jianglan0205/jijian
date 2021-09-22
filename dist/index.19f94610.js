(function () {
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList = $(".siteList");
  // 找到siteList,可以console.log($siteList)一下
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$$lastLi = $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList.find("li.last");
  // 在siteList里找li下面的.last
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$x = localStorage.getItem('x');
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$xObject = JSON.parse($16b5ad875ae907e2f7f79e7b8fe116cc$var$x);
  // 如果xObject存在就用,不存在就用我默认的下面这个
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap = $16b5ad875ae907e2f7f79e7b8fe116cc$var$xObject || [{
    logo: "A",
    url: "https://www.acfun.cn"
  }, {
    logo: "B",
    url: "https://www.bilibili.com"
  }];
  // 搞一个哈希表放那些网站
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl = url => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
  };
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$render = () => {
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList.find('li:not(.last)').remove();
    // 把siteList里面所有li都找到,但是唯独不找最后一个li
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.forEach((node, index) => {
      // index拿到下标方便做删除
      console.log(index);
      const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${$16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>  
                </div>
            </li>
        `).insertBefore($16b5ad875ae907e2f7f79e7b8fe116cc$var$$lastLi);
      $li.on('click', () => {
        window.open(node.url);
      });
      // 用window.open来代替我们去掉的a标签跳转
      $li.on('click', '.close', e => {
        e.stopPropagation();
        console.log($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap);
        $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.splice(index, 1);
        // 数组删除,从index这里删除一个
        // 虽然删了,但没有重新渲染,要重新render一下
        $16b5ad875ae907e2f7f79e7b8fe116cc$var$render();
      });
    });
  };
  // ${}插值法,JS语法
  $16b5ad875ae907e2f7f79e7b8fe116cc$var$render();
  $(".addButton").on("click", () => {
    let url = window.prompt('请问你要添加的网址是啥?');
    if (url.indexOf('http') !== 0) {
      url = "https://" + url;
    }
    console.log(url);
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.push({
      logo: $16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl(url)[0].toUpperCase(),
      url: url
    });
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$render();
  });
  // .toUpperCase()变成大写
  window.onbeforeunload = () => {
    const string = JSON.stringify($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap);
    window.localStorage.setItem('x', string);
  };
  // localStorage全局变量,window.可省略.接受2个值,key和value
  // 意思就是在本地的存储里设置一个X它的值就是string
  // f12里Application里localStorage可以看目前的值
  window.onbeforeunload = () => {
    const string = JSON.stringify($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap);
    localStorage.setItem('x', string);
  };
  $(document).on('keypress', e => {
    const {key} = e;
    // const key = e.key的简写,变量名和属性名一样的话,可以简写
    for (let i = 0; i < $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.length; i++) {
      if ($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap[i].logo.toLowerCase() === key) {
        window.open($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap[i].url);
      }
    }
  });
})();

//# sourceMappingURL=index.19f94610.js.map
