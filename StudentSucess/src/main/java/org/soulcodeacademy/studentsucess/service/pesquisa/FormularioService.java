package org.soulcodeacademy.studentsucess.service.pesquisa;

import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.exceptions.BadRequestException;
import org.soulcodeacademy.studentsucess.models.Alunos;
import org.soulcodeacademy.studentsucess.models.pesquisa.Formularios;
import org.soulcodeacademy.studentsucess.repository.AlunoRepository;
import org.soulcodeacademy.studentsucess.repository.ParceirosRepository;
import org.soulcodeacademy.studentsucess.repository.pesquisa.FormularioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class FormularioService {

    private FormularioRepository formularioRepository;
    private AlunoRepository alunoRepository;
    private ParceirosRepository parceirosRepository;

    /**
     * Função para buscar um formulário especifico, através de seu id
     * @param id id do formulário especifico que se deseja buscar
     * @return Um formulário especifico que se desejou encontrar
     */
    public Optional<Formularios> buscarPorid(Long id) {

        if (!formularioRepository.existsById(id)) {
            throw new BadRequestException("NOT FOUND");
        }

        return formularioRepository.findById(id);
    }

    /**
     * Função para Listar todos os formulários existentes na aplicação
     * @return uma lista com todos os formulários da aplicação
     */
    public List<Formularios> listarTodos() {

        return formularioRepository.findAll();
    }

    /**
     * Função para salvar um formulário na aplicação
     * @param formulario o formulário que se deseja salvar
     * @return Retorna o formulário salvo
     */
    public Formularios salvarFormulario(Formularios formulario) {

        return formularioRepository.save(formulario);
    }

    /**
     * Função com o objetivo de validar se o email digitado em um formulário, já está cadastrado na base de dados do nosso sistema
     * @param formulario o formulário em questão
     */
    public void validar(Formularios formulario) {

        if (!alunoRepository.existsByEmail(formulario.getEmail())) {
            if (!parceirosRepository.existsByEmail(formulario.getEmail())) {
                throw new BadRequestException("Email não encontrado em nossa base de dados. Verifique seu email e tente novamente.");

            }
        }
    }

    /**
     * Função para atualizar os dados de um formulário
     * @param formulario O formulario que se deja atualizar
     * @return Retorna um formulário atualizado
     */
    public Formularios atualizarFormulario(Formularios formulario) {

        buscarPorid(formulario.getId());
        Alunos byEmail = alunoRepository.findByEmail(formulario.getEmail());
        byEmail.setEmail_30_FormularioRespondido(true);
        alunoRepository.save(byEmail);
        formulario.setEmail(null);

        return formularioRepository.save(formulario);
    }

    /**
     * Função com o objetivo de atribuir o status do formulario, se ele foi ou não respondido
     * @param formulario o formulário em questão que vai ter seu status alterado
     * @return o formulário salvo com um novo status
     */
    public Formularios atFormulario(Formularios formulario) {

        buscarPorid(formulario.getId());
        formulario.setEmail(null);

        return formularioRepository.save(formulario);
    }

    /**
     * Função que tem como objetivo deletar um formuário especifico da aplicação
     * @param id Id desse formulário que se pretende deletar
     */
    public void deletarFormulario(Long id) {

        buscarPorid(id);

        formularioRepository.deleteById(id);
    }


}
