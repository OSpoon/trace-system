### 如何将rrweb录制的数据转为视频

* 梳理rrvideo执行过程（省略参数处理，配置项）

1. 使用puppeteer打开空白页面
2. 组装最简的支持rrweb-player播放的DOM结构
3. 在rrweb-player播放前启动录制
4. 通过puppeteer提供的screenshot函数定时截屏获取数据流
5. 执行ffmpeg命令并将截屏数据输入到ffmpeg进程
6. 播放结束后关闭进程得到输出的视频文件

