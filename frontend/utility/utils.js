export const emailValidator = email => {
    const re = /\S+@\S+\.\S+/;
  
    if (!email || email.length <= 0) return 'Email cannot be empty.';
    if (!re.test(email)) return 'Ooops! We need a valid email address.';
  
    return '';
  };
  
  export const passwordValidator = password => {
    if (!password || password.length <= 0) return 'Il campo password non può essere vuoto.';
  
    return '';
  };
  
  export const nameValidator = name => {
    if (!name || name.length <= 0) return 'Il campo nome non può essere vuoto.';
  
    return '';
  };

  export const surnameValidator = surname => {
    if (!surname || surname.length <= 0) return 'Il campo cognome non può essere vuoto.';
  
    return '';
  };

  export const usernameValidator = username => {
    if (!username || username.length <= 0) return 'Il campo username non può essere vuoto.';
  
    return '';
  };