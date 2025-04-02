const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const matricula = await prisma.matricula.create({
            data: req.body
        });
        res.status(201).json(matricula);
    } catch (error) {
        if (error.code == 'P2003')
            res.status(404).json({ erro: error.meta.field_name + ' não encontrada(o)' });
        else
            res.status(400).json(error);
    }
};

const read = async (req, res) => {
    try {
        const matriculas = await prisma.matricula.findMany();
        res.status(200).json(matriculas);
    } catch (error) {
        res.status(400).json(error);
    }
};

const readOne = async (req, res) => {
    try {
        const matricula = await prisma.matricula.findUnique({
            select: {
                id: true,
                aluno: true,
                disciplina: true,
                data_matricula: true
            },
            where: {
                id: Number(req.params.id)
            }
        });
        if (!matricula) {
            return res.status(404).json({ erro: 'Matrícula não encontrada' });
        }
        return res.json(matricula);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const matricula = await prisma.matricula.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(matricula);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await prisma.matricula.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
};
