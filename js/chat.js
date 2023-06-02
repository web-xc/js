$(function () {
    // 初始化右侧滚动条 这个方法定义在scroll.js中
    resetui()
    $('.send').click(function () {
        // 1. 获取输入框长度
        let text = $('.input').val().trim()

        // 判断用户是否输入了内容
        // 如果没有输入则退出 并清空内容
        if (text.length <= 0) {
            return $('.input').val('')
        }

        // 如果用户输入了内容则追加到页面中
        $('.talk_list').append(`
        <li class="right_word">
        <img src="img/person02.png"/><span>${text}</span></li>`)
        // 清空输入内容
        $('.input').val('')

        // 2. 重置滚动条位置
        resetui()
        // 6. 发起请求 调用fn()获取聊天内容
        fn(text)
    })
    
    // 3. 获取聊天机器人发送过来的消息
    function fn(text) {
        $.ajax({
            type: 'GET',
            url: 'http://ajax-api.itheima.net/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                // console.log(res)
                if (res.data.type !== 5000) return alert('发生错误 暂时无法回复您呢')
                // 4. 接收聊天消息
                let msg = res.data.info.text
                $('.talk_list').append(`
                <li class="left_word">
                <img src="img/person01.png"/><span>${msg}</span></li>`)
                // 5. 重置滚动条位置
                resetui()
                // 调用voice函数 把文字转换为语音
                // voice(msg)
            }
        })
    }
    // 7. 把文本转换为语音进行播放
    // function voice() {
    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://ajax-api.itheima.net/api/robot',
    //         data: {text: text},
    //         success: function (res) {
    //             console.log(res)
    //             // 8. 播放语音
    //             if (res.message !== 200) {
    //                 $('.voice').attr('scr', res.voiceUrl)
    //             }
    //         }
    //     })
    // }
    // 9. 使用回车发送消息
    // $('.input').keyup(function (e) {
    //     console.log(e.keyCode) // 当前键盘编码
    //     if (e.keyCode == 13) {
        // 调用send事件
    //         $('.send').click()
    //     }
    // })
    document.querySelector('.input').addEventListener('keyup', function (e) {
        if (e.key == 'Enter') {
            document.querySelector('.send').click()
        }
    })
})