import reducer from '../src/reducers/tabReducer'

describe('tab reducer', () => {
  it('should return the initial state', () => {
    expect(
	  reducer(undefined, {})
	).toEqual(
	  {
	    tabClicked: 'first',
	  }
	)
 })
})
