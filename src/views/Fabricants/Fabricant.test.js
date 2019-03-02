import React from 'react'
import ReactDOM from 'react-dom'
import { Fabricants } from './Fabricants'

const getFabricants = () => {
  console.log('get fabricants')
}

const deleteFabricant = () => {
  console.log('delete fabricants')
}
it('renders without crashing', () => {
  const fabricant = {
    fabricants: null
  }
  const div = document.createElement('div')
  ReactDOM.render(
    <Fabricants
      getFabricants={getFabricants}
      deleteFabricant={deleteFabricant}
      fabricant={fabricant}
    />,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
