
package org.soulcodeacademy.studentsucess.security.config;

import org.soulcodeacademy.studentsucess.models.Usuarios;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class DetalheUsuarioData implements UserDetails {

    private final Optional<Usuarios> usuario;

    public DetalheUsuarioData(Optional<Usuarios> usuario) {
        this.usuario = usuario;
    }

    @Override
    public List<SimpleGrantedAuthority> getAuthorities() {
        return new ArrayList<>();

    }

    @Override
    public String getPassword() {
        return usuario.orElse(new Usuarios()).getSenha();
    }

    @Override
    public String getUsername() {
        return usuario.orElse(new Usuarios()).getMatricula();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
