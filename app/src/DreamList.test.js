import React from 'react';
import {render, screen} from '@testing-library/react';

import {stubHttp} from '../../test/setupPolly';

import DreamList from './DreamList';


describe('DreamList', function () {
  let polly;

  beforeAll(function () {
    polly = stubHttp('dream');
  });

  afterAll(async function () {
    if (polly) await polly.stop();
  });

  describe('render', function () {
    it('should render data', async () => {
      render(<DreamList />);
      expect(await screen.findByText('All my dreams')).toBeInTheDocument();
      const dreamElements = await screen.findAllByRole('listitem');
      expect(dreamElements.map(el => el.textContent)).toEqual([
        'Learn French',
        'Visit Albania'
      ]);
    });
  });
});
