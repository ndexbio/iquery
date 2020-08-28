import cyrest from '../cyrest';
import { SET_PORT } from '../../actions/cyrest';
import { CyRestState } from '../types';

describe('Test for CyRest reducer', () => {
  it('Check initial state', () => {
    const state = undefined;
    const action = { type: 'dummy_action' };
    const defaultState: CyRestState = {
      isFetchingAvailable: false,
      available: false,
      isPollingAvailable: false,
      port: 1234,
      error: null,
      lastResponse: null,
      isLoadingNetwork: false,
    };

    const result = cyrest(state, action);

    expect(result).toEqual(defaultState);
  });

  it('Set port number', () => {
    const portNumber = 1235;
    const action = { type: SET_PORT, payload: portNumber };
    const newPortState: CyRestState = {
      isFetchingAvailable: false,
      available: false,
      isPollingAvailable: false,
      port: portNumber,
      error: null,
      lastResponse: null,
      isLoadingNetwork: false,
    };

    expect(cyrest(undefined, action)).toEqual(newPortState);
  });
});
