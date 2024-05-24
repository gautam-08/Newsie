import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


const App =()=> {

  const apikey=process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(10);
  
    return (
      
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
        <Navbar />
        
        <div className="container my-3">
          {/* {pageSize='5' country="in" category="sports" } */}
          <Routes>
            <Route exact path="/" element={<News apikey={apikey}  setProgress={setProgress}  pageSize='9' country="in"/>}></Route>
            <Route exact path="/business" element={<News apikey={apikey}  setProgress={setProgress}  key="business" pageSize='9' country="in" category="business"/>}></Route>
            <Route exact path="/entertainment" element={<News apikey={apikey}  setProgress={setProgress}  key="entertainment" pageSize='5' country="in" category="entertainment"/>}></Route>
            <Route exact path="/general" element={<News apikey={apikey}  setProgress={setProgress}  key="general" pageSize='9' country="in" category="general"/>}></Route>
            <Route exact path="/health" element={<News apikey={apikey}  setProgress={setProgress}  key="health" pageSize='9' country="in" category="health"/>}></Route>
            <Route exact path="/science" element={<News apikey={apikey}  setProgress={setProgress}  key="science" pageSize='9' country="in" category="science"/>}></Route>
            <Route exact path="/sports" element={<News apikey={apikey}  setProgress={setProgress}  key="sports" pageSize='9' country="in" category="sports"/>}></Route>
            <Route exact path="/technology" element={<News apikey={apikey}  setProgress={setProgress}  key="technology" pageSize='9' country="in" category="technology"/>}></Route>
          </Routes>
        </div>
        </Router>
      </div>
      

    )
  }

  export default App;



