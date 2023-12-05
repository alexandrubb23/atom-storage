import { AtomTimeInterval } from '../models';

// TODO: To much to use Luxon here?
// @see https://moment.github.io/luxon/#/
export function calculateTimeInterval(interval: AtomTimeInterval) {
  const date = new Date();

  const addAditionalTimeInterval = (additionalTime: number) =>
    date.setTime(date.getTime() + additionalTime);

  switch (interval) {
    case '1min':
      return addAditionalTimeInterval(1000 * 60);
    case '5min':
      return addAditionalTimeInterval(1000 * 60 * 5);
    case '10min':
      return addAditionalTimeInterval(1000 * 60 * 10);
    case '15min':
      return addAditionalTimeInterval(1000 * 60 * 15);
    case '30min':
      return addAditionalTimeInterval(1000 * 60 * 30);
    case '45min':
      return addAditionalTimeInterval(1000 * 60 * 45);
    case '60min':
      return addAditionalTimeInterval(1000 * 60 * 60);
    case '1day':
      return addAditionalTimeInterval(1000 * 60 * 60 * 24);
    case '1week':
      return addAditionalTimeInterval(1000 * 60 * 60 * 24 * 7);
    case '1month':
      return addAditionalTimeInterval(1000 * 60 * 60 * 24 * 30);
    case '1year':
      return addAditionalTimeInterval(1000 * 60 * 60 * 24 * 365);
    default:
      return addAditionalTimeInterval(1000 * 60);
  }
}
