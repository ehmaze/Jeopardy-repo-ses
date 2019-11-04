const express = require('express')
const router = express.Router()
const Datastore = require('nedb')
const fetch = require('node-fetch')

const database = new Datastore('database.db')
database.loadDatabase()
const url = 'http://jservice.io/api/clues'
fetch(url)
  .then((res) => res.json())
  .then((data) => data.forEach(element => {
    database.insert(element, (err, newDoc) => { if (err) { } })
  }))
/* GET categories listing. */
router.get('/categories', (req, res) => {
  var vowels = 'aeiou'
  var randVowel = vowels[Math.floor(Math.random() * vowels.length)]
  var reg = RegExp(randVowel)
  database.find({ 'category.title': reg }, (err, docs) => {
    if (err) {
      res.end()
    }
    var array1 = []
    docs.forEach(element => {
      array1.push(element.category.title)
    })
    array1.sort(() => Math.random - 0.5)
    // var str = array2.toString()
    var array2 = []
    var array3 = []
    var index = 1
    array1.forEach(element => {
      if (array2.indexOf(element) === -1) {
        array2.push(element)
        array3.push({
          index: index,
          cat: element
        })
        index++
      }
    })
    res.json(array3)
  })
})

router.get('/categories/:id', (req, res) => {
  var iD = req.params.id
  iD.replace(/%/g, ' ')
  iD.replace(/2/g, '')
  iD.replace(/0/g, '')
  // make sure to check for spaces and shit, figure out later
  database.find({ 'category.title': iD }, (err, docs) => {
    if (err) {
      res.end()
      return
    }
    if (docs.length === 0) {
      res.status(404).send('Error 404: Category not found')
      return
    }
    var randomInt = Math.floor(Math.random() * Math.random() *
    Math.random() * docs.length)
    docs.sort(() => Math.random - 0.5)
    var array1 = [docs[randomInt].question, docs[randomInt].answer]
    var array2 = [{
      q: array1[0],
      a: array1[1]
    }]
    res.json(array2)
  })
})

router.get('/values/:id', (req, res) => {
  var iD = req.params.id
  database.find({ value: Number(iD) }, (err, docs) => {
    if (err) {
      res.end()
      return
    }
    if (docs.length === 0) {
      res.status(404).send('Error 404: Category not found')
      return
    }
    var randomInt = Math.floor(Math.random() * Math.random() *
      Math.random() * docs.length)
    // docs.sort(() => Math.random - 0.5)
    var array1 = [docs[randomInt].question, docs[randomInt].answer]
    res.json([{
      q: array1[0],
      a: array1[1]
    }])
  })
})
// router.get('/days', (req, res) => {
//   database.find({ answer: /a/ }, (err, docs) => {
//     if (err) {
//       res.end()
//     }
//     var array1 = []
//     docs.forEach(element => {
//       array1.push(element.airdate.substring(0, 10))
//     })
//     var array2 = []
//     var array3 = []
//     var index = 1
//     array1.forEach(element => {
//       if (array2.indexOf(element) === -1) {
//         array2.push(element)
//         array3.push({
//           index: index,
//           day: element
//         })
//         index++
//       }
//     })
//     res.json(array3)
//   })
// })

router.get('/days', (req, res) => {
  database.find({ airdate: /198/ }, (err, docs) => {
    if (err) {
      res.end()
    }
    var array1 = []
    docs.forEach(element => {
      array1.push(element.airdate.substring(0, 10))
    })
    array1.sort(() => Math.random - 0.5)
    // var str = array2.toString()
    var array2 = []
    var array3 = []
    var index = 1
    array1.forEach(element => {
      if (array2.indexOf(element) === -1) {
        array2.push(element)
        array3.push({
          index: index,
          cat: element
        })
        index++
      }
    })
    res.json(array3)
  })
})

router.get('/days/:id', (req, res) => {
  var dayId = new RegExp(req.params.id)
  database.find({ airdate: dayId }, (err, docs) => {
    if (err) {
      res.end()
    }
    if (docs.length === 0) {
      res.status(404).send('Error 404: Catagory not found')
      return
    }
    var randomInt = Math.floor(Math.random() * Math.random() *
        Math.random() * docs.length)
    docs.sort(() => Math.random - 0.5)
    var array1 = [docs[randomInt].question, docs[randomInt].answer]
    res.json([{
      q: array1[0],
      a: array1[1]
    }])
  })
})
// router.get('/months', (req, res) => {
//   database.find({ answer: /a/ }, (err, docs) => {
//     if (err) {
//       res.end()
//     }
//     var randomInt = Math.floor(Math.random() * Math.random() *
//       Math.random() * docs.length)
//     var randDate = docs[randomInt].airdate
//     res.json([{ date: randDate.substring(0, 7) }])
//   })
// })

// router.get('/month/:id', (req, res) => {
//   var monthId = new RegExp((req.params.id).substring(0, 7))
//   database.find({ airdate: monthId }, (err, docs) => {
//     if (err) {
//       res.end()
//     }
//     if (docs.length === 0) res.status(404).send('Error 404: Catagory not found')
//     var randomInt = Math.floor(Math.random() * Math.random() *
//         Math.random() * docs.length)
//     docs.sort(() => Math.random - 0.5)
//     var array1 = [docs[randomInt].question, docs[randomInt].answer]
//     res.json([{
//       q: array1[0],
//       a: array1[1]
//     }])
//   })
// })
// router.get('/years', (req, res) => {
//   database.find({ answer: /a/ }, (err, docs) => {
//     if (err) {
//       res.end()
//     }
//     var randomInt = Math.floor(Math.random() * Math.random() *
//         Math.random() * docs.length)
//     var randDate = docs[randomInt].airdate
//     res.json([{ date: randDate.substring(0, 4) }])
//   })
// })

// router.get('/year/:id', (req, res) => {
//   var yearId = new RegExp((req.params.id).substring(0, 4))
//   database.find({ airdate: yearId }, (err, docs) => {
//     if (err) {
//       res.end()
//     }
//     if (docs.length === 0) res.status(404).send('Error 404: Catagory not found')
//     var randomInt = Math.floor(Math.random() * Math.random() *
//         Math.random() * docs.length)
//     var array1 = [docs[randomInt].question, docs[randomInt].answer]
//     res.send([{
//       q: array1[0],
//       a: array1[1]
//     }])
//   })
// })
module.exports = router
