import {Statuses, resDeliveryStatuses} from '../types/common';

const statusDetermination = (status: number) => {
  switch (status) {
    case resDeliveryStatuses.inWarehouse:
      return Statuses.inWarehouse;
    case resDeliveryStatuses.loading:
      return Statuses.loading;
    case resDeliveryStatuses.loaded:
      return Statuses.loaded;
    case resDeliveryStatuses.onTheWay:
      return Statuses.onTheWay;
    case resDeliveryStatuses.beginDelivery:
      return Statuses.beginDelivery;
    case resDeliveryStatuses.deliveryUnloaded:
      return Statuses.deliveryUnloaded;
    default:
      return Statuses.default;
  }
};

export default statusDetermination;
