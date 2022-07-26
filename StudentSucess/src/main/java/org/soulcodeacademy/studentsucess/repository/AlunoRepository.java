package org.soulcodeacademy.studentsucess.repository;

import org.soulcodeacademy.studentsucess.models.Alunos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Alunos, String> {

    boolean existsByEmail(String email);
    Alunos findByEmail(String email);

}
