import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🐱</span>
            <span className="text-xl font-bold text-purple-800">JustCat</span>
          </div>
          <div className="space-x-4">
            <button className="text-gray-600 hover:text-purple-600">
              登录
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700">
              注册
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <span className="bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm">
            全新上线
          </span>
          <h1 className="text-5xl font-bold text-purple-800 mt-6 mb-6">
            JustCat
          </h1>
          <p className="text-xl text-gray-600 mb-4">您的智能猫咪健康管家</p>
          <p className="text-gray-500 mb-8">
            已有超过 3,000+ 猫咪加入我们的健康管理计划
          </p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors">
            立即开始免费体验
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 text-center">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-3xl font-bold text-purple-600">3,000+</div>
            <div className="text-gray-600">注册猫咪</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-3xl font-bold text-purple-600">98%</div>
            <div className="text-gray-600">准确率</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-3xl font-bold text-purple-600">24/7</div>
            <div className="text-gray-600">健康监测</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-3xl font-bold text-purple-600">50+</div>
            <div className="text-gray-600">合作宠物医院</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-purple-600 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">智能数据记录</h3>
            <p className="text-gray-600 mb-4">
              全方位记录您爱猫的生活数据，让每一个细节都不被遗忘
            </p>
            <ul className="text-gray-500 space-y-2">
              <li>• 饮食记录与分析</li>
              <li>• 如厕习惯监测</li>
              <li>• 睡眠质量追踪</li>
              <li>• 运动量统计</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-purple-600 text-4xl mb-4">⚖️</div>
            <h3 className="text-xl font-semibold mb-2">专业体重管理</h3>
            <p className="text-gray-600 mb-4">
              智能分析体重变化趋势，及时发现健康隐患
            </p>
            <ul className="text-gray-500 space-y-2">
              <li>• AI体重预警系统</li>
              <li>• 个性化饮食建议</li>
              <li>• 体重趋势图表</li>
              <li>• 品种标准对比</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-purple-600 text-4xl mb-4">🔔</div>
            <h3 className="text-xl font-semibold mb-2">贴心健康提醒</h3>
            <p className="text-gray-600 mb-4">
              定期体检、疫苗接种提醒，让您的猫咪健康无忧
            </p>
            <ul className="text-gray-500 space-y-2">
              <li>• 疫苗接种提醒</li>
              <li>• 驱虫计划管理</li>
              <li>• 体检预约服务</li>
              <li>• 用药提醒助手</li>
            </ul>
          </div>
        </div>

        {/* App Preview */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              强大的健康管理功能
            </h2>
            <p className="text-gray-600">一站式解决猫咪健康管理的所有需求</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">智能体重秤连接</h3>
                  <p className="text-gray-600">
                    支持主流智能体重秤自动数据同步
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <span className="text-2xl">🏥</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">电子病历管理</h3>
                  <p className="text-gray-600">
                    与合作医院同步，随时查看就医记录
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">AI 健康分析</h3>
                  <p className="text-gray-600">基于大数据的健康风险预警</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-500 mb-2">应用界面预览</div>
              <div className="aspect-[9/16] bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">App 界面预览图</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            铲屎官们的评价
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">😺</span>
                </div>
                <div className="ml-4">
                  <div className="font-semibold">王小明</div>
                  <div className="text-gray-500 text-sm">橘猫 LUCKY 的主人</div>
                </div>
              </div>
              <p className="text-gray-600">
                "自从用了
                JustCat，再也不用担心忘记给猫咪打疫苗了，健康记录一目了然！"
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">😸</span>
                </div>
                <div className="ml-4">
                  <div className="font-semibold">李女士</div>
                  <div className="text-gray-500 text-sm">英短 MOMO 的主人</div>
                </div>
              </div>
              <p className="text-gray-600">
                "体重管理功能特别好用，帮助我家 MOMO 成功减重，兽医都夸我们！"
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">😺</span>
                </div>
                <div className="ml-4">
                  <div className="font-semibold">张医生</div>
                  <div className="text-gray-500 text-sm">宠物医院院长</div>
                </div>
              </div>
              <p className="text-gray-600">
                "作为兽医，我向所有猫主推荐这款 App，让专业的健康管理变得简单。"
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-purple-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            开始呵护您的猫咪健康
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            加入数千位爱猫人士的行列，让科技守护爱猫的健康。现在注册即可获得 30
            天专业版体验！
          </p>
          <div className="space-x-4">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors">
              免费下载 App
            </button>
            <button className="border border-purple-600 text-purple-600 px-8 py-3 rounded-full hover:bg-purple-50 transition-colors">
              预约演示
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-500 text-sm">
          <div className="mb-4">
            <a href="#" className="mx-2 hover:text-purple-600">
              关于我们
            </a>
            <a href="#" className="mx-2 hover:text-purple-600">
              使用条款
            </a>
            <a href="#" className="mx-2 hover:text-purple-600">
              隐私政策
            </a>
            <a href="#" className="mx-2 hover:text-purple-600">
              联系我们
            </a>
          </div>
          <div>© 2024 JustCat. All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
}
