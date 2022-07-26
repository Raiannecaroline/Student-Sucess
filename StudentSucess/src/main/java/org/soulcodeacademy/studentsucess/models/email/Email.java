package org.soulcodeacademy.studentsucess.models.email;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.soulcodeacademy.studentsucess.models.enums.email.StatusEmail;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;


@Entity
@Table(name = "TB_EMAIL")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long emailId;


    private String emailOrigem;

    @NotBlank
    private String emailDestino;

    @NotBlank
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String corpo;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate dataDeEnvio;

    private StatusEmail statusEmail;
}

