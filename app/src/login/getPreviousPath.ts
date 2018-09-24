export interface LocationState {
  from?: {
    pathname: string;
    search: string;
    hash: string;
  };
}

export default function getPreviousPath(state?: LocationState): string {
  if (!state || !state.from) {
    return '/';
  }
  return `${state.from.pathname}${state.from.search}`;
}
