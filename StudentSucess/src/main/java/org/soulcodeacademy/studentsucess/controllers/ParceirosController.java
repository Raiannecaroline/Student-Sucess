package org.soulcodeacademy.studentsucess.controllers;


import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.Parceiros;
import org.soulcodeacademy.studentsucess.service.ParceirosService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/parceiros")
@AllArgsConstructor
public class ParceirosController {


    private ParceirosService parceirosService;

    /**
     * Função para listar todas as empresas parceiras cadastradas
     * @return uma lista com as empresas parceiras
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Listagem de todos os item", description = "Será feita uma listagem de todos", tags = {"alunos"})
    public List<Parceiros> listar() {
        return parceirosService.listarTodos();
    }

    /**
     * Função para buscar uma empresa especifica atraves de seu cnpj
     * @param cnpj o cnpj da empresa que queremos buscar
     * @return a empresa a qual o cnpj pertence
     */
    @GetMapping("/{cnpj}")
    @Operation(summary = "busca de um unico item", description = "Será feita uma busca pelo id", tags = {"alunos"})
    public Optional<Parceiros> buscar(@PathVariable String cnpj) {

        return parceirosService.buscarPorCnpj(cnpj);
    }


    /**
     * Função para salvar uma nova empresa parceira
     * @param parceiro A empresa parceira que será criada
     * @return A empresa parceira salva
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Criacao de um item", description = "Tentativa de criar um item", tags = {"alunos"})
    public Parceiros salvar(@RequestBody @Valid Parceiros parceiro) {

        return parceirosService.salvaParceiro(parceiro);
    }

    /**
     * Função para atualizar os dados de uma empresa parceira
     * @param cnpj cnpj de uma empresa parceira especifica que queremos editar
     * @param parceiro A empresa que queremos editar
     * @return A empresa parceira com seus dados atualizados
     */
    @PutMapping("/{cnpj}")
    @Operation(summary = "Atualização de um item", description = "Tentativa de atualiza um item", tags = {"alunos"})
    public ResponseEntity<Parceiros> atualizar(@PathVariable String cnpj, @RequestBody @Valid Parceiros parceiro) {


        parceiro.setCnpj(cnpj);
        Parceiros atualizar = parceirosService.atualizar(parceiro);
        return ResponseEntity.ok(atualizar);
    }

    /**
     * Função para deletar uma empresa especifica
     * @param cnpj cnpj da empresa que queremos deletar
     */
    @DeleteMapping("/{cnpj}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Deleção de um item", description = "Tentativa de deleção um item", tags = {"alunos"})
    public void deletar(@PathVariable String cnpj) {

        parceirosService.deletarPorcnpj(cnpj);

    }


}
