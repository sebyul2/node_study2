app.get('/board', function (req, res) { // /board로 접속시

  userModel.find({}, function(err, doc) {
    if (err) {}
    const dataToArray = []; // datatable 모듈에서는 배열로 데이터를 받습니다. 데이터를 넣을 배열 공간을 미리 만들어둡니다.
    for (let i=0; i<doc.length; i++) {  // 반복문을 통해 doc의 길이만큼 반복합니다.
      const item = doc[i] // doc는 배열로 되어있습니다. doc[0]은 배열의 0번째 데이터를 가져온다는 뜻입니다. 
      dataToArray.push([item.index, item.title, item.name, item.date, item.content])
    }
    schedule.find({}, function(err, doc) {
      if (err) {}
      const dataToArray = []; // datatable 모듈에서는 배열로 데이터를 받습니다. 데이터를 넣을 배열 공간을 미리 만들어둡니다.
      for (let i=0; i<doc.length; i++) {  // 반복문을 통해 doc의 길이만큼 반복합니다.
        const item = doc[i] // doc는 배열로 되어있습니다. doc[0]은 배열의 0번째 데이터를 가져온다는 뜻입니다. 
        dataToArray.push([item.index, item.title, item.name, item.date, item.content])
      }
      ddo.find({}, function(err, doc) {
        //asdf
      })
    })
    res.json(dataToArray)
  })

  userModel.find()
    .then(function (doc) {  // doc에 우리가 사용할 데이터가 들어있습니다.
      const dataToArray = []; // datatable 모듈에서는 배열로 데이터를 받습니다. 데이터를 넣을 배열 공간을 미리 만들어둡니다.
      for (let i=0; i<doc.length; i++) {  // 반복문을 통해 doc의 길이만큼 반복합니다.
        const item = doc[i] // doc는 배열로 되어있습니다. doc[0]은 배열의 0번째 데이터를 가져온다는 뜻입니다. 
        dataToArray.push([item.index, item.title, item.name, item.date, item.content])
      }
      return schedule.find()
    }).then(function (doc) {
      return schedule.find()
    }).then(function (doc) {
      return schedule.find()
    }).catch(function (err) {
      console.error(err) // 에러에 대한 로그입니다. 에러처리는 지금 할 필요가 없으므로 로그만 출력합니다.
    })
})

app.get('/board2', async (req, res) => {
  try {
    const doc = await userModel.find()
    const dataToArray = doc.map(item => [item.index, item.title, item.name, item.date, item.content])
    res.json(dataToArray)
  } catch (err) {
    console.error(err)
  }
})