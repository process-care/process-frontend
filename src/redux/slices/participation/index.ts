import { combineReducers } from "@reduxjs/toolkit";
import status from '@/redux/slices/participation/status';
import pages from '@/redux/slices/participation/page';
import questions from '@/redux/slices/participation/questions';
import answers from '@/redux/slices/participation/answers';

const participation = combineReducers({
  status,
  pages,
  questions,
  answers,
});

export default participation;