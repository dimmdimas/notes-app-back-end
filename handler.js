// Membuat Handler (Req, Res)

const { nanoid } = require('nanoid');
const notes = require('./notes');

// Upload Data Baru
const addNotesHandler = (req, h) => {
  const { title, tags, body } = req.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updateAt
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id.length > 0);

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berasil ditambahkan',
      data: {
        nodeId: id,
      }
    });
    response.code(201);

    response.header('Access-Control-Allow-Origin', '*');
    return response;
  };

  response.code(404);
  return response;
  const response = h.response({
    status: 'fail',
    massage: 'Catatan gagal ditambahkan',
  });

  response.code(500);
  return response;
};

// Mendapatkan Semua Data
const getAllNotesHandler = () => ({
  status: 'success',
  massage: 'Berasil Mendapatkan data notes',
  data: {
    notes
  }
});

// Mendapatkan Data dari params
const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      massage: 'Data Berasil Di Ambil Dari ID',
      data: {
        note
      }
    };
  };

  const response = h.response({
    status: 'fail',
    massage: 'Gagal Mendapatkan Data By ID',
  });

  response.code(404);
  return response;
};

// Update Data by ID
const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updateAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt
    };
  }

  const response = h.response({
    status: 'success',
    massage: 'Berasil Update Data',
  });

  response.code(200);
  return response;

  const responsef = h.response({
    status: 'fail',
    massage: 'Gagal Update Data'
  });

  responsef.code(404);
  return responsef;

};

// Delete Data by ID
const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'Success',
      massage: 'Catatan Berasil Dihapus',
    });

    response.code(200);
    return response;
  };

  const response = h.response({
    status: 'fail',
    massage: 'Catatan gagal dihapus, ID tidak ditemukan'
  });

  response.code(404);
  return response;
};
module.exports = { addNotesHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };