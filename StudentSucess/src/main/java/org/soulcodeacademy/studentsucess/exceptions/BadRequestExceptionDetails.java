package org.soulcodeacademy.studentsucess.exceptions;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BadRequestExceptionDetails{

    private String title;
    private int status;
    private String details;
    private String developerMessage;
    private LocalDateTime timestamp;

    private List<Field> fields;


    @Data
    @AllArgsConstructor
    @Builder
    public static class Field{
        private String name;
        private String UserMesage;


    }

}
