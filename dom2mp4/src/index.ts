import { openPage } from "./transform";

/**
 * 执行此函数来开启转换
 * @param input
 * @param output
 */
function transform(input: string, output: string) {
  return new Promise(async (resolve, reject) => {
    await openPage(input, output, resolve, reject);
  });
}


// 执行转换
transform("./data.json", "./video.mp4")
  .then((res) => {
    console.log("转换完成：", res);
  })
  .catch((err) => {
    console.log("转换失败：", err);
  });
