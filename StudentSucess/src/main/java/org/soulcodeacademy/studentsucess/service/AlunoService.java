package org.soulcodeacademy.studentsucess.service;

import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.dto.AlunosDto;
import org.soulcodeacademy.studentsucess.exceptions.BadRequestException;
import org.soulcodeacademy.studentsucess.models.Alunos;
import org.soulcodeacademy.studentsucess.repository.AlunoRepository;
import org.soulcodeacademy.studentsucess.repository.ParceirosRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class AlunoService {

    private AlunoRepository alunoRepository;
    private ParceirosService parceirosService;
    private ParceirosRepository parceirosRepository;

    /**
     * Função para buscar um aluno especifico atraves de seu CPF
     * @param CPF cpf do aluno que se deseja buscar
     * @return Retorna um aluno especifico que se desejou buscar, atraves de seu cpf
     */
    public Optional<AlunosDto> buscarPorCPF(String CPF) {

        if(!alunoRepository.existsById(CPF)) {
            throw new BadRequestException("NOT FOUND");
        }

        return Optional.of(new AlunosDto(alunoRepository.findById(CPF)));
    }

    /**
     * Função para listar todos os alunos cadastrados no sistema
     * @return Retorna uma lista com todos os alunos cadastrados no sistema
     */
    public List<AlunosDto> listarTodos() {


        List<AlunosDto> dtoList = alunoRepository.findAll()
                .stream()
                .map(alunos -> new AlunosDto(Optional.ofNullable(alunos)))
                .collect(Collectors.toList());

        return dtoList;
    }

    /**
     * Função para salvar um aluno no sistema
     * @param alunos o aluno que será salvo
     * @return Retorna um novo aluno salvo
     */
    public AlunosDto salvarAluno(AlunosDto alunos) {
        Alunos alunoSalvo = new Alunos(alunos);

        System.out.println(alunos.getParceiroCnpj());

        parceirosService.buscarPorCnpj(alunos.getParceiroCnpj());
        alunoSalvo.setParceiroId(parceirosRepository.findByCnpj(alunos.getParceiroCnpj()));

         alunoRepository.save(alunoSalvo);


         return new AlunosDto(Optional.of(alunoSalvo));
    }

    /**
     * Função para atualizar um aluno
     * @param alunos o aluno que será editado
     * @return Retorna um aluno especifico atualizado
     */
    public AlunosDto atualizarAluno(AlunosDto alunos) {

        buscarPorCPF(alunos.getCpf());

        Alunos alunoSalvo = new Alunos(alunos);

        parceirosService.buscarPorCnpj(alunos.getParceiroCnpj());
        alunoSalvo.setParceiroId(parceirosRepository.findByCnpj(alunos.getParceiroCnpj()));

        alunoRepository.save(alunoSalvo);


        return new AlunosDto(Optional.of(alunoSalvo));    }

    /**
     * Função para deletar um aluno do sistema
     * @param CPF cpf do aluno especifico que queremos deletar
     */
    public void deletarAluno(String CPF) {

        buscarPorCPF(CPF);

        alunoRepository.deleteById(CPF);
    }


}
