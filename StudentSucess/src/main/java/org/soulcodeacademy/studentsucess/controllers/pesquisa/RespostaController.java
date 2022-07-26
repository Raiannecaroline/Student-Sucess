/*
package org.soulcodeacademy.studentsucess.controllers.pesquisa;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.pesquisa.Questoes;
import org.soulcodeacademy.studentsucess.models.pesquisa.Respostas;
import org.soulcodeacademy.studentsucess.service.pesquisa.RespostaService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/respostas")
@AllArgsConstructor
public class RespostaController {

    private RespostaService respostaService;


    @PostMapping("/{idQuestao}")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Criacao de um item", description = "Tentativa de criar um item", tags = {"alunos"})
    public Questoes salvar(@RequestBody @Valid String resposta, @PathVariable Long idQuestao) {

        return respostaService.salvarResposta(resposta, idQuestao);
    }



}
*/
