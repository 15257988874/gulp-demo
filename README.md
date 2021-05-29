# 安装
```
npm install
```

# 修改文件
下载完毕后，找到node_modules --> gulp-assets-rev -->index.js 修改为如下代码：
```
搜索verStr

var verStr = (options.verConnecter || "") + md5;
src=src+"?v="+verStr;
```

# 打包
```
gulp 或 npm run dev
```