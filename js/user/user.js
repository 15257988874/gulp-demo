let user = { name: 'lux', age: 26, sex: '男', hobby: '打篮球', height: 172 }

const { hobby, height } = user
console.log(user)

const getUserInfo = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve, 1000, { ...user })
  })
}

// hello
// 你好

function sayHello() {
  console.log('hello,lux')
}

const getUserToken = async () => {
  return await new Promise(resolve => {
    setTimeout(resolve, 1000, 'token')
  })
}
