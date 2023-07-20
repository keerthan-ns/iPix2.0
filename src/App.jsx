// import { NextUIProvider,createTheme } from '@nextui-org/react'
import { Authentication } from './components/Authentication'

// const darkTheme = createTheme({
//   type: 'light',
//   theme: {
//     colors: {
//       // brand colors
//       background: '#111827',
//       // text:"#000"
//       // ...  more colors
//     },
//     space: {},
//     fonts: {}
//   }
// })

function App() {

  return (
    <>
        {/* <NextUIProvider theme={darkTheme}> */}
          <div className='container mt-24 mb-3 mx-auto content-center'>
            <Authentication/>
          </div>
        {/* </NextUIProvider> */}
    </>
  )
}

export default App
