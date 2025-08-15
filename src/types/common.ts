export enum Statuses {
  inWarehouse = 'In warehouse',
  loading = 'Loading',
  loaded = 'Loaded',
  onTheWay = 'On the way',
  beginDelivery = 'Begin Delivery',
  deliveryUnloaded = 'Delivery unloaded',
  default = '',

  // ======??=====
  delivered = 'Delivered', //?
  unableToLoad = 'Unable to load', //?
  undelivered = 'Undelivered', //?
  unableToDeliver = 'Unable to deliver', //?
}

export enum resDeliveryStatuses {
  inWarehouse = 5, // default state of odreds
  loading = 10,
  loaded = 20,
  onTheWay = 25, // Dispatch truck
  beginDelivery = 27,
  deliveryUnloaded = 40,
}

export enum resTruckStatuses {
  defaultTruck = 0,
  truckReadyToLoad = 5,
  loading = 15,
  loaded = 30,
  dispatchTruck = 40,
  beginDelivery = 50,
  deliveryUnloaded = 50,
}
