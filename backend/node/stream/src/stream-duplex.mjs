import { WebSocket, WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: 8080 }, () => {
    console.log("WebSocket 服务器启动成功")
})

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log("收到消息:", message.toString("utf-8"))
    })

    ws.on("pong", (data) => {
        console.log("收到 PONG:", data.toString("utf-8"))
    })

    ws.on("close", (code, reason) => {
        if (code === 1006) {
            console.log("连接异常关闭", reason.toString("utf-8"))
        }
    })

    setInterval(() => {
        ws.send('服务器时间: ' + new Date().toISOString())
    }, 2000)
})
