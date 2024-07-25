import { selectError, selectIsLoading } from "../redux/slice/suspenseSlice";
import { useAppSelector } from "./useAppSelector";

export const useSuspense = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  return { isLoading, error };
};
