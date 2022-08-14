//  File to store all handlers

// Client app origin:
// http://notesapp-v1.dicodingacademy.com

// import nanoid to generate random id
const {nanoid} = require('nanoid');
// Import notes from notes.js file
const notes = require('./notes');

// To handle new notes
// New notes structure:
// {
//     id: string,
//     title: string,
//     createdAt: string,
//     updatedAt: string,
//     tags: array of string,
//     body: string,
//    },
const addNoteHandler = (request, h) => {
    // Get the note from the request body
    const {title, tags, body} = request.payload;

    // Generate a random id for the note
    const id = nanoid(16);

    // Get the current date and time
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // Create new note object
    const newNote = {
        title,tags,body,id,createdAt,updatedAt,
    }

    // Add the new note to the notes array
    notes.push(newNote);

    // use filter to check if the note successfully added to the array or not
    const isSuccess = notes.filter(note => note.id === id).length > 0;

    // Return the response
    if (isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Note added successfully',
            data: {
                noteId: id,
            },
        });
        // Set the status code to 201 Created
        response.code(201);

        // allow cors
        // response.header('Access-Control-Allow-Origin', '*');
        return response;
    }

    // If the note is not added to the array, return the error response
    const response = h.response({
        status: 'error',
        message: 'Note Failed to add',
    });
    // Set the status code to 500 Internal Server Error
    response.code(500);

    // allow cors to header
    // response.header('Access-Control-Allow-Origin', '*');
    return response;

};

// getAllNotesHandler
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
  });


// handler for get notes by id
const getNoteByIdHandler = (request, h) => {
    // Get the id from the request params
    const {id} = request.params;

    // Find the note with the id
    const note = notes.filter((n) => n.id === id)[0];

    // check if note is not undefined
    if (note != undefined){
        // return success and the note
        return {
            status: 'success',
            data: {
                note,
            }
        };
    }

    // if note is undefined, return fail
    const response = h.response({
        status: 'fail',
        message: 'Note not found',
    })

    // Set the status code to 404 Not Found
    response.code(404);

    return response;
};

// Handler for editing note by id
const editNoteByIdHandler = (request, h) => {
    // get the id from params
    const {id} = request.params;

    // get the note from the request body
    const {title, tags, body} = request.payload;

    // Update updatedAt
    const updatedAt = new Date().toISOString();

    // Edit the old note with new note with indexing array
    // if note with the id is found, index will contain the index of the note
    // object. If not found, index will be -1
    const index = notes.findIndex(note => note.id === id);

    // if index is not -1, edit the note
    if (index !== -1){
        notes[index] = {
            // spread operator here is used to preserve some properties of the old note
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        // return success response
        const response = h.response({
            status: 'success',
            message: 'Note edited successfully',
        });

        // Set the status code to 200 OK
        response.code(200);
        return response;
    }

    // set response if note is not found
    const response = h.response({
        status: 'fail',
        message: 'Failed to edit note, id not found',
    });

    // Set the status code to 404 Not Found
    response.code(404);
    return response;

};

// Handler for deleting note by id
const deleteNoteByIdHandler = (request, h) => {
    // get the id from params
    const {id} = request.params;

    // find the note using index array
    const index = notes.findIndex(note => note.id === id);

    // if index is not -1, delete the note using array splice
    if (index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Note deleted successfully',
        })

        // Set the status code to 200 OK
        response.code(200);
        return response;
    }

    // set response if note is not found
    const response = h.response({
        status: 'fail',
        message: 'Failed to delete note, id not found',
    })

    // Set the status code to 404 Not Found
    response.code(404);
    return response;
 
};

// Export the handler
module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };