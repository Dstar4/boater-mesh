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
export interface ReadingGaugeType {
  id: number;
  name: string;
  siteCode: string;
  latitude: number;
  longitude: number;
  runName: string | null;
  description: string | null;
  hasReading: string | null;
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
  addSite(gauge: GaugeType);
  updateGauge(siteCode: string);
  updateGaugeLocation(siteCode: string, locationId: number): Promise<number>;
  findAllReadings(): Promise<ReadingGaugeType[]>;
  addHasReading(siteCode: string);
  addReading(reading: ReadingType);
  findReadingsBySiteCode(siteCode: string): Promise<ReadingGaugeType[]>;
  findReadingsBySiteCodeTimestamp(
    siteCode: number,
    timeStamp: string,
    units: string
  ): Promise<ReadingGaugeType[]>;
  populateReadings();
}
