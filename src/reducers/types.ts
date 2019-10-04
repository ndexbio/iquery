export interface CyRestState {
  isFetchingAvailable: boolean
  available: boolean
  isPollingAvailable: boolean
  port: number
  error: any | null
  lastResponse: object | null
  isLoadingNetwork: boolean
}

export interface SourceState {
  isFetchingSource: boolean
  sources: any[]
  error: any | null
  currentSource: any | null
}
