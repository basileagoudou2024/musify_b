const asyncHandler = require("express-async-handler");
const {graphQLQuery} = require("../helpers/graphQLQuery");

const executeQuery = async (query, dataObject, variables, req, res) => {
    console.log(req.query)
    const response = await graphQLQuery(
        query, variables,
    );


    if (response.data.errors) {
        console.log(response.data.errors);

        return res.json({
            errors: response.data.errors
        })
    }
    console.log(response.data.data)
    res.json({
        data: response.data.data[dataObject],
        body: req.body
    });
}

exports.song_detail = asyncHandler(async (req, res, next) => {
    await executeQuery(
        `query GetSong($id: ID!){
  getSong(id: $id) {
    artist
    duration
    id
    releaseDate
    title
    createdAt
    username
  }
}`,
        "getSong",
        {id: req.params.id},
        req, res);

});



 //Handle message create on POST.

exports.song_create = asyncHandler(async (req, res, next) => {
    await executeQuery(`mutation CreateSong($title: String!, $artist: String!, $duration: Int!, $releaseDate: AWSDateTime!, $username: String!) {
      createSong(input: {title: $title, artist: $artist, duration: $duration, releaseDate: $releaseDate, username: $username}) {
        id,
        title,
        artist,
        duration,
        releaseDate,
        username
      }
    }`,  "createSong",
        {
            title: req.body.title,
            artist: req.body.artist,
            duration: req.body.duration,
            releaseDate: req.body.releaseDate,
            username: req.body.username
        }, req, res)
});

//exports.song_list = asyncHandler(async (req, res, next) => {
//    await executeQuery(`query ListSongs($artist: String!){
//      listSongs(filter: {{artist: {eq: $artist}}}) {
//        items {
//          createdAt
//          id
//          title
//          artist
//          updatedAt
//          duration
//          releaseDate
//        }
//      }
//    }
//    `,  "listSongs", {...req.query}, req, res)
//})

 exports.song_list = asyncHandler(async (req, res, next) => {
     await executeQuery(`query GetSong {
          listSongs {
            items {
            artist
            createdAt
            duration
            id
            releaseDate
            title
            updatedAt
            username
    }
  }
}`,  "listSongs", {}, req, res)
 });


exports.message_create = asyncHandler(async (req, res, next) => {
    await executeQuery(`mutation CreateMessage($input: CreateMessageInput!) {
      createMessage(input: $input) {
        id
        message
        name
        userId1
        userId2
        username1
        username2
      }
    }`,  "createMessage",
        {
            input: req.body
        }, req, res)
});
//       listMessages {
//         items {
//           createdAt
//           id
//           message
//           name
//           updatedAt
//           userId1
//           userId2
//           username1
//           username2
//         }
//       }
//     }
//     `,  "listMessages", {}, req, res)
// })

exports.song_update = asyncHandler(async (req, res, next) => {
    await executeQuery(
        `mutation UpdateSong($input: UpdateSongInput!) {
            updateSong(input: $input) {
                artist
                title
                duration
                releaseDate
                username
            }
        }`,
        "updateSong",
        {
            input: { id: req.params.id,
                ...req.body
            }
        },
        req, res
    );
})

exports.song_delete = asyncHandler(async (req, res, next) => {
    await executeQuery(
        `mutation DeleteSong($id: ID!){
          deleteSong(input: {id: $id}) {
            id
          }
        }
        `,
        "deleteSong",
        {id: req.params.id},
        req, res);
})