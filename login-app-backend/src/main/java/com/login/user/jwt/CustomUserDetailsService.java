package com.login.user.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  static List<UserDetailsWrapper> inMemoryUserList = new ArrayList<>();

  static {
    inMemoryUserList.add(new UserDetailsWrapper(1L, "kartik.agwl@gmail.com",
        "$2a$04$9I7ptYeOSz771WAKkrNakuq4euT3U8R3Wo4SOgN1cYdBGD4wtVJOG", "ROLE_TEST"));
  }// test, 4 rounds

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<UserDetailsWrapper> findFirst = inMemoryUserList.stream()
        .filter(user -> user.getUsername().equals(username)).findFirst();

    if (!findFirst.isPresent()) {
      throw new UsernameNotFoundException(String.format("User Not Found '%s'.", username));
    }

    return findFirst.get();
  }

}


