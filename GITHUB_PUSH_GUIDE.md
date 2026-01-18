# GitHub 仓库创建与代码推送指南

## 1. 在 GitHub 上创建新仓库

1. 打开 GitHub 网站：https://github.com/ 并登录您的账号
2. 点击页面右上角的 `+` 图标，选择 `New repository`
3. 填写仓库信息：
   - **Repository name**: 输入仓库名称，例如 `smart-schedule-ai` 或 `zhichu-riji`
   - **Description**: 可选，输入仓库描述
   - **Visibility**: 选择 `Public`（公开）或 `Private`（私有）
4. 不要勾选 `Add a README file`（我们已经有了）
5. 不要勾选 `Add .gitignore`（我们已经有了）
6. 不要勾选 `Choose a license`（可选）
7. 点击 `Create repository`

## 2. 将本地仓库与 GitHub 远程仓库关联

创建仓库后，GitHub 会显示仓库的 HTTPS 或 SSH 地址。您需要将本地仓库与这个远程地址关联。

### 方法 1：使用 HTTPS 地址（推荐初学者）

在 GitHub 仓库页面，复制 HTTPS 地址（例如：https://github.com/your-username/your-repo.git）

然后在本地终端运行以下命令：

```bash

git remote add origin https://github.com/your-username/your-repo.git
```

### 方法 2：使用 SSH 地址（需要配置 SSH 密钥）

如果您熟悉 SSH，可以使用 SSH 地址（例如：git@github.com:your-username/your-repo.git）

```bash
git remote add origin git@github.com:your-username/your-repo.git
```

## 3. 推送本地代码到 GitHub

关联远程仓库后，运行以下命令将代码推送到 GitHub：

```bash
git push -u origin master
```

如果您的分支名称不是 `master`（例如是 `main`），请使用：

```bash
git push -u origin main
```

## 4. 验证推送是否成功

推送完成后，刷新 GitHub 仓库页面，您应该能看到所有的项目文件已经上传成功。

## 5. 部署到 Vercel/Netlify 等平台

现在您的代码已经在 GitHub 上了，可以按照之前的 `DEPLOYMENT_GUIDE.md` 指南，将代码仓库导入到 Vercel、Netlify 等平台进行部署：

1. 访问 Vercel（https://vercel.com/）或 Netlify（https://www.netlify.com/）
2. 使用 GitHub 账号登录
3. 点击 `New Project` 或 `Add new site`
4. 选择您刚刚创建的 GitHub 仓库
5. 按照平台提示完成部署配置
6. 部署完成后获得 HTTPS 网址

## 常见问题解决

### 问题 1：推送时需要输入 GitHub 用户名和密码

如果使用 HTTPS 地址推送，GitHub 可能会提示您输入用户名和密码。这是正常的安全验证步骤。

### 问题 2：SSH 连接失败

如果使用 SSH 地址推送失败，可能是因为您的 SSH 密钥未配置正确。请参考 GitHub 官方文档配置 SSH 密钥：
https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### 问题 3：推送被拒绝

如果推送时出现 `Updates were rejected` 错误，可能是因为远程仓库已经有了一些您本地没有的提交。这种情况比较少见，因为我们是刚刚创建的仓库。

如果确实遇到这种情况，可以尝试强制推送（谨慎使用）：

```bash
git push -u origin master --force
```

## 后续操作

代码推送成功后，您可以继续开发项目，并使用以下命令将更新推送到 GitHub：

```bash
git add .
git commit -m "描述您的更改"
git push
```