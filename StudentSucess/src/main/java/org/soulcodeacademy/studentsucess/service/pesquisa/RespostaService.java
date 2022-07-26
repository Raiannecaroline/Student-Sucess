/*
package org.soulcodeacademy.studentsucess.service.pesquisa;

import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.pesquisa.Questoes;
import org.soulcodeacademy.studentsucess.models.pesquisa.Respostas;
import org.soulcodeacademy.studentsucess.repository.pesquisa.QuestoesRepository;
import org.soulcodeacademy.studentsucess.repository.pesquisa.RespostaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class RespostaService {

    private RespostaRepository respostaRepository;
    private QuestoesRepository questoesRepository;


    public Questoes salvarResposta(String respostas, Long idQuestao) {

        Optional<Questoes> questao = questoesRepository.findById(idQuestao);

        List<String> respostasDaQuestao = questao.get().getRespostas();
        respostasDaQuestao.add(respostas);

        questao.get().setRespostas(respostasDaQuestao);

        return questoesRepository.save(questao);
    }




}
*/
