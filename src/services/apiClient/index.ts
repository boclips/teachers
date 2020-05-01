import axios from 'axios';
import { ApiBoclipsClient, BoclipsClient } from 'boclips-api-client';
import { Constants } from '../../app/AppConstants';

const client = ApiBoclipsClient.create(axios, Constants.API_PREFIX);

export const getBoclipsClient = (): Promise<BoclipsClient> => client;
