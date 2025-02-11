/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getSong = /* GraphQL */ `query GetSong($id: ID!) {
  getSong(id: $id) {
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
` as GeneratedQuery<APITypes.GetSongQueryVariables, APITypes.GetSongQuery>;
export const listSongs = /* GraphQL */ `query ListSongs(
  $filter: ModelSongFilterInput
  $limit: Int
  $nextToken: String
) {
  listSongs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListSongsQueryVariables, APITypes.ListSongsQuery>;
