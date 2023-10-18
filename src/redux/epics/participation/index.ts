import { combineEpics } from "redux-observable";
import { initializeEpics } from "./initialize.epic.js"
import { answersEpics } from "./answers.epic.js"

const participationEpics = combineEpics(initializeEpics, answersEpics);

export default participationEpics;