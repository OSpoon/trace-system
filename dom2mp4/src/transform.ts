import * as fs from "fs";
import * as path from "path";
import puppeteer, { Browser, Page } from "puppeteer";
import { spawn } from "child_process";

let state = "";
let _input: string = "";
let _output: string = "";
let _resolve: Function;
let _reject: Function;
let page: Page;
let browser: Browser;

export async function openPage(
  input: string,
  output: string,
  resolve: Function,
  reject: Function
) {
  _input = input;
  _output = output;
  _resolve = resolve;
  _reject = reject;

  try {
    browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();
    await page.goto("about:blank");
    // 扩展启动录制函数
    await page.exposeFunction("onReplayStart", async () => {
      await startReplay();
    });
    // 扩展结束录制函数
    await page.exposeFunction("onReplayFinish", async () => {
      await finishReplay();
    });
    // 读取原数据
    const events = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), _input), "utf-8")
    );
    await page.setContent(getHtml(events));
  } catch (error) {
    console.log("openPage：", error);
  }
}

async function startReplay() {
  state = "recording";
  const wrapperEl = await page.$(".replayer-wrapper");
  console.log("开始转换，请稍等。。。");
  const ffmpegProcess = spawn("D:\\ffmpeg\\bin\\ffmpeg", [
    // fps
    "-framerate",
    "15",
    // input
    "-f",
    "image2pipe",
    "-i",
    "-",
    // output
    "-y",
    _output,
  ]);
  let processError: Error | null = null;

  //  每秒15次定时执行
  const timer = setInterval(async () => {
    if (state === "recording" && !processError) {
      try {
        const buffer = await wrapperEl?.screenshot({
          encoding: "binary",
        });
        ffmpegProcess.stdin.write(buffer);
      } catch (error) {
        // ignore
      }
    } else {
      clearInterval(timer);
      if (state === "closed" && !processError) {
        console.log("转换结束");
        ffmpegProcess.stdin.end();
      }
    }
  }, 1000 / 15);

  ffmpegProcess.on("close", () => {
    if (processError) {
      return;
    }
    _resolve(_output);
  });
  ffmpegProcess.on("error", (error) => {
    if (processError) {
      return;
    }
    processError = error;
    _reject(error);
  });
  ffmpegProcess.stdin.on("error", (error) => {
    if (processError) {
      return;
    }
    processError = error;
    _reject(error);
  });
}

async function finishReplay() {
  state = "closed";
  await browser.close();
}

function getHtml(events: []) {
  // 获取rrweb-player的脚本插入到DOM中
  const rrwebScriptPath = path.resolve(
    require.resolve("rrweb-player"),
    "../../dist/index.js"
  );
  const rrwebStylePath = path.resolve(rrwebScriptPath, "../style.css");
  const rrwebRaw = fs.readFileSync(rrwebScriptPath, "utf-8");
  const rrwebStyle = fs.readFileSync(rrwebStylePath, "utf-8");
  // 基础DOM用来重放录制过程
  return `
        <html>
          <head>
              <style>${rrwebStyle}</style>
          </head>
          <body>
            <script>
              ${rrwebRaw};
              /*<!--*/
              const events = ${JSON.stringify(events).replace(
                /<\/script>/g,
                "<\\/script>"
              )};
              /*-->*/
              window.replayer = new rrwebPlayer({
                target: document.body,
                props: {
                  events,
                  showController: false,
                },
              });
              window.onReplayStart();
              window.replayer.play();
              window.replayer.addEventListener('finish', () => {
                  window.onReplayFinish()
              });
            </script>
          </body>
        </html>
        `;
}
