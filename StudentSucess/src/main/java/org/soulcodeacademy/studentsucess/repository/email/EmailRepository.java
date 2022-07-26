package org.soulcodeacademy.studentsucess.repository.email;

import org.soulcodeacademy.studentsucess.models.email.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {

}
