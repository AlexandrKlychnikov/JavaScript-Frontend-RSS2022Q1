import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './app.module.sass';
import Garage from './pages/garage/garage';
import Winners from './pages/winners/winners';
import Header from './pages/common/header/header';

const App = (): JSX.Element => (
  <div className={styles.app}>
    <Header />
    <main className={styles.main}>
      <Switch>
        <Route path="/winners">
          <Winners />
        </Route>
        <Route path="/">
          <Suspense fallback={<div>Loading...</div>}>
            <Garage />
          </Suspense>
        </Route>
      </Switch>
    </main>
  </div>
);

export default App;
