package org.soulcodeacademy.studentsucess.exceptions;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.fasterxml.jackson.databind.exc.PropertyBindingException;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
@AllArgsConstructor
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    private MessageSource messageSource;


    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers
            , HttpStatus status, WebRequest request) {
        return super.handleExceptionInternal(ex, body, headers, status, request);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex
            , HttpHeaders headers, HttpStatus status, WebRequest request) {


        Throwable rootCause = ExceptionUtils.getRootCause(ex);

        if(rootCause instanceof InvalidFormatException){
            return handlerInvalidFormatException((InvalidFormatException) rootCause, headers, status, request);
        }else  if(rootCause instanceof PropertyBindingException){
            return handlerInvalidFormatException((PropertyBindingException) rootCause, headers, status, request);

        }

        BadRequestExceptionDetails exception = createException(status, ExceptionType.MENSAGEM_BODY_IMCOMPREEMSIVEL
                , "O corpo da requisicao apresenta dados invalidos").build();

        return handleExceptionInternal(ex,exception, new HttpHeaders(), status, request);
    }


    private ResponseEntity<Object> handlerInvalidFormatException(InvalidFormatException ex, HttpHeaders headers
            , HttpStatus status, WebRequest request){

        String path = ex.getPath()
                .stream()
                .map(reference -> reference.getFieldName())
                .collect(Collectors.joining("."));
        String detail = String.format("A propiedade '%s' recebeu o valor '%s' , que é um tipo invalido." +
                " corrija e informe uma do tipo '%s'", path, ex.getValue(), ex.getTargetType().getName());
        BadRequestExceptionDetails exception = createException(status, ExceptionType.MENSAGEM_BODY_IMCOMPREEMSIVEL
                , detail).build();

        return handleExceptionInternal(ex,exception, new HttpHeaders(), status, request);    }

    private ResponseEntity<Object> handlerInvalidFormatException(PropertyBindingException ex, HttpHeaders headers
            , HttpStatus status, WebRequest request){

        String path = ex.getPath()
                .stream()
                .map(reference -> reference.getFieldName())
                .collect(Collectors.joining("."));
        String detail = String.format("A propiedade '%s' não faz parte da sua entidade, tente novamenete sem ela "
                , path);

        BadRequestExceptionDetails exception = createException(status, ExceptionType.MENSAGEM_BODY_IMCOMPREEMSIVEL
                , detail).build();

        return handleExceptionInternal(ex,exception, new HttpHeaders(), status, request);    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex
            , HttpHeaders headers, HttpStatus status, WebRequest request) {

        BindingResult bindingResult = ex.getBindingResult();



        List<BadRequestExceptionDetails.Field> problemField = bindingResult
                .getFieldErrors()
                .stream()
                .map(fieldError -> {

                    String message = messageSource.getMessage(fieldError, LocaleContextHolder.getLocale());
                    return BadRequestExceptionDetails.Field.builder()
                            .name(fieldError.getField())
                            .UserMesage(message)
                            .build();
                })
                .collect(Collectors.toList());


        BadRequestExceptionDetails exceptionDetails = createException(status,
                ExceptionType.DADOS_INVALIDOS,
                ex.getLocalizedMessage()).fields(problemField).developerMessage(ex.getClass().getName()).build();

        return handleExceptionInternal(ex,exceptionDetails, new HttpHeaders(), status, request);
    }



    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Object> handlerBadRequestException(BadRequestException ex,  WebRequest request){

        BadRequestExceptionDetails exceptionDetails = createException(HttpStatus.NOT_FOUND,
                ExceptionType.ENITDADE_NAO_ENCONTRADA,
                ex.getMessage()).developerMessage(ex.getMessage()).build();


        return handleExceptionInternal(ex,exceptionDetails, new HttpHeaders(), HttpStatus.NOT_FOUND, request);

    }


    @ExceptionHandler(EmailDominioException.class)
    public ResponseEntity<Object> handlerEmailDominioException(EmailDominioException ex,  WebRequest request){

        BadRequestExceptionDetails exceptionDetails = createException(HttpStatus.FAILED_DEPENDENCY,
                ExceptionType.DADOS_INVALIDOS,
                ex.getMessage()).developerMessage(ex.getMessage()).build();


        return handleExceptionInternal(ex,exceptionDetails, new HttpHeaders(), HttpStatus.FAILED_DEPENDENCY, request);

    }


    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Object> handlerUsernameNotFoundException(UsernameNotFoundException ex,  WebRequest request){

        BadRequestExceptionDetails exceptionDetails = createException(HttpStatus.FORBIDDEN,
                ExceptionType.DADOS_INVALIDOS,
                ex.getMessage()).developerMessage(ex.getMessage()).build();


        return handleExceptionInternal(ex,exceptionDetails, new HttpHeaders(), HttpStatus.FORBIDDEN, request);

    }


    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleEntidadeEmUso(DataIntegrityViolationException ex, WebRequest request) {

        BadRequestExceptionDetails exceptionDetails = createException(HttpStatus.NOT_FOUND,
                ExceptionType.ENTIDADE_EM_USO,
                ex.getMessage()).developerMessage(ex.getClass().getName()).build();

        return handleExceptionInternal(ex,exceptionDetails, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handlerAccessDeniedException(AccessDeniedException ex,  WebRequest request){

        BadRequestExceptionDetails exceptionDetails = createException(HttpStatus.FORBIDDEN,
                ExceptionType.ACESSO_NEGADO,
                ex.getLocalizedMessage()).developerMessage(ex.getClass().getName()).build();


        return handleExceptionInternal(ex,exceptionDetails, new HttpHeaders(), HttpStatus.FORBIDDEN, request);

    }



    public BadRequestExceptionDetails.BadRequestExceptionDetailsBuilder createException(HttpStatus status
            , ExceptionType exceptionType, String detail){

        return BadRequestExceptionDetails.builder()
                .status(status.value())
                .details(exceptionType.getUri())
                .title(exceptionType.getTitle())
                .timestamp(LocalDateTime.now());

    }




}