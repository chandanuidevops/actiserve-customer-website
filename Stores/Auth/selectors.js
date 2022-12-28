import { createSelector } from 'reselect';

const selectRouter = state => state.router;

const selectToken = state => state?.auth?.token;
const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export { makeSelectLocation, selectToken };
