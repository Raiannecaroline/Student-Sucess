package org.soulcodeacademy.studentsucess.models;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Usuarios {

    @Id
    private String matricula;

    @NotBlank
    @Size(min = 2, max = 40)
    private String nome;

    @Email
    @Size(min = 6, max = 100)
    private String emailSoulCode;

    @NotBlank
    @Size(min = 6, max = 100)
    private String senha;


}
