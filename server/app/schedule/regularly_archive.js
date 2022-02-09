'use strict';

const Subscription = require('egg').Subscription;
const { spawn } = require('child_process');
class RegularlyArchive extends Subscription {

  // 配置触发规则
  static get schedule() {
    return {
      interval: '60m', // 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // 任务执行函数
  async subscribe() {
    console.log('[ 执行时间 ] >', new Date().getTime());
    /**
     * 通过spawn来执行转换视频的命令
     * input：events数据数组
     * output：视频文件输出地址
     *
     * 转换逻辑：
     *  1.通过puppeteer来加载DOM使用rrweb-player进行视频后台播放
     *  2.定时每秒15次通过DOM元素的screenshot函数获取数据流
     *  3.将每次截取的数据流写入ffmpegProcess进程
     */
    spawn(
      'rrvideo.cmd',
      [ '--input', './data.json', '--output', './rrvideo-output.mp4' ],
      {
        stdio: [ process.stdin, process.stdout, process.stderr ],
      }
    );
  }
}

module.exports = RegularlyArchive;
