export type Nullable<T> = T | null
export type NamedObject = { name: string }

export type ColumnDefinitionAction = {
  label: string
  type: 'EDIT'
}

export type ColumnDefinition<D extends Record<string, any>> = {
  label: string
  type: 'DATA' | 'ACTION'
  dataProperty?: keyof D
  actions?: Array<ColumnDefinitionAction>
}

export type EditRowEventData<D extends Record<string, any>> = {
  rowIndex: number
  rowData: D
}
