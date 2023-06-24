import React from 'react';
import './App.css';
import Layout from './HOC/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import Edit from './containers/Edit/Edit';
import Report from './containers/Report/Report';

// const Edit = React.lazy(() => import('./containers/Edit/Edit'))
// const Report = React.lazy(() => import('./containers/Report/Report'))

export const appContext = React.createContext<any>(null)

function App() {
  const [page, setPage] = React.useState<string>('quiz');


  const pageJSX = React.useMemo(() => {
    switch(page) {
      case 'quiz':
        return <Quiz />
      case 'edit':
        return <Edit />
      case 'report':
        return <Report />
      default:
        return
    }
  }, [page])
  
  return (
    <div className="App">
      <appContext.Provider value={{page: page, setPage: setPage}}>
        <Layout page={page} setPage={setPage}>
          {/* <React.Suspense fallback={<div>Loading...</div>}> */}
            {pageJSX}
          {/* </React.Suspense> */}
        </Layout>
      </appContext.Provider>
    </div>
  );
}

export default App;
