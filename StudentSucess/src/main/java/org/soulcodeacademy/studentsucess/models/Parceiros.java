package org.soulcodeacademy.studentsucess.models;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.soulcodeacademy.studentsucess.models.pesquisa.Formularios;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Parceiros {

    @Id
    private String cnpj;

    @NotBlank
    private String nomeRepresentante;

    @NotBlank
    @Size(min = 3, max = 50)
    private String nome;

    @NotBlank
    @Email
    @Size(min = 6, max = 100)
    private String email;

    @OneToMany(mappedBy = "parceiroId" )
    private List<Alunos> alunos = new ArrayList<>();

    @OneToMany
    private List<Formularios> formularios;



}
