/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateSong = /* GraphQL */ `subscription OnCreateSong(
  $filter: ModelSubscriptionSongFilterInput
  $owner: String
) {
  onCreateSong(filter: $filter, owner: $owner) {
    id
    title
    artist
    duration
    releaseDate
    fileUrl
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSongSubscriptionVariables,
  APITypes.OnCreateSongSubscription
>;
export const onUpdateSong = /* GraphQL */ `subscription OnUpdateSong(
  $filter: ModelSubscriptionSongFilterInput
  $owner: String
) {
  onUpdateSong(filter: $filter, owner: $owner) {
    id
    title
    artist
    duration
    releaseDate
    fileUrl
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSongSubscriptionVariables,
  APITypes.OnUpdateSongSubscription
>;
export const onDeleteSong = /* GraphQL */ `subscription OnDeleteSong(
  $filter: ModelSubscriptionSongFilterInput
  $owner: String
) {
  onDeleteSong(filter: $filter, owner: $owner) {
    id
    title
    artist
    duration
    releaseDate
    fileUrl
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSongSubscriptionVariables,
  APITypes.OnDeleteSongSubscription
>;
