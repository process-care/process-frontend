import { combineEpics } from "redux-observable";
import { initializeEpics } from "./initialize.epic";

const participationEpics = combineEpics(initializeEpics);

export default participationEpics;