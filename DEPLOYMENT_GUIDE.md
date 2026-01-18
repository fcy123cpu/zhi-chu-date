# 智楚日记 - 网站部署指南

由于您的项目是一个PWA（渐进式Web应用），需要部署到支持HTTPS的服务器上才能使用PWABuilder等工具打包成APK。以下是几种常见的部署方法：

## 1. Vercel 部署（推荐）

Vercel是一个免费的静态网站托管服务，支持自动部署和全球CDN。

### 部署步骤：
1. 访问 https://vercel.com/ 并使用GitHub/GitLab/Bitbucket账号登录
2. 点击"New Project"，选择"Import Git Repository"
3. 连接您的代码仓库（如果项目还没有上传到GitHub等平台，需要先上传）
4. 配置项目：
   - **Framework Preset**: 选择 "Vite"
   - **Build Command**: 保持默认 `npm run build`
   - **Output Directory**: 保持默认 `dist`
5. 点击"Deploy"按钮
6. 部署完成后，您将获得一个以 `.vercel.app` 结尾的HTTPS网址

## 2. Netlify 部署

Netlify也是一个流行的静态网站托管服务，提供免费方案。

### 部署步骤：
1. 访问 https://www.netlify.com/ 并注册账号
2. 点击"Add new site" → "Import an existing project"
3. 连接您的代码仓库
4. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. 点击"Deploy site"
6. 部署完成后，您将获得一个以 `.netlify.app` 结尾的HTTPS网址

## 3. GitHub Pages 部署

如果您的项目已经在GitHub上，可以直接使用GitHub Pages部署。

### 部署步骤：
1. 在项目根目录创建 `deploy.sh` 脚本：
   ```bash
   #!/usr/bin/env sh
   
   # 构建
   npm run build
   
   # 进入构建输出目录
   cd dist
   
   # 如果是首次部署，初始化git仓库
   git init
   git checkout -b main
   git add -A
   git commit -m 'deploy'
   
   # 推送到GitHub Pages分支
   git push -f git@github.com:YOUR_USERNAME/YOUR_REPO.git main:gh-pages
   
   cd -n
   ```
2. 运行脚本：`bash deploy.sh`
3. 部署完成后，访问 `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## 4. Cloudflare Pages 部署

Cloudflare Pages提供免费的静态网站托管和全球CDN加速。

### 部署步骤：
1. 访问 https://pages.cloudflare.com/ 并登录
2. 点击"Create a project" → "Connect to Git"
3. 选择您的代码仓库
4. 配置构建设置：
   - **Framework preset**: 选择 "Vite"
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. 点击"Save and Deploy"
6. 部署完成后，您将获得一个以 `.pages.dev` 结尾的HTTPS网址

## 5. 本地测试部署

如果您只是想在本地测试PWA功能，可以使用 `http-server` 或 `serve` 工具启动一个简单的HTTP服务器：

```bash
# 使用http-server
npm install -g http-server
http-server dist -p 3000

# 或使用serve
npm install -g serve
serve -s dist -p 3000
```

然后在浏览器中访问 `http://localhost:3000`

## 注意事项

1. **HTTPS 要求**：PWA必须在HTTPS环境下运行才能使用完整功能，所以部署时必须使用支持HTTPS的服务

2. **Service Worker 配置**：项目中的 `sw.js` 文件已经包含了必要的PWA配置，但在某些托管环境中可能需要额外设置

3. **自定义域名**：所有上述服务都支持绑定自定义域名，如果您有自己的域名，可以在部署完成后进行配置

4. **环境变量**：如果您的项目使用了环境变量（如 `.env.local` 中的 `GEMINI_API_KEY`），需要在部署平台上相应地配置这些变量

部署完成后，您就可以使用部署后的HTTPS网址来打包APK文件了！