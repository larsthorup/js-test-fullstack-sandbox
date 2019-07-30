import React from 'react';
import {mount} from 'enzyme';

import {stubHttp} from '../../test/setupPolly';

import {resolvable} from "./resolvable";
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
      const loading = resolvable();
      const w = mount(<DreamList loading={loading}/>);
      await loading;
      w.update();      expect(w.find('h3').text()).toEqual('All my dreams');
      expect(w.find('ul > li').map(e => e.text())).toEqual([
        'Learn French',
        'Visit Albania'
      ]);
    });
  });
});
