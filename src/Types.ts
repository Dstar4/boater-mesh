export interface GaugeType {
  id?: number;
  name: string;
  siteCode: string;
  latitude: number;
  longitude: number;
  runName?: string | null;
  description?: string | null;
  hasReading?: string | null;
}
export interface ReadingType {
  id?: number;
  siteCode: string;
  gaugeReading: string;
  timeStamp: string;
  variableName: string;
  units: string;
}
export interface ReadingGaugeType extends GaugeType {
  gaugeReading: string;
  timeStamp: string;
  variableName: string;
  units: string;
}
export interface LocationType {
  name: string;
  description: string;
}

export interface GaugesServiceType {
  findAllLocations(): Promise<LocationType[]>;
  findAllReadings(): Promise<ReadingGaugeType[]>;
  addLocation(location: LocationType): Promise<any>;
  findAllSites(): Promise<GaugeType[]>;
  findSiteById(id: string): Promise<GaugeType>;
  findBySiteCode(siteCode: string): Promise<GaugeType>;
  populateSites(): Promise<GaugeType[]>;
  addSite(gauge: GaugeType): Promise<any>;
  updateGauge(siteCode: string): Promise<any>;
  updateGaugeLocation(siteCode: string, locationId: number): Promise<number>;
  findAllReadings(): Promise<ReadingGaugeType[]>;
  addHasReading(siteCode: string): Promise<any>;
  addReading(reading: ReadingType): Promise<any>;
  findReadingsBySiteCode(siteCode: string): Promise<ReadingGaugeType[]>;
  findReadingsBySiteCodeTimestamp(
    siteCode: number,
    timeStamp: string,
    units: string
  ): Promise<ReadingGaugeType[]>;
  populateReadings(): Promise<any>;
  getSiteWithReadings(siteCode: string): Promise<any>;
}

export interface fieldsType {
  id: { type: string };
  name: { type: string };
  siteCode: { type: string };
  latitude: { type: number };
  longitude: { type: number };
  description: { type: string };
  hasReading: { type: string };
  locationId: { type: number };
}
export interface readingFieldsType extends fieldsType {
  gaugeReading: { type: string };
  timeStamp: { type: string };
  variableName: { type: string };
  units: { type: string };
  runName: { type: string };
}
