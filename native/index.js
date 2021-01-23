import {QuizManager} from "./src/QuizManager.js";
import Store from '../public/store.js'

const quiz = new QuizManager('#container', Store.data);

