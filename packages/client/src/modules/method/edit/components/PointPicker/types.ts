export type InputableProps<V> = {
  onChange: (value: V) => void;
  value?: V;
  label?: string;
};
