export interface Head {
  status: string;
  data: any;
}

export interface Product {
  storePickEligible: boolean;
  storeSearchEnabled: boolean;
  storeSelectionEnabled: boolean;
  storePickupQuote: string;
  pickupSearchQuote: string;
  storePickupLabel: string;
  partNumber: string;
  purchaseOption: string;
  ctoOptions: string;
  storePickupLinkText: string;
  storePickupProductTitle: string;
  pickupDisplay: string;
  pickupType: string;
}

export interface PartsAvailability {
  [key: string]: Product;
}

export interface Address {
  address: string;
  address3: string;
  address2: string;
  postalCode: string;
}

export interface Hour {
  storeTimings: string;
  storeDays: string;
}

export interface StoreHours {
  storeHoursText: string;
  bopisPickupDays: string;
  bopisPickupHours: string;
  hours: Hour[];
}

export interface PickupOption {
  pickupOptionTitle: string;
  pickupOptionDescription: string;
  index: number;
}

export interface PickupOptionsDetails {
  whatToExpectAtPickup: string;
  comparePickupOptionsLink: string;
  pickupOptions: PickupOption[];
}

export interface Store {
  storeEmail: string;
  storeName: string;
  reservationUrl: string;
  makeReservationUrl: string;
  storeImageUrl: string;
  country: string;
  city: string;
  storeNumber: string;
  partsAvailability: PartsAvailability;
  phoneNumber: string;
  pickupTypeAvailabilityText: string;
  address: Address;
  hoursUrl: string;
  storeHours: StoreHours;
  storelatitude: number;
  storelongitude: number;
  storedistance: number;
  storeDistanceVoText: string;
  storelistnumber: number;
  storeListNumber: number;
  pickupOptionsDetails: PickupOptionsDetails;
}

export interface Availability {
  isComingSoon: boolean;
}

export interface Body {
  stores: Store[];
  overlayInitiatedFromWarmStart: boolean;
  viewMoreHoursLinkText: string;
  storesCount: string;
  little: boolean;
  pickupLocationLabel: string;
  pickupLocation: string;
  notAvailableNearby: string;
  notAvailableNearOneStore: string;
  warmDudeWithAPU: boolean;
  viewMoreHoursVoText: string;
  availability: Availability;
}

export default interface BaseResponse {
  head: Head;
  body: Body;
}
