"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
var router = express_1.default.Router();
var apikey = process.env.APIKEY;
function getMoreInfoByMovieId(imdbID) {
    return new Promise((resolve) => {
        axios_1.default.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apikey}&`)
            .then((response) => {
            resolve(response.data);
        })
            .catch((err) => {
            resolve(err);
        });
    });
}
router.get('/list', function (req, res, next) {
    let movies = [];
    axios_1.default.get(`http://www.omdbapi.com/?s=war&apikey=${apikey}&`)
        .then((response) => __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(response.data.Search.map((movie) => __awaiter(this, void 0, void 0, function* () {
            movies.push(yield getMoreInfoByMovieId(movie.imdbID));
        })));
        res.json({ data: movies });
    }))
        .catch((err) => {
        console.log(err);
    });
});
router.get('/getInfoById', function (req, res, next) {
    let id = req.query.id;
    axios_1.default.get(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`)
        .then((response) => {
        res.json({ data: response.data });
    })
        .catch((err) => {
        console.log(err);
    });
});
router.get('/search', function (req, res, next) {
    let search = req.query.search;
    let movies = [];
    axios_1.default.get(`http://www.omdbapi.com/?s=${search}&page=1&apikey=${apikey}&`)
        .then((response) => __awaiter(this, void 0, void 0, function* () {
        if (response.data.Response === 'True') {
            yield Promise.all(response.data.Search.map((movie) => __awaiter(this, void 0, void 0, function* () {
                movies.push(yield getMoreInfoByMovieId(movie.imdbID));
            })));
            res.json({ data: movies });
        }
    }))
        .catch((err) => {
        console.log(err);
    });
});
module.exports = router;
