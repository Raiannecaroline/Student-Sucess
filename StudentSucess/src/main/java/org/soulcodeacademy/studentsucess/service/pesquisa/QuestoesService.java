package org.soulcodeacademy.studentsucess.service.pesquisa;

import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.exceptions.BadRequestException;
import org.soulcodeacademy.studentsucess.models.pesquisa.Questoes;
import org.soulcodeacademy.studentsucess.repository.pesquisa.QuestoesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class QuestoesService {

    private QuestoesRepository questoesRepository;

    /**
     * Buscar uma questão especifica através de seu id
     * @param id O id da questão que se deseja buscar
     * @return Retorna uma questão especifica
     */
    public Optional<Questoes> buscarPorid(Long id) {

        if(!questoesRepository.existsById(id)) {
            throw new BadRequestException("NOT FOUND");
        }

        return questoesRepository.findById(id);
    }

    /**
     * Função para listar todas as questões cadastradas na aplicação
     * @return Retorna uma lista com todas as questões cadastradas na aplicação
     */
    public List<Questoes> listarTodos() {

        return questoesRepository.findAll();
    }

    /**
     * Função que tem como objetivo salvar as questões na nossa aplicação
     * @param questoes A questão em si que se deseja salvar
     * @return Retorna uma questão salva
     */
    public Questoes salvarQuestao(Questoes questoes) {

        return questoesRepository.save(questoes);
    }

    /**
     * Função que tem como atualizar as questões
     * @param questoes a questão em si que se deja atualizar as informações
     * @return Retorna a questão atualizada
     */
    public Questoes atualizarQuestao(Questoes questoes) {

        buscarPorid(questoes.getId());

        return questoesRepository.save(questoes);
    }

    /**
     * Deleta uma questão especifica da aplicação
     * @param id O id dessa questão especifica que queremos deletar
     */
    public void deletarQuestao(Long id) {

        buscarPorid(id);

        questoesRepository.deleteById(id);
    }


}
