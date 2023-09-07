import { combineReducers } from "@reduxjs/toolkit";
import status from '@/redux/slices/participation/status.js'
import pages from '@/redux/slices/participation/page.js'
import questions from '@/redux/slices/participation/questions.js'
import answers from '@/redux/slices/participation/answers.js'

const participation = combineReducers({
  status,
  pages,
  questions,
  answers,
});

export default participation;