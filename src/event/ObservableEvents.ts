export interface ObservableEvents<T> {
  on?: (this: T, type: string, e: any) => void;
}
