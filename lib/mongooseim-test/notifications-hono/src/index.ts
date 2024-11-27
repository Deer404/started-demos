import { Hono } from 'hono'
import { logger } from 'hono/logger'

// 定义通知消息的接口
interface PushNotification {
  author: string    // 发送消息的用户
  server: string    // 消息源服务器
  receiver: string  // 接收消息的用户
  message: string   // 消息内容
}

const app = new Hono()

// 添加日志中间件
app.use('*', logger())

// 健康检查接口
app.get('/', (c) => {
  return c.text('Notification Service is running!')
})

// 一个中间件,打印所有的请求
app.use('*', async (c, next) => {
  console.info(`${c.req.method} ${c.req.url}`)
  console.info('Headers:', c.req.raw.headers)
  if (c.req.method === 'POST') {
    const clone = c.req.raw.clone()
    const body = await clone.text()
    console.info('Request body:', body)
  }
  return next()
})

// 接收 MongooseIM 推送的接口
app.post('/api/push', async (c) => {
  try {
    const formData = await c.req.parseBody()
    
    const notification: PushNotification = {
      author: formData.author as string,
      server: formData.server as string,
      receiver: formData.receiver as string,
      message: formData.message as string
    }

    
    // 打印接收到的通知
    console.log('Received notification:', notification)

    return c.json({
      status: 'success',
      message: 'Notification received'
    })
  } catch (error) {
    console.error('Error processing notification:', error)
    return c.json({
      status: 'error',
      message: 'Failed to process notification'
    }, 500)
  }
})

// Start the server
export default {
  port: 3000,
  hostname: '0.0.0.0',  // 监听所有网络接口
  fetch: app.fetch
}
