package org.soulcodeacademy.studentsucess.controllers;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.Usuarios;
import org.soulcodeacademy.studentsucess.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/usuarios")
@AllArgsConstructor
public class UsuarioController {


    private UsuarioService usuarioService;

    /**
     * Função para retornar todos os usuarios
     * @return Retorna uma lista de usuarios
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Listagem de todos os item", description = "Será feita uma listagem de todos", tags = {"alunos"})
    public List<Usuarios> listar() {
        return usuarioService.listarTodos();
    }


    /**
     *Função para buscar um usuario especifico através de sua matricula
     * @param matricula A matricula do usuario que será buscado
     * @return O usuario a qual a matricula pertence
     */
    @GetMapping("/{matricula}")
    @Operation(summary = "busca de um unico item", description = "Será feita uma busca pelo id", tags = {"alunos"})
    public Optional<Usuarios> buscar(@PathVariable String matricula) {

        return usuarioService.buscarPorMatricula(matricula);
    }


    /**
     *Função para crirar um novo usuario
     * @param usuarios O usuario que vai ser salvo
     * @return o usuario salvo
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Criacao de um item", description = "Tentativa de criar um item", tags = {"alunos"})
    public Usuarios salvar(@RequestBody @Valid Usuarios usuarios) {

        return usuarioService.salvaUsuario(usuarios);
    }

    /**
     *Função para editar informações de um usuario
     * @param matricula a matricula do usuario especifico que queremos editar
     * @param usuarios o usuario que será editado
     * @return um usuario atualizado
     */
    @PutMapping("/{matricula}")
    @Operation(summary = "Atualização de um item", description = "Tentativa de atualiza um item", tags = {"alunos"})
    public ResponseEntity<Usuarios> atualizar(@PathVariable String matricula, @RequestBody @Valid Usuarios usuarios) {


        usuarios.setMatricula(matricula);
        Usuarios atualizar = usuarioService.atualizar(usuarios);
        return ResponseEntity.ok(atualizar);
    }

    /**
     *Função de deleção de um usuario
     * @param matricula do usuario especifico que sera deletado
     */
    @DeleteMapping("/{matricula}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Deleção de um item", description = "Tentativa de deleção um item", tags = {"alunos"})
    public void deletar(@PathVariable String matricula) {

        usuarioService.deletarPorMatricula(matricula);

    }

}
