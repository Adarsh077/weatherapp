import CurrentTemp from "./Current";
import HourlyTemp from "./Hourly";
import DailyTemp from "./Daily";

interface API {
  lat: number;
  lon: number;
  timezone: string;
  current: CurrentTemp;
  hourly: Array<HourlyTemp>;
  daily: Array<DailyTemp>;
}

export default API;
