package org.soulcodeacademy.studentsucess.service;

import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.exceptions.BadRequestException;
import org.soulcodeacademy.studentsucess.models.Parceiros;
import org.soulcodeacademy.studentsucess.repository.ParceirosRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ParceirosService {

    private ParceirosRepository parceirosRepository;


    /**
     * Função para buscar uma empresa parceira pelo o seu cnpj
     * @param cnpj o cnoj da empresa que se deseja buscar
     * @return Retora uma empresa especifca que se desejou buscar, atraves de seu cnpj
     */
    public Optional<Parceiros> buscarPorCnpj(String cnpj) {

        if (!parceirosRepository.existsById(cnpj)) {
            throw new BadRequestException("NOT FOUND");
        }
        return parceirosRepository.findById(cnpj);
    }


    /**
     * Função para listar todas as empresas parceiras cadastradas no sistema
     * @return Retorna uma lista com todos as empresas parceiras salvas
     */
    public List<Parceiros> listarTodos() {
       return parceirosRepository.findAll();
    }

    /**
     * Função para salvar uma nova empresa parceira
     * @param parceiros a empresa parceira que será salva
     * @return Retorna uma nova empresa parceira salva
     */
    public Parceiros salvaParceiro(Parceiros parceiros){

        return parceirosRepository.save(parceiros);
    }

    /**
     * Função para atualizar os dados de uma empresa parceira
     * @param parceiros empresa parceira que será atualizada
     * @return Retorna umaempresa atualizada
     */
    public Parceiros atualizar(Parceiros parceiros){

        buscarPorCnpj(parceiros.getCnpj());

        return parceirosRepository.save(parceiros);
    }


    /**
     * Função para deletar uma empresa parceira
     * @param cnpj cnpj da empresa especifica que se deseja deletar do sistema
     */
    public void deletarPorcnpj(String cnpj){
        buscarPorCnpj(cnpj);
        parceirosRepository.deleteById(cnpj);
    }
}
