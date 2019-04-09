'use strict'

const path = require('path')
const express = require('express')
const mongoose = require('mongoose') // 몽구스 odm(object data mapping)모듈. 몽고DB를 orm처럼 사용하게 해주는 모듈입니다.
const userModel = require('./model/user-model') // 몽구스로 만든 user model입니다.

const app = express()

// static resource
app.use(express.static(path.join(__dirname, 'public')))

// app.get - read

// app.post - create

// app.delete - delete

// app.put - update

//게시판 조회
app.get('/board', function (req, res) { // /board로 접속시
  // 유저 모델에서 find() 함수를 사용하여 전체 데이터를 불러옵니다. 괄호 안에 아무것도 넣지 않으면 전체를 가져옵니다.
  userModel.find()
    // .then으로 연결한 부분엔 성공시 결과를 받아옵니다. < * promise 문법입니다.>
    .then(function (doc) {  // doc에 우리가 사용할 데이터가 들어있습니다.
      const dataToArray = []; // datatable 모듈에서는 배열로 데이터를 받습니다. 데이터를 넣을 배열 공간을 미리 만들어둡니다.
      for (i=0; i<doc.length; i++) {  // 반복문을 통해 doc의 길이만큼 반복합니다.
        const item = doc[i] // doc는 배열로 되어있습니다. doc[0]은 배열의 0번째 데이터를 가져온다는 뜻입니다. 
        // doc[0]은 다시 {index:0, title:'제목', name:'이름', date:'날짜', content:'내용'} 형식으로 되어있습니다.
        // doc[0].index로 0번째 데이터의 index를, doc[0].title 로 0번째 데이터의 title을 가져올 수 있습니다.
        // i는 0부터 doc의 길이까지 반복하므로 길이가 3이라면 doc[i]은 doc[0], doc[1], doc[2]가 될것입니다.
        // (0부터 시작하여 3번 반복)
        // 편의상 길이를 줄이기 위해 doc[i]를 item에 넣었습니다.
        // dataToArray.push()는 데이터를 배열로 뒤쪽부터 넣어줍니다.
        // 반복문이므로 doc[0]에 있는 내용부터 doc[마지막]까지 차곡차곡 쌓이게 될것입니다.
        dataToArray.push([item.index, item.title, item.name, item.date, item.content])
      }
      res.json(dataToArray)
    // .catch로 연결한 부분엔 실패시 에러를 받아옵니다. < * promise 문법입니다.>
    }).catch(function (err) {
      console.error(err) // 에러에 대한 로그입니다. 에러처리는 지금 할 필요가 없으므로 로그만 출력합니다.
    })
})

// 게시판 조회 (최신 문법 + map)
// async를 사용하면 .then, .catch(이와 같은 문법을 사용하는 것을 프로미스라 합니다)를 하지 않고도
// 보다 간결하게 비동기 코드를 작성할 수 있습니다. es6 (node.js 8버전) 이상부터 지원합니다.
// 또한 arrow function 문법을 명시적으로 사용해서 비교해보았습니다.
// 특별한 경우 제외하고는 일반적인 function (arg) {} 문법을 (arg) => {}로 대체 할 수 있습니다.
// (arg) => {} 는 arg => 형태로 괄호를 생략할 수 있습니다.
app.get('/board2', async (req, res) => { // async 형태로 선언된 함수 내에서만 await이 가능합니다.
                                         // 의미는 비동기용 함수로 작성하겠다는 의미이며,
                                         // await을 만날 경우 값을 받아올 때까지 무한정 대기하게 됩니다.
  try { // async await 문법을 이용하면 catch를 사용할 수 없으므로 try .. catch 문법으로 오류를 체크하게 됩니다.
    const doc = await userModel.find()  // await 문법이므로 find()의 값을 얻어올때까지 대기했다가 받아옵니다.
    // 함수형 문법인 map을 사용했습니다. map은 배열 형태의 내용을 반복하면서 특정 값을 변환하여 반환할 때 사용합니다.
    // return 문법을 생략하고 한줄로 작성한 문법으로 return을 집어넣는다면 아래와 같은 형태가 됩니다.
    // doc.map(item => {
    //   return [item.index, item.title, item.name, item.date, item.content]
    // })
    // 배열의 내용을 return 한 내용으로 교체해서 변환(mapping) 해줄때 유용한 함수입니다.
    const dataToArray = doc.map(item => [item.index, item.title, item.name, item.date, item.content])
    res.json(dataToArray) // json 형태로 데이터를 최종적으로 리턴합니다. 
                          // 브라우저에나 클라이언트 api에서 우리가 보는 데이터는 dataToArray의 내용이 될것입니다.
  } catch (err) {
    console.error(err) // 에러에 대한 로그입니다. 에러처리는 지금 할 필요가 없으므로 로그만 출력합니다.
  }
})

app.set('port', process.env.PORT || 8080)

const connectionUrl = 'mongodb://root:password@localhost:27017/study?authSource=admin' // db 접속 주소입니다.
                                                                                       // mongodb://계정이름:비밀번호@url주소:포트/db명?authSorce=admin
                                                                                       // authSorce=admin이 있어야 미리 정의한 계정/비밀번호로 로그인이 됩니다.
const options = { useNewUrlParser: true }

mongoose.connect(connectionUrl, options)  // 몽구스를 promise 문법으로 접속합니다.
  .then(() => { // 성공시 .then으로 진입됩니다.
    const server = app.listen(app.get('port'), () => {  // express로 서버를 실행합니다.
      console.log('Express server listening on port ' + server.address().port) // 성공이면 로그를 찍습니다.
    })
  }).catch(error => { // 실패시 .catch로 진입됩니다.
    console.log('error: ', error)
  })
