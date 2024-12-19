import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createProjectStructure(projectName) {
    const projectRoot = join(__dirname, projectName);

    // 创建项目目录结构
    const directories = [
        'src',
        'src/controllers',
        'src/models',
        'src/views',
        'public',
        'config'
    ];

    try {
        // 创建所有目录
        for (const dir of directories) {
            await mkdir(join(projectRoot, dir), { recursive: true });
        }

        // 创建基础配置文件
        await writeFile(
            join(projectRoot, 'package.json'),
            JSON.stringify({
                name: projectName,
                type: "module",
                version: "1.0.0"
            }, null, 2)
        );

        console.log(`项目 ${projectName} 创建成功！`);
    } catch (err) {
        console.error('项目创建失败:', err);
        throw err;
    }
}


// readLine可能更适合这里
// process.stdin.on("data")也可以
process.stdin.on("readable", async () => {
    let chunk = "";
    let res = "";
    // 需要循环读取，直到返回 null
    while ((chunk = process.stdin.read()) !== null) {
        const chunkContent = chunk.toString("utf-8").trim();
        console.log("chunkContent:", chunkContent)
        if (chunkContent) res += chunkContent
    }
    if (res) {
        try {
            await createProjectStructure(res)
            process.exit(0)
        } catch (e) {
            console.error(e)
        }
    } else {
        console.error("输入信息为空")
        return;
    }
})

