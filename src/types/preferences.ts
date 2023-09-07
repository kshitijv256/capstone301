import { Team } from "./matches";
import { Sport } from "./sports";

export type Preferences = {
  sports: Sport[];
  teams: Team[];
};
