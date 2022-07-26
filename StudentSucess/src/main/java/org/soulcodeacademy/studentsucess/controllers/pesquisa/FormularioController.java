package org.soulcodeacademy.studentsucess.controllers.pesquisa;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.pesquisa.Formularios;
import org.soulcodeacademy.studentsucess.service.pesquisa.FormularioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/formularios")
@AllArgsConstructor
public class FormularioController {

    private FormularioService formularioService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Listagem de todos os item", description = "Será feita uma listagem de todos", tags = {"alunos"})
    public List<Formularios> listar() {
        return formularioService.listarTodos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "busca de um unico item", description = "Será feita uma busca pelo id", tags = {"alunos"})
    public Optional<Formularios> buscar(@PathVariable Long id) {

        return formularioService.buscarPorid(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Criacao de um item", description = "Tentativa de criar um item", tags = {"alunos"})
    public Formularios salvar(@RequestBody @Valid Formularios formularios) {

        return formularioService.salvarFormulario(formularios);
    }


    @PutMapping("/validar/{id}")
    @Operation(summary = "Validacao de um form", description = "Tentativa de validar um item", tags = {"alunos"})
    public void validar(@RequestBody @Valid Formularios formularios, @PathVariable Long id) {
        formularios.setId(id);
         formularioService.validar(formularios);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualização de um item", description = "Tentativa de atualiza um item", tags = {"alunos"})
    public ResponseEntity<Formularios> atualizar(@PathVariable Long id, @RequestBody Formularios formularios) {

        formularios.setId(id);
        Formularios formulariosAtualizado = formularioService.atualizarFormulario(formularios);
        return ResponseEntity.ok(formulariosAtualizado);
    }

    @PutMapping("atualizar/{id}")
    @Operation(summary = "Atualização de um item", description = "Tentativa de atualiza um item", tags = {"alunos"})
    public ResponseEntity<Formularios> atualizarForm(@PathVariable Long id, @RequestBody Formularios formularios) {

        formularios.setId(id);
        Formularios formulariosAtualizado = formularioService.atFormulario(formularios);
        return ResponseEntity.ok(formulariosAtualizado);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Deleção de um item", description = "Tentativa de deleção um item", tags = {"alunos"})
    public void deletar(@PathVariable Long id) {

        formularioService.deletarFormulario(id);
    }




}
