const gulp = require('gulp')
const uglify = require('gulp-uglify') //js压缩
const cleanCSS = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer') // css添加前缀
const revCollector = require('gulp-asset-rev') //给js  css加版本号
// const connect = require('gulp-connect')
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const clean = require('gulp-clean')
// const open = require('open')
const webpack = require('webpack-stream')
const named = require('vinyl-named')

const jsUrl = './js/**/*.js'
const cssUrl = './css/**/*.css'
const htmlUrl = './views/**/*.html'
const imgUrl = './img/**/*.{png,jpg,gif,ico}'
const libUrl = './lib/**/*'
const htmlminOptions = {
  removeComments: true, //清除HTML注释
  collapseWhitespace: true, //压缩HTML
  collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
  removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
  removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
  removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
  minifyJS: true, //压缩页面JS
  minifyCSS: true //压缩页面CSS
}
// 清空目录
gulp.task('clean', function () {
  return gulp.src('dist').pipe(clean())
})

//监听改动的文件
gulp.task('watchs', function () {
  gulp.watch(htmlUrl, gulp.series('html'))
  gulp.watch(cssUrl, gulp.series('css'))
  gulp.watch(jsUrl, gulp.series('js'))
})

gulp.task('html', function () {
  return (
    gulp
      .src(htmlUrl)
      .pipe(htmlmin(htmlminOptions))
      .pipe(
        revCollector({
          replaceReved: true
        })
      )
      .pipe(gulp.dest('./dist/views'))
      // .pipe(connect.reload())
      .pipe(notify({ message: 'HTML文件压缩完毕' }))
  )
})

gulp.task('index', function () {
  return (
    gulp
      .src('./index.html')
      .pipe(htmlmin(htmlminOptions))
      .pipe(
        revCollector({
          replaceReved: true
        })
      )
      .pipe(gulp.dest('./dist/'))
      // .pipe(connect.reload())
      .pipe(notify({ message: '首页压缩完毕' }))
  )
})

gulp.task('css', function () {
  return (
    gulp
      .src(cssUrl)
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(autoprefixer())
      .pipe(
        revCollector({
          replaceReved: true
        })
      )
      .pipe(gulp.dest('./dist/css')) //当前对应css文件
      // .pipe(connect.reload())
      .pipe(notify({ message: 'CSS文件压缩完毕' }))
  )
})

gulp.task('js', function () {
  return (
    gulp
      .src(jsUrl)
      // .pipe(
      //   babel({
      //     presets: ['@babel/env']
      //   })
      // )
      .pipe(
        named(function (file) {
          return file.relative.split('.')[0]
        })
      )
      .pipe(
        webpack({
          mode: 'production'
        })
      )
      .pipe(
        revCollector({
          replaceReved: true
        })
      )
      .pipe(
        uglify({
          mangle: { toplevel: true }, //类型：Boolean 默认：true 是否修改变量名
          compress: true //类型：Boolean 默认：true 是否完全压缩
          //preserveComments: all //保留所有注释
        })
      ) //压缩js
      .pipe(gulp.dest('./dist/js'))
      // .pipe(connect.reload())
      .pipe(notify({ message: 'js文件压缩完毕' }))
  )
})

gulp.task('image', function () {
  return (
    gulp
      .src(imgUrl)
      .pipe(gulp.dest('./dist/img'))
      // .pipe(connect.reload())
      .pipe(notify({ message: '图片压缩完毕' }))
  )
})

gulp.task('library', function () {
  return gulp
    .src(libUrl)
    .pipe(gulp.dest('./dist/lib'))
    .pipe(notify({ message: 'lib复制完毕' }))
})

gulp.task('default', gulp.series('clean', gulp.parallel('watchs', 'image', 'index', 'html', 'css', 'js', 'library')))
