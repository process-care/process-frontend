import { SafeEntity } from "@/api/entity-checker.js";
import {
  Condition,
  Landing,
  Page,
  Question,
  Survey,
} from "@/api/graphql/sdk.generated.js";

// ----- SAFE ENTITY

export type SurveyRedux = SafeEntity<Survey>;
export type LandingRedux = SafeEntity<Landing>;
export type PageRedux = SafeEntity<Page>;
export type QuestionRedux = SafeEntity<Question>;
export type ConditionRedux = SafeEntity<Condition>;

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
