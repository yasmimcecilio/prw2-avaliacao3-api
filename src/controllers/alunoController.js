const alunos = [
  {
    id: 1,
    nome: "Asdrubal Topolinski",
    ra: "SC123456",
    nota1: 8.5,
    nota2: 7.5,
  },
  {
    id: 2,
    nome: "Genoveva Silva",
    ra: "SC654321",
    nota1: 5.0,
    nota2: 4.5,
  },
  {
    id: 3,
    nome: "Berenice Oliveira",
    ra: "SC112233",
    nota1: 6.0,
    nota2: 6.0,
  },
];

function buscaAluno(id) {
  return alunos.findIndex((aluno) => {
    return aluno.id === Number(id);
  });
}

class AlunoController {
  static listarAlunos(req, res) {
    try {
      res.status(200).json(alunos);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na requisição.` });
    }
  }

  static listarMedias(req, res) {
    try {
      const medias = alunos.map((aluno) => {
        const media = (aluno.nota1 + aluno.nota2) / 2;
        return {
          nome: aluno.nome,
          media: Number(media.toFixed(2)),
        };
      });
      res.status(200).json(medias);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao calcular médias.` });
    }
  }

  static listarAprovados(req, res) {
    try {
      const statusAlunos = alunos.map((aluno) => {
        const media = (aluno.nota1 + aluno.nota2) / 2;
        return {
          nome: aluno.nome,
          status: media >= 6 ? "aprovado" : "reprovado",
        };
      });
      res.status(200).json(statusAlunos);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao verificar aprovados.` });
    }
  }

  static listarAlunoPorId(req, res) {
    try {
      const index = buscaAluno(req.params.id);
      if (index === -1) {
        return res.status(404).json({ message: "Aluno não encontrado!" });
      }
      res.status(200).json(alunos[index]);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na requisição do aluno.` });
    }
  }

  static cadastrarAluno(req, res) {
    try {
      const { id, nome, ra, nota1, nota2 } = req.body;

      const novoAluno = {
        id: Number(id),
        nome,
        ra,
        nota1: Number(nota1),
        nota2: Number(nota2),
      };

      alunos.push(novoAluno);
      res
        .status(201)
        .json({ message: "Aluno cadastrado com sucesso!", aluno: novoAluno });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao cadastrar aluno.` });
    }
  }

  static atualizarAluno(req, res) {
    try {
      const index = buscaAluno(req.params.id);
      if (index === -1) {
        return res.status(404).json({ message: "Aluno não encontrado!" });
      }

      const { nome, ra, nota1, nota2 } = req.body;

      if (nome !== undefined) alunos[index].nome = nome;
      if (ra !== undefined) alunos[index].ra = ra;
      if (nota1 !== undefined) alunos[index].nota1 = Number(nota1);
      if (nota2 !== undefined) alunos[index].nota2 = Number(nota2);

      res
        .status(200)
        .json({ message: "Aluno atualizado!", aluno: alunos[index] });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na atualização.` });
    }
  }

  static excluirAluno(req, res) {
    try {
      const index = buscaAluno(req.params.id);
      if (index === -1) {
        return res.status(404).json({ message: "Aluno não encontrado!" });
      }

      alunos.splice(index, 1);
      res.status(200).json({ message: "Aluno excluído com sucesso!" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na exclusão.` });
    }
  }
}

export default AlunoController;
