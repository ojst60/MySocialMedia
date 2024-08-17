import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useUiDispatch = useDispatch.withTypes<AppDispatch>()
export const useUiSelector = useSelector.withTypes<RootState>() 