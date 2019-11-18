import axios from 'axios';
import { ApiBoclipsClient, BoclipsClient } from 'boclips-api-client';
import { Constants } from '../../app/AppConstants';

export const getBoclipsClient = (): Promise<BoclipsClient> => {
  return ApiBoclipsClient.initialize(axios, Constants.API_PREFIX);
};