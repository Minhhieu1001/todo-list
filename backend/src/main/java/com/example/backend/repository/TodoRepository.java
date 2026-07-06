package com.example.backend.repository;

import com.example.backend.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    @Query("""
            select t from Todo t
            where (:completed is null or t.completed = :completed)
              and (:keyword is null or lower(t.title) like lower(concat('%', :keyword, '%'))
                   or lower(t.description) like lower(concat('%', :keyword, '%')))
            order by t.createdAt desc
            """)
    List<Todo> search(@Param("keyword") String keyword, @Param("completed") Boolean completed);
}
