process.stdin.on("readable", () => {
    let chunk;
    // 需要循环读取，直到返回 null
    while ((chunk = process.stdin.read()) !== null) {
        console.log(chunk.toString("utf-8"));
    }
});