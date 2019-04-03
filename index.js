'use strict'

const express = require('express')
const path = require('path')

const app = express()

// static resource
app.use(express.static(path.join(__dirname, 'public')))

//게시판 조회
app.get('/board', (req, res) => {
  const data = [
    [1, '첫 번째 게시글', 'aster', '2019-04-02', '내용1'],
    [2, '두 번째 게시글', 'aster', '2019-04-02', '내용2'],
    [3, '세 번째 게시글', 'aster', '2019-04-02', '내용3'],
    [4, '네 번째 게시글', 'aster', '2019-04-02', '내용4'],
    [5, '다섯 번째 게시글', 'aster', '2019-04-02', '내용5'],
  ]
  res.json(data)
})

app.set('port', process.env.PORT || 80);   //testscsd

const server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + server.address().port)
})
