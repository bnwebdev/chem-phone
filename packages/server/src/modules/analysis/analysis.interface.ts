export interface Analyzer<Input, PreparedData, Output> {
  analyze: (input: Input, data: PreparedData) => Promise<Output>;
}
