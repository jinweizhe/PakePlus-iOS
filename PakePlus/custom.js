window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// ===== 以下为新增：自有 App 受信任标识 =====
// 给 App 内所有请求统一加 x-app-client 头，后端识别后跳过滑块验证。
// 注意不要改动上面原有代码；只维护这段 SECRET 与后端 .env 的 APP_CLIENT_SECRET 一致即可。
;(function () {
    var SECRET = 'xjapp_a7f3c92e51b84d6f9c20e1b7d3a5f6c8'
    var _open = XMLHttpRequest.prototype.open
    XMLHttpRequest.prototype.open = function (method, url) {
        var ret = _open.apply(this, arguments)
        try { this.setRequestHeader('x-app-client', SECRET) } catch (e) {}
        return ret
    }
})()
