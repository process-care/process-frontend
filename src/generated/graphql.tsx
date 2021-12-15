import { gql } from "graphql-request";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
  /** A time string with format: HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AdminUser = {
  __typename?: "AdminUser";
  firstname: Scalars["String"];
  id: Scalars["ID"];
  lastname: Scalars["String"];
  username?: Maybe<Scalars["String"]>;
};

export type Answer = {
  __typename?: "Answer";
  _id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  participation?: Maybe<Participation>;
  question?: Maybe<Question>;
  updatedAt: Scalars["DateTime"];
  value?: Maybe<Scalars["JSON"]>;
};

export type AnswerAggregator = {
  __typename?: "AnswerAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AnswerConnection = {
  __typename?: "AnswerConnection";
  aggregate?: Maybe<AnswerAggregator>;
  groupBy?: Maybe<AnswerGroupBy>;
  values?: Maybe<Array<Maybe<Answer>>>;
};

export type AnswerConnectionCreatedAt = {
  __typename?: "AnswerConnectionCreatedAt";
  connection?: Maybe<AnswerConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type AnswerConnectionId = {
  __typename?: "AnswerConnectionId";
  connection?: Maybe<AnswerConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type AnswerConnectionParticipation = {
  __typename?: "AnswerConnectionParticipation";
  connection?: Maybe<AnswerConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type AnswerConnectionQuestion = {
  __typename?: "AnswerConnectionQuestion";
  connection?: Maybe<AnswerConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type AnswerConnectionUpdatedAt = {
  __typename?: "AnswerConnectionUpdatedAt";
  connection?: Maybe<AnswerConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type AnswerConnectionValue = {
  __typename?: "AnswerConnectionValue";
  connection?: Maybe<AnswerConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type AnswerConnection_Id = {
  __typename?: "AnswerConnection_id";
  connection?: Maybe<AnswerConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type AnswerGroupBy = {
  __typename?: "AnswerGroupBy";
  _id?: Maybe<Array<Maybe<AnswerConnection_Id>>>;
  createdAt?: Maybe<Array<Maybe<AnswerConnectionCreatedAt>>>;
  id?: Maybe<Array<Maybe<AnswerConnectionId>>>;
  participation?: Maybe<Array<Maybe<AnswerConnectionParticipation>>>;
  question?: Maybe<Array<Maybe<AnswerConnectionQuestion>>>;
  updatedAt?: Maybe<Array<Maybe<AnswerConnectionUpdatedAt>>>;
  value?: Maybe<Array<Maybe<AnswerConnectionValue>>>;
};

export type AnswerInput = {
  created_by?: InputMaybe<Scalars["ID"]>;
  participation?: InputMaybe<Scalars["ID"]>;
  question?: InputMaybe<Scalars["ID"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
  value?: InputMaybe<Scalars["JSON"]>;
};

export type AnsweredConditions = {
  __typename?: "AnsweredConditions";
  answer?: Maybe<Scalars["JSON"]>;
  group?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  operator?: Maybe<Scalars["String"]>;
  target_value?: Maybe<Scalars["String"]>;
};

export type Condition = {
  __typename?: "Condition";
  _id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  group?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  operator?: Maybe<Enum_Condition_Operator>;
  referer_page?: Maybe<Page>;
  referer_question?: Maybe<Question>;
  target?: Maybe<Question>;
  target_value?: Maybe<Scalars["String"]>;
  type?: Maybe<Enum_Condition_Type>;
  updatedAt: Scalars["DateTime"];
};

export type ConditionAggregator = {
  __typename?: "ConditionAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type ConditionConnection = {
  __typename?: "ConditionConnection";
  aggregate?: Maybe<ConditionAggregator>;
  groupBy?: Maybe<ConditionGroupBy>;
  values?: Maybe<Array<Maybe<Condition>>>;
};

export type ConditionConnectionCreatedAt = {
  __typename?: "ConditionConnectionCreatedAt";
  connection?: Maybe<ConditionConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type ConditionConnectionGroup = {
  __typename?: "ConditionConnectionGroup";
  connection?: Maybe<ConditionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type ConditionConnectionId = {
  __typename?: "ConditionConnectionId";
  connection?: Maybe<ConditionConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type ConditionConnectionOperator = {
  __typename?: "ConditionConnectionOperator";
  connection?: Maybe<ConditionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type ConditionConnectionReferer_Page = {
  __typename?: "ConditionConnectionReferer_page";
  connection?: Maybe<ConditionConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type ConditionConnectionReferer_Question = {
  __typename?: "ConditionConnectionReferer_question";
  connection?: Maybe<ConditionConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type ConditionConnectionTarget = {
  __typename?: "ConditionConnectionTarget";
  connection?: Maybe<ConditionConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type ConditionConnectionTarget_Value = {
  __typename?: "ConditionConnectionTarget_value";
  connection?: Maybe<ConditionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type ConditionConnectionType = {
  __typename?: "ConditionConnectionType";
  connection?: Maybe<ConditionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type ConditionConnectionUpdatedAt = {
  __typename?: "ConditionConnectionUpdatedAt";
  connection?: Maybe<ConditionConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type ConditionConnection_Id = {
  __typename?: "ConditionConnection_id";
  connection?: Maybe<ConditionConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type ConditionError = {
  __typename?: "ConditionError";
  conditionId: Scalars["ID"];
  message?: Maybe<Scalars["String"]>;
};

export type ConditionGroupBy = {
  __typename?: "ConditionGroupBy";
  _id?: Maybe<Array<Maybe<ConditionConnection_Id>>>;
  createdAt?: Maybe<Array<Maybe<ConditionConnectionCreatedAt>>>;
  group?: Maybe<Array<Maybe<ConditionConnectionGroup>>>;
  id?: Maybe<Array<Maybe<ConditionConnectionId>>>;
  operator?: Maybe<Array<Maybe<ConditionConnectionOperator>>>;
  referer_page?: Maybe<Array<Maybe<ConditionConnectionReferer_Page>>>;
  referer_question?: Maybe<Array<Maybe<ConditionConnectionReferer_Question>>>;
  target?: Maybe<Array<Maybe<ConditionConnectionTarget>>>;
  target_value?: Maybe<Array<Maybe<ConditionConnectionTarget_Value>>>;
  type?: Maybe<Array<Maybe<ConditionConnectionType>>>;
  updatedAt?: Maybe<Array<Maybe<ConditionConnectionUpdatedAt>>>;
};

export type ConditionInput = {
  created_by?: InputMaybe<Scalars["ID"]>;
  group?: InputMaybe<Scalars["String"]>;
  operator?: InputMaybe<Enum_Condition_Operator>;
  referer_page?: InputMaybe<Scalars["ID"]>;
  referer_question?: InputMaybe<Scalars["ID"]>;
  target?: InputMaybe<Scalars["ID"]>;
  target_value?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Enum_Condition_Type>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export enum Enum_Condition_Operator {
  Different = "different",
  Equal = "equal",
  EqualOrInferior = "equal_or_inferior",
  EqualOrSuperior = "equal_or_superior",
  Inferior = "inferior",
  NotEqual = "not_equal",
  Superior = "superior",
}

export enum Enum_Condition_Type {
  Page = "page",
  Question = "question",
}

export enum Enum_Question_Rows {
  Large = "large",
  Medium = "medium",
  Small = "small",
}

export enum Enum_Question_Type {
  AssociatedClassification = "associated_classification",
  Checkbox = "checkbox",
  DatePicker = "date_picker",
  FreeClassification = "free_classification",
  NumberInput = "number_input",
  Radio = "radio",
  Select = "select",
  Slider = "slider",
  TextArea = "text_area",
}

export enum Enum_Survey_Status {
  Archived = "archived",
  Closed = "closed",
  Draft = "draft",
  Pending = "pending",
}

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type FileInput = {
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  ext?: InputMaybe<Scalars["String"]>;
  formats?: InputMaybe<Scalars["JSON"]>;
  hash: Scalars["String"];
  height?: InputMaybe<Scalars["Int"]>;
  mime: Scalars["String"];
  name: Scalars["String"];
  previewUrl?: InputMaybe<Scalars["String"]>;
  provider: Scalars["String"];
  provider_metadata?: InputMaybe<Scalars["JSON"]>;
  related?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  size: Scalars["Float"];
  updated_by?: InputMaybe<Scalars["ID"]>;
  url: Scalars["String"];
  width?: InputMaybe<Scalars["Int"]>;
};

export type I18NLocale = {
  __typename?: "I18NLocale";
  _id: Scalars["ID"];
  code?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type InputId = {
  id: Scalars["ID"];
};

export type Landing = {
  __typename?: "Landing";
  _id: Scalars["ID"];
  about_page?: Maybe<Scalars["JSON"]>;
  color_theme?: Maybe<Scalars["JSON"]>;
  cover?: Maybe<UploadFile>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  image_cover?: Maybe<Scalars["JSON"]>;
  logo?: Maybe<Scalars["JSON"]>;
  members?: Maybe<Scalars["JSON"]>;
  partners?: Maybe<Array<Maybe<UploadFile>>>;
  partners_logos?: Maybe<Scalars["JSON"]>;
  published_at?: Maybe<Scalars["DateTime"]>;
  subtitle?: Maybe<Scalars["String"]>;
  survey?: Maybe<Survey>;
  title?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
  video_url?: Maybe<Scalars["String"]>;
  wysiwyg?: Maybe<Scalars["String"]>;
};

export type LandingPartnersArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type LandingAggregator = {
  __typename?: "LandingAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type LandingConnection = {
  __typename?: "LandingConnection";
  aggregate?: Maybe<LandingAggregator>;
  groupBy?: Maybe<LandingGroupBy>;
  values?: Maybe<Array<Maybe<Landing>>>;
};

export type LandingConnectionAbout_Page = {
  __typename?: "LandingConnectionAbout_page";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type LandingConnectionColor_Theme = {
  __typename?: "LandingConnectionColor_theme";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type LandingConnectionCover = {
  __typename?: "LandingConnectionCover";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type LandingConnectionCreatedAt = {
  __typename?: "LandingConnectionCreatedAt";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type LandingConnectionId = {
  __typename?: "LandingConnectionId";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type LandingConnectionImage_Cover = {
  __typename?: "LandingConnectionImage_cover";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type LandingConnectionLogo = {
  __typename?: "LandingConnectionLogo";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type LandingConnectionMembers = {
  __typename?: "LandingConnectionMembers";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type LandingConnectionPartners_Logos = {
  __typename?: "LandingConnectionPartners_logos";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type LandingConnectionPublished_At = {
  __typename?: "LandingConnectionPublished_at";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type LandingConnectionSubtitle = {
  __typename?: "LandingConnectionSubtitle";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type LandingConnectionSurvey = {
  __typename?: "LandingConnectionSurvey";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type LandingConnectionTitle = {
  __typename?: "LandingConnectionTitle";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type LandingConnectionUpdatedAt = {
  __typename?: "LandingConnectionUpdatedAt";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type LandingConnectionVideo_Url = {
  __typename?: "LandingConnectionVideo_url";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type LandingConnectionWysiwyg = {
  __typename?: "LandingConnectionWysiwyg";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type LandingConnection_Id = {
  __typename?: "LandingConnection_id";
  connection?: Maybe<LandingConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type LandingGroupBy = {
  __typename?: "LandingGroupBy";
  _id?: Maybe<Array<Maybe<LandingConnection_Id>>>;
  about_page?: Maybe<Array<Maybe<LandingConnectionAbout_Page>>>;
  color_theme?: Maybe<Array<Maybe<LandingConnectionColor_Theme>>>;
  cover?: Maybe<Array<Maybe<LandingConnectionCover>>>;
  createdAt?: Maybe<Array<Maybe<LandingConnectionCreatedAt>>>;
  id?: Maybe<Array<Maybe<LandingConnectionId>>>;
  image_cover?: Maybe<Array<Maybe<LandingConnectionImage_Cover>>>;
  logo?: Maybe<Array<Maybe<LandingConnectionLogo>>>;
  members?: Maybe<Array<Maybe<LandingConnectionMembers>>>;
  partners_logos?: Maybe<Array<Maybe<LandingConnectionPartners_Logos>>>;
  published_at?: Maybe<Array<Maybe<LandingConnectionPublished_At>>>;
  subtitle?: Maybe<Array<Maybe<LandingConnectionSubtitle>>>;
  survey?: Maybe<Array<Maybe<LandingConnectionSurvey>>>;
  title?: Maybe<Array<Maybe<LandingConnectionTitle>>>;
  updatedAt?: Maybe<Array<Maybe<LandingConnectionUpdatedAt>>>;
  video_url?: Maybe<Array<Maybe<LandingConnectionVideo_Url>>>;
  wysiwyg?: Maybe<Array<Maybe<LandingConnectionWysiwyg>>>;
};

export type LandingInput = {
  about_page?: InputMaybe<Scalars["JSON"]>;
  color_theme?: InputMaybe<Scalars["JSON"]>;
  cover?: InputMaybe<Scalars["ID"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  image_cover?: InputMaybe<Scalars["JSON"]>;
  logo?: InputMaybe<Scalars["JSON"]>;
  members?: InputMaybe<Scalars["JSON"]>;
  partners?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  partners_logos?: InputMaybe<Scalars["JSON"]>;
  published_at?: InputMaybe<Scalars["DateTime"]>;
  subtitle?: InputMaybe<Scalars["String"]>;
  survey?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
  video_url?: InputMaybe<Scalars["String"]>;
  wysiwyg?: InputMaybe<Scalars["String"]>;
};

export type LocaleInput = {
  code?: InputMaybe<Scalars["String"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export type Morph =
  | Answer
  | AnswerAggregator
  | AnswerConnection
  | AnswerConnectionCreatedAt
  | AnswerConnectionId
  | AnswerConnectionParticipation
  | AnswerConnectionQuestion
  | AnswerConnectionUpdatedAt
  | AnswerConnectionValue
  | AnswerConnection_Id
  | AnswerGroupBy
  | AnsweredConditions
  | Condition
  | ConditionAggregator
  | ConditionConnection
  | ConditionConnectionCreatedAt
  | ConditionConnectionGroup
  | ConditionConnectionId
  | ConditionConnectionOperator
  | ConditionConnectionReferer_Page
  | ConditionConnectionReferer_Question
  | ConditionConnectionTarget
  | ConditionConnectionTarget_Value
  | ConditionConnectionType
  | ConditionConnectionUpdatedAt
  | ConditionConnection_Id
  | ConditionError
  | ConditionGroupBy
  | I18NLocale
  | Landing
  | LandingAggregator
  | LandingConnection
  | LandingConnectionAbout_Page
  | LandingConnectionColor_Theme
  | LandingConnectionCover
  | LandingConnectionCreatedAt
  | LandingConnectionId
  | LandingConnectionImage_Cover
  | LandingConnectionLogo
  | LandingConnectionMembers
  | LandingConnectionPartners_Logos
  | LandingConnectionPublished_At
  | LandingConnectionSubtitle
  | LandingConnectionSurvey
  | LandingConnectionTitle
  | LandingConnectionUpdatedAt
  | LandingConnectionVideo_Url
  | LandingConnectionWysiwyg
  | LandingConnection_Id
  | LandingGroupBy
  | Page
  | PageAggregator
  | PageCondition
  | PageConnection
  | PageConnectionCreatedAt
  | PageConnectionDescription
  | PageConnectionId
  | PageConnectionIs_Locked
  | PageConnectionName
  | PageConnectionPublished_At
  | PageConnectionShort_Name
  | PageConnectionSurvey
  | PageConnectionUpdatedAt
  | PageConnection_Id
  | PageGroupBy
  | PageStatus
  | Participation
  | ParticipationAggregator
  | ParticipationConnection
  | ParticipationConnectionCompleted
  | ParticipationConnectionCompletedAt
  | ParticipationConnectionConsent
  | ParticipationConnectionContact
  | ParticipationConnectionCreatedAt
  | ParticipationConnectionId
  | ParticipationConnectionStartedAt
  | ParticipationConnectionSurvey
  | ParticipationConnectionUpdatedAt
  | ParticipationConnection_Id
  | ParticipationGroupBy
  | Question
  | QuestionAggregator
  | QuestionCondition
  | QuestionConnection
  | QuestionConnectionCreatedAt
  | QuestionConnectionFactors
  | QuestionConnectionHelp_Text
  | QuestionConnectionId
  | QuestionConnectionInternal_Description
  | QuestionConnectionInternal_Title
  | QuestionConnectionLabel
  | QuestionConnectionMax
  | QuestionConnectionMax_Loop
  | QuestionConnectionMin
  | QuestionConnectionNotes
  | QuestionConnectionOptions
  | QuestionConnectionPage
  | QuestionConnectionPlaceholder
  | QuestionConnectionRequired
  | QuestionConnectionRows
  | QuestionConnectionStep
  | QuestionConnectionType
  | QuestionConnectionType_Name
  | QuestionConnectionUnits
  | QuestionConnectionUpdatedAt
  | QuestionConnection_Id
  | QuestionGroupBy
  | QuestionStatus
  | Static
  | StaticAggregator
  | StaticConnection
  | StaticConnectionContent
  | StaticConnectionCreatedAt
  | StaticConnectionId
  | StaticConnectionPage
  | StaticConnectionPublished_At
  | StaticConnectionTitle
  | StaticConnectionUpdatedAt
  | StaticConnection_Id
  | StaticGroupBy
  | Survey
  | SurveyAggregator
  | SurveyAnalyzed
  | SurveyConnection
  | SurveyConnectionAuthor
  | SurveyConnectionCategories
  | SurveyConnectionConsentement
  | SurveyConnectionCreatedAt
  | SurveyConnectionDescription
  | SurveyConnectionEmail
  | SurveyConnectionId
  | SurveyConnectionKeywords
  | SurveyConnectionLanding
  | SurveyConnectionLanguage
  | SurveyConnectionOrder
  | SurveyConnectionPublished_At
  | SurveyConnectionSlug
  | SurveyConnectionStatus
  | SurveyConnectionTitle
  | SurveyConnectionUpdatedAt
  | SurveyConnection_Id
  | SurveyGroupBy
  | SurveyStatistics
  | SurveyStatus
  | SurveyTimeline
  | UnorderedError
  | UploadFile
  | UploadFileAggregator
  | UploadFileAggregatorAvg
  | UploadFileAggregatorMax
  | UploadFileAggregatorMin
  | UploadFileAggregatorSum
  | UploadFileConnection
  | UploadFileConnectionAlternativeText
  | UploadFileConnectionCaption
  | UploadFileConnectionCreatedAt
  | UploadFileConnectionExt
  | UploadFileConnectionFormats
  | UploadFileConnectionHash
  | UploadFileConnectionHeight
  | UploadFileConnectionId
  | UploadFileConnectionMime
  | UploadFileConnectionName
  | UploadFileConnectionPreviewUrl
  | UploadFileConnectionProvider
  | UploadFileConnectionProvider_Metadata
  | UploadFileConnectionSize
  | UploadFileConnectionUpdatedAt
  | UploadFileConnectionUrl
  | UploadFileConnectionWidth
  | UploadFileConnection_Id
  | UploadFileGroupBy
  | UserPermissionsPasswordPayload
  | UsersPermissionsLoginPayload
  | UsersPermissionsMe
  | UsersPermissionsMeRole
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsRoleAggregator
  | UsersPermissionsRoleConnection
  | UsersPermissionsRoleConnectionDescription
  | UsersPermissionsRoleConnectionId
  | UsersPermissionsRoleConnectionName
  | UsersPermissionsRoleConnectionType
  | UsersPermissionsRoleConnection_Id
  | UsersPermissionsRoleGroupBy
  | UsersPermissionsUser
  | UsersPermissionsUserAggregator
  | UsersPermissionsUserConnection
  | UsersPermissionsUserConnectionBlocked
  | UsersPermissionsUserConnectionConfirmed
  | UsersPermissionsUserConnectionCreatedAt
  | UsersPermissionsUserConnectionEmail
  | UsersPermissionsUserConnectionFirstName
  | UsersPermissionsUserConnectionId
  | UsersPermissionsUserConnectionInstitution
  | UsersPermissionsUserConnectionJob
  | UsersPermissionsUserConnectionLastName
  | UsersPermissionsUserConnectionProvider
  | UsersPermissionsUserConnectionRole
  | UsersPermissionsUserConnectionUpdatedAt
  | UsersPermissionsUserConnectionUsername
  | UsersPermissionsUserConnection_Id
  | UsersPermissionsUserGroupBy
  | CreateAnswerPayload
  | CreateConditionPayload
  | CreateLandingPayload
  | CreatePagePayload
  | CreateParticipationPayload
  | CreateQuestionPayload
  | CreateRolePayload
  | CreateStaticPayload
  | CreateSurveyPayload
  | CreateUserPayload
  | DeleteAnswerPayload
  | DeleteConditionPayload
  | DeleteFilePayload
  | DeleteLandingPayload
  | DeletePagePayload
  | DeleteParticipationPayload
  | DeleteQuestionPayload
  | DeleteRolePayload
  | DeleteStaticPayload
  | DeleteSurveyPayload
  | DeleteUserPayload
  | UpdateAnswerPayload
  | UpdateConditionPayload
  | UpdateLandingPayload
  | UpdatePagePayload
  | UpdateParticipationPayload
  | UpdateQuestionPayload
  | UpdateRolePayload
  | UpdateStaticPayload
  | UpdateSurveyPayload
  | UpdateUserPayload;

export type Mutation = {
  __typename?: "Mutation";
  createAnswer?: Maybe<CreateAnswerPayload>;
  createCondition?: Maybe<CreateConditionPayload>;
  createLanding?: Maybe<CreateLandingPayload>;
  createPage?: Maybe<CreatePagePayload>;
  createParticipation?: Maybe<CreateParticipationPayload>;
  createQuestion?: Maybe<CreateQuestionPayload>;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  createStatic?: Maybe<CreateStaticPayload>;
  createSurvey?: Maybe<CreateSurveyPayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  deleteAnswer?: Maybe<DeleteAnswerPayload>;
  deleteCondition?: Maybe<DeleteConditionPayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  deleteGroupCondition: Scalars["Boolean"];
  deleteLanding?: Maybe<DeleteLandingPayload>;
  deletePage?: Maybe<DeletePagePayload>;
  deleteParticipation?: Maybe<DeleteParticipationPayload>;
  deleteQuestion?: Maybe<DeleteQuestionPayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  deleteStatic?: Maybe<DeleteStaticPayload>;
  deleteSurvey?: Maybe<DeleteSurveyPayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  duplicateSurvey: Survey;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFile>>;
  register: UsersPermissionsLoginPayload;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAnswer?: Maybe<UpdateAnswerPayload>;
  updateCondition?: Maybe<UpdateConditionPayload>;
  updateFileInfo: UploadFile;
  updateLanding?: Maybe<UpdateLandingPayload>;
  updatePage?: Maybe<UpdatePagePayload>;
  updateParticipation?: Maybe<UpdateParticipationPayload>;
  updateQuestion?: Maybe<UpdateQuestionPayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  updateStatic?: Maybe<UpdateStaticPayload>;
  updateSurvey?: Maybe<UpdateSurveyPayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  upload: UploadFile;
};

export type MutationCreateAnswerArgs = {
  input?: InputMaybe<CreateAnswerInput>;
};

export type MutationCreateConditionArgs = {
  input?: InputMaybe<CreateConditionInput>;
};

export type MutationCreateLandingArgs = {
  input?: InputMaybe<CreateLandingInput>;
};

export type MutationCreatePageArgs = {
  input?: InputMaybe<CreatePageInput>;
};

export type MutationCreateParticipationArgs = {
  input?: InputMaybe<CreateParticipationInput>;
};

export type MutationCreateQuestionArgs = {
  input?: InputMaybe<CreateQuestionInput>;
};

export type MutationCreateRoleArgs = {
  input?: InputMaybe<CreateRoleInput>;
};

export type MutationCreateStaticArgs = {
  input?: InputMaybe<CreateStaticInput>;
};

export type MutationCreateSurveyArgs = {
  input?: InputMaybe<CreateSurveyInput>;
};

export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>;
};

export type MutationDeleteAnswerArgs = {
  input?: InputMaybe<DeleteAnswerInput>;
};

export type MutationDeleteConditionArgs = {
  input?: InputMaybe<DeleteConditionInput>;
};

export type MutationDeleteFileArgs = {
  input?: InputMaybe<DeleteFileInput>;
};

export type MutationDeleteGroupConditionArgs = {
  name?: InputMaybe<Scalars["String"]>;
};

export type MutationDeleteLandingArgs = {
  input?: InputMaybe<DeleteLandingInput>;
};

export type MutationDeletePageArgs = {
  input?: InputMaybe<DeletePageInput>;
};

export type MutationDeleteParticipationArgs = {
  input?: InputMaybe<DeleteParticipationInput>;
};

export type MutationDeleteQuestionArgs = {
  input?: InputMaybe<DeleteQuestionInput>;
};

export type MutationDeleteRoleArgs = {
  input?: InputMaybe<DeleteRoleInput>;
};

export type MutationDeleteStaticArgs = {
  input?: InputMaybe<DeleteStaticInput>;
};

export type MutationDeleteSurveyArgs = {
  input?: InputMaybe<DeleteSurveyInput>;
};

export type MutationDeleteUserArgs = {
  input?: InputMaybe<DeleteUserInput>;
};

export type MutationDuplicateSurveyArgs = {
  id: Scalars["ID"];
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars["String"]>;
  files: Array<InputMaybe<Scalars["Upload"]>>;
  ref?: InputMaybe<Scalars["String"]>;
  refId?: InputMaybe<Scalars["ID"]>;
  source?: InputMaybe<Scalars["String"]>;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationResetPasswordArgs = {
  code: Scalars["String"];
  password: Scalars["String"];
  passwordConfirmation: Scalars["String"];
};

export type MutationUpdateAnswerArgs = {
  input?: InputMaybe<UpdateAnswerInput>;
};

export type MutationUpdateConditionArgs = {
  input?: InputMaybe<UpdateConditionInput>;
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars["ID"];
  info: FileInfoInput;
};

export type MutationUpdateLandingArgs = {
  input?: InputMaybe<UpdateLandingInput>;
};

export type MutationUpdatePageArgs = {
  input?: InputMaybe<UpdatePageInput>;
};

export type MutationUpdateParticipationArgs = {
  input?: InputMaybe<UpdateParticipationInput>;
};

export type MutationUpdateQuestionArgs = {
  input?: InputMaybe<UpdateQuestionInput>;
};

export type MutationUpdateRoleArgs = {
  input?: InputMaybe<UpdateRoleInput>;
};

export type MutationUpdateStaticArgs = {
  input?: InputMaybe<UpdateStaticInput>;
};

export type MutationUpdateSurveyArgs = {
  input?: InputMaybe<UpdateSurveyInput>;
};

export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUserInput>;
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars["String"]>;
  file: Scalars["Upload"];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars["String"]>;
  refId?: InputMaybe<Scalars["ID"]>;
  source?: InputMaybe<Scalars["String"]>;
};

export type Page = {
  __typename?: "Page";
  _id: Scalars["ID"];
  conditions?: Maybe<Array<Maybe<Condition>>>;
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  is_locked?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  published_at?: Maybe<Scalars["DateTime"]>;
  questions?: Maybe<Array<Maybe<Question>>>;
  short_name?: Maybe<Scalars["String"]>;
  statics?: Maybe<Array<Maybe<Static>>>;
  survey?: Maybe<Survey>;
  updatedAt: Scalars["DateTime"];
};

export type PageConditionsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type PageQuestionsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type PageStaticsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type PageAggregator = {
  __typename?: "PageAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type PageCondition = {
  __typename?: "PageCondition";
  conditions?: Maybe<Array<Maybe<AnsweredConditions>>>;
  id: Scalars["ID"];
};

export type PageConnection = {
  __typename?: "PageConnection";
  aggregate?: Maybe<PageAggregator>;
  groupBy?: Maybe<PageGroupBy>;
  values?: Maybe<Array<Maybe<Page>>>;
};

export type PageConnectionCreatedAt = {
  __typename?: "PageConnectionCreatedAt";
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type PageConnectionDescription = {
  __typename?: "PageConnectionDescription";
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type PageConnectionId = {
  __typename?: "PageConnectionId";
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type PageConnectionIs_Locked = {
  __typename?: "PageConnectionIs_locked";
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars["Boolean"]>;
};

export type PageConnectionName = {
  __typename?: "PageConnectionName";
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type PageConnectionPublished_At = {
  __typename?: "PageConnectionPublished_at";
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type PageConnectionShort_Name = {
  __typename?: "PageConnectionShort_name";
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type PageConnectionSurvey = {
  __typename?: "PageConnectionSurvey";
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type PageConnectionUpdatedAt = {
  __typename?: "PageConnectionUpdatedAt";
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type PageConnection_Id = {
  __typename?: "PageConnection_id";
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type PageGroupBy = {
  __typename?: "PageGroupBy";
  _id?: Maybe<Array<Maybe<PageConnection_Id>>>;
  createdAt?: Maybe<Array<Maybe<PageConnectionCreatedAt>>>;
  description?: Maybe<Array<Maybe<PageConnectionDescription>>>;
  id?: Maybe<Array<Maybe<PageConnectionId>>>;
  is_locked?: Maybe<Array<Maybe<PageConnectionIs_Locked>>>;
  name?: Maybe<Array<Maybe<PageConnectionName>>>;
  published_at?: Maybe<Array<Maybe<PageConnectionPublished_At>>>;
  short_name?: Maybe<Array<Maybe<PageConnectionShort_Name>>>;
  survey?: Maybe<Array<Maybe<PageConnectionSurvey>>>;
  updatedAt?: Maybe<Array<Maybe<PageConnectionUpdatedAt>>>;
};

export type PageInput = {
  conditions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  created_by?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  is_locked?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  published_at?: InputMaybe<Scalars["DateTime"]>;
  questions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  short_name?: InputMaybe<Scalars["String"]>;
  statics?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  survey?: InputMaybe<Scalars["ID"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export type PageStatus = {
  __typename?: "PageStatus";
  errors: Array<Maybe<QuestionStatus>>;
  pageId: Scalars["ID"];
  valid: Scalars["Boolean"];
};

export type Participation = {
  __typename?: "Participation";
  _id: Scalars["ID"];
  answers?: Maybe<Array<Maybe<Answer>>>;
  completed: Scalars["Boolean"];
  completedAt?: Maybe<Scalars["DateTime"]>;
  consent: Scalars["Boolean"];
  contact?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  startedAt?: Maybe<Scalars["DateTime"]>;
  survey?: Maybe<Survey>;
  updatedAt: Scalars["DateTime"];
};

export type ParticipationAnswersArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type ParticipationAggregator = {
  __typename?: "ParticipationAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type ParticipationConnection = {
  __typename?: "ParticipationConnection";
  aggregate?: Maybe<ParticipationAggregator>;
  groupBy?: Maybe<ParticipationGroupBy>;
  values?: Maybe<Array<Maybe<Participation>>>;
};

export type ParticipationConnectionCompleted = {
  __typename?: "ParticipationConnectionCompleted";
  connection?: Maybe<ParticipationConnection>;
  key?: Maybe<Scalars["Boolean"]>;
};

export type ParticipationConnectionCompletedAt = {
  __typename?: "ParticipationConnectionCompletedAt";
  connection?: Maybe<ParticipationConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type ParticipationConnectionConsent = {
  __typename?: "ParticipationConnectionConsent";
  connection?: Maybe<ParticipationConnection>;
  key?: Maybe<Scalars["Boolean"]>;
};

export type ParticipationConnectionContact = {
  __typename?: "ParticipationConnectionContact";
  connection?: Maybe<ParticipationConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type ParticipationConnectionCreatedAt = {
  __typename?: "ParticipationConnectionCreatedAt";
  connection?: Maybe<ParticipationConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type ParticipationConnectionId = {
  __typename?: "ParticipationConnectionId";
  connection?: Maybe<ParticipationConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type ParticipationConnectionStartedAt = {
  __typename?: "ParticipationConnectionStartedAt";
  connection?: Maybe<ParticipationConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type ParticipationConnectionSurvey = {
  __typename?: "ParticipationConnectionSurvey";
  connection?: Maybe<ParticipationConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type ParticipationConnectionUpdatedAt = {
  __typename?: "ParticipationConnectionUpdatedAt";
  connection?: Maybe<ParticipationConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type ParticipationConnection_Id = {
  __typename?: "ParticipationConnection_id";
  connection?: Maybe<ParticipationConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type ParticipationGroupBy = {
  __typename?: "ParticipationGroupBy";
  _id?: Maybe<Array<Maybe<ParticipationConnection_Id>>>;
  completed?: Maybe<Array<Maybe<ParticipationConnectionCompleted>>>;
  completedAt?: Maybe<Array<Maybe<ParticipationConnectionCompletedAt>>>;
  consent?: Maybe<Array<Maybe<ParticipationConnectionConsent>>>;
  contact?: Maybe<Array<Maybe<ParticipationConnectionContact>>>;
  createdAt?: Maybe<Array<Maybe<ParticipationConnectionCreatedAt>>>;
  id?: Maybe<Array<Maybe<ParticipationConnectionId>>>;
  startedAt?: Maybe<Array<Maybe<ParticipationConnectionStartedAt>>>;
  survey?: Maybe<Array<Maybe<ParticipationConnectionSurvey>>>;
  updatedAt?: Maybe<Array<Maybe<ParticipationConnectionUpdatedAt>>>;
};

export type ParticipationInput = {
  answers?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  completed?: InputMaybe<Scalars["Boolean"]>;
  completedAt?: InputMaybe<Scalars["DateTime"]>;
  consent: Scalars["Boolean"];
  contact?: InputMaybe<Scalars["String"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  startedAt?: InputMaybe<Scalars["DateTime"]>;
  survey?: InputMaybe<Scalars["ID"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export enum PublicationState {
  Live = "LIVE",
  Preview = "PREVIEW",
}

export type Query = {
  __typename?: "Query";
  answer?: Maybe<Answer>;
  answers?: Maybe<Array<Maybe<Answer>>>;
  answersConnection?: Maybe<AnswerConnection>;
  checkCondition: Scalars["Boolean"];
  checkPage: PageStatus;
  checkQuestion: QuestionStatus;
  checkSurvey: SurveyStatus;
  condition?: Maybe<Condition>;
  conditions?: Maybe<Array<Maybe<Condition>>>;
  conditionsConnection?: Maybe<ConditionConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  landing?: Maybe<Landing>;
  landings?: Maybe<Array<Maybe<Landing>>>;
  landingsConnection?: Maybe<LandingConnection>;
  me?: Maybe<UsersPermissionsMe>;
  page?: Maybe<Page>;
  pages?: Maybe<Array<Maybe<Page>>>;
  pagesConnection?: Maybe<PageConnection>;
  participation?: Maybe<Participation>;
  participations?: Maybe<Array<Maybe<Participation>>>;
  participationsConnection?: Maybe<ParticipationConnection>;
  question?: Maybe<Question>;
  questionEvaluation: QuestionCondition;
  questions?: Maybe<Array<Maybe<Question>>>;
  questionsBySurvey?: Maybe<Array<Maybe<Question>>>;
  questionsConnection?: Maybe<QuestionConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  static?: Maybe<Static>;
  statics?: Maybe<Array<Maybe<Static>>>;
  staticsConnection?: Maybe<StaticConnection>;
  survey?: Maybe<Survey>;
  surveyStats: SurveyAnalyzed;
  surveys?: Maybe<Array<Maybe<Survey>>>;
  surveysConnection?: Maybe<SurveyConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
};

export type QueryAnswerArgs = {
  id: Scalars["ID"];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryAnswersArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryAnswersConnectionArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryCheckConditionArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryCheckPageArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryCheckQuestionArgs = {
  id: Scalars["ID"];
};

export type QueryCheckSurveyArgs = {
  id: Scalars["ID"];
};

export type QueryConditionArgs = {
  id: Scalars["ID"];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryConditionsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryConditionsConnectionArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryFilesArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryFilesConnectionArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryLandingArgs = {
  id: Scalars["ID"];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryLandingsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryLandingsConnectionArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryPageArgs = {
  id: Scalars["ID"];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryPagesArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryPagesConnectionArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryParticipationArgs = {
  id: Scalars["ID"];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryParticipationsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryParticipationsConnectionArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryQuestionArgs = {
  id: Scalars["ID"];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryQuestionEvaluationArgs = {
  participationId: Scalars["ID"];
  questionId: Scalars["ID"];
};

export type QueryQuestionsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryQuestionsBySurveyArgs = {
  surveyId: Scalars["ID"];
};

export type QueryQuestionsConnectionArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryRoleArgs = {
  id: Scalars["ID"];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryRolesArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryRolesConnectionArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryStaticArgs = {
  id: Scalars["ID"];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryStaticsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryStaticsConnectionArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QuerySurveyArgs = {
  id: Scalars["ID"];
  publicationState?: InputMaybe<PublicationState>;
};

export type QuerySurveyStatsArgs = {
  id: Scalars["ID"];
};

export type QuerySurveysArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QuerySurveysConnectionArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QueryUsersConnectionArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type Question = {
  __typename?: "Question";
  _id: Scalars["ID"];
  conditions?: Maybe<Array<Maybe<Condition>>>;
  createdAt: Scalars["DateTime"];
  factors?: Maybe<Scalars["JSON"]>;
  help_text?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  internal_description?: Maybe<Scalars["String"]>;
  internal_title?: Maybe<Scalars["String"]>;
  label?: Maybe<Scalars["String"]>;
  max?: Maybe<Scalars["Long"]>;
  max_loop?: Maybe<Scalars["String"]>;
  min?: Maybe<Scalars["Long"]>;
  notes?: Maybe<Scalars["String"]>;
  options?: Maybe<Scalars["JSON"]>;
  page?: Maybe<Page>;
  placeholder?: Maybe<Scalars["String"]>;
  required?: Maybe<Scalars["String"]>;
  rows?: Maybe<Enum_Question_Rows>;
  step?: Maybe<Scalars["Long"]>;
  targeted_by?: Maybe<Array<Maybe<Condition>>>;
  type?: Maybe<Enum_Question_Type>;
  type_name?: Maybe<Scalars["String"]>;
  units?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type QuestionConditionsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QuestionTargeted_ByArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type QuestionAggregator = {
  __typename?: "QuestionAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type QuestionCondition = {
  __typename?: "QuestionCondition";
  conditions?: Maybe<Array<Maybe<AnsweredConditions>>>;
  id: Scalars["ID"];
};

export type QuestionConnection = {
  __typename?: "QuestionConnection";
  aggregate?: Maybe<QuestionAggregator>;
  groupBy?: Maybe<QuestionGroupBy>;
  values?: Maybe<Array<Maybe<Question>>>;
};

export type QuestionConnectionCreatedAt = {
  __typename?: "QuestionConnectionCreatedAt";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type QuestionConnectionFactors = {
  __typename?: "QuestionConnectionFactors";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type QuestionConnectionHelp_Text = {
  __typename?: "QuestionConnectionHelp_text";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type QuestionConnectionId = {
  __typename?: "QuestionConnectionId";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type QuestionConnectionInternal_Description = {
  __typename?: "QuestionConnectionInternal_description";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type QuestionConnectionInternal_Title = {
  __typename?: "QuestionConnectionInternal_title";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type QuestionConnectionLabel = {
  __typename?: "QuestionConnectionLabel";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type QuestionConnectionMax = {
  __typename?: "QuestionConnectionMax";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type QuestionConnectionMax_Loop = {
  __typename?: "QuestionConnectionMax_loop";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type QuestionConnectionMin = {
  __typename?: "QuestionConnectionMin";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type QuestionConnectionNotes = {
  __typename?: "QuestionConnectionNotes";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type QuestionConnectionOptions = {
  __typename?: "QuestionConnectionOptions";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type QuestionConnectionPage = {
  __typename?: "QuestionConnectionPage";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type QuestionConnectionPlaceholder = {
  __typename?: "QuestionConnectionPlaceholder";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type QuestionConnectionRequired = {
  __typename?: "QuestionConnectionRequired";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type QuestionConnectionRows = {
  __typename?: "QuestionConnectionRows";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type QuestionConnectionStep = {
  __typename?: "QuestionConnectionStep";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type QuestionConnectionType = {
  __typename?: "QuestionConnectionType";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type QuestionConnectionType_Name = {
  __typename?: "QuestionConnectionType_name";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type QuestionConnectionUnits = {
  __typename?: "QuestionConnectionUnits";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type QuestionConnectionUpdatedAt = {
  __typename?: "QuestionConnectionUpdatedAt";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type QuestionConnection_Id = {
  __typename?: "QuestionConnection_id";
  connection?: Maybe<QuestionConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type QuestionGroupBy = {
  __typename?: "QuestionGroupBy";
  _id?: Maybe<Array<Maybe<QuestionConnection_Id>>>;
  createdAt?: Maybe<Array<Maybe<QuestionConnectionCreatedAt>>>;
  factors?: Maybe<Array<Maybe<QuestionConnectionFactors>>>;
  help_text?: Maybe<Array<Maybe<QuestionConnectionHelp_Text>>>;
  id?: Maybe<Array<Maybe<QuestionConnectionId>>>;
  internal_description?: Maybe<
    Array<Maybe<QuestionConnectionInternal_Description>>
  >;
  internal_title?: Maybe<Array<Maybe<QuestionConnectionInternal_Title>>>;
  label?: Maybe<Array<Maybe<QuestionConnectionLabel>>>;
  max?: Maybe<Array<Maybe<QuestionConnectionMax>>>;
  max_loop?: Maybe<Array<Maybe<QuestionConnectionMax_Loop>>>;
  min?: Maybe<Array<Maybe<QuestionConnectionMin>>>;
  notes?: Maybe<Array<Maybe<QuestionConnectionNotes>>>;
  options?: Maybe<Array<Maybe<QuestionConnectionOptions>>>;
  page?: Maybe<Array<Maybe<QuestionConnectionPage>>>;
  placeholder?: Maybe<Array<Maybe<QuestionConnectionPlaceholder>>>;
  required?: Maybe<Array<Maybe<QuestionConnectionRequired>>>;
  rows?: Maybe<Array<Maybe<QuestionConnectionRows>>>;
  step?: Maybe<Array<Maybe<QuestionConnectionStep>>>;
  type?: Maybe<Array<Maybe<QuestionConnectionType>>>;
  type_name?: Maybe<Array<Maybe<QuestionConnectionType_Name>>>;
  units?: Maybe<Array<Maybe<QuestionConnectionUnits>>>;
  updatedAt?: Maybe<Array<Maybe<QuestionConnectionUpdatedAt>>>;
};

export type QuestionInput = {
  conditions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  created_by?: InputMaybe<Scalars["ID"]>;
  factors?: InputMaybe<Scalars["JSON"]>;
  help_text?: InputMaybe<Scalars["String"]>;
  internal_description?: InputMaybe<Scalars["String"]>;
  internal_title?: InputMaybe<Scalars["String"]>;
  label?: InputMaybe<Scalars["String"]>;
  max?: InputMaybe<Scalars["Long"]>;
  max_loop?: InputMaybe<Scalars["String"]>;
  min?: InputMaybe<Scalars["Long"]>;
  notes?: InputMaybe<Scalars["String"]>;
  options?: InputMaybe<Scalars["JSON"]>;
  page?: InputMaybe<Scalars["ID"]>;
  placeholder?: InputMaybe<Scalars["String"]>;
  required?: InputMaybe<Scalars["String"]>;
  rows?: InputMaybe<Enum_Question_Rows>;
  step?: InputMaybe<Scalars["Long"]>;
  targeted_by?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  type?: InputMaybe<Enum_Question_Type>;
  type_name?: InputMaybe<Scalars["String"]>;
  units?: InputMaybe<Scalars["String"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export type QuestionStatus = {
  __typename?: "QuestionStatus";
  errors: Array<Maybe<ConditionError>>;
  questionId: Scalars["String"];
  unordered: Array<Maybe<UnorderedError>>;
  valid: Scalars["Boolean"];
};

export type RoleInput = {
  created_by?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  permissions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  type?: InputMaybe<Scalars["String"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
  users?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type Static = {
  __typename?: "Static";
  _id: Scalars["ID"];
  content?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  media?: Maybe<Array<Maybe<UploadFile>>>;
  page?: Maybe<Page>;
  published_at?: Maybe<Scalars["DateTime"]>;
  title?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type StaticMediaArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type StaticAggregator = {
  __typename?: "StaticAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type StaticConnection = {
  __typename?: "StaticConnection";
  aggregate?: Maybe<StaticAggregator>;
  groupBy?: Maybe<StaticGroupBy>;
  values?: Maybe<Array<Maybe<Static>>>;
};

export type StaticConnectionContent = {
  __typename?: "StaticConnectionContent";
  connection?: Maybe<StaticConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type StaticConnectionCreatedAt = {
  __typename?: "StaticConnectionCreatedAt";
  connection?: Maybe<StaticConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type StaticConnectionId = {
  __typename?: "StaticConnectionId";
  connection?: Maybe<StaticConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type StaticConnectionPage = {
  __typename?: "StaticConnectionPage";
  connection?: Maybe<StaticConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type StaticConnectionPublished_At = {
  __typename?: "StaticConnectionPublished_at";
  connection?: Maybe<StaticConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type StaticConnectionTitle = {
  __typename?: "StaticConnectionTitle";
  connection?: Maybe<StaticConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type StaticConnectionUpdatedAt = {
  __typename?: "StaticConnectionUpdatedAt";
  connection?: Maybe<StaticConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type StaticConnection_Id = {
  __typename?: "StaticConnection_id";
  connection?: Maybe<StaticConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type StaticGroupBy = {
  __typename?: "StaticGroupBy";
  _id?: Maybe<Array<Maybe<StaticConnection_Id>>>;
  content?: Maybe<Array<Maybe<StaticConnectionContent>>>;
  createdAt?: Maybe<Array<Maybe<StaticConnectionCreatedAt>>>;
  id?: Maybe<Array<Maybe<StaticConnectionId>>>;
  page?: Maybe<Array<Maybe<StaticConnectionPage>>>;
  published_at?: Maybe<Array<Maybe<StaticConnectionPublished_At>>>;
  title?: Maybe<Array<Maybe<StaticConnectionTitle>>>;
  updatedAt?: Maybe<Array<Maybe<StaticConnectionUpdatedAt>>>;
};

export type StaticInput = {
  content?: InputMaybe<Scalars["String"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  media?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  page?: InputMaybe<Scalars["ID"]>;
  published_at?: InputMaybe<Scalars["DateTime"]>;
  title?: InputMaybe<Scalars["String"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export type Survey = {
  __typename?: "Survey";
  _id: Scalars["ID"];
  author?: Maybe<UsersPermissionsUser>;
  categories?: Maybe<Scalars["JSON"]>;
  consentement?: Maybe<UploadFile>;
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  keywords?: Maybe<Scalars["JSON"]>;
  landing?: Maybe<Landing>;
  language?: Maybe<Scalars["String"]>;
  order?: Maybe<Scalars["JSON"]>;
  pages?: Maybe<Array<Maybe<Page>>>;
  participations?: Maybe<Array<Maybe<Participation>>>;
  published_at?: Maybe<Scalars["DateTime"]>;
  slug: Scalars["String"];
  status?: Maybe<Enum_Survey_Status>;
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type SurveyPagesArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type SurveyParticipationsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type SurveyAggregator = {
  __typename?: "SurveyAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type SurveyAnalyzed = {
  __typename?: "SurveyAnalyzed";
  createdAt?: Maybe<Scalars["Date"]>;
  description?: Maybe<Scalars["String"]>;
  publishedAt?: Maybe<Scalars["Date"]>;
  statistics: SurveyTimeline;
  title: Scalars["String"];
};

export type SurveyConnection = {
  __typename?: "SurveyConnection";
  aggregate?: Maybe<SurveyAggregator>;
  groupBy?: Maybe<SurveyGroupBy>;
  values?: Maybe<Array<Maybe<Survey>>>;
};

export type SurveyConnectionAuthor = {
  __typename?: "SurveyConnectionAuthor";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type SurveyConnectionCategories = {
  __typename?: "SurveyConnectionCategories";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type SurveyConnectionConsentement = {
  __typename?: "SurveyConnectionConsentement";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type SurveyConnectionCreatedAt = {
  __typename?: "SurveyConnectionCreatedAt";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type SurveyConnectionDescription = {
  __typename?: "SurveyConnectionDescription";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type SurveyConnectionEmail = {
  __typename?: "SurveyConnectionEmail";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type SurveyConnectionId = {
  __typename?: "SurveyConnectionId";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type SurveyConnectionKeywords = {
  __typename?: "SurveyConnectionKeywords";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type SurveyConnectionLanding = {
  __typename?: "SurveyConnectionLanding";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type SurveyConnectionLanguage = {
  __typename?: "SurveyConnectionLanguage";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type SurveyConnectionOrder = {
  __typename?: "SurveyConnectionOrder";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type SurveyConnectionPublished_At = {
  __typename?: "SurveyConnectionPublished_at";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type SurveyConnectionSlug = {
  __typename?: "SurveyConnectionSlug";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type SurveyConnectionStatus = {
  __typename?: "SurveyConnectionStatus";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type SurveyConnectionTitle = {
  __typename?: "SurveyConnectionTitle";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type SurveyConnectionUpdatedAt = {
  __typename?: "SurveyConnectionUpdatedAt";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type SurveyConnection_Id = {
  __typename?: "SurveyConnection_id";
  connection?: Maybe<SurveyConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type SurveyGroupBy = {
  __typename?: "SurveyGroupBy";
  _id?: Maybe<Array<Maybe<SurveyConnection_Id>>>;
  author?: Maybe<Array<Maybe<SurveyConnectionAuthor>>>;
  categories?: Maybe<Array<Maybe<SurveyConnectionCategories>>>;
  consentement?: Maybe<Array<Maybe<SurveyConnectionConsentement>>>;
  createdAt?: Maybe<Array<Maybe<SurveyConnectionCreatedAt>>>;
  description?: Maybe<Array<Maybe<SurveyConnectionDescription>>>;
  email?: Maybe<Array<Maybe<SurveyConnectionEmail>>>;
  id?: Maybe<Array<Maybe<SurveyConnectionId>>>;
  keywords?: Maybe<Array<Maybe<SurveyConnectionKeywords>>>;
  landing?: Maybe<Array<Maybe<SurveyConnectionLanding>>>;
  language?: Maybe<Array<Maybe<SurveyConnectionLanguage>>>;
  order?: Maybe<Array<Maybe<SurveyConnectionOrder>>>;
  published_at?: Maybe<Array<Maybe<SurveyConnectionPublished_At>>>;
  slug?: Maybe<Array<Maybe<SurveyConnectionSlug>>>;
  status?: Maybe<Array<Maybe<SurveyConnectionStatus>>>;
  title?: Maybe<Array<Maybe<SurveyConnectionTitle>>>;
  updatedAt?: Maybe<Array<Maybe<SurveyConnectionUpdatedAt>>>;
};

export type SurveyInput = {
  author?: InputMaybe<Scalars["ID"]>;
  categories?: InputMaybe<Scalars["JSON"]>;
  consentement?: InputMaybe<Scalars["ID"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  keywords?: InputMaybe<Scalars["JSON"]>;
  landing?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["String"]>;
  order?: InputMaybe<Scalars["JSON"]>;
  pages?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  participations?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  published_at?: InputMaybe<Scalars["DateTime"]>;
  slug: Scalars["String"];
  status?: InputMaybe<Enum_Survey_Status>;
  title: Scalars["String"];
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export type SurveyStatistics = {
  __typename?: "SurveyStatistics";
  completed: Scalars["Int"];
  consented: Scalars["Int"];
  visits: Scalars["Int"];
};

export type SurveyStatus = {
  __typename?: "SurveyStatus";
  errors: Array<Maybe<PageStatus>>;
  valid: Scalars["Boolean"];
};

export type SurveyTimeline = {
  __typename?: "SurveyTimeline";
  all: SurveyStatistics;
  day: SurveyStatistics;
  month: SurveyStatistics;
  semester: SurveyStatistics;
  week: SurveyStatistics;
  year: SurveyStatistics;
};

export type UnorderedError = {
  __typename?: "UnorderedError";
  conditionId: Scalars["ID"];
  targetId: Scalars["ID"];
};

export type UploadFile = {
  __typename?: "UploadFile";
  _id: Scalars["ID"];
  alternativeText?: Maybe<Scalars["String"]>;
  caption?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  ext?: Maybe<Scalars["String"]>;
  formats?: Maybe<Scalars["JSON"]>;
  hash: Scalars["String"];
  height?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  mime: Scalars["String"];
  name: Scalars["String"];
  previewUrl?: Maybe<Scalars["String"]>;
  provider: Scalars["String"];
  provider_metadata?: Maybe<Scalars["JSON"]>;
  related?: Maybe<Array<Maybe<Morph>>>;
  size: Scalars["Float"];
  updatedAt: Scalars["DateTime"];
  url: Scalars["String"];
  width?: Maybe<Scalars["Int"]>;
};

export type UploadFileRelatedArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type UploadFileAggregator = {
  __typename?: "UploadFileAggregator";
  avg?: Maybe<UploadFileAggregatorAvg>;
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<UploadFileAggregatorMax>;
  min?: Maybe<UploadFileAggregatorMin>;
  sum?: Maybe<UploadFileAggregatorSum>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UploadFileAggregatorAvg = {
  __typename?: "UploadFileAggregatorAvg";
  height?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
};

export type UploadFileAggregatorMax = {
  __typename?: "UploadFileAggregatorMax";
  height?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
};

export type UploadFileAggregatorMin = {
  __typename?: "UploadFileAggregatorMin";
  height?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
};

export type UploadFileAggregatorSum = {
  __typename?: "UploadFileAggregatorSum";
  height?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
};

export type UploadFileConnection = {
  __typename?: "UploadFileConnection";
  aggregate?: Maybe<UploadFileAggregator>;
  groupBy?: Maybe<UploadFileGroupBy>;
  values?: Maybe<Array<Maybe<UploadFile>>>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: "UploadFileConnectionAlternativeText";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UploadFileConnectionCaption = {
  __typename?: "UploadFileConnectionCaption";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UploadFileConnectionCreatedAt = {
  __typename?: "UploadFileConnectionCreatedAt";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type UploadFileConnectionExt = {
  __typename?: "UploadFileConnectionExt";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UploadFileConnectionFormats = {
  __typename?: "UploadFileConnectionFormats";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type UploadFileConnectionHash = {
  __typename?: "UploadFileConnectionHash";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UploadFileConnectionHeight = {
  __typename?: "UploadFileConnectionHeight";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["Int"]>;
};

export type UploadFileConnectionId = {
  __typename?: "UploadFileConnectionId";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type UploadFileConnectionMime = {
  __typename?: "UploadFileConnectionMime";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UploadFileConnectionName = {
  __typename?: "UploadFileConnectionName";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: "UploadFileConnectionPreviewUrl";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UploadFileConnectionProvider = {
  __typename?: "UploadFileConnectionProvider";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: "UploadFileConnectionProvider_metadata";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["JSON"]>;
};

export type UploadFileConnectionSize = {
  __typename?: "UploadFileConnectionSize";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["Float"]>;
};

export type UploadFileConnectionUpdatedAt = {
  __typename?: "UploadFileConnectionUpdatedAt";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type UploadFileConnectionUrl = {
  __typename?: "UploadFileConnectionUrl";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UploadFileConnectionWidth = {
  __typename?: "UploadFileConnectionWidth";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["Int"]>;
};

export type UploadFileConnection_Id = {
  __typename?: "UploadFileConnection_id";
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type UploadFileGroupBy = {
  __typename?: "UploadFileGroupBy";
  _id?: Maybe<Array<Maybe<UploadFileConnection_Id>>>;
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  createdAt?: Maybe<Array<Maybe<UploadFileConnectionCreatedAt>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<
    Array<Maybe<UploadFileConnectionProvider_Metadata>>
  >;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  updatedAt?: Maybe<Array<Maybe<UploadFileConnectionUpdatedAt>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
};

export type UserInput = {
  blocked?: InputMaybe<Scalars["Boolean"]>;
  confirmationToken?: InputMaybe<Scalars["String"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  email: Scalars["String"];
  firstName?: InputMaybe<Scalars["String"]>;
  institution?: InputMaybe<Scalars["String"]>;
  job?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["String"]>;
  resetPasswordToken?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["ID"]>;
  surveys?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  updated_by?: InputMaybe<Scalars["ID"]>;
  username: Scalars["String"];
};

export type UserPermissionsPasswordPayload = {
  __typename?: "UserPermissionsPasswordPayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars["String"];
  password: Scalars["String"];
  provider?: InputMaybe<Scalars["String"]>;
};

export type UsersPermissionsLoginPayload = {
  __typename?: "UsersPermissionsLoginPayload";
  jwt?: Maybe<Scalars["String"]>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: "UsersPermissionsMe";
  blocked?: Maybe<Scalars["Boolean"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  email: Scalars["String"];
  id: Scalars["ID"];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars["String"];
};

export type UsersPermissionsMeRole = {
  __typename?: "UsersPermissionsMeRole";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  type?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsPermission = {
  __typename?: "UsersPermissionsPermission";
  _id: Scalars["ID"];
  action: Scalars["String"];
  controller: Scalars["String"];
  enabled: Scalars["Boolean"];
  id: Scalars["ID"];
  policy?: Maybe<Scalars["String"]>;
  role?: Maybe<UsersPermissionsRole>;
  type: Scalars["String"];
};

export type UsersPermissionsRegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type UsersPermissionsRole = {
  __typename?: "UsersPermissionsRole";
  _id: Scalars["ID"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  type?: Maybe<Scalars["String"]>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsRolePermissionsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type UsersPermissionsRoleUsersArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: "UsersPermissionsRoleAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: "UsersPermissionsRoleConnection";
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: "UsersPermissionsRoleConnectionDescription";
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: "UsersPermissionsRoleConnectionId";
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: "UsersPermissionsRoleConnectionName";
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: "UsersPermissionsRoleConnectionType";
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsRoleConnection_Id = {
  __typename?: "UsersPermissionsRoleConnection_id";
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: "UsersPermissionsRoleGroupBy";
  _id?: Maybe<Array<Maybe<UsersPermissionsRoleConnection_Id>>>;
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: "UsersPermissionsUser";
  _id: Scalars["ID"];
  blocked?: Maybe<Scalars["Boolean"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  firstName?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  institution?: Maybe<Scalars["String"]>;
  job?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  provider?: Maybe<Scalars["String"]>;
  role?: Maybe<UsersPermissionsRole>;
  surveys?: Maybe<Array<Maybe<Survey>>>;
  updatedAt: Scalars["DateTime"];
  username: Scalars["String"];
};

export type UsersPermissionsUserSurveysArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Scalars["JSON"]>;
};

export type UsersPermissionsUserAggregator = {
  __typename?: "UsersPermissionsUserAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UsersPermissionsUserConnection = {
  __typename?: "UsersPermissionsUserConnection";
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: "UsersPermissionsUserConnectionBlocked";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["Boolean"]>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: "UsersPermissionsUserConnectionConfirmed";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["Boolean"]>;
};

export type UsersPermissionsUserConnectionCreatedAt = {
  __typename?: "UsersPermissionsUserConnectionCreatedAt";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: "UsersPermissionsUserConnectionEmail";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsUserConnectionFirstName = {
  __typename?: "UsersPermissionsUserConnectionFirstName";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: "UsersPermissionsUserConnectionId";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsUserConnectionInstitution = {
  __typename?: "UsersPermissionsUserConnectionInstitution";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsUserConnectionJob = {
  __typename?: "UsersPermissionsUserConnectionJob";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsUserConnectionLastName = {
  __typename?: "UsersPermissionsUserConnectionLastName";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: "UsersPermissionsUserConnectionProvider";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: "UsersPermissionsUserConnectionRole";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsUserConnectionUpdatedAt = {
  __typename?: "UsersPermissionsUserConnectionUpdatedAt";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["DateTime"]>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: "UsersPermissionsUserConnectionUsername";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsUserConnection_Id = {
  __typename?: "UsersPermissionsUserConnection_id";
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: "UsersPermissionsUserGroupBy";
  _id?: Maybe<Array<Maybe<UsersPermissionsUserConnection_Id>>>;
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  createdAt?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreatedAt>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  firstName?: Maybe<Array<Maybe<UsersPermissionsUserConnectionFirstName>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  institution?: Maybe<Array<Maybe<UsersPermissionsUserConnectionInstitution>>>;
  job?: Maybe<Array<Maybe<UsersPermissionsUserConnectionJob>>>;
  lastName?: Maybe<Array<Maybe<UsersPermissionsUserConnectionLastName>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
  updatedAt?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdatedAt>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
};

export type CreateAnswerInput = {
  data?: InputMaybe<AnswerInput>;
};

export type CreateAnswerPayload = {
  __typename?: "createAnswerPayload";
  answer?: Maybe<Answer>;
};

export type CreateConditionInput = {
  data?: InputMaybe<ConditionInput>;
};

export type CreateConditionPayload = {
  __typename?: "createConditionPayload";
  condition?: Maybe<Condition>;
};

export type CreateLandingInput = {
  data?: InputMaybe<LandingInput>;
};

export type CreateLandingPayload = {
  __typename?: "createLandingPayload";
  landing?: Maybe<Landing>;
};

export type CreatePageInput = {
  data?: InputMaybe<PageInput>;
};

export type CreatePagePayload = {
  __typename?: "createPagePayload";
  page?: Maybe<Page>;
};

export type CreateParticipationInput = {
  data?: InputMaybe<ParticipationInput>;
};

export type CreateParticipationPayload = {
  __typename?: "createParticipationPayload";
  participation?: Maybe<Participation>;
};

export type CreateQuestionInput = {
  data?: InputMaybe<QuestionInput>;
};

export type CreateQuestionPayload = {
  __typename?: "createQuestionPayload";
  question?: Maybe<Question>;
};

export type CreateRoleInput = {
  data?: InputMaybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: "createRolePayload";
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateStaticInput = {
  data?: InputMaybe<StaticInput>;
};

export type CreateStaticPayload = {
  __typename?: "createStaticPayload";
  static?: Maybe<Static>;
};

export type CreateSurveyInput = {
  data?: InputMaybe<SurveyInput>;
};

export type CreateSurveyPayload = {
  __typename?: "createSurveyPayload";
  survey?: Maybe<Survey>;
};

export type CreateUserInput = {
  data?: InputMaybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: "createUserPayload";
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteAnswerInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteAnswerPayload = {
  __typename?: "deleteAnswerPayload";
  answer?: Maybe<Answer>;
};

export type DeleteConditionInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteConditionPayload = {
  __typename?: "deleteConditionPayload";
  condition?: Maybe<Condition>;
};

export type DeleteFileInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: "deleteFilePayload";
  file?: Maybe<UploadFile>;
};

export type DeleteLandingInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteLandingPayload = {
  __typename?: "deleteLandingPayload";
  landing?: Maybe<Landing>;
};

export type DeletePageInput = {
  where?: InputMaybe<InputId>;
};

export type DeletePagePayload = {
  __typename?: "deletePagePayload";
  page?: Maybe<Page>;
};

export type DeleteParticipationInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteParticipationPayload = {
  __typename?: "deleteParticipationPayload";
  participation?: Maybe<Participation>;
};

export type DeleteQuestionInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteQuestionPayload = {
  __typename?: "deleteQuestionPayload";
  question?: Maybe<Question>;
};

export type DeleteRoleInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: "deleteRolePayload";
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteStaticInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteStaticPayload = {
  __typename?: "deleteStaticPayload";
  static?: Maybe<Static>;
};

export type DeleteSurveyInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteSurveyPayload = {
  __typename?: "deleteSurveyPayload";
  survey?: Maybe<Survey>;
};

export type DeleteUserInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: "deleteUserPayload";
  user?: Maybe<UsersPermissionsUser>;
};

export type EditAnswerInput = {
  created_by?: InputMaybe<Scalars["ID"]>;
  participation?: InputMaybe<Scalars["ID"]>;
  question?: InputMaybe<Scalars["ID"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
  value?: InputMaybe<Scalars["JSON"]>;
};

export type EditConditionInput = {
  created_by?: InputMaybe<Scalars["ID"]>;
  group?: InputMaybe<Scalars["String"]>;
  operator?: InputMaybe<Enum_Condition_Operator>;
  referer_page?: InputMaybe<Scalars["ID"]>;
  referer_question?: InputMaybe<Scalars["ID"]>;
  target?: InputMaybe<Scalars["ID"]>;
  target_value?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Enum_Condition_Type>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export type EditFileInput = {
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  ext?: InputMaybe<Scalars["String"]>;
  formats?: InputMaybe<Scalars["JSON"]>;
  hash?: InputMaybe<Scalars["String"]>;
  height?: InputMaybe<Scalars["Int"]>;
  mime?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  previewUrl?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["String"]>;
  provider_metadata?: InputMaybe<Scalars["JSON"]>;
  related?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  size?: InputMaybe<Scalars["Float"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
  url?: InputMaybe<Scalars["String"]>;
  width?: InputMaybe<Scalars["Int"]>;
};

export type EditLandingInput = {
  about_page?: InputMaybe<Scalars["JSON"]>;
  color_theme?: InputMaybe<Scalars["JSON"]>;
  cover?: InputMaybe<Scalars["ID"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  image_cover?: InputMaybe<Scalars["JSON"]>;
  logo?: InputMaybe<Scalars["JSON"]>;
  members?: InputMaybe<Scalars["JSON"]>;
  partners?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  partners_logos?: InputMaybe<Scalars["JSON"]>;
  published_at?: InputMaybe<Scalars["DateTime"]>;
  subtitle?: InputMaybe<Scalars["String"]>;
  survey?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
  video_url?: InputMaybe<Scalars["String"]>;
  wysiwyg?: InputMaybe<Scalars["String"]>;
};

export type EditLocaleInput = {
  code?: InputMaybe<Scalars["String"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export type EditPageInput = {
  conditions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  created_by?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  is_locked?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  published_at?: InputMaybe<Scalars["DateTime"]>;
  questions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  short_name?: InputMaybe<Scalars["String"]>;
  statics?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  survey?: InputMaybe<Scalars["ID"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export type EditParticipationInput = {
  answers?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  completed?: InputMaybe<Scalars["Boolean"]>;
  completedAt?: InputMaybe<Scalars["DateTime"]>;
  consent?: InputMaybe<Scalars["Boolean"]>;
  contact?: InputMaybe<Scalars["String"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  startedAt?: InputMaybe<Scalars["DateTime"]>;
  survey?: InputMaybe<Scalars["ID"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export type EditQuestionInput = {
  conditions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  created_by?: InputMaybe<Scalars["ID"]>;
  factors?: InputMaybe<Scalars["JSON"]>;
  help_text?: InputMaybe<Scalars["String"]>;
  internal_description?: InputMaybe<Scalars["String"]>;
  internal_title?: InputMaybe<Scalars["String"]>;
  label?: InputMaybe<Scalars["String"]>;
  max?: InputMaybe<Scalars["Long"]>;
  max_loop?: InputMaybe<Scalars["String"]>;
  min?: InputMaybe<Scalars["Long"]>;
  notes?: InputMaybe<Scalars["String"]>;
  options?: InputMaybe<Scalars["JSON"]>;
  page?: InputMaybe<Scalars["ID"]>;
  placeholder?: InputMaybe<Scalars["String"]>;
  required?: InputMaybe<Scalars["String"]>;
  rows?: InputMaybe<Enum_Question_Rows>;
  step?: InputMaybe<Scalars["Long"]>;
  targeted_by?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  type?: InputMaybe<Enum_Question_Type>;
  type_name?: InputMaybe<Scalars["String"]>;
  units?: InputMaybe<Scalars["String"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export type EditRoleInput = {
  created_by?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  type?: InputMaybe<Scalars["String"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
  users?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type EditStaticInput = {
  content?: InputMaybe<Scalars["String"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  media?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  page?: InputMaybe<Scalars["ID"]>;
  published_at?: InputMaybe<Scalars["DateTime"]>;
  title?: InputMaybe<Scalars["String"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export type EditSurveyInput = {
  author?: InputMaybe<Scalars["ID"]>;
  categories?: InputMaybe<Scalars["JSON"]>;
  consentement?: InputMaybe<Scalars["ID"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  keywords?: InputMaybe<Scalars["JSON"]>;
  landing?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["String"]>;
  order?: InputMaybe<Scalars["JSON"]>;
  pages?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  participations?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  published_at?: InputMaybe<Scalars["DateTime"]>;
  slug?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Enum_Survey_Status>;
  title?: InputMaybe<Scalars["String"]>;
  updated_by?: InputMaybe<Scalars["ID"]>;
};

export type EditUserInput = {
  blocked?: InputMaybe<Scalars["Boolean"]>;
  confirmationToken?: InputMaybe<Scalars["String"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  institution?: InputMaybe<Scalars["String"]>;
  job?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["String"]>;
  resetPasswordToken?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["ID"]>;
  surveys?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  updated_by?: InputMaybe<Scalars["ID"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type UpdateAnswerInput = {
  data?: InputMaybe<EditAnswerInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateAnswerPayload = {
  __typename?: "updateAnswerPayload";
  answer?: Maybe<Answer>;
};

export type UpdateConditionInput = {
  data?: InputMaybe<EditConditionInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateConditionPayload = {
  __typename?: "updateConditionPayload";
  condition?: Maybe<Condition>;
};

export type UpdateLandingInput = {
  data?: InputMaybe<EditLandingInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateLandingPayload = {
  __typename?: "updateLandingPayload";
  landing?: Maybe<Landing>;
};

export type UpdatePageInput = {
  data?: InputMaybe<EditPageInput>;
  where?: InputMaybe<InputId>;
};

export type UpdatePagePayload = {
  __typename?: "updatePagePayload";
  page?: Maybe<Page>;
};

export type UpdateParticipationInput = {
  data?: InputMaybe<EditParticipationInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateParticipationPayload = {
  __typename?: "updateParticipationPayload";
  participation?: Maybe<Participation>;
};

export type UpdateQuestionInput = {
  data?: InputMaybe<EditQuestionInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateQuestionPayload = {
  __typename?: "updateQuestionPayload";
  question?: Maybe<Question>;
};

export type UpdateRoleInput = {
  data?: InputMaybe<EditRoleInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateRolePayload = {
  __typename?: "updateRolePayload";
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateStaticInput = {
  data?: InputMaybe<EditStaticInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateStaticPayload = {
  __typename?: "updateStaticPayload";
  static?: Maybe<Static>;
};

export type UpdateSurveyInput = {
  data?: InputMaybe<EditSurveyInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateSurveyPayload = {
  __typename?: "updateSurveyPayload";
  survey?: Maybe<Survey>;
};

export type UpdateUserInput = {
  data?: InputMaybe<EditUserInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateUserPayload = {
  __typename?: "updateUserPayload";
  user?: Maybe<UsersPermissionsUser>;
};

export type ConditionFragmentFragment = {
  __typename?: "Condition";
  id: string;
  operator?: Enum_Condition_Operator | null | undefined;
  group?: string | null | undefined;
  type?: Enum_Condition_Type | null | undefined;
  target_value?: string | null | undefined;
  referer_page?:
    | { __typename?: "Page"; id: string; name?: string | null | undefined }
    | null
    | undefined;
  target?:
    | {
        __typename?: "Question";
        id: string;
        options?: any | null | undefined;
        label?: string | null | undefined;
        type?: Enum_Question_Type | null | undefined;
      }
    | null
    | undefined;
  referer_question?:
    | {
        __typename?: "Question";
        id: string;
        label?: string | null | undefined;
        page?: { __typename?: "Page"; id: string } | null | undefined;
      }
    | null
    | undefined;
};

export type PageFragmentFragment = {
  __typename?: "Page";
  id: string;
  name?: string | null | undefined;
  short_name?: string | null | undefined;
  is_locked?: boolean | null | undefined;
  conditions?:
    | Array<{ __typename?: "Condition"; id: string } | null | undefined>
    | null
    | undefined;
  questions?:
    | Array<{ __typename?: "Question"; id: string } | null | undefined>
    | null
    | undefined;
  survey?: { __typename?: "Survey"; id: string } | null | undefined;
};

export type QuestionFragmentFragment = {
  __typename?: "Question";
  label?: string | null | undefined;
  id: string;
  type?: Enum_Question_Type | null | undefined;
  rows?: Enum_Question_Rows | null | undefined;
  options?: any | null | undefined;
  placeholder?: string | null | undefined;
  help_text?: string | null | undefined;
  required?: string | null | undefined;
  units?: string | null | undefined;
  factors?: any | null | undefined;
  max_loop?: string | null | undefined;
  step?: any | null | undefined;
  internal_title?: string | null | undefined;
  page?: { __typename?: "Page"; id: string } | null | undefined;
  conditions?:
    | Array<
        | {
            __typename?: "Condition";
            id: string;
            type?: Enum_Condition_Type | null | undefined;
            operator?: Enum_Condition_Operator | null | undefined;
            target_value?: string | null | undefined;
            group?: string | null | undefined;
            target?: { __typename?: "Question"; id: string } | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type LandingFragmentFragment = {
  __typename?: "Landing";
  id: string;
  title?: string | null | undefined;
  subtitle?: string | null | undefined;
  wysiwyg?: string | null | undefined;
  members?: any | null | undefined;
  image_cover?: any | null | undefined;
  color_theme?: any | null | undefined;
  video_url?: string | null | undefined;
  logo?: any | null | undefined;
  partners_logos?: any | null | undefined;
  about_page?: any | null | undefined;
  cover?:
    | { __typename?: "UploadFile"; id: string; name: string; url: string }
    | null
    | undefined;
  partners?:
    | Array<
        | { __typename?: "UploadFile"; id: string; name: string; url: string }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type SurveyFullFragmentFragment = {
  __typename?: "Survey";
  id: string;
  description?: string | null | undefined;
  order?: any | null | undefined;
  title: string;
  slug: string;
  language?: string | null | undefined;
  email?: string | null | undefined;
  keywords?: any | null | undefined;
  categories?: any | null | undefined;
  status?: Enum_Survey_Status | null | undefined;
  author?:
    | { __typename?: "UsersPermissionsUser"; email: string }
    | null
    | undefined;
  pages?:
    | Array<
        | {
            __typename?: "Page";
            id: string;
            name?: string | null | undefined;
            short_name?: string | null | undefined;
            is_locked?: boolean | null | undefined;
            conditions?:
              | Array<
                  | {
                      __typename?: "Condition";
                      id: string;
                      operator?: Enum_Condition_Operator | null | undefined;
                      group?: string | null | undefined;
                      type?: Enum_Condition_Type | null | undefined;
                      target_value?: string | null | undefined;
                      referer_page?:
                        | {
                            __typename?: "Page";
                            id: string;
                            name?: string | null | undefined;
                          }
                        | null
                        | undefined;
                      target?:
                        | {
                            __typename?: "Question";
                            id: string;
                            options?: any | null | undefined;
                            label?: string | null | undefined;
                            type?: Enum_Question_Type | null | undefined;
                          }
                        | null
                        | undefined;
                      referer_question?:
                        | {
                            __typename?: "Question";
                            id: string;
                            label?: string | null | undefined;
                            page?:
                              | { __typename?: "Page"; id: string }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
            questions?:
              | Array<
                  | {
                      __typename?: "Question";
                      label?: string | null | undefined;
                      id: string;
                      type?: Enum_Question_Type | null | undefined;
                      rows?: Enum_Question_Rows | null | undefined;
                      options?: any | null | undefined;
                      placeholder?: string | null | undefined;
                      help_text?: string | null | undefined;
                      required?: string | null | undefined;
                      units?: string | null | undefined;
                      factors?: any | null | undefined;
                      max_loop?: string | null | undefined;
                      step?: any | null | undefined;
                      internal_title?: string | null | undefined;
                      page?:
                        | { __typename?: "Page"; id: string }
                        | null
                        | undefined;
                      conditions?:
                        | Array<
                            | {
                                __typename?: "Condition";
                                id: string;
                                operator?:
                                  | Enum_Condition_Operator
                                  | null
                                  | undefined;
                                group?: string | null | undefined;
                                type?: Enum_Condition_Type | null | undefined;
                                target_value?: string | null | undefined;
                                referer_page?:
                                  | {
                                      __typename?: "Page";
                                      id: string;
                                      name?: string | null | undefined;
                                    }
                                  | null
                                  | undefined;
                                target?:
                                  | {
                                      __typename?: "Question";
                                      id: string;
                                      options?: any | null | undefined;
                                      label?: string | null | undefined;
                                      type?:
                                        | Enum_Question_Type
                                        | null
                                        | undefined;
                                    }
                                  | null
                                  | undefined;
                                referer_question?:
                                  | {
                                      __typename?: "Question";
                                      id: string;
                                      label?: string | null | undefined;
                                      page?:
                                        | { __typename?: "Page"; id: string }
                                        | null
                                        | undefined;
                                    }
                                  | null
                                  | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
            survey?: { __typename?: "Survey"; id: string } | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
  landing?:
    | {
        __typename?: "Landing";
        id: string;
        color_theme?: any | null | undefined;
        logo?: any | null | undefined;
      }
    | null
    | undefined;
  consentement?:
    | { __typename?: "UploadFile"; url: string; id: string; name: string }
    | null
    | undefined;
};

export const ConditionFragmentFragmentDoc = gql`
  fragment conditionFragment on Condition {
    id
    operator
    group
    type
    referer_page {
      id
      name
    }
    group
    target {
      id
      options
      label
      type
    }
    target_value
    referer_question {
      id
      label
      page {
        id
      }
    }
  }
`;
export const PageFragmentFragmentDoc = gql`
  fragment pageFragment on Page {
    id
    name
    short_name
    is_locked
    conditions {
      id
    }
    questions {
      id
    }
    survey {
      id
    }
  }
`;
export const QuestionFragmentFragmentDoc = gql`
  fragment questionFragment on Question {
    label
    id
    type
    rows
    options
    placeholder
    help_text
    options
    required
    units
    factors
    max_loop
    step
    internal_title
    page {
      id
    }
    conditions {
      id
      target {
        id
      }
      type
      operator
      target_value
      group
    }
  }
`;
export const LandingFragmentFragmentDoc = gql`
  fragment landingFragment on Landing {
    id
    title
    subtitle
    wysiwyg
    members
    image_cover
    cover {
      id
      name
      url
    }
    partners {
      id
      name
      url
    }
    color_theme
    video_url
    logo
    partners_logos
    about_page
  }
`;
export const SurveyFullFragmentFragmentDoc = gql`
  fragment surveyFullFragment on Survey {
    id
    description
    order
    title
    slug
    language
    email
    keywords
    categories
    author {
      email
    }
    status
    pages {
      id
      name
      short_name
      is_locked
      conditions {
        id
        operator
        group
        type
        referer_page {
          id
          name
        }
        group
        target {
          id
          options
          label
          type
        }
        target_value
        referer_question {
          id
          label
          page {
            id
          }
        }
      }
      questions {
        label
        id
        type
        rows
        options
        placeholder
        help_text
        options
        required
        units
        factors
        max_loop
        step
        internal_title
        page {
          id
        }
        conditions {
          id
          operator
          group
          type
          referer_page {
            id
            name
          }
          group
          target {
            id
            options
            label
            type
          }
          target_value
          referer_question {
            id
            label
            page {
              id
            }
          }
        }
      }
    }
    landing {
      id
      color_theme
      logo
    }
    consentement {
      url
      id
      name
    }
    pages {
      id
      name
      short_name
      is_locked
      survey {
        id
      }
      questions {
        id
        required
      }
      conditions {
        id
        target {
          id
        }
        type
        operator
        target_value
        group
      }
    }
  }
`;
