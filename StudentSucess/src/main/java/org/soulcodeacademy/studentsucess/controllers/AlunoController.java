package org.soulcodeacademy.studentsucess.controllers;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.dto.AlunosDto;
import org.soulcodeacademy.studentsucess.service.AlunoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/alunos")
@AllArgsConstructor
public class AlunoController {

    private AlunoService alunoService;

    /**
     * Função para listar todos os alunos cadastrados
     * @return Retorna uma lista com todos os alunos cadastrados
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Listagem de todos os item", description = "Será feita uma listagem de todos", tags = {"alunos"})
    public List<AlunosDto> listar() {
        return alunoService.listarTodos();
    }

    /**
     * Função para buscar um aluno especifico
     * @param CPF cpf do aluno especifico que queremos buscar
     * @return um aluno especifico
     */
    @GetMapping("/{CPF}")
    @Operation(summary = "busca de um unico item", description = "Será feita uma busca pelo id", tags = {"alunos"})
    public Optional<AlunosDto> buscar(@PathVariable String CPF) {

        return alunoService.buscarPorCPF(CPF);
    }

    /**
     * Função para salvar um aluno no sistema
     * @param alunos o aluno que será salvo
     * @return Retorna um aluno salvo
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Criacao de um item", description = "Tentativa de criar um item", tags = {"alunos"})
    public AlunosDto salvar(@RequestBody @Valid AlunosDto alunos) {

        return alunoService.salvarAluno(alunos);
    }

    /**
     * Função para atualizar os dados de um aluno
     * @param CPF cpf do aluno especifico que queremos editar as informações
     * @param alunos o aluno que queremos editar
     * @return o aluno com seus dados atualizados
     */
    @PutMapping("/{CPF}")
    @Operation(summary = "Atualização de um item", description = "Tentativa de atualiza um item", tags = {"alunos"})
    public ResponseEntity<AlunosDto> atualizar(@PathVariable String CPF, @RequestBody AlunosDto alunos) {

        alunos.setCpf(CPF);
        AlunosDto alunosAtualizado = alunoService.atualizarAluno(alunos);
        return ResponseEntity.ok(alunosAtualizado);
    }

    /**
     * Função para deletar um aluno do sistema
     * @param CPF cpf do aluno especifico que queremos deletar
     */
    @DeleteMapping("/{CPF}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Deleção de um item", description = "Tentativa de deleção um item", tags = {"alunos"})
    public void deletar(@PathVariable String CPF) {

        alunoService.deletarAluno(CPF);
    }




}
