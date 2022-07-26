package org.soulcodeacademy.studentsucess.controllers.pesquisa;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.pesquisa.Questoes;
import org.soulcodeacademy.studentsucess.service.pesquisa.QuestoesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(value = "/questoes")
@AllArgsConstructor
public class QuestoesController {

    private QuestoesService questoesService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Listagem de todos os item", description = "Será feita uma listagem de todos", tags = {"alunos"})
    public List<Questoes> listar() {
        return questoesService.listarTodos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "busca de um unico item", description = "Será feita uma busca pelo id", tags = {"alunos"})
    public Optional<Questoes> buscar(@PathVariable Long id) {

        return questoesService.buscarPorid(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Criacao de um item", description = "Tentativa de criar um item", tags = {"alunos"})
    public Questoes salvar(@RequestBody @Valid Questoes questoes) {

        return questoesService.salvarQuestao(questoes);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualização de um item", description = "Tentativa de atualiza um item", tags = {"alunos"})
    public ResponseEntity<Questoes> atualizar(@PathVariable Long id, @RequestBody Questoes questoes) {

        questoes.setId(id);
        Questoes questoesAtualizado = questoesService.atualizarQuestao(questoes);
        return ResponseEntity.ok(questoesAtualizado);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Deleção de um item", description = "Tentativa de deleção um item", tags = {"alunos"})
    public void deletar(@PathVariable Long id) {

        questoesService.deletarQuestao(id);
    }




}
