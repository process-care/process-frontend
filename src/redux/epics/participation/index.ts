import { combineEpics } from "redux-observable";
import { initializeEpics } from "./initialize.epic";
import { answersEpics } from "./answers.epic";

const participationEpics = combineEpics(initializeEpics, answersEpics);

export default participationEpics;