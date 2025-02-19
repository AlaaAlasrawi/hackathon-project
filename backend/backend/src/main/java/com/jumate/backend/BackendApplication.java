package com.jumate.backend;

import com.jumate.backend.persistence.entity.SysUserEntity;
import com.jumate.backend.persistence.jpa.SysUserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class BackendApplication {
    private final PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

//    @Bean
    public CommandLineRunner init(SysUserJpaRepository userRepository) {
        return args -> {
            SysUserEntity user1 = SysUserEntity.builder()
                    .username("ala0206138")
                    .password(passwordEncoder.encode("123"))
                    .name("Alaa")
                    .email("ala0206138@ju.edu.jo")
                    .major("AI")
                    .collage("Engineering")
                    .bio("A passionate student in AI")
                    .tags("study, collaboration")
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            userRepository.save(user1);

            SysUserEntity user2 = SysUserEntity.builder()
                    .username("aya0197097")
                    .password(passwordEncoder.encode("123"))
                    .name("Ayat")
                    .email("aya0197097@ju.edu.jo")
                    .major("CS")
                    .collage("IT")
                    .bio("A passionate student in AI")
                    .tags("study, collaboration")
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            userRepository.save(user2);

            SysUserEntity user3 = SysUserEntity.builder()
                    .username("rhf0215756")
                    .password(passwordEncoder.encode("123"))
                    .name("Rahaf")
                    .email("rhf0215756@ju.edu.jo")
                    .major("CIS")
                    .collage("IT")
                    .bio("A passionate student in AI")
                    .tags("study, collaboration")
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            userRepository.save(user3);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            List<SysUserEntity> users = Arrays.asList(
                    new SysUserEntity(null, "neb0709872", passwordEncoder.encode("123"), "neb0709872", "neb0709872@ju.edu.jo", "Books", "Engineering", "Student bio here", "Learning Disability", "study", LocalDateTime.parse("2023-10-22 00:00:00", formatter), LocalDateTime.parse("2023-12-07 00:00:00", formatter)),
                    new SysUserEntity(null, "khv3813962", passwordEncoder.encode("123"), "khv3813962", "khv3813962@ju.edu.jo", "AI", "Engineering", "Student bio here", "Physical Disability", "study", LocalDateTime.parse("2023-07-27 00:00:00", formatter), LocalDateTime.parse("2023-09-22 00:00:00", formatter)),
                    new SysUserEntity(null, "ooq2133132", passwordEncoder.encode("123"), "ooq2133132", "ooq2133132@ju.edu.jo", "Art", "Engineering", "Student bio here", "Hearing Impairment", "study", LocalDateTime.parse("2023-01-08 00:00:00", formatter), LocalDateTime.parse("2023-02-26 00:00:00", formatter)),
                    new SysUserEntity(null, "exb0834652", passwordEncoder.encode("123"), "exb0834652", "exb0834652@ju.edu.jo", "Books", "Engineering", "Student bio here", "Physical Disability", "networking", LocalDateTime.parse("2023-10-07 00:00:00", formatter), LocalDateTime.parse("2023-10-22 00:00:00", formatter)),
                    new SysUserEntity(null, "hib0526224", passwordEncoder.encode("123"), "hib0526224", "hib0526224@ju.edu.jo", "Novels", "Engineering", "Student bio here", "Visual Impairment", "social", LocalDateTime.parse("2023-02-01 00:00:00", formatter), LocalDateTime.parse("2023-03-19 00:00:00", formatter)),
                    new SysUserEntity(null, "qbl9300227", passwordEncoder.encode("123"), "qbl9300227", "qbl9300227@ju.edu.jo", "Novels", "Engineering", "Student bio here", "Visual Impairment", "academic", LocalDateTime.parse("2023-09-21 00:00:00", formatter), LocalDateTime.parse("2023-10-04 00:00:00", formatter)),
                    new SysUserEntity(null, "drz5055642", passwordEncoder.encode("123"), "drz5055642", "drz5055642@ju.edu.jo", "Novels", "Engineering", "Student bio here", "Hearing Impairment", "networking", LocalDateTime.parse("2023-08-25 00:00:00", formatter), LocalDateTime.parse("2023-11-12 00:00:00", formatter)),
                    new SysUserEntity(null, "gpg1561190", passwordEncoder.encode("123"), "gpg1561190", "gpg1561190@ju.edu.jo", "Reading", "Engineering", "Student bio here", "Hearing Impairment", "academic", LocalDateTime.parse("2023-01-24 00:00:00", formatter), LocalDateTime.parse("2023-04-15 00:00:00", formatter)),
                    new SysUserEntity(null, "zgc8749611", passwordEncoder.encode("123"), "zgc8749611", "zgc8749611@ju.edu.jo", "Spanish", "Engineering", "Student bio here", "Learning Disability", "academic", LocalDateTime.parse("2023-06-23 00:00:00", formatter), LocalDateTime.parse("2023-09-01 00:00:00", formatter)),
                    new SysUserEntity(null, "glu2881891", passwordEncoder.encode("123"), "glu2881891", "glu2881891@ju.edu.jo", "Programming", "Engineering", "Student bio here", "Hearing Impairment", "social", LocalDateTime.parse("2023-01-03 00:00:00", formatter), LocalDateTime.parse("2023-03-14 00:00:00", formatter)),
                    new SysUserEntity(null, "liq4226363", passwordEncoder.encode("123"), "liq4226363", "liq4226363@ju.edu.jo", "Books", "Engineering", "Student bio here", "Physical Disability", "social", LocalDateTime.parse("2023-02-27 00:00:00", formatter), LocalDateTime.parse("2023-05-24 00:00:00", formatter)),
                    new SysUserEntity(null, "vhl2853460", passwordEncoder.encode("123"), "vhl2853460", "vhl2853460@ju.edu.jo", "Art", "Engineering", "Student bio here", "Visual Impairment", "social", LocalDateTime.parse("2023-10-23 00:00:00", formatter), LocalDateTime.parse("2023-11-22 00:00:00", formatter)),
                    new SysUserEntity(null, "ybr7671392", passwordEncoder.encode("123"), "ybr7671392", "ybr7671392@ju.edu.jo", "Marketing", "Engineering", "Student bio here", "Hearing Impairment", "study", LocalDateTime.parse("2023-11-03 00:00:00", formatter), LocalDateTime.parse("2024-01-14 00:00:00", formatter)),
                    new SysUserEntity(null, "uij6453027", passwordEncoder.encode("123"), "uij6453027", "uij6453027@ju.edu.jo", "Programming", "Engineering", "Student bio here", "Physical Disability", "collaboration", LocalDateTime.parse("2023-10-14 00:00:00", formatter), LocalDateTime.parse("2023-11-16 00:00:00", formatter)),
                    new SysUserEntity(null, "tqh5327993", passwordEncoder.encode("123"), "tqh5327993", "tqh5327993@ju.edu.jo", "Language Exchange", "Engineering", "Student bio here", "Visual Impairment", "support", LocalDateTime.parse("2023-09-04 00:00:00", formatter), LocalDateTime.parse("2023-11-03 00:00:00", formatter)),
                    new SysUserEntity(null, "flo4630729", passwordEncoder.encode("123"), "flo4630729", "flo4630729@ju.edu.jo", "Marketing", "Engineering", "Student bio here", "Hearing Impairment", "collaboration", LocalDateTime.parse("2023-03-29 00:00:00", formatter), LocalDateTime.parse("2023-05-17 00:00:00", formatter)),
                    new SysUserEntity(null, "rqc5941586", passwordEncoder.encode("123"), "rqc5941586", "rqc5941586@ju.edu.jo", "Art", "Engineering", "Student bio here", "Learning Disability", "study", LocalDateTime.parse("2023-01-07 00:00:00", formatter), LocalDateTime.parse("2023-03-16 00:00:00", formatter)),
                    new SysUserEntity(null, "jur2988398", passwordEncoder.encode("123"), "jur2988398", "jur2988398@ju.edu.jo", "Programming", "Engineering", "Student bio here", "Learning Disability", "support", LocalDateTime.parse("2023-07-08 00:00:00", formatter), LocalDateTime.parse("2023-10-13 00:00:00", formatter)),
                    new SysUserEntity(null, "hzj7842082", passwordEncoder.encode("123"), "hzj7842082", "hzj7842082@ju.edu.jo", "Reading", "Engineering", "Student bio here", "Learning Disability", "support", LocalDateTime.parse("2023-12-11 00:00:00", formatter), LocalDateTime.parse("2023-12-20 00:00:00", formatter)),
                    new SysUserEntity(null, "uuu3002239", passwordEncoder.encode("123"), "uuu3002239", "uuu3002239@ju.edu.jo", "Marketing", "Engineering", "Student bio here", "Physical Disability", "study", LocalDateTime.parse("2023-08-15 00:00:00", formatter), LocalDateTime.parse("2023-09-14 00:00:00", formatter)),
                    new SysUserEntity(null, "fzu6328341", passwordEncoder.encode("123"), "fzu6328341", "fzu6328341@ju.edu.jo", "Art", "Engineering", "Student bio here", "Physical Disability", "networking", LocalDateTime.parse("2023-09-01 00:00:00", formatter), LocalDateTime.parse("2023-10-30 00:00:00", formatter)),
                    new SysUserEntity(null, "bfb8883064", passwordEncoder.encode("123"), "bfb8883064", "bfb8883064@ju.edu.jo", "Chinese", "Engineering", "Student bio here", "Physical Disability", "social", LocalDateTime.parse("2023-08-02 00:00:00", formatter), LocalDateTime.parse("2023-08-27 00:00:00", formatter)),
                    new SysUserEntity(null, "hxb2277785", passwordEncoder.encode("123"), "hxb2277785", "hxb2277785@ju.edu.jo", "Reading", "Engineering", "Student bio here", "Visual Impairment", "study", LocalDateTime.parse("2023-06-20 00:00:00", formatter), LocalDateTime.parse("2023-09-06 00:00:00", formatter)),
                    new SysUserEntity(null, "qfj3036885", passwordEncoder.encode("123"), "qfj3036885", "qfj3036885@ju.edu.jo", "AI", "Engineering", "Student bio here", "Visual Impairment", "support", LocalDateTime.parse("2023-06-02 00:00:00", formatter), LocalDateTime.parse("2023-08-28 00:00:00", formatter)),
                    new SysUserEntity(null, "zbp0712138", passwordEncoder.encode("123"), "zbp0712138", "zbp0712138@ju.edu.jo", "Art", "Engineering", "Student bio here", "Hearing Impairment", "collaboration", LocalDateTime.parse("2023-07-07 00:00:00", formatter), LocalDateTime.parse("2023-09-06 00:00:00", formatter)),
                    new SysUserEntity(null, "thj2110909", passwordEncoder.encode("123"), "thj2110909", "thj2110909@ju.edu.jo", "Chinese", "Engineering", "Student bio here", "Learning Disability", "support", LocalDateTime.parse("2023-09-15 00:00:00", formatter), LocalDateTime.parse("2023-12-10 00:00:00", formatter)),
                    new SysUserEntity(null, "ixu9933698", passwordEncoder.encode("123"), "ixu9933698", "ixu9933698@ju.edu.jo", "Reading", "Engineering", "Student bio here", "Visual Impairment", "support", LocalDateTime.parse("2023-05-26 00:00:00", formatter), LocalDateTime.parse("2023-07-12 00:00:00", formatter)),
                    new SysUserEntity(null, "gxy8443019", passwordEncoder.encode("123"), "gxy8443019", "gxy8443019@ju.edu.jo", "AI", "Engineering", "Student bio here", "Visual Impairment", "support", LocalDateTime.parse("2023-10-19 00:00:00", formatter), LocalDateTime.parse("2023-12-02 00:00:00", formatter)),
                    new SysUserEntity(null, "ygj1855056", passwordEncoder.encode("123"), "ygj1855056", "ygj1855056@ju.edu.jo", "Novels", "Engineering", "Student bio here", "Learning Disability", "academic", LocalDateTime.parse("2023-10-27 00:00:00", formatter), LocalDateTime.parse("2023-10-28 00:00:00", formatter)),
                    new SysUserEntity(null, "jcn5056176", passwordEncoder.encode("123"), "jcn5056176", "jcn5056176@ju.edu.jo", "Books", "Engineering", "Student bio here", "Visual Impairment", "study", LocalDateTime.parse("2023-09-23 00:00:00", formatter), LocalDateTime.parse("2023-12-15 00:00:00", formatter))
            );

            userRepository.saveAll(users);
        };
    }

}
