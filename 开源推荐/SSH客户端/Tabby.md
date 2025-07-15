# Tabby 终端模拟器：详细文档

## 简介

Tabby (原名 Terminus) 是一个现代化的、高度可定制的跨平台终端模拟器，支持本地 Shell、SSH、Telnet 和串行连接。它旨在为开发者、系统管理员和任何需要强大命令行工具的用户提供卓越的体验。

Tabby 的主要特点包括：

- **跨平台支持**：可在 Windows、macOS 和 Linux 上运行。
    
- **高度可定制**：提供丰富的UI定制选项，包括主题、字体、透明度和模糊效果。
    
- **多 Shell 支持**：无缝切换 Bash、Zsh、PowerShell、CMD、WSL、Fish 等多种 Shell。
    
- **内置 SSH 客户端**：无需外部工具，支持 SSH 密钥管理、密码认证、自定义 SSH 配置文件和持久化 SSH 会话。
    
- **ZMODEM 文件传输**：通过 SSH 会话直接进行文件上传和下载。
    
- **智能标签页**：标签页可以检测进程进度，并在完成后通知您。
    
- **分屏功能**：自由排列的分屏，并可保存为配置文件。
    
- **Quake 模式**：可选的停靠窗口，可通过全局热键快速显示/隐藏。
    
- **插件系统**：通过插件扩展功能和主题。
    
- **Unicode 支持**：完整支持 Unicode 字符，包括双宽度字符。
    
- **字体连字支持**：支持字体连字、Powerline 和 Nerd Fonts。
    

## 安装

Tabby 可以在其官方网站和 GitHub 仓库上找到。

- **官方网站**：[https://tabby.sh/](https://tabby.sh/)
    
- **GitHub 仓库**：[https://github.com/Eugeny/tabby](https://github.com/Eugeny/tabby)
    

您可以从官方网站下载适用于您操作系统的安装包。通常提供以下版本：

- **Windows**：`.exe` 安装程序或便携式 `.zip` 文件。
    
- **macOS**：`.dmg` 文件。
    
- **Linux**：`.deb` (for Debian/Ubuntu), `.rpm` (for Fedora/RHEL), 或 AppImage。
    

**安装步骤示例 (Windows):**

1. 访问 [https://tabby.sh/](https://tabby.sh/)。
    
2. 点击“Download”按钮，选择适用于 Windows 的安装程序（例如 `tabby-*-setup-x64.exe`）。
    
3. 下载完成后，运行安装程序并按照提示完成安装。
    

## 基本使用

安装并启动 Tabby 后，您会看到一个简洁的界面。

### 1. 本地 Shell

默认情况下，Tabby 会启动您的系统默认 Shell（例如 Windows 上的 PowerShell，Linux/macOS 上的 Bash 或 Zsh）。

- **打开新标签页**：点击界面顶部的 `+` 按钮，或使用快捷键 `Ctrl+Shift+T` (Windows/Linux) / `Cmd+Shift+T` (macOS)。
    
- **分屏**：右键点击标签页，选择“Split Pane”选项，或使用快捷键 `Ctrl+Shift+D` (Windows/Linux) / `Cmd+Shift+D` (macOS) 进行水平分屏，或 `Ctrl+Shift+E` (Windows/Linux) / `Cmd+Shift+E` (macOS) 进行垂直分屏。
    

### 2. SSH 连接

Tabby 内置了强大的 SSH 客户端，让您可以轻松管理远程服务器。

1. 点击左侧导航栏的“Connections”（连接）图标。
    
2. 点击“New connection”（新建连接）或“New SSH connection”（新建 SSH 连接）。
    
3. 填写连接详细信息：
    
    - **Name**：连接的名称（例如 `MyServer`）。
        
    - **Host**：远程服务器的 IP 地址或域名。
        
    - **Port**：SSH 端口（默认为 22）。
        
    - **Username**：登录用户名。
        
    - **Authentication**：选择认证方式（Password、Private key 等）。
        
        - **Password**：输入密码。
            
        - **Private key**：选择您的私钥文件。
            
4. 点击“Connect”（连接）保存并连接。
    

您可以创建多个 SSH 配置文件，方便快速连接不同的服务器。

### 3. 文件传输 (ZMODEM)

Tabby 支持通过 ZMODEM 协议在 SSH 会话中进行文件传输。

- **发送文件**：在 SSH 会话中，输入 `sz <filename>` 命令，Tabby 会弹出文件选择对话框，选择要发送的文件。
    
- **接收文件**：在 SSH 会话中，输入 `rz` 命令，Tabby 会弹出保存文件对话框，选择保存位置。
    

## 高级配置与定制

Tabby 提供了广泛的定制选项，让您可以根据个人喜好和工作流程进行调整。

### 1. 设置

点击左侧导航栏的“Settings”（设置）图标（齿轮状）进入配置界面。

- **Appearance (外观)**：
    
    - **Theme (主题)**：选择内置主题或安装新主题。
        
    - **Font (字体)**：更改终端字体和字号。
        
    - **Transparency (透明度)**：调整窗口透明度。
        
    - **Blur (模糊)**：启用背景模糊效果。
        
    - **Tab bar position (标签栏位置)**：将标签栏放置在顶部、底部、左侧或右侧。
        
- **Terminal (终端)**：
    
    - **Shell (Shell)**：设置默认 Shell。
        
    - **Cursor style (光标样式)**：更改光标形状。
        
    - **Bell (响铃)**：配置终端响铃行为。
        
    - **Copy on select (选中即复制)**：启用选中文本自动复制。
        
    - **Paste on right click (右键粘贴)**：启用右键粘贴功能。
        
- **Keybindings (快捷键)**：
    
    - 自定义所有 Tabby 操作的快捷键。
        
- **Plugins (插件)**：
    
    - 浏览并安装各种插件，以扩展 Tabby 的功能，例如 Docker 集成、Git 状态显示等。
        
- **Profiles (配置文件)**：
    
    - 创建和管理不同的 Shell 或 SSH 配置文件，每个配置文件可以有独立的设置。
        

### 2. 主题和插件

Tabby 的强大之处在于其可扩展性。您可以通过“Settings”->“Plugins”界面安装社区开发的主题和插件。

- **安装主题**：在插件列表中搜索“theme”，选择并安装您喜欢的主题。
    
- **安装插件**：在插件列表中搜索您需要的功能，例如“docker”、“git”等，然后安装相应的插件。
    

## 常见问题与技巧

- **性能问题**：如果 Tabby 运行缓慢，可以尝试禁用一些视觉效果（如模糊、透明度）或使用更轻量的主题。
    
- **字体渲染**：确保您的系统安装了所需的字体（如 Nerd Fonts，如果使用 Powerline 主题）。
    
- **快捷键冲突**：如果 Tabby 的快捷键与您的系统或其他应用程序冲突，可以在“Keybindings”设置中进行修改。
    
- **便携模式**：在 Windows 上，您可以在 `Tabby.exe` 所在的目录创建一个名为 `data` 的文件夹，Tabby 将以便携模式运行，所有配置都存储在该文件夹中。
    

## 总结

Tabby 是一款功能丰富、高度可定制的终端模拟器，为命令行用户提供了现代化的体验。无论您是开发者、系统管理员还是普通用户，Tabby 都能通过其直观的界面和强大的功能提升您的工作效率。