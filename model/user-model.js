'use strict'
// mongo 데이터베이스의 모델(콜렉션)을 정의해놓은 파일입니다. 콜렉션은 my-sql 등에서 테이블과 같은 의미입니다.
// user 모델은 index, title, name, date, content 등의 항목으로 구성되며, 그러한 항목을 field라 합니다.
const mongoose = require('mongoose')  // 몽구스 모듈을 삽입하고 mongoose란 이름으로 정의합니다.
const AutoIncrement = require('mongoose-sequence')(mongoose)
const collectionName = 'user'  // 콜렉션 이름을 미리 정해놓습니다. 나중에 사용하기 위함입니다.
// 스키마를 만들어냅니다. 스키마란 모델의 구조(형식)를 의미합니다.
// 필드명: { type: 필드타입, required: 필수여부 } 로 구성되며 required는 false인 경우 생략이 가능합니다.
const schema = new mongoose.Schema({ 
  index: { type: Number, default: 0},  // 게시글 번호
  title: { type: String, required: true },  // 게시글 제목
  name: { type: String, required: true },   // 게시글 이름
  date: { type: String, required: true },   // 게시글 날짜 (날짜 타입이 따로 있지만 처음에는 쉽게 하기 위해 String을 사용합니다.)
  content: { type: String, required: true } // 게시글 내용
}, {                                        // ------- 여기서부터는 옵션 항목입니다 ---------
  collection: collectionName                // collection 옵션은 콜렉션의 이름을 넣는 곳입니다. 위에서 미리 정한 이름을 사용합니다.
})                                          // --------------- 옵션 끝 ----------------

schema.plugin(AutoIncrement, {inc_field: 'sequence'})
const user = mongoose.model('user', schema) // 위에서 정의한 스키마 구조로 모델을 만듭니다.

module.exports = user                       // 모델을 다른 파일에서도 사용할 수 있도록 노출(export) 시킵니다.
