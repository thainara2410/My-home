package com.myhome.myhome.dto;

import com.myhome.myhome.user.UserRole;

public record RegisterDTO(String login, String password, UserRole role){
    
}
