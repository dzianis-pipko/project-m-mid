import delivery from '../store/delivery';
import {resDeliveryStatuses} from '../types/common';

const sortingDeliveryOrdersToBegin = (currentRouteName: string) => {
  const deliveries = delivery.deliveryOrdersByTruck;
  const deliveriesCopy = deliveries.slice();

  switch (currentRouteName) {
    case 'DeliveryOrdersToBegin':
      deliveriesCopy.sort((a, b) => {
        if (
          a.status === resDeliveryStatuses.onTheWay &&
          b.status === resDeliveryStatuses.beginDelivery
        ) {
          return -1;
        } else if (
          a.status === resDeliveryStatuses.beginDelivery &&
          b.status === resDeliveryStatuses.onTheWay
        ) {
          return 1;
        } else {
          return -1;
        }
      });
      delivery.setSortingDeliveryOrdersByTruck(deliveriesCopy);
      break;
    case 'DeliveryOrdersToLoad':
      deliveriesCopy.sort((a, b) => {
        if (
          (a.status === resDeliveryStatuses.inWarehouse ||
            a.status === resDeliveryStatuses.loading) &&
          b.status === resDeliveryStatuses.loaded
        ) {
          return -1;
        } else if (
          a.status === resDeliveryStatuses.loaded &&
          (b.status === resDeliveryStatuses.inWarehouse ||
            b.status === resDeliveryStatuses.loading)
        ) {
          return 1;
        } else {
          return -1;
        }
      });
      delivery.setSortingDeliveryOrdersByTruck(deliveriesCopy);
      break;
  }
};

export default sortingDeliveryOrdersToBegin;
