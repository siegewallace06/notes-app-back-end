// Store all the routes in this file.
// client origin:
// http://notesapp-v1.dicodingacademy.com

// import Handler from './handler';
const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler');

// CORS FORMAT:
// {
//     method: 'POST',
//     path: '/notes',
//     handler: addNoteHandler,
//     options: {
//       cors: {
//         origin: ['*'],
//       },
//     },
//   },

const routes = [
    {
        // Routes for saving the notes
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        // Routes for getting the notes
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,

    },

    {
        // Routes for specific note
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },

    {
        // Routes for editing the notes
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },

    {
        // Routes for deleting the notes
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    },
]

module.exports = routes;