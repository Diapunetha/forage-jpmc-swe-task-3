import { ServerRespond } from './DataStreamer';

interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}

export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    // Calculate the average prices for stock ABC and DEF.
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    // Calculate the ratio of the two stocks.
    const ratio = priceABC / priceDEF;
    // Set the upper and lower bounds for the ratio.
    const upperBound = 1.05;
    const lowerBound = 0.95;
    // Return a Row object with all required fields.
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      // Set the trigger_alert if the ratio crosses the bounds.
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
                 serverRespond[0].timestamp : serverRespond[1].timestamp,
    };
  }
}
