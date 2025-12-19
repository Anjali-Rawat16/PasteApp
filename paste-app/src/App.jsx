import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './App.css'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Paste from './Components/Paste';
import ViewPaste from './Components/ViewPaste';
import EditPaste from './Components/EditPaste';
const router = createBrowserRouter(
  [
    
    { 
    
      path :"/",
      element:
      <div>
       <Navbar/>
       <Home/>
      </div>
    

    },

    {
      
      path :"/pastes",
      element:
      <div>
        <Navbar/>
        <Paste/>
      </div>

    },

      {
    path: "/pastes/edit/:id",
    element: <>
    <Navbar />
    <Home/>
    </>,
      },
      {
  path: "/pastes/view/:id",
  element: (
    <>
      <Navbar />
      <ViewPaste />
    </>
  )
},


    // {
    //   path :"/pastes/:id",
    //   element:
    //   <div>
    //     <Navbar/>
    //     <EditPaste/>
    //   </div>
    // },




  ]
);

function App() {

  return (
    <div>
      <RouterProvider router = {router}></RouterProvider>
    </div>
  )
}

export default App
