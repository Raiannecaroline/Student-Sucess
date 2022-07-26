
package org.soulcodeacademy.studentsucess.security;


import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.Usuarios;
import org.soulcodeacademy.studentsucess.repository.UsuarioRepository;
import org.soulcodeacademy.studentsucess.security.config.DetalheUsuarioData;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class DetalheUsuarioServiceIMPL implements UserDetailsService {


    private UsuarioRepository repository;


    @Override
    public UserDetails loadUserByUsername(String matricula) throws UsernameNotFoundException {
        Optional<Usuarios> usuario = repository.findById(matricula);
        if (usuario.isEmpty()) {
            throw new UsernameNotFoundException("Usuário [" + matricula + "] não encontrado");
        }

        return new DetalheUsuarioData(usuario);
    }
}

