export type DataHandler<Input = unknown, Output = unknown, Context extends Record<string, unknown> = {}> = {
    name: string
    handle: (args: Input, context: Context) => Output
}

export type Method<Handlers extends DataHandler[]> = {
    name: string
    handlers: Handlers
}

export enum MethodType {
    CALIBRATION_CURVE = 0,
}

export enum MethodStatus {
    DRAFT = 0,
    EDITABLE = 1,
    COMPLETED = 2,
    ARCHIEVED = 3,
}

export type UnitValue<Value = number, Unit extends string = string> = {
    unit: Unit
    value: Value
}
  
export type CalibrationCurveMethodType = {
  curve: Array<{
    concentration: UnitValue;
    color: UnitValue<[number, number, number, number], 'rgba'>
  }>
}
  
export type MethodData = CalibrationCurveMethodType;