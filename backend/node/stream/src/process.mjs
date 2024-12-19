import process from 'node:process';

// 处理多种信号
const signals = {
  'SIGTERM': 'SIGTERM',
  'SIGINT': 'SIGINT',  // Ctrl+C
  'SIGQUIT': 'SIGQUIT' // Ctrl+\
};

Object.keys(signals).forEach(signal => {
  process.on(signal, () => {
    console.log(`收到 ${signal} 信号`);
    gracefulShutdown(signal);
  });
});

// 未捕获的异常处理
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
  gracefulShutdown('uncaughtException');
});

// 未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
  gracefulShutdown('unhandledRejection');
});

// 优雅退出函数
function gracefulShutdown(signal) {
  console.log(`开始优雅退出... 触发信号: ${signal}`);
  
  // 模拟一些清理工作
  setTimeout(() => {
    console.log('清理工作完成');
    process.exit(0);
  }, 500);
}

// 保持进程运行
console.log('服务已启动，进程 ID:', process.pid);
console.log('你可以通过以下方式测试:');
console.log('1. Ctrl+C (SIGINT)');
console.log('2. kill -15', process.pid, '(SIGTERM)');
console.log('3. kill -3', process.pid, '(SIGQUIT)');

// 防止程序立即退出
setInterval(() => {
  console.log('服务运行中...', new Date().toLocaleTimeString());
}, 3000);
