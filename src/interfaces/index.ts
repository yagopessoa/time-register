export interface ITableItem {
  day: string;
  entryTime: JSX.Element;
  startLunch: JSX.Element;
  endLunch: JSX.Element;
  exitTime: JSX.Element;
  extraEntryTime: JSX.Element;
  extraExitTime: JSX.Element;
  total: string;
}

export interface IInput {
  name: string;
  ref: any;
}

export interface ITableContext {
  registerInput: (input: IInput) => void;
  triggerUpdate: () => void;
}

export interface IInputTime {
  name: string;
}
