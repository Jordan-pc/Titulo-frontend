import React from 'react';

import { Card } from '../components/card';
import { Filter } from '../components/filter';

export const Home = () => {
  return (
    <div className='row no-gutters'>
      <div className='col-md-8'>
        <Card></Card>
      </div>
      <div className='col-md-4'>
        <Filter></Filter>
      </div>
    </div>
  );
};
