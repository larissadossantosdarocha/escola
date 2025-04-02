const express = require('express');
const routes = express.Router();

const Aluno = require('./controllers/aluno.js');
const Professor = require('./controllers/professor.js');
const Turma = require('./controllers/turma.js');
const Disciplina = require('./controllers/disciplina.js');
const Matricula = require('./controllers/matriculas.js');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Escola Superior PW' });
});

routes.post('/alunos', Aluno.create);
routes.get('/alunos', Aluno.read);
routes.get('/alunos/:ra', Aluno.readOne);
routes.put('/alunos/:ra', Aluno.update);
routes.delete('/alunos/:ra', Aluno.remove);

routes.post('/professores', Professor.create);
routes.get('/professores', Professor.read);
routes.get('/professores/:id', Professor.readOne);
routes.put('/professores/:id', Professor.update);
routes.delete('/professores/:id', Professor.remove);

routes.post('/turmas', Turma.create);
routes.get('/turmas', Turma.read);
routes.get('/turmas/:id', Turma.readOne);
routes.put('/turmas/:id', Turma.update);
routes.delete('/turmas/:id', Turma.remove);

routes.post('/disciplinas', Disciplina.create);
routes.get('/disciplinas', Disciplina.read);
routes.get('/disciplinas/:id', Disciplina.readOne);
routes.put('/disciplinas/:id', Disciplina.update);
routes.delete('/disciplinas/:id', Disciplina.remove);


routes.post('/matricula', Matricula.create);
routes.get('/matricula', Matricula.read);
routes.get('/matricula/:id', Matricula.readOne);
routes.put('/matricula/:id', Matricula.update);
routes.delete('/matricula/:id', Matricula.remove);

module.exports = routes;