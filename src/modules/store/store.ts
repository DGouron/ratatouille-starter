import { useDispatch } from "react-redux";

import type { Dependencies } from "@ratatouille/modules/store/dependencies";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({});

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];

export const createStore = (config: {
	initialState?: AppState;
	dependencies: Dependencies;
}) => {
	const store = configureStore({
		preloadedState: config?.initialState,
		reducer: reducers,
		devTools: true,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware({
				thunk: {
					extraArgument: config.dependencies,
				},
			});
		},
	});

	return store;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
