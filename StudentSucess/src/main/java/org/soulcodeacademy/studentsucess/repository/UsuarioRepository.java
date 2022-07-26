package org.soulcodeacademy.studentsucess.repository;

import org.soulcodeacademy.studentsucess.models.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuarios, String> {

}
