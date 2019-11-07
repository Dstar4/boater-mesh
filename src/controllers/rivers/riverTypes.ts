export interface SiteDataType {
  id: Number;
  name: String;
  siteCode: String;
  latitude: Number;
  longitude: Number;
  runName: string | null;
  runDescription: string | null;
}
export interface ReadingDataType {
  id: Number;
  gaugeReading: String;
  timeStamp: String;
  variableName: String;
  units: String;
  name: String;
  siteCode: String;
  latitude: Number;
  longitude: Number;
  runName: string | null;
  runDescription: string | null;
}
export interface ReadingType {
  gaugeReading: String;
  timeStamp: String;
  variableName: String;
  units: String;
  siteCode: String;
}
export interface SiteDataRequestType {
  name: String;
  siteCode: String;
  latitude: Number;
  longitude: Number;
}
