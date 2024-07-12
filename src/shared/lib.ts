import { store } from 'app/store';
import { Dimensions } from 'react-native';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Dimension = Dimensions.get('screen');

function isFullURLImage(url: string) {
  const fullURLWithImageExtension = /((https|http)?:\/\/[^\s/$.?#].[^\s]*)/gi;
  return fullURLWithImageExtension.test(url);
}

export const lib = { isFullURLImage };
