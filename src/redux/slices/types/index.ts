import { SafeEntity } from "api/entity-checker";
import { Condition, Page, Question, Survey } from "api/graphql/types.generated";

// ----- SAFE ENTITY

export type ReduxSurvey = SafeEntity<Survey>;
export type ReduxPage = SafeEntity<Page>;
export type ReduxQuestion = SafeEntity<Question>;
export type ReduxCondition = SafeEntity<Condition>;

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
