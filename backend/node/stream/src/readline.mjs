import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
})

rl.prompt();

// rl.question() 适合：	一次性的问答交互、简单的单个问题场景、代码结构更直观

// rl.question("你叫什么名字？\n", (answer) => {
//     try {
//         if (answer) {
//             console.log(`你好，${answer}`);
//             rl.close();
//         }
//     } catch (e) {
//         console.error(e)
//     }
// })

rl.on('line', (answer) => {
    try {
        const name = answer.trim();
        if (name) {
            console.log(`你好，${name}`);
            rl.close();
        } else {
            console.log('名字不能为空！');
            rl.prompt();  // 重新显示提示语
        }
    } catch (e) {
        console.error(e);
        rl.close();
    }
});