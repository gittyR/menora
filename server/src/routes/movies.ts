import express, { response } from "express"
import axios from "axios"

var router = express.Router();
var apikey = process.env.APIKEY;

function getMoreInfoByMovieId(imdbID: string) {
  return new Promise ((resolve) => {
    axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apikey}&`)
    .then((response)=>{
      resolve(response.data)
   })
  .catch((err)=>{
    resolve(err)
  });
  });
}

router.get('/list', function(req, res, next) {
  let movies: any[] = []
  axios.get(`http://www.omdbapi.com/?s=war&apikey=${apikey}&`)
    .then(async(response) => {
      await Promise.all(response.data.Search.map(async(movie: any) => {
        movies.push(await getMoreInfoByMovieId(movie.imdbID))
      }))
      res.json({ data: movies })
    })
    .catch((err) => {
      console.log(err)
    });
});

router.get('/getInfoById', function (req, res, next) {
  let id = req.query.id
    axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`)
    .then((response)=>{
      res.json({data:response.data})
   })
  .catch((err)=>{
    console.log(err)
  });
});

router.get('/search', function(req, res, next){
  let search = req.query.search;
  let movies: any[] = [];
  axios.get(`http://www.omdbapi.com/?s=${search}&page=1&apikey=${apikey}&`)
  .then(async(response) => {
    if(response.data.Response === 'True') {
          await Promise.all(response.data.Search.map(async(movie: any) => {
      movies.push(await getMoreInfoByMovieId(movie.imdbID))
    }))
    res.json({ data: movies })
    }
  })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = router;