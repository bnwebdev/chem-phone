export type DataHandler<Input = unknown, Output = unknown, Context extends Record<string, unknown> = {}> = {
    name: string
    handle: (args: Input, context: Context) => Output
}

export type Method<Handlers extends DataHandler[]> = {
    name: string
    handlers: Handlers
}
