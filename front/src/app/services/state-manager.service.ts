import { Injectable } from '@angular/core';
import { Statistics } from '../lib/classes'

@Injectable({
  providedIn: 'root'
})

export class StateManagerService {
  // Control part
  public submitted: boolean

  // Data part
  public statistics: {[symbol: string]: Statistics}

  public symbols: string[]

  constructor() { 
    // Control
    this.submitted = false

    // Data
    this.statistics = {}
    this.symbols = []
  }
}
