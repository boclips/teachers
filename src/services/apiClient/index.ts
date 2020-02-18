import axios from 'axios';
import { ApiBoclipsClient, BoclipsClient } from 'boclips-api-client';
import { Constants } from 'src/app/AppConstants';

export const getBoclipsClient = (): Promise<BoclipsClient> =>
  ApiBoclipsClient.initialize(axios, Constants.API_PREFIX);
