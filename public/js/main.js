$("#btnMenu").click(function(){
    $('.main-nav-links').toggleClass('active')
})


  const validateEmail = (email)=>{
    const validRegex =  new RegExp("[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)");
    return validRegex.test(email); 
  }
  
  
  const validatePassword = (password)=>{
      const lowerCase = new RegExp("[a-z]");
      const upperCase = new RegExp("[A-Z]");
      const digits = new RegExp("[0-9]");
      
      if(password.length>=8){
          if(lowerCase.test(password)){
              if(upperCase.test(password)){
                  if(digits.test(password)){
                      return true;
                  }
                  else{
                  alert("Password must contain a digit.")
                  return false;        
                  }
              }
              else{
                  alert("Password must contain an uppercase letter.");
                  return false;
              }
          }
          else{
              alert("Password must contain a lowercase letter.");
              return false;
          }
      }
      else{
          alert("Password must be of length 8.");
          return false;
      }
  
  }

  