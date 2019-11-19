interface GaugeType {
  id?: number;
  name: string;
  siteCode: string;
  latitude: number;
  longitude: number;
  runName?: string | null;
  description?: string | null;
  hasReading?: string | null;
}
interface ReadingType {
  id?: number;
  siteCode: string;
  gaugeReading: string;
  timeStamp: string;
  variableName: string;
  units: string;
}
interface ReadingGaugeType {
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
interface LocationType {}

interface GaugesServiceType {
  findAllLocations(): void;
}
