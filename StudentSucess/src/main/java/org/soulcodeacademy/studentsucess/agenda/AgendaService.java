package org.soulcodeacademy.studentsucess.agenda;

import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.email.Email;
import org.soulcodeacademy.studentsucess.repository.email.EmailRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AgendaService {

    private JavaMailSender emailSender;
    private EmailRepository emailRepository;
    public void enviarEmail30DiasAlunos(String emailEndereco, String nomeUsuario) {
        Email email = EmailBuilder.criarEmail3ODias(nomeUsuario);
        email.setEmailDestino(emailEndereco);

        System.out.println(email.getEmailDestino());

        SimpleMailMessage menssagem = new SimpleMailMessage();

        menssagem.setFrom(email.getEmailOrigem());
        menssagem.setTo(email.getEmailDestino());
        menssagem.setSubject(email.getTitulo());
        menssagem.setText(email.getCorpo());

        emailSender.send(menssagem); //envio do email


    }
    public void enviarEmail30DiasEmpresas(String emailEndereco, String nomeUsuario) {
        Email email = EmailBuilder.criarEmail3ODiasEmpresa(nomeUsuario, nomeUsuario);
        email.setEmailDestino(emailEndereco);


        SimpleMailMessage menssagem = new SimpleMailMessage();

        menssagem.setFrom(email.getEmailOrigem());
        menssagem.setTo(email.getEmailDestino());
        menssagem.setSubject(email.getTitulo());
        menssagem.setText(email.getCorpo());

        emailSender.send(menssagem); //envio do email


    }
}
