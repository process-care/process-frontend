import { SafeEntity } from "api/entity-checker";
import {
  Condition,
  Landing,
  Page,
  Question,
  Survey,
} from "api/graphql/types.generated";

// ----- SAFE ENTITY
export type SurveyRedux = SafeEntity<Survey>;
export type PageRedux = SafeEntity<Page>;
export type QuestionRedux = SafeEntity<Question>;
export type ConditionRedux = SafeEntity<Condition>;
export type LandingRedux = SafeEntity<Landing>;
// ----- ACTIONS
export type LastSaved = {
  lastSaved: string;
};

export type LastPosted = {
  lastPosted: string;
};

export type LastUpdated = {
  lastUpdated: string;
};

export type LastDeleted = {
  lastDeleted: string;
};
