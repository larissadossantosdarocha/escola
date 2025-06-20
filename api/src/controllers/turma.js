const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const turma = await prisma.turma.create({
            data: req.body
        });
        return res.status(201).json(turma);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const read = async (req, res) => {
    const turmas = await prisma.turma.findMany();
    return res.json(turmas);
};

const readOne = async (req, res) => {
    try {
        const turma = await prisma.turma.findUnique({
            where: {
                id: Number(req.params.id)
            },
            select: {
                id: true,
                nome: true,
                ano: true,
                disciplinas: {
                    select: {
                        id: true,
                        nome: true,
                        leciona: {
                            select: {
                                id: true,
                                nome: true
                            }
                        },
                        matriculas: {
                            select: {
                                faz: {
                                    select: {
                                        ra: true,
                                        nome: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!turma) {
            return res.status(404).json({ error: 'Turma não encontrada' });
        }

        return res.json(turma);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const turma = await prisma.turma.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(turma);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await prisma.turma.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

module.exports = { create, read, readOne, update, remove };
