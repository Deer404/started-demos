# 创建新的主目录
mkdir -p backend frontend/frameworks frontend/vanilla mobile desktop game

# Backend 移动和重命名
mv bun backend/bun
mv golang/fiber-demo backend/fiber
mv golang/gin-demo backend/gin
mv kotlin/springboot-kotline-demo backend/spring-boot
mv node/hono backend/hono
mv node/trpc-demo backend/trpc
mv node/wattpm-demo backend/wattpm
mv rust/actix-web-demo backend/actix
mv rust/zero2prod backend/zero2prod

# Frontend 移动和重命名
mv frontend/astro-demo frontend/frameworks/astro
mv frontend/nextjs frontend/frameworks/next
mv frontend/nuxt-demo frontend/frameworks/nuxt
mv frontend/remix frontend/frameworks/remix
mv frontend/solidjs-demo frontend/frameworks/solid
mv frontend/svelte frontend/frameworks/svelte
mv frontend/spa-react frontend/frameworks/react
mv frontend/html frontend/vanilla/html

# Mobile 移动
mv flutter mobile/flutter
mv web-app/flutter mobile/flutter-web

# Desktop 移动
mv web-app/tauri-demo-app desktop/tauri

# Game 移动
mv cocos-demo/3d-demo game/cocos

# 清理空目录
rm -rf golang kotlin node rust web-app cocos-demo frontend/demo-remix
