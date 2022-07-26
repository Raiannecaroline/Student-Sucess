package org.soulcodeacademy.studentsucess.service.email;


import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.exceptions.BadRequestException;
import org.soulcodeacademy.studentsucess.models.email.Email;
import org.soulcodeacademy.studentsucess.models.enums.email.StatusEmail;
import org.soulcodeacademy.studentsucess.repository.email.EmailRepository;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EmailService {

    private EmailRepository emailRepository;

    private JavaMailSender emailSender;

    /**
     * Função para buscar um email especifico atraves de seu id
     * @param emailId id do email que será buscado
     */
    public void buscarPeloId(Long emailId) {
        if (!emailRepository.existsById(emailId)) {
            throw new BadRequestException("NOT FOUND");
        }
    }


    /**
     * Função para enviar email com o acesso ao formulário, que por sua vez será respondido por alunos/empresas
     * @param email o email que será enviado
     * @return retorna o email salvo
     */
    public Email enviarEmail(Email email) {
        email.setDataDeEnvio(LocalDate.now());
        try {
            SimpleMailMessage menssagem = new SimpleMailMessage();
            menssagem.setFrom(email.getEmailOrigem());
            menssagem.setTo(email.getEmailDestino());
            menssagem.setSubject(email.getTitulo());
            menssagem.setText(email.getCorpo());
            emailSender.send(menssagem);

            email.setStatusEmail(StatusEmail.ENVIADO);
        } catch (MailException e) {
            email.setStatusEmail(StatusEmail.ERROR);
        } finally {
            return emailRepository.save(email);
        }
    }

    /**
     * Função para salvar um email na aplicação
     * @param email o email que será salvo
     * @retur retorna o email salvo
     */
    public Email salvarEmail(Email email) {
        email.setStatusEmail(StatusEmail.PROCESSANDO);
        return emailRepository.save(email);

    }


    /**
     * Função para editar um email da aplicação
     * @param email o email que será editado
     * @return Retorna o email atualizado
     */
    public Email editarEmail(Email email) {
        buscarPeloId(email.getEmailId());
        email.setStatusEmail(StatusEmail.PROCESSANDO);
        return emailRepository.save(email);

    }

    /**
     * Função para listar todos os emails da aplicação
     * @return Retorna uma lista com todos os emails
     */
    public List<Email> listarTodos() {
        return emailRepository.findAll();
    }


    /**
     * Função para deletar um email da aplicação
     * @param emailId o id do email especifico que se deseja deletar
     * @return Retorna o email especifico deletado
     */
    public Optional<Email> deletarEmail(Long emailId) {
        buscarPeloId(emailId);
        return emailRepository.findById(emailId);
    }


}

