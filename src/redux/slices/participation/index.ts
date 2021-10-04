import { combineReducers } from "@reduxjs/toolkit";
import status from 'redux/slices/participation/status';
import pages from 'redux/slices/participation/page-visited';
import questions from 'redux/slices/participation/questions-seen';
import answers from 'redux/slices/participation/answers';

const participation = combineReducers({
  status,
  pages,
  questions,
  answers,
});

export default participation;