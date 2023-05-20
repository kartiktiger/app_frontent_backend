package com.login.user.jwt;

import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
public class AuthController {

  @Value("${jwt.http.request.header}")
  private String tokenHeader;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private TokenUtil tokenUtil;

  @Autowired
  private UserDetailsService inMemoryUserDetailsService;

  @RequestMapping(value = "${jwt.get.token.uri}", method = RequestMethod.POST)
  public ResponseEntity<?> createAuthToken(@RequestBody TokenRequest authRequest)
      throws AuthException {

    authenticate(authRequest.getUsername(), authRequest.getPassword());

    final UserDetails userDetails = inMemoryUserDetailsService.loadUserByUsername(authRequest.getUsername());

    final String token = tokenUtil.generateToken(userDetails);

    return ResponseEntity.ok(new TokenResponse(token));
  }

  @RequestMapping(value = "${jwt.refresh.token.uri}", method = RequestMethod.GET)
  public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
    String authToken = request.getHeader(tokenHeader);
    final String token = authToken.substring(7);
    String username = tokenUtil.getUsernameFromToken(token);
    UserDetailsWrapper user = (UserDetailsWrapper) inMemoryUserDetailsService.loadUserByUsername(username);

    if (tokenUtil.canTokenBeRefreshed(token)) {
      String refreshedToken = tokenUtil.refreshToken(token);
      return ResponseEntity.ok(new TokenResponse(refreshedToken));
    } else {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @ExceptionHandler({ AuthException.class })
  public ResponseEntity<String> handleAuthenticationException(AuthException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
  }

  private void authenticate(String username, String password) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(password);

    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (DisabledException e) {
      throw new AuthException("USER DISABLED", e);
    } catch (BadCredentialsException e) {
      throw new AuthException("INVALID CREDENTIALS", e);
    }
  }
}

