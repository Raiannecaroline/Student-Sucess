package org.soulcodeacademy.studentsucess.repository;

import org.soulcodeacademy.studentsucess.models.Alunos;
import org.soulcodeacademy.studentsucess.models.Parceiros;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParceirosRepository extends JpaRepository<Parceiros, String> {

    Parceiros findByCnpj(String cnpj);
    boolean existsByEmail(String email);


}
