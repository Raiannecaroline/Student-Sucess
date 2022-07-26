package org.soulcodeacademy.studentsucess.controllers.email;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.email.Email;
import org.soulcodeacademy.studentsucess.service.email.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/email")
@AllArgsConstructor
public class EmailController {

    private EmailService emailService;


    /**
     * Função para listar todos os emails
     * @return uma lista com todos os emails
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Listagem de todos os item", description = "Será feita uma listagem de todos", tags = {"alunos"})
    public List<Email> getAllEmails(){
        return emailService.listarTodos();
    }

    /**
     * Função para salvar um email
     * @param email o email que será salvo
     * @return um email salvo
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Criacao de um item", description = "Tentativa de criar um item", tags = {"alunos"})
    public Email salvarEmail(@RequestBody @Valid Email email) {
        return emailService.salvarEmail(email);

    }

    /**
     * Função para editar um email
     * @param email o email que será editadp
     * @param emailId o id do email que será editado
     * @return um email editado
     */
    @PutMapping("/{emailId}")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "busca de um unico item", description = "Será feita uma busca pelo id", tags = {"alunos"})
    public Email editarEmail(@RequestBody @Valid Email email, @PathVariable Long emailId) {
        email.setEmailId(emailId);
        return emailService.salvarEmail(email);
    }


    /**
     * Função para deleção de um email
     * @param emailId id do email que será deletado
     */
    @DeleteMapping("/{emailId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Deleção de um item", description = "Tentativa de deleção um item", tags = {"alunos"})
    public void apagarEmail(@PathVariable Long emailId){
        emailService.deletarEmail(emailId);

    }
}