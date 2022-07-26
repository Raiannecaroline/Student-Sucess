package org.soulcodeacademy.studentsucess.service;

import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.exceptions.BadRequestException;
import org.soulcodeacademy.studentsucess.exceptions.EmailDominioException;
import org.soulcodeacademy.studentsucess.models.Usuarios;
import org.soulcodeacademy.studentsucess.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UsuarioService {

    private UsuarioRepository usuarioRepository;
    private PasswordEncoder passwordEncoder;


    /**
     *Função para buscar um usuario a partir de sua matricula
     * @param matricula A matricula do usuario que se deseja buscar
     * @return Retorna um usuario especifico que se desejou buscar, atraves de sua matricula
     */
    public Optional<Usuarios> buscarPorMatricula(String matricula) {

        if (!usuarioRepository.existsById(matricula)) {
            throw new BadRequestException("NOT FOUND");
        }


        return usuarioRepository.findById(matricula);
    }


    /**
     * Função para listar todos os usuarios do sistema
     * @return Retorna uma lista com todos os usuarios que estão cadastrado no sistema
     */
    public List<Usuarios> listarTodos() {

       return usuarioRepository.findAll();


    }

    /**
     * Função para salvar um usuario
     * @param usuarios o usuario que será salvo
     * @return Um novo usuario salvo
     */
    public Usuarios salvaUsuario(Usuarios usuarios){
        verificarDominio(usuarios.getEmailSoulCode());

        usuarios.setSenha(passwordEncoder.encode(usuarios.getSenha()));

        return usuarioRepository.save(usuarios);

    }

    /**
     * Função para atualizar os dados de um usuario
     * @param usuarios o usuario que será atualizado
     * @return Retorna um usuario atualizado
     */
    public Usuarios atualizar(Usuarios usuarios){

        verificarDominio(usuarios.getEmailSoulCode());
        usuarios.setSenha(passwordEncoder.encode(usuarios.getSenha()));


        buscarPorMatricula(usuarios.getMatricula());

        return usuarioRepository.save(usuarios);

    }

    /**
     * Função para deletar um usuario
     * @param matricula a matricula do usuario que será deletado
     */
    public void deletarPorMatricula(String matricula){
        buscarPorMatricula(matricula);
        usuarioRepository.deleteById(matricula);
    }

    /**
     * Função para verificar se o email digitado pelo usuario no momento de seu cadastro, possui o dominio da SoulCode
     * @param email o email digitado no campo de input no momento do cadastro
     */
    public void verificarDominio(String email){

        String dominio = email.substring(email.indexOf("@"), email.length());

        String dominioSoulCode = "@soulcodeacademy.org";

        if(!dominioSoulCode.equals(dominio)){
            throw new EmailDominioException("O apresentado endereço de email não pertence ao dominio '@soulcodeacademy.org.' " +
                    "Verifique seus dados e tente novamente.");
        }

    }


}
